import {
  EvmMessageExpectedStateChange,
  EvmMessageStateChangeErc20Permit,
  EvmMessageStateChangeAnyNftFromCollectionTransfer,
} from "../../clients/v20230605";

export const permitErc20NoExpiration: EvmMessageExpectedStateChange = {
  humanReadableDiff:
    "Permit to transfer any amount of your USDC anytime in the future",
  rawInfo: {
    kind: "ERC20_PERMIT",
    data: {
      contract: {
        kind: "ACCOUNT",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      },
      owner: {
        kind: "ACCOUNT",
        address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      },
      spender: {
        kind: "ACCOUNT",
        address: "0x0000000000000000000000000000000000000001",
      },
      amount: "1461501637330902918203684832716283019655932542975",
      nonce: "281474976710655",
      deadline: 281474976710655,
      asset: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "USDC",
        name: "USDCoin",
        decimals: 6,
        verified: true,
        lists: [
          "COINGECKO",
          "ZERION",
          "ONE_INCH",
          "UNISWAP",
          "MY_CRYPTO_API",
          "KLEROS_TOKENS",
        ],
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
        price: {
          source: "Defillama",
          updatedAt: 1681958792,
          dollarValuePerToken: 1945.92,
        },
      },
    },
  } as EvmMessageStateChangeErc20Permit,
};

export const anyNftTransfer: EvmMessageExpectedStateChange = {
  humanReadableDiff: "Transfer any NFT from BoredApeYachtClub",
  rawInfo: {
    kind: "ANY_NFT_FROM_COLLECTION_TRANSFER",
    data: {
      amount: {
        after: "0",
        before: "1",
      },
      asset: {
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        name: "BoredApeYachtClub",
        symbol: "BAYC",
        price: {
          source: "Coingecko",
          updatedAt: 1681958792,
          dollarValuePerToken: 1945.92,
        },
      },
    },
  } as EvmMessageStateChangeAnyNftFromCollectionTransfer,
};
