import {
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  MessageCompiledInstruction,
  PublicKey,
  SystemInstruction,
  TransactionInstruction,
  VersionedTransaction,
} from "@solana/web3.js";
import { Buffer } from "buffer";

import {
  assertEq,
  assertFalsy,
  assertInstructionsEq,
  assertTruthy,
  assertWithinSlippage,
  SimpleTransactionInstruction,
} from "./assert";
import { decodeRawTransaction } from "./decode";
import { VERIFY_ERROR } from "./error";

export type VerifyConfig = {
  /**
   * IDs of verified Lighthouse programs, default to ["L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK", "L2TExMFKdjpN9kozasaurPirfHy9P8sbXoAN1qA3S95"]
   * @see https://github.com/Jac0xb/lighthouse?tab=readme-ov-file#usage
   */
  lightHouseIds: string[];
  /**
   * The Blowfish service fee account, default to EPr6e66NYBKrP3u688U2VHmxdviUAV7FeRFWqfqZD9So
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

export const DEFAULT_CONFIG: Omit<VerifyConfig, "solUsdRate"> = {
  blowfishFeeInUsd: 0.01, // 1 cent,
  blowfishServiceFeeAccount: "EPr6e66NYBKrP3u688U2VHmxdviUAV7FeRFWqfqZD9So",
  feeSlippage: 0.1, // 10%,
  lightHouseIds: [
    "L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK",
    "L2TExMFKdjpN9kozasaurPirfHy9P8sbXoAN1qA3S95",
  ],
};

type VerifyTransactionOptions = Partial<VerifyConfig> &
  Omit<VerifyConfig, keyof typeof DEFAULT_CONFIG>;

export function verifyTransactions(
  originalTxsB58orB64: string[],
  safeGuardTxsB58orB64: string[],
  options: VerifyTransactionOptions
) {
  const {
    lightHouseIds,
    blowfishServiceFeeAccount,
    blowfishFeeInUsd,
    feeSlippage,
    solUsdRate,
  } = {
    ...DEFAULT_CONFIG,
    ...options,
  };

  const originalIxs = originalTxsB58orB64
    .map((tx) => VersionedTransaction.deserialize(decodeRawTransaction(tx)))
    .flatMap((tx) => decompileTransactionInstructions(tx));

  const safeGuardIxs = safeGuardTxsB58orB64
    .map((tx) => VersionedTransaction.deserialize(decodeRawTransaction(tx)))
    .flatMap((tx) => decompileTransactionInstructions(tx));

  for (const [i, originalInstruction] of originalIxs.entries()) {
    const safeGuardInstruction = safeGuardIxs[i];

    assertTruthy(safeGuardInstruction, VERIFY_ERROR.INSTRUCTION_MISSMATCH);

    // skip set compute unit limit instructions as safeguard can alter/append them
    if (
      isSetComputeUnitLimitInstruction(originalInstruction) ||
      isSetComputeUnitLimitInstruction(safeGuardInstruction)
    ) {
      continue;
    }

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

  const unknownProgramCall = restIxs.find(
    (ix) => !lightHouseIds.includes(ix.programId)
  );

  assertFalsy(
    unknownProgramCall,
    VERIFY_ERROR.UNKNOWN_PROGRAM_INTERACTION.bind(
      undefined,
      unknownProgramCall?.programId
    )
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

const DISCRIMINATOR_SET_COMPUTE_UNIT_LIMIT = 2;

function isSetComputeUnitLimitInstruction(
  instruction: SimpleTransactionInstruction
): boolean {
  return (
    instruction.programId === ComputeBudgetProgram.programId.toString() &&
    instruction.data[0] === DISCRIMINATOR_SET_COMPUTE_UNIT_LIMIT
  );
}
