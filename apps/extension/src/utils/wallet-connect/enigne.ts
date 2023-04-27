import { logger } from "@blowfish/utils/logger";
import type {
  SignMessageRequest,
  SignTypedDataRequest,
  TransactionRequest,
  UserDecisionResponse,
} from "@blowfish/utils/types";

import {
  EthereumSignTypedDataRequest,
  enhanceSignTypedData,
  shouldForwardToWallet,
  stream,
} from "~injected/proxy-window-evm";
import {
  createSignMessageRequestMessage,
  createSignTypedDataRequestMessage,
  createTransactionRequestMessage,
  sendAndAwaitResponseFromStream,
} from "~utils/messages";
import { generateEncryptedPayloadV1 } from "~utils/wallet-connect/crypto";
import { loadSubscriptionFromLocalStorage } from "~utils/wallet-connect/localStorage";
import {
  generateErrorRpcResponse,
  getChainId,
  getUserAccount,
} from "~utils/wallet-connect/utils";

import type {
  DecryptedMessageV1,
  DecryptedMessageV2,
  Subscription,
} from "./types";

export const handleRequest = async (
  data: string,
  decryptedMessage: DecryptedMessageV2,
  topic: string,
  pendingRequests: Set<number>,
  sendToSocket: (data: string) => void
) => {
  logger.debug("handleRequestV2", decryptedMessage);
  const chainId = getChainId(decryptedMessage.params.chainId);
  const userAccount = getUserAccount();
  const subscriptions = loadSubscriptionFromLocalStorage();
  const topicId = subscriptions.find(
    (subscription: Subscription) => subscription.topic === topic
  )?.id;

  if (!chainId || !userAccount || !topicId) return sendToSocket(data);
  pendingRequests.add(decryptedMessage.id);

  const { method, params } = decryptedMessage.params.request;

  if (method === "eth_sendTransaction") {
    // todo
  }
  if (
    method === "eth_signTypedData" ||
    method === "eth_signTypedData_v1" ||
    method === "eth_signTypedData_v3" ||
    method === "eth_signTypedData_v4"
  ) {
    // todo
  }
  if (method === "eth_sign" || method === "personal_sign") {
    const [first, second] = params ?? [];
    if (!first || !second) return sendToSocket(data);
    //
    // if the first parameter is the address, the second is the message, otherwise the first is the message
    const message =
      String(first).replace(/0x/, "").length === 40 ? second : first;

    sendAndAwaitResponseFromStream<SignMessageRequest, UserDecisionResponse>(
      stream,
      createSignMessageRequestMessage({ method, message }, chainId, userAccount)
    )
      .then((response) => ({ response, chainId }))
      .then(({ response, chainId }) => {
        const isConfirmedPersonalSign =
          response.data.isOk && method === "personal_sign";
        if (
          shouldForwardToWallet(response, chainId) ||
          isConfirmedPersonalSign
        ) {
          sendToSocket(data);
          return;
        }

        logger.debug(response);
        const { isOk } = response.data;
        if (isOk) {
          sendToSocket(data);
          return;
        } else {
          // const rpcResponse = {
          //   id: decryptedMessage.id,
          //   jsonrpc: "2.0",
          //   error: {
          //     message: "User rejected the request",
          //     code: -32000,
          //   },
          // };
          //
          // const encodedMessage = this.encodeMessage(topic, rpcResponse);
          // console.log(socketMessage);
          // this.broadcast(JSON.stringify(socketMessage));
          //
          // throw new Error(JSON.stringify(rpcResponse));

          const socketMessage = {
            id: decryptedMessage.id,
            jsonrpc: "2.0",
            method: "irn_subscription",
            params: {
              id: topicId,
              data: {
                topic,
                message:
                  "ANbufhcAX83qJ34s9dx2sW/HXYH8padeKiv4pJC39LnQD7VqUMNclHWTzL+BHTrvC57NWXBuWqowUsLNnQgaPUgqgC52vTEFSykc8CBjTd2UJIU5HRpHMYiq+hjDEhDC7DOPUlsQnFmf6uUuRdtW7ANEPrD8uQ==",
                publishedAt: Date.now(),
                //
                tag: 1109,
              },
            },
          };

          sendToSocket(JSON.stringify(socketMessage));
        }
      });
  }
};

