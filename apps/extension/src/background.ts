import { logger } from "@blowfish/utils/logger";
import {
  BlowfishOption,
  BlowfishOptionKey,
  BlowfishPausedOptionType,
  BlowfishPortalBackgroundMessage,
  DappRequest,
  Message,
  RequestType,
  SignMessageRequest,
  SignTypedDataRequest,
  TransactionRequest,
  UserDecisionResponse,
  isSignRequestMessage,
  isSignTypedDataRequestMessage,
  isTransactionRequestMessage,
  isUserDecisionResponseMessage,
} from "@blowfish/utils/types";
import Browser from "webextension-polyfill";

import {
  getBlowfishImpersonationWallet,
  getBlowfishPortalUrl,
  isUnsupportedChainDismissed,
  setUnsupportedChainDismissed,
  storage,
} from "~utils/storage";

import { chainIdToSupportedChainMapping } from "./utils/constants";
import { createRawMessage, postResponseToPort } from "./utils/messages";

logger.debug("BACKGROUND RUNNING");

const messageIdToPortAndMessageMapping: Map<
  string,
  {
    remotePort: Browser.Runtime.Port;
    message: Message<RequestType, DappRequest>;
  }
> = new Map();

Browser.runtime.onInstalled.addListener(async (obj) => {
  // On first install, create the tab.
  if (obj.reason === "install") {
    // Add an onboarding URL on install.
    const portalUrl = await getBlowfishPortalUrl();
    Browser.tabs.create({
      url: `${portalUrl}/onboarding`,
    });

    // Add a form for uninstalls to see if we can improve the product.
    Browser.runtime.setUninstallURL(`${portalUrl}/offboarding`);
  }
});

const setupRemoteConnection = async (remotePort: Browser.Runtime.Port) => {
  remotePort.onMessage.addListener(
    (message: Message<DappRequest["type"], DappRequest>) => {
      logger.debug(message);

      if (isTransactionRequestMessage(message)) {
        return processTransactionRequest(message, remotePort);
      } else if (isSignTypedDataRequestMessage(message)) {
        return processSignTypedDataRequest(message, remotePort);
      } else if (isSignRequestMessage(message)) {
        return processSignMessageRequest(message, remotePort);
      }
    }
  );
};

const responseProcessingMiddleware = async (
  message: BlowfishPortalBackgroundMessage
) => {
  if (isUserDecisionResponseMessage(message)) {
    if (message.data.opts?.skipUnsupportedChainWarning) {
      const { chainId } = message.data.opts;
      await setUnsupportedChainDismissed(chainId, true);
    }
  }
};

const getExtensionOptionFromTransactionPortal = async (
  message: Message<RequestType.BlowfishOptions, BlowfishOptionKey>
) => {
  const pausedOptions = await storage.get<BlowfishPausedOptionType>(
    message.data.key
  );
  return createRawMessage(message.type, pausedOptions || null);
};

// HACK(kimpers): If we don't return a Promise of something here the sender will be stuck waiting for a response indefinitely
// see https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-484772327
const onBrowserMessageListener = async (
  message: BlowfishPortalBackgroundMessage
): Promise<
  Message<RequestType, BlowfishPausedOptionType | Record<string, never>> | true
> => {
  if (message.type === RequestType.BlowfishOptions) {
    return getExtensionOptionFromTransactionPortal(message);
  }

  if (message.type === RequestType.SetBlowfishOptions) {
    storage.set(message.data.key, message.data.value);
    return true;
  }

  if (message.type === RequestType.GetRequestToScan) {
    return createRawMessage(
      message.type,
      messageIdToPortAndMessageMapping.get(message.data.key)?.message || {}
    );
  }

  const responseRemotePort = messageIdToPortAndMessageMapping.get(
    message.id
  )?.remotePort;

  if (responseRemotePort) {
    responseRemotePort.postMessage(message);
    messageIdToPortAndMessageMapping.delete(message.id);
    responseProcessingMiddleware(message).catch((err) => {
      logger.error(err);
    });
  } else {
    logger.error(
      `Missing remote port for message ${message.id}: ${message.type}`
    );
  }
  return true;
};

Browser.runtime.onConnect.addListener(setupRemoteConnection);
Browser.runtime.onMessage.addListener(onBrowserMessageListener);

const processRequestBase = async (
  message: Message<RequestType, DappRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  const { address } = (await getBlowfishImpersonationWallet()) || {};
  const isImpersonatingWallet = !!address;
  const pausedOption = await storage.get<BlowfishPausedOptionType>(
    BlowfishOption.PREFERENCES_BLOWFISH_PAUSED
  );
  const { chainId } = message.data;

  if (pausedOption && pausedOption.isPaused) {
    postResponseToPort(remotePort, message, {
      isOk: false,
      opts: { pauseScan: true, chainId },
    });
    return;
  }

  // Just proxy the request if we don't support the current chain
  // and the user dismissed the notice
  const isUnsupportedChain = !chainIdToSupportedChainMapping[chainId];
  if (isUnsupportedChain) {
    logger.info(`Unsupported chain id ${chainId}`);
    const isDismissed = await isUnsupportedChainDismissed(chainId);
    if (isDismissed) {
      // NOTE: The responseData is ignored for unsupported chains
      const responseData: UserDecisionResponse = { isOk: false };
      postResponseToPort(remotePort, message, responseData);
      return;
    }
  }

  const currentTab = await Browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then((tabs) => tabs[0]);
  const currentTabId = currentTab?.id;

  // TODO(kimpers): We could consider kicking off the scan before we even open the popup
  logger.debug(message);
  const portalUrl = await getBlowfishPortalUrl();
  const tab = await Browser.tabs.create({
    url: `${portalUrl}/scan?id=${message.id}&chainId=${chainId}`,
    active: true,
  });
  const tabId = tab.id!;

  // Store port and message to id mapping so we can respond to the message later on and get the stored message
  messageIdToPortAndMessageMapping.set(message.id, {
    remotePort,
    message: {
      ...message,
      data: {
        ...message.data,
        isImpersonatingWallet,
      },
    },
  });

  const handleRemovedTab = (removedTabId: number) => {
    if (removedTabId === tabId) {
      // If the window is closed before we received a response we assume cancel
      // as the user probably just closed the window
      if (messageIdToPortAndMessageMapping.has(message.id)) {
        messageIdToPortAndMessageMapping.delete(message.id);
        logger.debug(
          "Window closed without response, assuming the user wants to cancel"
        );
        const responseData: UserDecisionResponse = { isOk: false };
        postResponseToPort(remotePort, message, responseData);
      }

      // We want to restore the focus to the tab that the user was on
      // when they initiated the transaction
      if (currentTabId) {
        Browser.tabs
          .update(currentTabId, { active: true })
          .catch((err) => logger.error(err));
      }

      // Clean up listner as it's no longer relevant
      Browser.tabs.onRemoved.removeListener(handleRemovedTab);
    }
  };

  Browser.tabs.onRemoved.addListener(handleRemovedTab);
};

const processTransactionRequest = async (
  message: Message<RequestType.Transaction, TransactionRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort);
};

const processSignTypedDataRequest = async (
  message: Message<RequestType.SignTypedData, SignTypedDataRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort);
};

const processSignMessageRequest = async (
  message: Message<RequestType.SignMessage, SignMessageRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort);
};
