import type { BlowfishPausedOptionType } from "@blowfish/hooks";
import { PREFERENCES_BLOWFISH_PAUSED } from "@blowfish/hooks";
import {
  DappRequest,
  Message,
  RequestType,
  SignMessageRequest,
  SignTypedDataRequest,
  TransactionRequest,
  UntypedMessageData,
  UserDecisionResponse,
  isUserDecisionResponseMessage,
} from "@blowfish/utils/types";
import Browser from "webextension-polyfill";

import { BLOWFISH_TRANSACTION_PORTAL_URL } from "~config";

import { chainIdToSupportedChainMapping } from "./utils/constants";
import { logger } from "./utils/logger";
import { createRawMessage, postResponseToPort } from "./utils/messages";
import {
  getBlowfishImpersonationWallet,
  isUnsupportedChainDismissed,
  setUnsupportedChainDismissed,
  storage,
} from "./utils/storage";

logger.debug("BACKGROUND RUNNING");

const messageIdToPortAndMessageMapping: Map<
  string,
  { remotePort: Browser.Runtime.Port; message: Message<DappRequest> }
> = new Map();

const setupRemoteConnection = async (remotePort: Browser.Runtime.Port) => {
  remotePort.onMessage.addListener((message: Message<UntypedMessageData>) => {
    logger.debug(message);

    if (message.type === RequestType.Transaction) {
      return processTransactionRequest(
        message as Message<TransactionRequest>,
        remotePort
      );
    } else if (message.type === RequestType.SignTypedData) {
      return processSignTypedDataRequest(
        message as Message<SignTypedDataRequest>,
        remotePort
      );
    } else if (message.type === RequestType.SignMessage) {
      return processSignMessageRequest(
        message as Message<SignMessageRequest>,
        remotePort
      );
    }
  });
};

const responseProcessingMiddleware = async (
  message: Message<UntypedMessageData>
) => {
  if (isUserDecisionResponseMessage(message)) {
    if (message.data.opts?.skipUnsupportedChainWarning) {
      const { chainId } = message.data.opts;
      await setUnsupportedChainDismissed(chainId, true);
    }
  }
};

const getExtensionOptionFromTransactionPortal = async (
  message: Message<UntypedMessageData>
) => {
  const pausedOptions = await storage.get<BlowfishPausedOptionType>(
    message.data.key
  );
  return createRawMessage(message.type, pausedOptions || null);
};

// HACK(kimpers): If we don't returna Promise of something here the sender will be stuck waiting for a response indefinitely
// see https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-484772327
const onBrowserMessageListener = async (
  message: Message<UntypedMessageData>
): Promise<Message<UntypedMessageData> | true> => {
  if (message.type === RequestType.BlowfishOptions) {
    return getExtensionOptionFromTransactionPortal(message);
  }

  if (message.type === RequestType.SetBlowfishOptions) {
    storage.set(message.data.key, message.data.value);
    return true;
  }
  if (message.type === RequestType.GetTransactionToScan) {
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
  message: Message<
    TransactionRequest | SignTypedDataRequest | SignMessageRequest
  >,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  const { address } = (await getBlowfishImpersonationWallet()) || {};
  const isImpersonatingWallet = !!address;
  const pausedOption = await storage.get<BlowfishPausedOptionType>(
    PREFERENCES_BLOWFISH_PAUSED
  );

  if (pausedOption && pausedOption.isPaused) {
    postResponseToPort(remotePort, message, { opts: { pauseScan: true } });
    return;
  }

  const { chainId } = message.data;
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
  const tab = await Browser.tabs.create({
    url: `${BLOWFISH_TRANSACTION_PORTAL_URL}/scan?id=${message.id}`,
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
  message: Message<TransactionRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort);
};

const processSignTypedDataRequest = async (
  message: Message<SignTypedDataRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort);
};

const processSignMessageRequest = async (
  message: Message<SignMessageRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  await processRequestBase(message, remotePort);
};
