import { Buffer } from "buffer";
import { VerifyErrorFactory } from "./error";

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
  errFactory: VerifyErrorFactory
) {
  if (a !== b) {
    throw errFactory();
  }
}

export function assertWithinSlippage(
  val: number,
  expectedVal: number,
  slippage: number,
  errFactory: VerifyErrorFactory
) {
  const upperBoundary = expectedVal * (1 + slippage);

  if (val > upperBoundary) {
    throw errFactory();
  }
}

export function assertTruthy<T>(
  val: T,
  errFactory: VerifyErrorFactory
): asserts val is NonNullable<T> {
  if (!val) {
    throw errFactory();
  }
}

export function assertFalsy<T>(val: T, errFactory: VerifyErrorFactory) {
  if (val) {
    throw errFactory();
  }
}

export function assertKeysEq(
  a: SimpleTransactionInstruction["keys"],
  b: SimpleTransactionInstruction["keys"],
  errFactory: VerifyErrorFactory
) {
  if (a.length !== b.length) {
    throw errFactory();
  }

  for (const [i, acc] of a.entries()) {
    assertEq(acc.pubkey.toString(), b[i]!.pubkey.toString(), errFactory);
    assertEq(acc.isSigner, b[i]!.isSigner, errFactory);
    assertEq(acc.isWritable, b[i]!.isWritable, errFactory);
  }
}

export function assertInstructionsEq(
  a: SimpleTransactionInstruction,
  b: SimpleTransactionInstruction,
  errFactory: VerifyErrorFactory
) {
  assertEq(a.data.toString(), b.data.toString(), errFactory);
  assertEq(a.programId.toString(), b.programId.toString(), errFactory);
  assertKeysEq(a.keys, b.keys, errFactory);
}
