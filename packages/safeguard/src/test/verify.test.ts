import { describe, expect, it } from "vitest";
import { VERIFY_ERROR, verifyTransactions } from "../verify";
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

    it("should work for safeguard extra transaction", () => {
      verifyTransactions(
        [
          "2fTx2LQXBgwpgfWb5QSRpkN5jtSvZqzgHkoQdYCckpvwLpzdqncXQ89SpuRQ4HHW5ZAc7TzH68W7c39K6SSVS1vCWr8UMyrTVNbKuiLsK25Xdv25XssdRiidhaiELfvWSAqLvyvLANkmPi4vZ4d7VpCSTiiadLZSCrWBW8rXFE3zPnWeHcYBSBBtddZk4qhVam8HuYK1hEtUBdpXd15PAc1tQsancBM1KNMvTW3atgLoReuaz6wD2FrujoB899Sjtsu5chUEVL8KenwbvsgTgSqGw84rXF88tMBS2qaN82NcHzXJ33xKygc6sfGQu6XGi8XULJk3CZrFignzEZP9HbGh2DG4nsLsr5nSAhsCUc4p81nikJ8Au2hcjFPuSe5vwMkeQDVqcbe4FdwKAi3gtm4Y9ugptqAHpPpiV8juhN3kADFRgrwLadystYFjWgTBLdydcfGYmvNr2YbDFJBsNXX2KQpnNemi7kBMhBqBNkFTocQJ9Y5ZtPf4kswcpops1FVyM9np818snkg7wq8JK2QtfkbnxtEVwXNqyFK8xqKYuos1GktgthJrnVfhibEkMFoeMXcvFqdaCgQ9UP2PgGghJMAk9KPDXhi6wxd7ZyS2HFGmt9vazNu44dcuYJwxoUzZ9QqygUMC1ubZJE7Q5QXizPzcwpg8uZGEgSZGYypcdwyXXor6wvHxa5ExNRDmHzYXpfYiKRMq68yMsjb1YLrHiq8xzXoP24n5VjJhdtnSxVMoAybythYxeA2XMpmTzJi1Ln1dN1vPRLntqAyrvRmt7ohCvwFSSaJLULSHdN7kFW8dUuEsXRWpzmxbPTPVemSWwjcTWZtCAxiYp3bCXMXPTAWS3jgP83WdHHKKzqdinB6ZcRg84bUEZirpD1hQQZdU4EBQ4Z3YzQqtMRCtHdkJRX4AgRDw9CbEtnvjAzzfDZrR2fTrJZyriCRUocSfBkgcRnXQAMViuYNh9ZqQWmYpHZHNkiPRtGbmKydoPu8YrjZ4s7V82hoMnVCNBTV9KEPyKVhzSdpAsw7KxWfQJyUNDeDTbM5Z2bdYgnStGJC4FZy8G4Z9YKewTJkemw814qUKuvj16P44S27otZ7XAmopXeicKYuvQnMXmsgyrymYxqfo8Hw2k9kZfVCepdf1zURisrSkttow6J6YS2BjEMReNTUFcwDNwDfczHSpB3wyRLjkZPEQv6SJeqmJu3udYzGoRHh6WeQRc5Qix5MDwYpBk8AvZ4CdwLwrePCarbdSRCPyFBKLuLhNR8SRK9oWr1ryCXF7NX8SjdSxvJgiTGaRfpj8FSdSmDv1TSqYXmQJo2UUExkNPRUeh4Evi7PAtqTPL1DXE2x8sKSBW5oDnEsTvzroxU9Nsjqo9k2KmyDkueu8DXrUhySmy9bnERSbLGhRrboPZ5YMMP8VzybhNc9ieDzHZ2EeKxRB3vyFkoYte8SHQMhy46kcSb7qSTau5C1qxgdZQtg7urQVMrWUBS3PFYiHrD4UP2uVTobuWGrfGLZUtDhhqJybtZw4QC9ogYjYM9nuC5hv8iiYfiporNsVygaAaGLMDuLHg6HUbWWj28D7bq1qKATVhGHsx5thPptS8uUJNGCpqTUsongKDDJtQNedTbUfb2DRwc9wpcuXWroqj6nUFkpPVdjAxziiqLbJcGj4nCiEZQn3TR",
        ],
        [
          "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",
        ],
        {
          solUsdRate: 141.71,
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
      ).toThrowError(VERIFY_ERROR.FEE_MISMATCH);
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
      ).toThrowError(VERIFY_ERROR.INSTRUCTION_MISSMATCH);
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
      ).toThrowError(VERIFY_ERROR.MISSING_BLOWFISH_FEE);
    });

    it("should throw an error if instructions are calling a different program than Lighthouse", () => {
      expect(() =>
        verifyTransactions(
          [createMockTransfer().toString("base64")],
          [expectedSafeGuard],
          {
            solUsdRate: 130,
            lightHouseId: "RandomAccountThatDoesNotExistOnSolana",
          }
        )
      ).toThrowError(VERIFY_ERROR.UNKNOWN_PROGRAM_INTERACTION);
    });

    it("should throw an error if there are more original transactions than safeguard transactions", () => {
      expect(() =>
        verifyTransactions([createMockTransfer().toString("base64")], [], {
          solUsdRate: 130,
        })
      ).toThrowError(VERIFY_ERROR.TX_COUNT_MISMATCH);
    });
  });
});
