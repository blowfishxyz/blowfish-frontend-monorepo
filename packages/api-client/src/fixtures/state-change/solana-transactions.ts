import { SolanaExpectedStateChange } from "../../clients/v20230605";

export const solTransfer: SolanaExpectedStateChange = {
  humanReadableDiff: "Send 0.09908 SOL",
  suggestedColor: "DEBIT",
  rawInfo: {
    kind: "SOL_TRANSFER",
    data: {
      asset: {
        symbol: "SOL",
        name: "Solana Native Token",
        decimals: 9,
        price: null,
        imageUrl: "",
      },
      diff: {
        sign: "MINUS",
        digits: 99088000,
      },
    },
  },
};

export const splTransfer: SolanaExpectedStateChange = {
  humanReadableDiff: "Send 0.98112 USDC",
  suggestedColor: "DEBIT",
  rawInfo: {
    kind: "SPL_TRANSFER",
    data: {
      asset: {
        symbol: "USDC",
        name: "USD Coin",
        metaplexTokenStandard: "unknown",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        supply: 5034943397677802,
        decimals: 6,
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        price: {
          source: "Coingecko",
          updatedAt: 1691479249,
          dollarValuePerToken: 0.99998,
        },
        previews: { small: "", medium: "", large: "" },
      },
      counterparty: "5xPpQvZuMV5b8VBWGqRMZinB5tMz23axQPA1dAqzHTNz",
      diff: {
        sign: "MINUS",
        digits: 981129,
      },
    },
  },
};

export const splApproval: SolanaExpectedStateChange = {
  humanReadableDiff: "Approve 0.98112 USDC",
  suggestedColor: "DEBIT",
  rawInfo: {
    kind: "SPL_APPROVAL",
    data: {
      delegate: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      asset: {
        symbol: "USDC",
        name: "USD Coin",
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        metaplexTokenStandard: "unknown",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        supply: 5034943397677802,
        decimals: 6,
        price: {
          source: "Coingecko",
          updatedAt: 1691479249,
          dollarValuePerToken: 0.99998,
        },
        previews: { small: "", medium: "", large: "" },
      },
      diff: {
        sign: "MINUS",
        digits: 981129,
      },
    },
  },
};

export const solStakeAuthorityChange: SolanaExpectedStateChange = {
  humanReadableDiff:
    "Transfer control over your SOL staking account containing 0.01785 SOL (6eskAg..8z3Rpa)",
  suggestedColor: "DEBIT",
  rawInfo: {
    kind: "SOL_STAKE_AUTHORITY_CHANGE",
    data: {
      stakeAccount: "6eskAgpRW56eDd1sRiigG3Map7GdmCncjnWHQ38z3Rpa",
      currentAuthorities: {
        staker: "3ZPvbCiQuo3HxSiqQejCUTVWUrnpF3EbBCrrbtPJEBkU",
        withdrawer: "3ZPvbCiQuo3HxSiqQejCUTVWUrnpF3EbBCrrbtPJEBkU",
      },
      futureAuthorities: {
        staker: "3ZPvbCiQuo3HxSiqQejCUTVWUrnpF3EbBCrrbtPJEBkU",
        withdrawer: "EUxXywqwUogoTi6S6R9oefMziKAKAEdjpznUmTVXWamy",
      },
      asset: {
        symbol: "SOL",
        name: "Solana Native Token",
        decimals: 9,
        price: null,
        imageUrl: "",
      },
      solStaked: 17859729,
    },
  },
};

export const solUserAccountOwnerChange: SolanaExpectedStateChange = {
  humanReadableDiff:
    "Transfer control over your account containing 2.08727 SOL (3ZPvbC..PJEBkU)",
  suggestedColor: "DEBIT",
  rawInfo: {
    kind: "USER_ACCOUNT_OWNER_CHANGE",
    data: {
      account: "3ZPvbCiQuo3HxSiqQejCUTVWUrnpF3EbBCrrbtPJEBkU",
      lamports: 2087275079,
      currentOwner: "3ZPvbCiQuo3HxSiqQejCUTVWUrnpF3EbBCrrbtPJEBkU",
      futureOwner: "ABUoavPod8LDgVNHR8P4VXz8m3ivVo31GCNRysciBPJp",
    },
  },
};

export const splTransferChange: SolanaExpectedStateChange = {
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
        metaplexTokenStandard: "non_fungible",
        price: {
          source: "Coingecko",
          updatedAt: 1692001350,
          dollarValuePerToken: 0.00001449,
        },
        imageUrl: "",
        previews: {
          small:
            "https://d1ts37qlq4uz4s.cloudfront.net/solana__solana%3A%3Asolana__solana%3A%3Asolana%3A%3Amainnet__8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s.png",
          medium:
            "https://d1ts37qlq4uz4s.cloudfront.net/solana__solana%3A%3Asolana__solana%3A%3Asolana%3A%3Amainnet__8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s.png",
          large:
            "https://d1ts37qlq4uz4s.cloudfront.net/solana__solana%3A%3Asolana__solana%3A%3Asolana%3A%3Amainnet__8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s.png",
        },
      },
      counterparty: "5xPpQvZuMV5b8VBWGqRMZinB5tMz23axQPA1dAqzHTNz",
      diff: {
        sign: "MINUS",
        digits: 1,
      },
    },
  },
};
