// NOTE: This logic has been borrowed and modified from RevokeCash/browser-extension
// See https://raw.githubusercontent.com/RevokeCash/browser-extension/master/src/injected/proxy-window-ethereum.tsx
import { WindowPostMessageStream } from "@metamask/post-message-stream";
import { ethErrors } from "eth-rpc-errors";
import { providers } from "ethers";

import { Identifier } from "../types";
import {
  sendAndAwaitResponseFromStream,
  createTransactionRequestMessage,
  createSignTypedDataRequestMessage,
  createSignMessageRequestMessage,
} from "../utils/messages";

declare let window: Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum?: any;
};

const stream = new WindowPostMessageStream({
  name: Identifier.Inpage,
  target: Identifier.ContentScript,
});

const overrideWindowEthereum = () => {
  if (!window.ethereum) return;

  clearInterval(overrideInterval);

  const sendHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: (target: any, thisArg: any, argumentsList: any[]) => {
      const [payloadOrMethod, callbackOrParams] = argumentsList;

      // ethereum.send has three overloads:

      // ethereum.send(method: string, params?: Array<unknown>): Promise<JsonRpcResponse>;
      // > gets handled like ethereum.request
      if (typeof payloadOrMethod === "string") {
        return window.ethereum.request({
          method: payloadOrMethod,
          params: callbackOrParams,
        });
      }

      // ethereum.send(payload: JsonRpcRequest): unknown;
      // > cannot contain signature requests
      if (!callbackOrParams) {
        return Reflect.apply(target, thisArg, argumentsList);
      }

      // ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
      // > gets handled like ethereum.sendAsync
      return window.ethereum.sendAsync(payloadOrMethod, callbackOrParams);
    },
  };

  const sendAsyncHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: (target: any, thisArg: any, argumentsList: any[]) => {
      const [request, callback] = argumentsList;

      if (request?.method === "eth_sendTransaction") {
        const [transaction] = request?.params ?? [];
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        const provider = new providers.Web3Provider(window.ethereum);

        provider
          .getNetwork()
          .then(({ chainId }) =>
            sendAndAwaitResponseFromStream(
              stream,
              createTransactionRequestMessage(transaction, chainId)
            )
          )
          .then((response) => {
            console.log(response);
            const { isOk } = response.data;
            if (isOk) {
              return Reflect.apply(target, thisArg, argumentsList);
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "Blowfish Confirmation: User denied transaction signature."
              );
              const response = {
                id: request?.id,
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
            }
          });
      } else if (
        request?.method === "eth_signTypedData_v3" ||
        request?.method === "eth_signTypedData_v4"
      ) {
        const [address, typedDataStr] = request?.params ?? [];
        if (!address || !typedDataStr)
          return Reflect.apply(target, thisArg, argumentsList);

        const typedData = JSON.parse(typedDataStr);

        const provider = new providers.Web3Provider(window.ethereum);
        provider
          .getNetwork()
          .then(({ chainId }) =>
            sendAndAwaitResponseFromStream(
              stream,
              createSignTypedDataRequestMessage(typedData, chainId)
            )
          )
          .then((response) => {
            console.log(response);
            const isOk = response.data.isOk;
            if (isOk) {
              return Reflect.apply(target, thisArg, argumentsList);
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "Blowfish Confirmation: User denied message signature."
              );
              const response = {
                id: request?.id,
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
            }
          });
      } else if (
        request?.method === "eth_sign" ||
        request?.method === "personal_sign"
      ) {
        const [first, second] = request?.params ?? [];
        if (!first || !second)
          return Reflect.apply(target, thisArg, argumentsList);

        // if the first parameter is the address, the second is the message, otherwise the first is the message
        const message =
          String(first).replace(/0x/, "").length === 40 ? second : first;

        const provider = new providers.Web3Provider(window.ethereum);
        provider
          .getNetwork()
          .then(({ chainId }) =>
            sendAndAwaitResponseFromStream(
              stream,
              createSignMessageRequestMessage({ message }, chainId)
            )
          )
          .then((response) => {
            console.log(response);
            const { isOk } = response.data;
            if (isOk) {
              return Reflect.apply(target, thisArg, argumentsList);
            } else {
              const error = ethErrors.provider.userRejectedRequest(
                "Blowfish Confirmation: User denied message signature."
              );
              const response = {
                id: request?.id,
                jsonrpc: "2.0",
                error,
              };
              callback(error, response);
            }
          });
      } else {
        return Reflect.apply(target, thisArg, argumentsList);
      }
    },
  };

  const requestHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;

      if (request?.method === "eth_sendTransaction") {
        const [transaction] = request?.params ?? [];
        if (!transaction) return Reflect.apply(target, thisArg, argumentsList);

        const provider = new providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();

        const response = await sendAndAwaitResponseFromStream(
          stream,
          createTransactionRequestMessage(transaction, chainId)
        );

        console.log(response);
        const { isOk } = response.data;

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest(
            "Blowfish Confirmation: User denied transaction signature."
          );
        }
      } else if (
        request?.method === "eth_signTypedData_v3" ||
        request?.method === "eth_signTypedData_v4"
      ) {
        const [address, typedDataStr] = request?.params ?? [];
        if (!address || !typedDataStr)
          return Reflect.apply(target, thisArg, argumentsList);

        const typedData = JSON.parse(typedDataStr);

        const provider = new providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();

        const response = await sendAndAwaitResponseFromStream(
          stream,
          createSignTypedDataRequestMessage(typedData, chainId)
        );
        console.log(response);
        const { isOk } = response.data;

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest(
            "Blowfish Confirmation: User denied message signature."
          );
        }
      } else if (
        request?.method === "eth_sign" ||
        request?.method === "personal_sign"
      ) {
        const [first, second] = request?.params ?? [];
        if (!first || !second)
          return Reflect.apply(target, thisArg, argumentsList);

        // if the first parameter is the address, the second is the message, otherwise the first is the message
        const message =
          String(first).replace(/0x/, "").length === 40 ? second : first;

        const provider = new providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        const response = await sendAndAwaitResponseFromStream(
          stream,
          createSignMessageRequestMessage({ message }, chainId)
        );

        console.log(response);
        const { isOk } = response.data;

        if (!isOk) {
          throw ethErrors.provider.userRejectedRequest(
            "Blowfish Confirmation: User denied message signature."
          );
        }
      }

      return Reflect.apply(target, thisArg, argumentsList);
    },
  };

  const requestProxy = new Proxy(window.ethereum.request, requestHandler);
  const sendProxy = new Proxy(window.ethereum.send, sendHandler);
  const sendAsyncProxy = new Proxy(window.ethereum.sendAsync, sendAsyncHandler);

  window.ethereum.request = requestProxy;
  window.ethereum.send = sendProxy;
  window.ethereum.sendAsync = sendAsyncProxy;
};

const overrideInterval: NodeJS.Timer = setInterval(overrideWindowEthereum, 100);
overrideWindowEthereum();
