import {
  LAMPORTS_PER_SOL,
  MessageCompiledInstruction,
  PublicKey,
  SystemInstruction,
  TransactionInstruction,
  VersionedTransaction,
} from "@solana/web3.js";

import {
  assertEq,
  assertInstructionsEq,
  assertTruthy,
  assertWithinSlippage,
  SimpleTransactionInstruction,
} from "./assert";
import { decodeRawTransaction } from "./decode";

export type VerifyConfig = {
  /**
   * The ID of the Lighthouse program, default to L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK
   * @see https://github.com/Jac0xb/lighthouse?tab=readme-ov-file#usage
   */
  lightHouseId: string;
  /**
   * The Blowfish service fee account, default to 5duLivVJZbwBveW66wFwCZSrovFQMSs8yekFKPZhJGRG
   */
  blowfishServiceFeeAccount: string;
  /**
   * The expected Blowfish service fee in USD, default to 0.01 = 1 cent
   */
  blowfishFeeInUsd: number;
  /**
   * The current SOL/USD rate, required to calculate the fee in USD
   */
  solUsdRate: number;
  /**
   * The fee slippage in percentage, default to 0.1 = 10%
   */
  feeSlippage: number;
};

export enum VERIFY_ERROR {
  RECENT_BLOCKHASH_MISSMATCH = "Recent blockhash does not match the initial transaction",
  INSTRUCTION_MISSMATCH = "Instructions do not match the initial transaction",
  UNKNOWN_PROGRAM_INTERACTION = "Instruction is attempting to interact with an unknown program",
  MISSING_BLOWFISH_FEE = "Instructions are missing Blowfish service fee",
  MISSING_LIGHTHOUSE_PROGRAM_CALL = "Instructions are missing Lighthouse program call",
  FEE_MISMATCH = "Fee does not match the expected Blowfish service fee",
}

export const DEFAULT_CONFIG: Omit<VerifyConfig, "solUsdRate"> = {
  blowfishFeeInUsd: 0.01, // 1 cent,
  blowfishServiceFeeAccount: "5duLivVJZbwBveW66wFwCZSrovFQMSs8yekFKPZhJGRG",
  feeSlippage: 0.1, // 10%,
  lightHouseId: "L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK",
};

type VerifyTransactionOptions = Partial<VerifyConfig> &
  Omit<VerifyConfig, keyof typeof DEFAULT_CONFIG>;

export function verifyTransaction(
  originalTxB58orB64: string,
  safeGuardTxB58orB64: string,
  options: VerifyTransactionOptions
) {
  const {
    lightHouseId,
    blowfishServiceFeeAccount,
    blowfishFeeInUsd,
    feeSlippage,
    solUsdRate,
  } = {
    ...DEFAULT_CONFIG,
    ...options,
  };

  const originalTx = VersionedTransaction.deserialize(
    decodeRawTransaction(originalTxB58orB64)
  );

  const safeGuardTx = VersionedTransaction.deserialize(
    decodeRawTransaction(safeGuardTxB58orB64)
  );

  assertEq(
    originalTx.message.recentBlockhash,
    safeGuardTx.message.recentBlockhash,
    VERIFY_ERROR.RECENT_BLOCKHASH_MISSMATCH
  );

  const originalIxs = decompileTransactionInstructions(originalTx);
  const safeGuardIxs = decompileTransactionInstructions(safeGuardTx);

  for (const [i, originalInstruction] of originalIxs.entries()) {
    const safeGuardInstruction = safeGuardIxs[i];

    assertTruthy(safeGuardInstruction, VERIFY_ERROR.INSTRUCTION_MISSMATCH);
    assertInstructionsEq(
      originalInstruction,
      safeGuardInstruction,
      VERIFY_ERROR.INSTRUCTION_MISSMATCH
    );
  }

  const restIxs = safeGuardIxs.slice(originalIxs.length);
  const feeIx = restIxs.pop();

  assertTruthy(feeIx, VERIFY_ERROR.MISSING_BLOWFISH_FEE);
  assertTruthy(
    restIxs.length > 0,
    VERIFY_ERROR.MISSING_LIGHTHOUSE_PROGRAM_CALL
  );

  const isCallingLighthouseOnly = restIxs.every(
    (ix) => ix.programId === lightHouseId
  );

  assertTruthy(
    isCallingLighthouseOnly,
    VERIFY_ERROR.UNKNOWN_PROGRAM_INTERACTION
  );

  // We can safely assume that the last instruction is the fee instruction
  // and the keys are not of type <ALTAddress>-<Index>
  const fee = SystemInstruction.decodeTransfer(
    new TransactionInstruction({
      keys: feeIx.keys.map((k) => ({
        pubkey: new PublicKey(k.pubkey),
        isSigner: k.isSigner,
        isWritable: k.isWritable,
      })),
      programId: new PublicKey(feeIx.programId),
      data: feeIx.data,
    })
  );

  const usdFee = (Number(fee.lamports) * solUsdRate) / LAMPORTS_PER_SOL;

  assertEq(
    fee.toPubkey.toBase58(),
    blowfishServiceFeeAccount,
    VERIFY_ERROR.MISSING_BLOWFISH_FEE
  );
  assertWithinSlippage(
    usdFee,
    blowfishFeeInUsd,
    feeSlippage,
    VERIFY_ERROR.FEE_MISMATCH
  );
}

function decompileTransactionInstructions(tx: VersionedTransaction) {
  return tx.message.compiledInstructions.map((ix) => unwrapIx(ix, tx));
}

function unwrapIx(
  ix: MessageCompiledInstruction,
  tx: VersionedTransaction
): SimpleTransactionInstruction {
  const accountKeys = [
    ...tx.message.staticAccountKeys.map((v) => v.toBase58()),
    // We avoid resolving ALTs here because it's an additional RPC call
    // We assume that if both txs are looking at the same ALT and at the same index, they are the same
    // https://solana.com/docs/advanced/lookup-tables
    ...tx.message.addressTableLookups.flatMap((a) =>
      a.writableIndexes.map((i) => `${a.accountKey.toBase58()}-${i}`)
    ),
    ...tx.message.addressTableLookups.flatMap((a) =>
      a.readonlyIndexes.map((i) => `${a.accountKey.toBase58()}-${i}`)
    ),
  ];

  const addressAtIndex = (index: number) => {
    const account = accountKeys[index];

    if (!account) {
      throw new Error(`Failed to get account at index ${index}`);
    }

    return account;
  };

  return {
    programId: addressAtIndex(ix.programIdIndex),
    data: Buffer.from(ix.data),
    keys: ix.accountKeyIndexes
      .map((i) => [addressAtIndex(i), i] as const)
      .map(([addr, i]) => ({
        pubkey: addr,
        isSigner: tx.message.isAccountWritable(i),
        isWritable: tx.message.isAccountWritable(i),
      })),
  };
}
