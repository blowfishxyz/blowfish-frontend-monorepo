import { SolanaTransactionsResult } from "../../clients/v20230605/types";

export const SOLANA_TEST_ACCOUNT =
  "5F645680e076bff67cf2F1C9EEc4635BEECCD11c344c";

export const solanaSetOwnerAuthority: SolanaTransactionsResult = {
  requestId: "a532f37d3505ca43816e4b834288edb5",
  aggregated: {
    action: "BLOCK",
    warnings: [
      {
        kind: "SET_OWNER_AUTHORITY",
        message:
          "This transaction changes the owner of your SPL tokens. This allows the new owner to transfer the tokens without your permission.",
        severity: "CRITICAL",
      },
    ],
    error: null,
    expectedStateChanges: {
      [SOLANA_TEST_ACCOUNT]: [
        {
          humanReadableDiff: "Send 0.98112 USDC",
          suggestedColor: "DEBIT",
          rawInfo: {
            kind: "SPL_TRANSFER",
            data: {
              asset: {
                symbol: "USDC",
                name: "USD Coin",
                mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                decimals: 6,
                supply: 5034943397263942,
                metaplexTokenStandard: "unknown",
                price: {
                  source: "Coingecko",
                  updatedAt: 1692022153,
                  dollarValuePerToken: 1,
                },
                previews: { small: "", medium: "", large: "" },
                imageUrl:
                  "https://d1ts37qlq4uz4s.cloudfront.net/solana__solana%3A%3Asolana__solana%3A%3Asolana%3A%3Amainnet__EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v.png",
              },
              counterparty: "5xPpQvZuMV5b8VBWGqRMZinB5tMz23axQPA1dAqzHTNz",
              diff: {
                sign: "MINUS",
                digits: 981129,
              },
            },
          },
        },
      ],
    },
  },
  perTransaction: [
    {
      isNonceValid: true,
      error: null,
      raw: {
        err: null,
        logs: [
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
          "Program log: Instruction: SetAuthority",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 2791 of 200000 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
        ],
        unitsConsumed: 2791,
        returnData: null,
      },
      protocols: [
        {
          trustLevel: "NATIVE",
          name: "Token Program",
          description: "Manage your tokens and NFTs",
          imageUrl:
            "https://d2xobe0ejktb0m.cloudfront.net/attwHpLGzRgxmWdXz.png",
          websiteUrl: "https://solana.com/",
        },
      ],
      instructions: [],
    },
  ],
};

