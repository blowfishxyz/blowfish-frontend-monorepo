import { logger } from "@blowfish/utils/logger";
import type {
  SolanaSignTransactionsRequest,
  UserDecisionResponse,
} from "@blowfish/utils/types";
import type { WindowPostMessageStream } from "@metamask/post-message-stream";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import type { Transaction, VersionedTransaction } from "@solana/web3.js";

import {
  createSolanaSignTransactionsMessage,
  sendAndAwaitResponseFromStream,
} from "~utils/messages";

export async function solanaHandler(
  stream: WindowPostMessageStream,
  txns: (Transaction | VersionedTransaction)[],
  publicKey: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  method: "sign" | "signAndSend"
) {
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
      return Promise.resolve();
    } else {
      throw new WalletSignTransactionError("User rejected the request");
    }
  } catch (e) {
    logger.error("Failed to sign transactions", e);
    throw new WalletSignTransactionError("User rejected the request");
  }
}
