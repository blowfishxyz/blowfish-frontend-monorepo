import Browser from "webextension-polyfill";
import { RequestType } from "./utils/constants";

console.log("BACKGROUND RUNNING");

const setupRemoteConnection = async (remotePort: Browser.Runtime.Port) => {
  remotePort.onMessage.addListener((message) => {
    if (message.data.type === RequestType.Transaction) {
      return processTransactionRequest(message, remotePort);
    } else if (message.data.type === RequestType.SignTypedData) {
      return processSignTypedDataRequest(message, remotePort);
    } else if (message.data.type === RequestType.SignMessage) {
      return processSignMessageRequest(message, remotePort);
    }
  });
};

Browser.runtime.onConnect.addListener(setupRemoteConnection);

const processTransactionRequest = async (
  message: any,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);

  remotePort.postMessage({ id: message.id, data: true });
};

const processSignTypedDataRequest = async (
  message: any,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  remotePort.postMessage({ id: message.id, data: true });
};

const processSignMessageRequest = async (
  message: any,
  remotePort: Browser.Runtime.Port
) => {
  console.log(message);
  remotePort.postMessage({ id: message.id, data: true });
};
