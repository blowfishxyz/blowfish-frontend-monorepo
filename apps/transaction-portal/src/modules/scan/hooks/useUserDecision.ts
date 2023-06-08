import {
  isTransactionRequest,
  isSignTypedDataRequest,
  SignTypedDataVersion,
  isSignMessageRequest,
  DappRequest,
  Message,
} from "@blowfish/utils/types";
import {
  SendTransactionResult,
  prepareSendTransaction,
  sendTransaction,
  signTypedData,
} from "@wagmi/core";

import { useCallback } from "react";
import { logger } from "~utils/logger";
import { sendResult, sendAbort } from "~utils/messages";

export function useUserDecision({
  message,
  request,
  chainId,
}: {
  message: Message<DappRequest["type"], DappRequest>;
  request: DappRequest;
  chainId: number | undefined;
}) {
  const confirm =
    useCallback(async (): Promise<SendTransactionResult | void> => {
      if (!message) {
        logger.error("Error: Cannot proceed, no message to respond to ");
      }
      if (!request) {
        logger.error("Error: Cannot proceed, no request to respond to ");
      }

      logger.debug(request);

      if (isTransactionRequest(request)) {
        const { payload } = request;
        const { from, to, data, value, gas } = payload;
        const config = await prepareSendTransaction({
          request: {
            from,
            to,
            data: data ?? undefined,
            value: value || undefined,
            gasLimit: gas || undefined,
          },
          chainId,
        });
        try {
          const { hash, wait } = await sendTransaction(config);
          // TODO(kimpers): We need UI affordances for waiting for the tx to confirm
          logger.debug("tx hash", hash);
          await sendResult(message.id, hash);
          return { hash, wait };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          const errMessage = err.message || err.toString();
          if (/rejected request/i.test(errMessage)) {
            await sendAbort(message.id);
          } else {
            throw err;
          }
        }
      } else if (isSignTypedDataRequest(request)) {
        try {
          let signTypedMessage;

          if (request.signTypedDataVersion === SignTypedDataVersion.V1) {
            signTypedMessage = (await window.ethereum?.request({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              method: "eth_signTypedData" as any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              params: [request.payload, request.userAccount] as any,
            })) as unknown as string;
          } else {
            const { domain, types, message } = request.payload;

            signTypedMessage = await signTypedData({
              domain,
              types,
              value: message,
            });
          }

          logger.debug("signTypedMessage", signTypedMessage);
          await sendResult(message.id, signTypedMessage);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          const errMessage = err.message || err.toString();
          if (/rejected request/i.test(errMessage)) {
            await sendAbort(message.id);
          } else {
            throw err;
          }
        }
      } else if (isSignMessageRequest(request)) {
        const { payload } = request;
        if (payload.method === "personal_sign") {
          // NOTE: domain mismatch on SIWE, so we just pass the message back to the dapp
          logger.debug("personal_sign - send message back to dapp");
          await sendResult(message.id, payload.message);
        }
      } else {
        // TODO(kimpers): This should never happen
        logger.error("Unsupported operation ", request);
        alert("UNSUPPORTED OPERATION");
      }

      window.close();
    }, [message, request, chainId]);
  const reject = useCallback(async (): Promise<void> => {
    if (!message) {
      logger.error("Error: Cannot proceed, no message to respond to ");
    }
    if (!request) {
      logger.error("Error: Cannot proceed, no request to respond to ");
    }

    logger.debug(request);

    await sendAbort(message.id);
    window.close();
  }, [message, request]);

  return {
    reject,
    confirm,
  };
}
