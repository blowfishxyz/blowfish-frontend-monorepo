export enum VerifyErrorKind {
  INSTRUCTION_MISSMATCH = "INSTRUCTION_MISSMATCH",
  UNKNOWN_PROGRAM_INTERACTION = "UNKNOWN_PROGRAM_INTERACTION",
  MISSING_BLOWFISH_FEE = "MISSING_BLOWFISH_FEE",
  MISSING_LIGHTHOUSE_PROGRAM_CALL = "MISSING_LIGHTHOUSE_PROGRAM_CALL",
  FEE_MISMATCH = "FEE_MISMATCH",
  TX_COUNT_MISMATCH = "TX_COUNT_MISMATCH",
}

export class VerifyError extends Error {
  public kind: VerifyErrorKind;
  public meta?: object;

  constructor(kind: VerifyErrorKind, message: string, meta?: object) {
    const messageParts = [message];

    if (meta) {
      messageParts.push(JSON.stringify(meta));
    }

    super(messageParts.join(":"));

    this.meta = meta;
    this.kind = kind;
  }
}

export type CreateVerifyError = (...args: any[]) => VerifyError;

export const VERIFY_ERROR = {
  INSTRUCTION_MISSMATCH: () =>
    new VerifyError(
      VerifyErrorKind.INSTRUCTION_MISSMATCH,
      "Instructions do not match the initial transaction"
    ),
  UNKNOWN_PROGRAM_INTERACTION: (unknownProgramId?: string) =>
    new VerifyError(
      VerifyErrorKind.UNKNOWN_PROGRAM_INTERACTION,
      "Instruction is attempting to interact with an unknown program",
      { programId: unknownProgramId }
    ),
  MISSING_BLOWFISH_FEE: () =>
    new VerifyError(
      VerifyErrorKind.MISSING_BLOWFISH_FEE,
      "Instructions are missing Blowfish service fee"
    ),
  MISSING_LIGHTHOUSE_PROGRAM_CALL: () =>
    new VerifyError(
      VerifyErrorKind.MISSING_LIGHTHOUSE_PROGRAM_CALL,
      "Instructions are missing Lighthouse program call"
    ),
  FEE_MISMATCH: () =>
    new VerifyError(
      VerifyErrorKind.FEE_MISMATCH,
      "Fee does not match the expected Blowfish service fee"
    ),
  TX_COUNT_MISMATCH: () =>
    new VerifyError(
      VerifyErrorKind.TX_COUNT_MISMATCH,
      "There are more original transactions than Safeguard transactions"
    ),
} satisfies Record<VerifyErrorKind, CreateVerifyError>;
