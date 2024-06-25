import { AccountMeta, TransactionInstruction } from "@solana/web3.js";

type Primitive = string | number | boolean | null | undefined;

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

export function assertKeysEq(a: AccountMeta[], b: AccountMeta[], err: string) {
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
  a: TransactionInstruction,
  b: TransactionInstruction,
  err: string
) {
  assertEq(a.data.toString(), b.data.toString(), err);
  assertEq(a.programId.toString(), b.programId.toString(), err);
  assertKeysEq(a.keys, b.keys, err);
}
