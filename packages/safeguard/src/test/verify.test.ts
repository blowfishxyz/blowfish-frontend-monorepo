import { describe, expect, it } from "vitest";
import { VERIFY_ERROR, verifyTransaction } from "../verify";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";

const createMockTransfer = (lamports = LAMPORTS_PER_SOL / 1000) => {
  const fromPubkey = new PublicKey(
    "9kgEqg6r5cz8xWr2HjhRhMUU438DSGbHpzaZ7rEKcc3o"
  );
  const toPubkey = new PublicKey(
    "3ToMEVo2WZu29RW4Bh8GzQYEJTHVTMRaoH3ZxU4ni2ac"
  );

  const transferSolInstruction = SystemProgram.transfer({
    fromPubkey,
    toPubkey,
    lamports,
  });

  const tx = new Transaction().add(transferSolInstruction);

  tx.recentBlockhash = "4z98pNSg2Qait17iikUk5cHryTev5VpcJjjasacN7k8T";
  tx.feePayer = fromPubkey;

  return tx.serialize({
    verifySignatures: false,
    requireAllSignatures: false,
  });
};

const expectedSafeGuard =
  "7F4eCdp2uErMrDnuwhGjt24BjSy29pwH6gv3VFv8udmAqRgU5qoMPFSvu8ZybW5Kcpfcq29KbPEMvopyXthMf3PUEAiieYNbrkoxvPnqCaGSLmTVpZBWg4RerL81KSbGqV5BmrCYukpwhLNafamtymAHZnQGszAzBug58K6Dk1MF22AVJNxd7T31M1vvTDahB8Xw9c3gksTBtVZx2GAZYHZNX8M1tUHr69gPcHK5EGHF7LQDA1pU4mPt3L13xkxtT8edPmBw8UMRmk3c3jByYfTuCaM8ZUMqWGrj2MpNrY1tj2ZXnvUtNjLAM95dMWd3aPN23qhNeVCc7z6jsQgoJ4p5SLbMoefB2DU8u3yXR4RJhwfKrt9MHZmuuJhMLZccqeZ5pqbnoUvhe8h6MR1piaonygiLJXfUbmVC7LBkQ7NX";

describe("verify", () => {
  describe("verifyTransaction", () => {
    it("should not throw an error for a valid transaction", () => {
      const txB58 = bs58.encode(createMockTransfer());

      verifyTransaction(txB58, expectedSafeGuard, {
        solUsdRate: 130,
      });
    });

    it("should work for base64 encoded transactions", () => {
      verifyTransaction(
        createMockTransfer().toString("base64"),
        expectedSafeGuard,
        {
          solUsdRate: 130,
        }
      );
    });

    it("should throw an error if fee is too high", () => {
      expect(() =>
        verifyTransaction(
          createMockTransfer().toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
            blowfishFeeInUsd: 0.00001,
          }
        )
      ).toThrowError(VERIFY_ERROR.FEE_MISMATCH);
    });

    it("should throw an error if instructions do not match", () => {
      expect(() =>
        verifyTransaction(
          createMockTransfer(1234).toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
          }
        )
      ).toThrowError(VERIFY_ERROR.INSTRUCTION_MISSMATCH);
    });

    it("should throw an error if instructions are missing Blowfish service fee", () => {
      expect(() =>
        verifyTransaction(
          createMockTransfer().toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
            blowfishServiceFeeAccount: "RandomAccountThatDoesNotExistOnSolana",
          }
        )
      ).toThrowError(VERIFY_ERROR.MISSING_BLOWFISH_FEE);
    });

    it("should throw an error if instructions are calling a different program than Lighthouse", () => {
      expect(() =>
        verifyTransaction(
          createMockTransfer().toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
            lightHouseId: "RandomAccountThatDoesNotExistOnSolana",
          }
        )
      ).toThrowError(VERIFY_ERROR.UNKNOWN_PROGRAM_INTERACTION);
    });
  });
});
