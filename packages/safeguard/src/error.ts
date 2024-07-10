export class VerifyError extends Error {
  public kind: string;
  public meta?: object;

  constructor(code: string, message: string, meta?: object) {
    const messageParts = [message];

    if (meta) {
      messageParts.push(JSON.stringify(meta));
    }

    super(messageParts.join(":"));

    this.meta = meta;
    this.kind = code;
  }
}

export type CreateVerifyError = (...args: any[]) => VerifyError;

export const VERIFY_ERROR = {
  INSTRUCTION_MISSMATCH: () =>
    new VerifyError(
      "INSTRUCTION_MISSMATCH",
      "Instructions do not match the initial transaction"
    ),
  UNKNOWN_PROGRAM_INTERACTION: (unknownProgramId?: string) =>
    new VerifyError(
      "UNKNOWN_PROGRAM_INTERACTION",
      "Instruction is attempting to interact with an unknown program",
      { programId: unknownProgramId }
    ),
  MISSING_BLOWFISH_FEE: () =>
    new VerifyError(
      "MISSING_BLOWFISH_FEE",
      "Instructions are missing Blowfish service fee"
    ),
  MISSING_LIGHTHOUSE_PROGRAM_CALL: () =>
    new VerifyError(
      "MISSING_LIGHTHOUSE_PROGRAM_CALL",
      "Instructions are missing Lighthouse program call"
    ),
  FEE_MISMATCH: () =>
    new VerifyError(
      "FEE_MISMATCH",
      "Fee does not match the expected Blowfish service fee"
    ),
} satisfies Record<string, CreateVerifyError>;
