import Browser from "webextension-polyfill";

import {
  RequestType,
  Message,
  UntypedMessageData,
  TransactionRequest,
  SignTypedDataRequest,
  SignMessageRequest,
  UserDecisionData,
} from "./types";
import { createPopupWithFile } from "./utils/window";
import { chainIdToSupportedChainMapping } from "./utils/constants";
import { postResponseToPort } from "./utils/messages";
import { logger } from "./utils/logger";

const DIMENSIONS = { width: 392, height: 748 };

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
    }
  });
};

Browser.runtime.onConnect.addListener(setupRemoteConnection);
Browser.runtime.onMessage.addListener(
  (message: Message<UntypedMessageData>) => {
    const responseRemotePort = messageToPortMapping.get(message.id);

    if (responseRemotePort) {
      responseRemotePort.postMessage(message);
      messageToPortMapping.delete(message.id);
    } else {
      logger.error(
        `Missing remote port for message ${message.id}: ${message.type}`
      );
    }
  }
);

const processTransactionRequest = async (
  message: Message<TransactionRequest>,
  remotePort: Browser.Runtime.Port
) => {
  const { chainId } = message.data;
  // Just proxy the request if we don't support the current chain
  if (!chainIdToSupportedChainMapping[chainId]) {
    logger.info(`Unsupported chain id ${chainId}`);
    const responseData: UserDecisionData = { isOk: true };
    postResponseToPort(remotePort, message, responseData);
    return;
  }

  logger.debug(message);
  // TODO(kimpers): We could consider kicking off the scan before we even open the popup
  // and send the scan results via a message to the window for a snappier user experience
  createPopupWithFile("scan.html", message, DIMENSIONS);

  // Store port to id mapping so we can respond to the message later on
  messageToPortMapping.set(message.id, remotePort);
};

const processSignTypedDataRequest = async (
  message: Message<SignTypedDataRequest>,
  remotePort: Browser.Runtime.Port
) => {
  const { chainId } = message.data;
  // Just proxy the request if we don't support the current chain
  if (!chainIdToSupportedChainMapping[chainId]) {
    logger.info(`Unsupported chain id ${chainId}`);
    const responseData: UserDecisionData = { isOk: true };
    postResponseToPort(remotePort, message, responseData);
    return;
  }

  logger.debug(message);
  createPopupWithFile("scan.html", message, DIMENSIONS);

  // Store port to id mapping so we can respond to the message later on
  messageToPortMapping.set(message.id, remotePort);
};

const processSignMessageRequest = async (
  message: Message<SignMessageRequest>,
  remotePort: Browser.Runtime.Port
) => {
  const { chainId } = message.data;
  // Just proxy the request if we don't support the current chain
  if (!chainIdToSupportedChainMapping[chainId]) {
    logger.info(`Unsupported chain id ${chainId}`);
    const responseData: UserDecisionData = { isOk: true };
    postResponseToPort(remotePort, message, responseData);
    return;
  }

  logger.debug(message);
  createPopupWithFile("scan.html", message, DIMENSIONS);

  // Store port to id mapping so we can respond to the message later on
  messageToPortMapping.set(message.id, remotePort);
};