export const handleRequestV1 = async (
  data: string,
  decryptedMessage: DecryptedMessageV1,
  chainId: number,
  userAccount: string,
  topic: string,
  key: string,
  sendToSocket: (data: string) => void,
  broadcast: (data: string) => void
) => {
  logger.debug("handleRequestV1", decryptedMessage);
  const { method, params } = decryptedMessage;

  if (method === "eth_sendTransaction") {
    const [transaction] = params ?? [];
    if (!transaction) return sendToSocket(data);

    sendAndAwaitResponseFromStream<TransactionRequest, UserDecisionResponse>(
      stream,
      createTransactionRequestMessage(transaction, chainId, userAccount)
    )
      .then((response) => ({ response, chainId, userAccount }))
      .then(async ({ response, chainId }) => {
        if (shouldForwardToWallet(response, chainId)) {
          sendToSocket(data);
          return;
        }

        logger.debug(response);
        const { isOk } = response.data;
        if (isOk) {
          sendToSocket(data);
          return;
        } else {
          const encryptedPayload = await generateEncryptedPayloadV1(
            JSON.stringify(
              generateErrorRpcResponse(
                decryptedMessage.id,
                "User denied transaction signature."
              )
            ),
            key
          );
          broadcast(
            JSON.stringify({
              payload: JSON.stringify(encryptedPayload),
              topic,
              silent: false,
              type: "pub",
            })
          );
          return;
        }
      });
  } else if (
    method === "eth_signTypedData" ||
    method === "eth_signTypedData_v1" ||
    method === "eth_signTypedData_v3" ||
    method === "eth_signTypedData_v4"
  ) {
    const { signTypedDataVersion, typedData, address } = enhanceSignTypedData(
      decryptedMessage as EthereumSignTypedDataRequest
    );
    if (!address || !typedData) return sendToSocket(data);

    sendAndAwaitResponseFromStream<SignTypedDataRequest, UserDecisionResponse>(
      stream,
      createSignTypedDataRequestMessage(
        {
          payload: typedData,
          signTypedDataVersion,
        },
        userAccount,
        chainId
      )
    )
      .then((response) => ({ response, chainId, userAccount }))
      .then(async ({ response, chainId }) => {
        if (shouldForwardToWallet(response, chainId)) {
          return sendToSocket(data);
        }

        logger.debug(response);
        const isOk = response.data.isOk;
        if (isOk) {
          return sendToSocket(data);
        } else {
          const encryptedPayload = await generateEncryptedPayloadV1(
            JSON.stringify(
              generateErrorRpcResponse(
                decryptedMessage.id,
                "User denied message signature."
              )
            ),
            key
          );

          broadcast(
            JSON.stringify({
              payload: JSON.stringify(encryptedPayload),
              topic,
              silent: false,
              type: "pub",
            })
          );
          return;
        }
      });
  } else if (method === "eth_sign" || method === "personal_sign") {
    const [first, second] = params ?? [];
    if (!first || !second) return sendToSocket(data);
    //
    // if the first parameter is the address, the second is the message, otherwise the first is the message
    const message =
      String(first).replace(/0x/, "").length === 40 ? second : first;

    sendAndAwaitResponseFromStream<SignMessageRequest, UserDecisionResponse>(
      stream,
      createSignMessageRequestMessage({ method, message }, chainId, userAccount)
    )
      .then((response) => ({ response, chainId }))
      .then(async ({ response, chainId }) => {
        const isConfirmedPersonalSign =
          response.data.isOk && method === "personal_sign";
        if (
          shouldForwardToWallet(response, chainId) ||
          isConfirmedPersonalSign
        ) {
          return sendToSocket(data);
        }

        logger.debug(response);
        const { isOk } = response.data;
        if (isOk) {
          return sendToSocket(data);
        } else {
          const encryptedPayload = await generateEncryptedPayloadV1(
            JSON.stringify(
              generateErrorRpcResponse(
                decryptedMessage.id,
                "User denied message signature."
              )
            ),
            key
          );

          broadcast(
            JSON.stringify({
              payload: JSON.stringify(encryptedPayload),
              topic,
              silent: false,
              type: "pub",
            })
          );
          return;
        }
      });
  } else {
    sendToSocket(data);
  }
};
