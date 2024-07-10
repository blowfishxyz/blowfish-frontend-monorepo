import { describe, expect, it } from "vitest";
import { verifyTransactions } from "../verify";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import { VERIFY_ERROR } from "../error";

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
  "7F4eCdp2uErMrDnuwhGjt24BjSy29pwH6gv3VFv8udmAqRgU5qoMPFSvu8ZybW5Kcpfcq29KbPEMvopyXthMf3PUEAiieYNbrkoxvPnqCaGSLmTVpZBWg4RerL81KSbGqV5BmrCYukpwhLNafamtymAHZnQGszAzBug58K6Dk1MF22AVJNxd7TH7aRxEZfcQudj5sPnCD2Wm9w1mHymNz1w9qPUBbdjdmFFghTvt5ZD7nNnCybwFi2H5XiYQ783CckLvVzAqDjGn2zUymh1toujWegWZjPNLvebbWZwV5M6XtZBsgFPTnPTdxSYJSvjWnBTXZSSPR17HNMWBFa9EW6RMBudgsbjuCyHNeBZoJVqSwGyzooMtahkrifJJZSbw8sfZPHMmgdtGtEWEsDMi86vs4hpvPErfr9WvUmuLvakf";

describe("verify", () => {
  describe("verifyTransactions", () => {
    it("should not throw an error for a valid transaction", () => {
      const txB58 = bs58.encode(createMockTransfer());

      verifyTransactions([txB58], [expectedSafeGuard], {
        solUsdRate: 130,
      });
    });

    it("should work for base64 encoded transactions", () => {
      verifyTransactions(
        [createMockTransfer().toString("base64")],
        [expectedSafeGuard],
        {
          solUsdRate: 130,
        }
      );
    });

    it("should work for a transaction that requires table look up", () => {
      verifyTransactions(
        [
          "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAHCmXzeBE2ppKayZ3ZuAWoZmcZxQEQerYiwwljmJiTPyDIkgnCcPm5jBk8TXzTn9ocpkkuW8cQb/6622yjmy+FisCmQJ9bB0Yd7Tjhsr0SQjL7sC8EgKDRSqeoOx2zYqHIfQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwZGb+UhFzL/7K26csOb57yM5bvF9xJrLEObOkAAAAAEedVb8jHAbu50xW7OaBUH/bGy3qP0jlECsc2iVrwTjwbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpjJclj04kifG7PRApFI4NgwtaE5na/xCEBI572Nvp+Fm0P/on9df2SnTAmx8pWHneSwmrNt/J3VFLMhqns4zl6Ozy5APOLaSsSaSYc78LPyOEerk+lZgkvyBFIExU/h7pA1hAatBiXldBKtxGwr4OXEVdNhaAZuq0etj/1dmMZiAIBAAFAkMkAgAEAAkDBwAAAAAAAAAHBgABAA0DBgEBAwIAAQwCAAAA4MgQAAAAAAAGAQEBEQcGAAIACQMGAQEFGwYAAQIFCQUIBQ8GDA4MCgsMDAwMDAwMDAECACPlF8uXeuOtKgEAAAAHZAAB4MgQAAAAAABJLnucIwsAACwBAAYDAQAAAQkBkoPldtsxFhSiqZM0HmbwrfUa4ajoMtIfiR5rbzOBu0wDNjczAw4EAQ==",
        ],
        [
          "DGLkow2k4v6NTDWkDJw7Tvp5fgLPnp66HgVH3fWEU233fRt3Qr4y7mrrGp3EPWvFW6yq7PuNSNpNWjJLA27V2vSQtZEYj7iAc61fS1FVnA5hmp1S3CscpZQLvdAKUsCcZ7vmwPUkCDgpRoLaDbeyq9dQAYHR6VyPN12fFs5T9NT2dw5DmzbprRYN54ruRYBVguvjWKBBT85P7Bqn3w1wDYbwJNFMVd5bPRfKUBaKpGCR8z3Tgnu7XvbRXAfSmjpaBW6Mtwz2EA2b8TappGEkrBDJY4MDzFvPtHEpa6ighHtfQX3Wk89NGvBmqKpJvAupxiuk7BCusvaXEyk5yxTp9wzrU9bwE42aahQRtFKxXedmj8TpPM7BdAvXDx1CiAwVBjegJtycDqEX2fpRUpHqn2hBDWHCwm7QR9NyjbCnj7HXHXp9odoCoUqRYk9KegqsF43XHGBz9kEy6rBqsn9LoAPVJQvi3K7cPd7MFGtZxkRU94RQRT8tYtYEstiNYuyvEe2egxsXmnpxiBmtzh5aHZJUJG4AycaULcG8uUi21WH1J8AtLmGzeub3UFgJGz3fiJ6ox8dNidp5Qnbp5ZRKgyFJvRzwwEAhQ9Rgca1nZnseSvJCA3cRPnut6nRmz15WWeFFGrBtPH31CZWCe6TQ7Fo2pxLXp8Jax3hLEbQ86e27EwZnokFNkk8Jotr1agferdgSVTmgY5HTSJQ9QyN7DRHZikKhDSMkLBJ49JkazgFvVEnuhwgsMwsS5brdTUA5VKR4yJL6GKKkpg6Qs4kQPCWVWF7Gu44DheFfnx2rWdknaCvUma5cfRt7rzwoC3ygbe5km8MFVbrSEBRKUG1L3mavMgxe7ZKX1Y9xqNJe1uJdH3FUk3MuYdQM3w2zTnYLE4m6rE1MrSGGT9wLbgoijbzst23JDHoGEkRyLHhwbKUFwSWerUyDtVP1H8YLBRgu66KX3hE9jN",
        ],
        {
          solUsdRate: 130,
        }
      );
    });

    it("should throw an error if fee is too high", () => {
      expect(() =>
        verifyTransactions(
          [createMockTransfer().toString("base64")],
          [expectedSafeGuard],
          {
            solUsdRate: 130,
            blowfishFeeInUsd: 0.00001,
          }
        )
      ).toThrowError(VERIFY_ERROR.FEE_MISMATCH());
    });

    it("should throw an error if instructions do not match", () => {
      expect(() =>
        verifyTransactions(
          [createMockTransfer(1234).toString("base64")],
          [expectedSafeGuard],
          {
            solUsdRate: 130,
          }
        )
      ).toThrowError(VERIFY_ERROR.INSTRUCTION_MISSMATCH());
    });

    it("should throw an error if instructions are missing Blowfish service fee", () => {
      expect(() =>
        verifyTransactions(
          [createMockTransfer().toString("base64")],
          [expectedSafeGuard],
          {
            solUsdRate: 130,
            blowfishServiceFeeAccount: "RandomAccountThatDoesNotExistOnSolana",
          }
        )
      ).toThrowError(VERIFY_ERROR.MISSING_BLOWFISH_FEE());
    });

    it("should throw an error if instructions are calling a different program than Lighthouse", () => {
      expect(() =>
        verifyTransactions(
          [createMockTransfer().toString("base64")],
          [expectedSafeGuard],
          {
            solUsdRate: 130,
            lightHouseIds: ["RandomAccountThatDoesNotExistOnSolana"],
          }
        )
      ).toThrowError(
        VERIFY_ERROR.UNKNOWN_PROGRAM_INTERACTION(
          "L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK"
        )
      );
    });

    it("should work even if there are more txs than original in safeguard", () => {
      verifyTransactions(
        [
          "EKuskiP2WvbuqBPd85h7GTLmFnfggMrCGYdf4gwSdXzw1sTnVPVehmECZz3SebMhPz6mYv39oyDFVcc2LdT4p5gtjFhtqkzdgDqHRvTEFYSGKz9Y9BMQDWVD94LJQNXMBR57QjHVxSoH7Kh6MMj5b6C8c4GPiMSuCso62m9K5Z4cNodcooaUksXViuy6jhSywhERdi5awN7rpE5pbvkhkE36Uc1nbKppGRbkBQ8PGkuqR4Mj7EPxtB96hxxgZa5zsTnTETfnVMz1VgpSbzZqUXNm3tsGpG6hRQNtbh8oKkc79S1dYwZrR76rhhsZHsYy32i6fQA1wppeqma2KEXZ27rHKMhdU1wzPqy8EoxJN9V5Z2HpfHsDtSnHwAF8vHBTZB4Tr6r3xPoynonLm4vEcLsRVVQA4Fb23RZNRy4hEhb9W7hbuaxD3XcfMdudz19YN9j2hHo6BZMcxH4vqyzBnsHLu7AquDKLnDecSwkeocgVgGkSqZiZNuUkz2fUHuVQA9veHNPYLnjsZB9EFc53kG6ruPNvsTfZip2Cu8vzn11Qycg5Q3Tv4uxsvC6cgSF3fNvGgW9YXkjcivdwakNrkzFpLy4HPrZR28Km5u5ueWVs2GSiWp61qge6jxvhQdGv41RtgsEXUFfpQaiKPrKnWJLgUWYhuvJptd3YnTNWnBC1dyxTeSMmn5PepDEtXS4HrKHa1YzsLjhppkebDbeqJF9TKA6XkEE6QaWLt5gxjcuxYQTQSSSYgnUW6KsjMchQHfEcd89LwWfY59v9d6WJdiEKupmd2YXYTimADzXhMu3iWcmspFbH4VDibdF3cdLTmJiJ57tJrV3wLs1fPfC3gBNTaBSqd82GXfjbxenUGP6kpxDoGXoLHr1dYjjyWRAL3NDFtttDtu3uTS3cEJaXiYW1o5qJxpRNQZMDb6VswQshKMRCUky3xSDhfnLjGJHQsEryid75XiGQf79Cjc2U1fR3YR9qoGoAdx34tEgjSRBmWwpuNe5rd84JraoYPqcZDMEdgPe4UiF2KzyBtcSnfuzrFKNRtKhCgrbLv5CkSwnr4ywDDkqLsrV4USy61RHYvGYFMsd59Hg9RMXeHf9HTZYPqwCG9o8BiN7MoXmhUrDapsS87sXbRtc5zyDTSfRfxTMwJNjSBWQLNUeD",
        ],
        [
          "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",
        ],
        {
          solUsdRate: 130,
        }
      );
    });
  });
});
