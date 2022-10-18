import Browser from "webextension-polyfill";

import {
  RequestType,
  Message,
  UntypedMessageData,
  TransactionRequest,
  SignTypedDataRequest,
  SignMessageRequest,
} from "./types";
import { createPopupWithFile } from "./utils/window";
import { postResponseToPort } from "./utils/messages";

console.log("BACKGROUND RUNNING");

const setupRemoteConnection = async (remotePort: Browser.Runtime.Port) => {
  remotePort.onMessage.addListener((message: Message<UntypedMessageData>) => {
    console.log(message);
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

const processTransactionRequest = async (
  message: Message<TransactionRequest>,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  createPopupWithFile("scan-result.html", message);

  // TODO(kimpers): Grab the actual result
  const isOk = true;
  postResponseToPort(remotePort, message, { isOk });
};

const processSignTypedDataRequest = async (
  message: Message<SignTypedDataRequest>,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  // TODO(kimpers): Grab the actual result
  const isOk = true;
  postResponseToPort(remotePort, message, { isOk });
};

const processSignMessageRequest = async (
  message: Message<SignMessageRequest>,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  // TODO(kimpers): Grab the actual result
  const isOk = true;
  postResponseToPort(remotePort, message, { isOk });
};
