/* eslint-disable @typescript-eslint/ban-ts-comment */
import { logger } from "@blowfish/utils/logger";
import type {
  SolanaSignTransactionsRequest,
  UserDecisionResponse,
} from "@blowfish/utils/types";
import type { WindowPostMessageStream } from "@metamask/post-message-stream";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import { Transaction, VersionedTransaction } from "@solana/web3.js";

import {
  createSolanaSignTransactionsMessage,
  sendAndAwaitResponseFromStream,
} from "~utils/messages";

import { decodeRawTransaction } from "./decode";

export async function solanaHandler(
  stream: WindowPostMessageStream,
  txns: (Transaction | VersionedTransaction)[],
  publicKey: string,
  method: "sign" | "signAndSend"
): Promise<(Transaction | VersionedTransaction)[]> {
  try {
    const transactions = txns.map((tx) =>
      Buffer.from(
        tx.serialize({ verifySignatures: false, requireAllSignatures: false })
      ).toString("base64")
    );

    const response = await sendAndAwaitResponseFromStream<
      SolanaSignTransactionsRequest,
      UserDecisionResponse
    >(
      stream,
      createSolanaSignTransactionsMessage({ transactions }, publicKey, method)
    );

    logger.debug("response", response);

    if (response.data.isOk) {
      if (
        "safeguardTransactions" in response.data &&
        response.data.safeguardTransactions
      ) {
        const deserializedSafeguardTxns =
          response.data.safeguardTransactions.map((rawTxn, i) => {
            // TODO: should we deserialize into legacy txn if it was passed?
            const txn = VersionedTransaction.deserialize(
              decodeRawTransaction(rawTxn)
            );
            const originalTxn = txns[i];
            // Hack: The recentBlockhash is wrong in safeguard txn
            if ("message" in originalTxn) {
              txn.message.recentBlockhash =
                // @ts-expect-error
                txns[i].message.recentBlockhash;
            } else if ("recentBlockhash" in originalTxn) {
              txn.message.recentBlockhash = originalTxn.recentBlockhash!;
            }

            return txn;
          });

        return Promise.resolve(deserializedSafeguardTxns);
      }
      return Promise.resolve(txns);
    } else {
      throw new WalletSignTransactionError("User rejected the request");
    }
  } catch (e) {
    logger.error("Failed to sign transactions", e);
    throw new WalletSignTransactionError("User rejected the request");
  }
}
