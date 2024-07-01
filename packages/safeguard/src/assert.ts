import { Buffer } from "buffer";
import { ComputeBudgetProgram } from "@solana/web3.js";

type Primitive = string | number | boolean | null | undefined;

export type SimpleTransactionInstruction = {
  programId: string;
  keys: Array<{
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
  }>;
  data: Buffer;
};

export function assertEq(a: Primitive, b: Primitive, err: string) {
  if (a !== b) {
    throw new Error(err);
  }
}

export function assertWithinSlippage(
  val: number,
  expectedVal: number,
  slippage: number,
  err: string
) {
  const upperBoundary = expectedVal * (1 + slippage);

  if (val > upperBoundary) {
    throw new Error(err);
  }
}

export function assertTruthy<T>(
  val: T,
  err: string
): asserts val is NonNullable<T> {
  if (!val) {
    throw new Error(err);
  }
}

export function assertKeysEq(
  a: SimpleTransactionInstruction["keys"],
  b: SimpleTransactionInstruction["keys"],
  err: string
) {
  if (a.length !== b.length) {
    throw new Error(err);
  }

  for (const [i, acc] of a.entries()) {
    assertEq(acc.pubkey.toString(), b[i]!.pubkey.toString(), err);
    assertEq(acc.isSigner, b[i]!.isSigner, err);
    assertEq(acc.isWritable, b[i]!.isWritable, err);
  }
}

export function assertInstructionsEq(
  a: SimpleTransactionInstruction,
  b: SimpleTransactionInstruction,
  err: string
) {
  // If both instructions are setting the compute unit limit, we can skip the data comparison
  // because SafeGuard might have an increased compute unit limit.
  if (
    isSetComputeUnitLimitInstruction(a) &&
    isSetComputeUnitLimitInstruction(b)
  ) {
    return;
  }

  assertEq(a.data.toString(), b.data.toString(), err);
  assertEq(a.programId.toString(), b.programId.toString(), err);
  assertKeysEq(a.keys, b.keys, err);
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
