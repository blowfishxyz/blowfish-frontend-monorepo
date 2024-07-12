import { Buffer } from "buffer";
import { CreateVerifyError } from "./error";

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

export function assertEq(
  a: Primitive,
  b: Primitive,
  createErr: CreateVerifyError
) {
  if (a !== b) {
    throw createErr();
  }
}

export function assertWithinSlippage(
  val: number,
  expectedVal: number,
  slippage: number,
  createErr: CreateVerifyError
) {
  const upperBoundary = expectedVal * (1 + slippage);

  if (val > upperBoundary) {
    throw createErr();
  }
}

export function assertTruthy<T>(
  val: T,
  createErr: CreateVerifyError
): asserts val is NonNullable<T> {
  if (!val) {
    throw createErr();
  }
}

export function assertFalsy<T>(val: T, createErr: CreateVerifyError) {
  if (val) {
    throw createErr();
  }
}

export function assertKeysEq(
  a: SimpleTransactionInstruction["keys"],
  b: SimpleTransactionInstruction["keys"],
  createErr: CreateVerifyError
) {
  if (a.length !== b.length) {
    throw createErr();
  }

  for (const [i, acc] of a.entries()) {
    assertEq(acc.pubkey.toString(), b[i]!.pubkey.toString(), createErr);
    assertEq(acc.isSigner, b[i]!.isSigner, createErr);
    assertEq(acc.isWritable, b[i]!.isWritable, createErr);
  }
}

export function assertInstructionsEq(
  a: SimpleTransactionInstruction,
  b: SimpleTransactionInstruction,
  createErr: CreateVerifyError
) {
  assertEq(a.data.toString(), b.data.toString(), createErr);
  assertEq(a.programId.toString(), b.programId.toString(), createErr);
  assertKeysEq(a.keys, b.keys, createErr);
}
