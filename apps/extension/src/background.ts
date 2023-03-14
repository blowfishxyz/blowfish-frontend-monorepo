import type { BlowfishPausedOptionType } from "@blowfish/hooks";
import { PREFERENCES_BLOWFISH_PAUSED } from "@blowfish/hooks";
import {
  BlowfishOptionRequest,
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

import { createTransactionPortalTab } from "./utils/browser";
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
const messageToPortMapping: Map<string, Browser.Runtime.Port> = new Map();

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
    } else if (message.type === RequestType.BlowfishOptions) {
      return processBlowfishOptionsRequest(
        message as Message<BlowfishOptionRequest>,
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

const setExtensionOptionFromTransactionPortal = (
  message: Message<UntypedMessageData>
) => {
  storage.set(message.data.key, message.data.value);
};

const getExtensionOptionFromTransactionPortal = async (
  message: Message<UntypedMessageData>
) => {
  const pausedOptions = await storage.get<BlowfishPausedOptionType>(
    message.data.key
  );
  return createRawMessage(message.type, pausedOptions || null);
};

const onBrowserMessageListener = (
  message: Message<UntypedMessageData>
): Promise<Message<UntypedMessageData>> | void => {
  if (message.type === RequestType.BlowfishOptions) {
    return getExtensionOptionFromTransactionPortal(message);
  }

  if (message.type === RequestType.SetBlowfishOptions) {
    setExtensionOptionFromTransactionPortal(message);
    return undefined;
  }

  const responseRemotePort = messageToPortMapping.get(message.id);

  if (responseRemotePort) {
    responseRemotePort.postMessage(message);
    messageToPortMapping.delete(message.id);
    responseProcessingMiddleware(message).catch((err) => {
      logger.error(err);
    });
  } else {
    logger.error(
      `Missing remote port for message ${message.id}: ${message.type}`
    );
  }
  return undefined;
};

Browser.runtime.onConnect.addListener(setupRemoteConnection);
Browser.runtime.onMessage.addListener(onBrowserMessageListener);

const processRequestBase = async (
  message: Message<
    TransactionRequest | SignTypedDataRequest | SignMessageRequest
  >,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  const isImpersonatingWallet = !!(await getBlowfishImpersonationWallet());
  const pausedOption = await storage.get<BlowfishPausedOptionType>(
    PREFERENCES_BLOWFISH_PAUSED
  );

  if (pausedOption && pausedOption.isPaused) {
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

  // TODO(kimpers): We could consider kicking off the scan before we even open the popup
  // and send the scan results via a message to the window for a snappier user experience
  logger.debug(message);
  const tabPromise = createTransactionPortalTab({
    ...message,
    data: {
      ...message.data,
      isImpersonatingWallet,
    },
  });

  // Store port to id mapping so we can respond to the message later on
  messageToPortMapping.set(message.id, remotePort);
  const tab = await tabPromise;
  const tabId = tab.id!;
  Browser.tabs.onRemoved.addListener((removedTabId) => {
    // If the window is closed before we received a response we assume cancel
    // as the user probably just closed the window
    if (removedTabId === tabId && messageToPortMapping.has(message.id)) {
      logger.debug(
        "Window closed without response, assuming the user wants to cancel"
      );
      const responseData: UserDecisionResponse = { isOk: false };
      postResponseToPort(remotePort, message, responseData);
    }
  });
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

const processBlowfishOptionsRequest = async (
  message: Message<BlowfishOptionRequest>,
  remotePort: Browser.Runtime.Port
): Promise<void> => {
  const data = await storage.get(message.data.option);
  remotePort.postMessage({ ...message, data });
};
