// NOTE: This logic has been borrowed from RevokeCash/browser-extension and modified
// See https://github.com/RevokeCash/browser-extension/blob/d49f1de92003681b9e768782f54e734a52a5d975/src/injected/proxy-window-ethereum.tsx
// The RevokeCash/browser-extension code is MIT licensed

import { logger } from "@blowfish/utils/logger";
import {
  BlowfishOption,
  BlowfishOptionKeyValue,
  Identifier,
  Message,
  RequestType,
} from "@blowfish/utils/types";
import { WindowPostMessageStream } from "@metamask/post-message-stream";
import type { Transaction, VersionedTransaction } from "@solana/web3.js";
import { providers } from "ethers";

import { IS_IMPERSONATION_AVAILABLE } from "~config";
import { requestHandler, sendAsyncHandler } from "~utils/evm-proxy-handlers";
import { solanaHandler } from "~utils/solana-proxy-handlers";

declare let window: Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethereum?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  solana?: any;
};

const stream = new WindowPostMessageStream({
  name: Identifier.Inpage,
  target: Identifier.ContentScript,
});

let requestProxy: undefined | typeof Proxy;
let sendProxy: undefined | typeof Proxy;
let sendAsyncProxy: undefined | typeof Proxy;

let impersonatingAddress: string | undefined;

const overrideIfNotProxied = () => {
  if (
    window.ethereum &&
    (window.ethereum.request !== requestProxy ||
      window.ethereum.send !== sendProxy ||
      window.ethereum.sendAsync !== sendAsyncProxy)
  ) {
    logger.debug("Reproxying window.ethereum");
    overrideWindowEthereum();
  }
};

const overrideWindowEthereum = () => {
  if (!window.ethereum) return;

  clearInterval(overrideInterval);
  // Recheck that we are still proxying window.ethereum every 10 seconds
  setInterval(overrideIfNotProxied, 10_000);

  const provider = new providers.Web3Provider(window.ethereum, "any");

  const sendHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: (target: any, thisArg: any, argumentsList: any[]) => {
      const [payloadOrMethod, callbackOrParams] = argumentsList;
      const forwardToWallet = () =>
        Reflect.apply(target, thisArg, argumentsList);

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
        return forwardToWallet();
      }

      // ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
      // > gets handled like ethereum.sendAsync
      return window.ethereum.sendAsync(payloadOrMethod, callbackOrParams);
    },
  };

  const sendAsyncProxyHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: (target: any, thisArg: any, argumentsList: any[]) => {
      const [request, callback] = argumentsList;
      const forwardToWallet = () =>
        Reflect.apply(target, thisArg, argumentsList);
      sendAsyncHandler({
        request,
        forwardToWallet,
        stream,
        provider,
        callback,
      });
    },
  };

  const requestProxyHandler = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apply: async (target: any, thisArg: any, argumentsList: any[]) => {
      const [request] = argumentsList;
      const forwardToWallet = () =>
        Reflect.apply(target, thisArg, argumentsList);

      const res = await requestHandler({
        request,
        forwardToWallet,
        stream,
        provider,
        impersonatingAddress,
      });

      return res;
    },
  };

  requestProxy = new Proxy(window.ethereum.request, requestProxyHandler);
  sendProxy = new Proxy(window.ethereum.send, sendHandler);
  sendAsyncProxy = new Proxy(window.ethereum.sendAsync, sendAsyncProxyHandler);

  // NOTE(kimpers): Some wallets try to protect the properties of window.ethereum
  // by setting them to read-only, using Object.defineProperty circumvents that
  Object.defineProperty(window.ethereum, "request", {
    value: requestProxy,
    writable: false,
  });
  Object.defineProperty(window.ethereum, "send", {
    value: sendProxy,
    writable: false,
  });
  Object.defineProperty(window.ethereum, "sendAsync", {
    value: sendAsyncProxy,
    writable: false,
  });
};

if (IS_IMPERSONATION_AVAILABLE) {
  stream.on(
    "data",
    async (
      message: Message<RequestType.BlowfishOptions, BlowfishOptionKeyValue>
    ) => {
      // Set the impersonating address on window to be used on eth_requestAccounts and eth_accounts
      if (
        message.type === RequestType.BlowfishOptions &&
        message.data.key ===
          BlowfishOption.PREFERENCES_BLOWFISH_IMPERSONATION_WALLET
      ) {
        impersonatingAddress = message.data.value;
        if (impersonatingAddress) {
          window.ethereum.selectedAddress = impersonatingAddress;
        }
      }
    }
  );
}

const overrideInterval = setInterval(overrideWindowEthereum, 100);
overrideWindowEthereum();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let signTransactionProxy: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signAllTransactionsProxy: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signAndSendTransactionProxy: any;

const overrideIfNotProxiedSolana = () => {
  if (
    window.solana &&
    (window.solana.signAllTransactions !== signAllTransactionsProxy ||
      window.solana.signTransaction !== signTransactionProxy)
  ) {
    logger.debug("Reproxying window.solana");
    overrideWindowSolana();
  }
};

const overrideWindowSolana = () => {
  if (!window.solana) return;

  logger.debug("overrideWindowSolana");

  function createProxyHandler(
    method: "sign" | "signAndSend",
    multipleTxns: boolean
  ) {
    return {
      apply: async (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        target: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        thisArg: any,
        argumentsList: [
          | (Transaction | VersionedTransaction)[]
          | (Transaction | VersionedTransaction)
        ]
      ) => {
        const debugMethod = multipleTxns
          ? `${method}AllTransactions`
          : `${method}Transaction`;
        logger.info(`${debugMethod} handler `, argumentsList);
        const [firstArg, ...restArgs] = argumentsList;
        const transactions = Array.isArray(firstArg) ? firstArg : [firstArg];

        try {
          const nextTxns = await solanaHandler(
            stream,
            transactions,
            window.solana.publicKey.toString(),
            method
          );
          const txnOrTxns = multipleTxns ? nextTxns : nextTxns[0];
          const newArgs = [txnOrTxns, ...restArgs];
          return Reflect.apply(target, thisArg, newArgs);
        } catch (err) {
          logger.error(`Failed to ${method} all transactions`, err);
          throw err;
        }
      },
    };
  }

  signTransactionProxy = new Proxy(
    window.solana.signTransaction,
    createProxyHandler("sign", false)
  );

  Object.defineProperty(window.solana, "signTransaction", {
    value: signTransactionProxy,
    writable: false,
  });

  signAllTransactionsProxy = new Proxy(
    window.solana.signAllTransactions,
    createProxyHandler("sign", true)
  );

  Object.defineProperty(window.solana, "signAllTransactions", {
    value: signAllTransactionsProxy,
    writable: false,
  });

  signAndSendTransactionProxy = new Proxy(
    window.solana.signAndSendTransaction,
    createProxyHandler("signAndSend", false)
  );

  Object.defineProperty(window.solana, "signAndSendTransaction", {
    value: signAndSendTransactionProxy,
    writable: false,
  });
};

setInterval(overrideIfNotProxiedSolana, 10_000);
overrideWindowSolana();

logger.debug("proxy-window-objects.ts loaded");

export default {};
