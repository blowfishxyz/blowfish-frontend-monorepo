import Browser from "webextension-polyfill";

import { RequestType } from "./utils/constants";
import { createPopupWithFile } from "./utils/window";
import { Message, postResponseToPort } from "./utils/messages";

console.log("BACKGROUND RUNNING");

const setupRemoteConnection = async (remotePort: Browser.Runtime.Port) => {
  remotePort.onMessage.addListener((message: Message) => {
    console.log(message);
    if (message.type === RequestType.Transaction) {
      return processTransactionRequest(message, remotePort);
    } else if (message.type === RequestType.SignTypedData) {
      return processSignTypedDataRequest(message, remotePort);
    } else if (message.type === RequestType.SignMessage) {
      return processSignMessageRequest(message, remotePort);
    }
  });
};

Browser.runtime.onConnect.addListener(setupRemoteConnection);

const processTransactionRequest = async (
  message: Message,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  createPopupWithFile("scan-result.html", {
    id: message.id,
    hostname: message.hostname ?? "",
  });

  // TODO(kimpers): Grab the actual result
  const isOk = true;
  postResponseToPort(remotePort, message, { isOk });
};

const processSignTypedDataRequest = async (
  message: Message,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  // TODO(kimpers): Grab the actual result
  const isOk = true;
  postResponseToPort(remotePort, message, { isOk });
};

const processSignMessageRequest = async (
  message: Message,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  // TODO(kimpers): Grab the actual result
  const isOk = true;
  postResponseToPort(remotePort, message, { isOk });
};
