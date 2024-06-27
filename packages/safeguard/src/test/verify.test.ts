import { describe, expect, it } from "vitest";
import { VERIFY_ERROR, verifyTransaction } from "../verify";
import {
  clusterApiUrl,
  Connection,
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
  const conn = new Connection(clusterApiUrl("mainnet-beta"), {});

  describe("verifyTransaction", () => {
    it("should not throw an error for a valid transaction", async () => {
      const txB58 = bs58.encode(createMockTransfer());

      await verifyTransaction(conn, txB58, expectedSafeGuard, {
        solUsdRate: 130,
      });
    });

    it("should work for base64 encoded transactions", async () => {
      await verifyTransaction(
        conn,
        createMockTransfer().toString("base64"),
        expectedSafeGuard,
        {
          solUsdRate: 130,
        }
      );
    });

    it("should work for a transaction that requires table look up", async () => {
      await verifyTransaction(
        conn,
        "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAHCmXzeBE2ppKayZ3ZuAWoZmcZxQEQerYiwwljmJiTPyDIkgnCcPm5jBk8TXzTn9ocpkkuW8cQb/6622yjmy+FisCmQJ9bB0Yd7Tjhsr0SQjL7sC8EgKDRSqeoOx2zYqHIfQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwZGb+UhFzL/7K26csOb57yM5bvF9xJrLEObOkAAAAAEedVb8jHAbu50xW7OaBUH/bGy3qP0jlECsc2iVrwTjwbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpjJclj04kifG7PRApFI4NgwtaE5na/xCEBI572Nvp+Fm0P/on9df2SnTAmx8pWHneSwmrNt/J3VFLMhqns4zl6Ozy5APOLaSsSaSYc78LPyOEerk+lZgkvyBFIExU/h7pA1hAatBiXldBKtxGwr4OXEVdNhaAZuq0etj/1dmMZiAIBAAFAkMkAgAEAAkDBwAAAAAAAAAHBgABAA0DBgEBAwIAAQwCAAAA4MgQAAAAAAAGAQEBEQcGAAIACQMGAQEFGwYAAQIFCQUIBQ8GDA4MCgsMDAwMDAwMDAECACPlF8uXeuOtKgEAAAAHZAAB4MgQAAAAAABJLnucIwsAACwBAAYDAQAAAQkBkoPldtsxFhSiqZM0HmbwrfUa4ajoMtIfiR5rbzOBu0wDNjczAw4EAQ==",
        "DGLkow2k4v6NTDWkDJw7Tvp5fgLPnp66HgVH3fWEU233fRt3Qr4y7mrrGp3EPWvFW6yq7PuNSNpNWjJLA27V2vSQtZEYj7iAc61fS1FVnA5hmp1S3CscpZQLvdAKUsCcZ7vmwPUkCDbwHHWnQykssP2xWeVwSkHXP4Jb3mdwACevQugbbupVr4Ju9ckCw4PicX6nnttw2eR8WSuMi214NWa7trEtnhUe83hP9E28CtDqs4ggPb2ovFf74ERAz84dKZKtEDZHh5G6mGivbdmrKrEtCc5gzrJoj1PNfEPyEkA4GBLp9rYMUimyW9Kb5x2LS7u22nrpNz3gJyGX6NKWxEWk8APgnuP7jNH9pXJNywmcYmN1G9rjyiN2xmcReYoAYQk2J1QyLWLdRXpEDh36e9QCEj8JAkMfBxHeKVK79TQxz6pNbTgCRBomkRmAtTTfs716Sdb4cBE4kfqQrbrNbvsUkUbaq8LkfmmfGdEuAAVeg86KAWV3thB8GDuki7isqUVaxZDhTeenTNtios1rtQnvvERd8CpXR1uo7ScNWi2PskxcpMiK1gNSFoSeTnqnBQYEmecLaMsUSuH7aUVUv29MSTvyDxfgwXXDxoKducuRTTS45NKAzb4t6NWqWxTxsxV3othHQJu7c1uEpchFuooSDH82L7hXUatGbXXGMafznQo5KLpHkCRUbqR13ug6eemo4ZpcRUmZLykW6nRsie7MW3Y23ofeFm366gWvSqiwy7DoyyqFgHPMwCLk6Mwz6Q4WrHD3oqxs48bQcifbmW1UvWtjXneKHxq9aviciZAGDSNwNzocTk3XMSvfKZ8jiPyi6xAaJ5MJrhWr62eWK6gPQEYzFbdoGwx77NPjt5DT6QU7QrQ7cAKEkRVC4crFTTeFEX5YUXNEi2XtAbi7XT816Zga4YNBdSKkhp7bgVWGEBADWrW4PeipSDiTStBi3AfVmF5EF2",
        {
          solUsdRate: 130,
        }
      );
    });

    it("should throw an error if fee is too high", async () => {
      return expect(() =>
        verifyTransaction(
          conn,
          createMockTransfer().toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
            blowfishFeeInUsd: 0.00001,
          }
        )
      ).rejects.toThrowError(VERIFY_ERROR.FEE_MISMATCH);
    });

    it("should throw an error if instructions do not match", async () => {
      return expect(() =>
        verifyTransaction(
          conn,
          createMockTransfer(1234).toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
          }
        )
      ).rejects.toThrowError(VERIFY_ERROR.INSTRUCTION_MISSMATCH);
    });

    it("should throw an error if instructions are missing Blowfish service fee", async () => {
      return expect(() =>
        verifyTransaction(
          conn,
          createMockTransfer().toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
            blowfishServiceFeeAccount: "RandomAccountThatDoesNotExistOnSolana",
          }
        )
      ).rejects.toThrowError(VERIFY_ERROR.MISSING_BLOWFISH_FEE);
    });

    it("should throw an error if instructions are calling a different program than Lighthouse", async () => {
      return expect(() =>
        verifyTransaction(
          conn,
          createMockTransfer().toString("base64"),
          expectedSafeGuard,
          {
            solUsdRate: 130,
            lightHouseId: "RandomAccountThatDoesNotExistOnSolana",
          }
        )
      ).rejects.toThrowError(VERIFY_ERROR.UNKNOWN_PROGRAM_INTERACTION);
    });
  });
});
