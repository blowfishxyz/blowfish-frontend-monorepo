import { logger } from "@blowfish/utils/logger";
import type {
  SolanaSignTransactionRequest,
  UserDecisionResponse,
} from "@blowfish/utils/types";
import type { WindowPostMessageStream } from "@metamask/post-message-stream";
import { WalletSignTransactionError } from "@solana/wallet-adapter-base";
import type { Transaction, VersionedTransaction } from "@solana/web3.js";

import {
  createSolanaSignTransactionRequestMessage,
  sendAndAwaitResponseFromStream,
} from "~utils/messages";

export async function signTransactionsHandler(
  stream: WindowPostMessageStream,
  txns: (Transaction | VersionedTransaction)[],
  publicKey: string
) {
  try {
    const transactions = txns.map((tx) =>
      Buffer.from(
        tx.serialize({ verifySignatures: false, requireAllSignatures: false })
      ).toString("base64")
    );

    const response = await sendAndAwaitResponseFromStream<
      SolanaSignTransactionRequest,
      UserDecisionResponse
    >(
      stream,
      createSolanaSignTransactionRequestMessage({ transactions }, publicKey)
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