export const solanaNftTransfer: SolanaTransactionsResult = {
  requestId: "a532f37d3505ca43816e4b834288edb5",
  aggregated: {
    action: "NONE",
    warnings: [],
    error: null,
    expectedStateChanges: {
      [SOLANA_TEST_ACCOUNT]: [
        {
          humanReadableDiff: "Send 1 ALERT",
          suggestedColor: "DEBIT",
          rawInfo: {
            kind: "SPL_TRANSFER",
            data: {
              asset: {
                symbol: "ALERT",
                name: "Security Alert",
                mint: "36uCmMqS8Qj1ZL2RqYg9ELUwbBpEZDFQ7EHMMwWj6nRX",
                decimals: 0,
                supply: 97643,
                metaplexTokenStandard: "fungible_asset",
                price: null,
                imageUrl: null,
                previews: { small: "", medium: "", large: "" },
              },
              counterparty: "5xPpQvZuMV5b8VBWGqRMZinB5tMz23axQPA1dAqzHTNz",
              diff: {
                sign: "MINUS",
                digits: 1,
              },
            },
          },
        },
        {
          humanReadableDiff: "Send 1 SDOGE",
          suggestedColor: "DEBIT",
          rawInfo: {
            kind: "SPL_TRANSFER",
            data: {
              asset: {
                symbol: "SDOGE",
                name: "SolDoge",
                mint: "8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s",
                decimals: 0,
                supply: 9957002411,
                metaplexTokenStandard: "unknown",
                price: {
                  source: "Coingecko",
                  updatedAt: 1692087924,
                  dollarValuePerToken: 0.00001002,
                },
                previews: { small: "", medium: "", large: "" },
                imageUrl:
                  "https://d1ts37qlq4uz4s.cloudfront.net/solana__solana%3A%3Asolana__solana%3A%3Asolana%3A%3Amainnet__8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s.png",
              },
              counterparty: "5xPpQvZuMV5b8VBWGqRMZinB5tMz23axQPA1dAqzHTNz",
              diff: {
                sign: "MINUS",
                digits: 1,
              },
            },
          },
        },
        {
          humanReadableDiff: "Send Checks – Solana Edition",
          suggestedColor: "DEBIT",
          rawInfo: {
            kind: "SPL_TRANSFER",
            data: {
              asset: {
                symbol: "Unknown",
                name: "Checks – Solana Edition",
                mint: "7EpQyfiqKSmncac8xVtusecgA3SJXf7NftzQXsY7aADA",
                decimals: 0,
                supply: 1,
                metaplexTokenStandard: "non_fungible_edition",
                price: {
                  source: "Simplehash",
                  updatedAt: 1692088066,
                  dollarValuePerToken: 0.13629000000000002,
                },
                previews: { small: "", medium: "", large: "" },
                imageUrl:
                  "https://cdn.simplehash.com/assets/20c007a2b4e01a94b31f2e5badceef86c281b553eb1af8dffdbd10f4becdeb44.jpg",
              },
              counterparty: "5xPpQvZuMV5b8VBWGqRMZinB5tMz23axQPA1dAqzHTNz",
              diff: {
                sign: "MINUS",
                digits: 1,
              },
            },
          },
        },
      ],
    },
  },
  perTransaction: [
    {
      isNonceValid: true,
      error: {
        kind: "PROGRAM_ERROR",
        solanaProgramAddress: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        humanReadableError: "Owner does not match",
      },
      raw: {
        err: "InstructionError",
        logs: [
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
          "Program log: Create",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: GetAccountDataSize",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 393133 compute units",
          "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program 11111111111111111111111111111111 invoke [2]",
          "Program 11111111111111111111111111111111 success",
          "Program log: Initialize the associated token account",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeImmutableOwner",
          "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 386643 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeAccount3",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 382761 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 21763 of 400000 compute units",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
          "Program log: Instruction: Transfer",
          "Program log: Error: owner does not match",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4470 of 378237 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA failed: custom program error: 0x4",
        ],
        unitsConsumed: 21763,
        returnData: null,
      },
      protocols: [
        {
          trustLevel: "NATIVE",
          name: "Token Program",
          description: "Manage your tokens and NFTs",
          imageUrl:
            "https://d2xobe0ejktb0m.cloudfront.net/attwHpLGzRgxmWdXz.png",
          websiteUrl: "https://solana.com/",
        },
      ],
      instructions: [],
    },
    {
      isNonceValid: true,
      error: null,
      raw: {
        err: null,
        logs: [
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
          "Program log: Create",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: GetAccountDataSize",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1569 of 394633 compute units",
          "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program 11111111111111111111111111111111 invoke [2]",
          "Program 11111111111111111111111111111111 success",
          "Program log: Initialize the associated token account",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeImmutableOwner",
          "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 388196 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeAccount3",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4188 of 384314 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20157 of 400000 compute units",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
          "Program log: Instruction: Transfer",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 379843 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
        ],
        unitsConsumed: 24801,
        returnData: null,
      },
      protocols: [
        {
          trustLevel: "NATIVE",
          name: "Token Program",
          description: "Manage your tokens and NFTs",
          imageUrl:
            "https://d2xobe0ejktb0m.cloudfront.net/attwHpLGzRgxmWdXz.png",
          websiteUrl: "https://solana.com/",
        },
      ],
      instructions: [],
    },
    {
      isNonceValid: true,
      error: null,
      raw: {
        err: null,
        logs: [
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
          "Program log: Create",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: GetAccountDataSize",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 388633 compute units",
          "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program 11111111111111111111111111111111 invoke [2]",
          "Program 11111111111111111111111111111111 success",
          "Program log: Initialize the associated token account",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeImmutableOwner",
          "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 382143 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeAccount3",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 378261 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 26263 of 400000 compute units",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
          "Program log: Instruction: Transfer",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 373737 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
        ],
        unitsConsumed: 30907,
        returnData: null,
      },
      protocols: [
        {
          trustLevel: "NATIVE",
          name: "Token Program",
          description: "Manage your tokens and NFTs",
          imageUrl:
            "https://d2xobe0ejktb0m.cloudfront.net/attwHpLGzRgxmWdXz.png",
          websiteUrl: "https://solana.com/",
        },
      ],
      instructions: [],
    },
    {
      isNonceValid: true,
      error: null,
      raw: {
        err: null,
        logs: [
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
          "Program log: Create",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: GetAccountDataSize",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1569 of 394633 compute units",
          "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program 11111111111111111111111111111111 invoke [2]",
          "Program 11111111111111111111111111111111 success",
          "Program log: Initialize the associated token account",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeImmutableOwner",
          "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 388196 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeAccount3",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4188 of 384314 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20157 of 400000 compute units",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
          "Program log: Instruction: Transfer",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4644 of 379843 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
        ],
        unitsConsumed: 24801,
        returnData: null,
      },
      protocols: [
        {
          trustLevel: "NATIVE",
          name: "Token Program",
          description: "Manage your tokens and NFTs",
          imageUrl:
            "https://d2xobe0ejktb0m.cloudfront.net/attwHpLGzRgxmWdXz.png",
          websiteUrl: "https://solana.com/",
        },
      ],
      instructions: [],
    },
    {
      isNonceValid: true,
      error: {
        kind: "TRANSACTION_ERROR",
        humanReadableError:
          "Error processing Instruction 1: invalid account data for instruction",
      },
      raw: {
        err: "InstructionError",
        logs: [
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]",
          "Program log: Create",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: GetAccountDataSize",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 394633 compute units",
          "Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program 11111111111111111111111111111111 invoke [2]",
          "Program 11111111111111111111111111111111 success",
          "Program log: Initialize the associated token account",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeImmutableOwner",
          "Program log: Please upgrade to SPL Token 2022 for immutable owner support",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 388143 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]",
          "Program log: Instruction: InitializeAccount3",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 384261 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 20263 of 400000 compute units",
          "Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]",
          "Program log: Instruction: Transfer",
          "Program log: Error: InvalidAccountData",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1270 of 379737 compute units",
          "Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA failed: invalid account data for instruction",
        ],
        unitsConsumed: 20263,
        returnData: null,
      },
      protocols: [
        {
          trustLevel: "NATIVE",
          name: "Token Program",
          description: "Manage your tokens and NFTs",
          imageUrl:
            "https://d2xobe0ejktb0m.cloudfront.net/attwHpLGzRgxmWdXz.png",
          websiteUrl: "https://solana.com/",
        },
      ],
      instructions: [],
    },
  ],
};
