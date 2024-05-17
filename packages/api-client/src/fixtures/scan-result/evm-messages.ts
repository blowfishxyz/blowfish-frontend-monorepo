import { EvmMessageScanResult } from "../../clients/v20230605/types";
import { mapMessageResponse } from "../../clients/v20230605/utils";
import { permitErc20NoExpiration } from "../state-change";

export const messageNoActionScanResult: EvmMessageScanResult =
  mapMessageResponse({
    requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
    action: "NONE",
    simulationResults: {
      error: null,
      protocol: null,
      expectedStateChanges: [],
    },
    warnings: [],
  });

export const exampleEthSignScanResult: EvmMessageScanResult =
  mapMessageResponse({
    requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
    action: "WARN",
    warnings: [
      {
        kind: "ETH_SIGN_TX_HASH",
        message:
          "You are signing what could be a transaction hash, which is a valid Ethereum transaction. Approving may lead to loss of funds.",
        severity: "WARNING",
        data: null,
      },
    ],
    simulationResults: null,
  });

export const erc20PermitScanResult: EvmMessageScanResult = mapMessageResponse({
  requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
  action: "NONE",
  warnings: [],
  simulationResults: {
    expectedStateChanges: [
      {
        humanReadableDiff: "Permit to transfer up to 123 USDC within an hour",
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
              address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
            },
            amount: "123000000",
            nonce: "2",
            deadline: 1667799719,
            asset: {
              address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              symbol: "USDC",
              name: "USD Coin",
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
              price: {
                source: "Coingecko",
                updatedAt: 1679331222,
                dollarValuePerToken: 0.99,
              },
              imageUrl:
                "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
            },
          },
        },
      },
    ],
    error: null,
    protocol: {
      trustLevel: "TRUSTED",
      name: "USDCoin",
      description: "An ERC-20 token contract",
      imageUrl:
        "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
      websiteUrl:
        "https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
  },
});

export const openseaOrderScanResult: EvmMessageScanResult = mapMessageResponse({
  requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
  action: "NONE",
  simulationResults: {
    error: null,
    expectedStateChanges: [
      {
        humanReadableDiff: "Receive 94.05 ETH",
        rawInfo: {
          data: {
            amount: {
              after: "157873734139299463313",
              before: "63823734139299463313",
            },
            contract: {
              address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              kind: "ACCOUNT",
            },
            asset: {
              address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              symbol: "ETH",
              name: "Ether",
              decimals: 18,
              verified: true,
              imageUrl:
                "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
              price: {
                source: "Coingecko",
                updatedAt: 1681958792,
                dollarValuePerToken: 1945.92,
              },
            },
          },
          kind: "NATIVE_ASSET_TRANSFER",
        },
      },
      {
        humanReadableDiff: "Send BoredApeYachtClub",
        rawInfo: {
          data: {
            amount: {
              after: "52",
              before: "53",
            },
            contract: {
              address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
              kind: "ACCOUNT",
            },
            metadata: {
              previews: {
                small: null,
                medium: null,
                large: null,
              },
              rawImageUrl:
                "ipfs://QmYqXQb3xFNWDkNno34GNL435yMbjt4B8b89LvBA75A9VP",
            },
            name: "BoredApeYachtClub",
            symbol: "BAYC",
            tokenId: "1726",
            assetPrice: {
              source: "Simplehash",
              updatedAt: 1679331222,
              dollarValuePerToken: 3434.34,
            },
          },
          kind: "ERC721_TRANSFER",
        },
      },
    ],
    protocol: {
      trustLevel: "TRUSTED",
      name: "Seaport",
      description:
        "A marketplace protocol for buying and selling NFTs developed by Opensea",
      imageUrl: "https://d2xobe0ejktb0m.cloudfront.net/attefMtpxsPIa5Emm.png",
      websiteUrl: "https://github.com/ProjectOpenSea/seaport",
    },
  },
  warnings: [],
});

export const twoNftsForOneEthEachScanResult: EvmMessageScanResult =
  mapMessageResponse({
    requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
    action: "NONE",
    warnings: [],
    simulationResults: {
      expectedStateChanges: [
        {
          humanReadableDiff: "Receive 0.975 ETH",
          rawInfo: {
            kind: "NATIVE_ASSET_TRANSFER",
            data: {
              amount: {
                before: "137248305387542646",
                after: "1112248305387542646",
              },
              contract: {
                kind: "ACCOUNT",
                address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              },
              asset: {
                address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                symbol: "ETH",
                name: "Ether",
                decimals: 18,
                verified: true,
                imageUrl:
                  "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
                price: {
                  source: "Coingecko",
                  updatedAt: 1690326202,
                  dollarValuePerToken: 1860.31,
                },
              },
            },
          },
        },
        {
          humanReadableDiff: "Send Helga I #30420",
          rawInfo: {
            kind: "ERC721_TRANSFER",
            data: {
              symbol: "PROMETHEANS",
              name: "Helga I #30420",
              tokenId: "30420",
              amount: {
                before: "1",
                after: "0",
              },
              counterparty: undefined,
              contract: {
                kind: "ACCOUNT",
                address: "0xc4a5025c4563ad0acc09d92c2506e6744dad58eb",
              },
              metadata: {
                previews: {
                  small: null,
                  medium: null,
                  large: null,
                },
                rawImageUrl:
                  "https://cdn.simplehash.com/assets/71ccb5607035b2afdf9a17d05a76ae643d1197d21282967690f303f122d215d8.png",
              },
              assetPrice: {
                source: "Simplehash",
                updatedAt: 1690315826,
                dollarValuePerToken: 35.164152601171,
              },
            },
          },
        },
        {
          humanReadableDiff: "Receive 0.975 ETH",
          rawInfo: {
            kind: "NATIVE_ASSET_TRANSFER",
            data: {
              amount: {
                before: "137248305387542646",
                after: "1112248305387542646",
              },
              contract: {
                kind: "ACCOUNT",
                address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              },
              asset: {
                address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                symbol: "ETH",
                name: "Ether",
                decimals: 18,
                verified: true,
                imageUrl:
                  "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
                price: {
                  source: "Coingecko",
                  updatedAt: 1690326202,
                  dollarValuePerToken: 1860.31,
                },
              },
            },
          },
        },
        {
          humanReadableDiff: "Send Prometheans #53046",
          rawInfo: {
            kind: "ERC721_TRANSFER",
            data: {
              symbol: "PROMETHEANS",
              name: "Gavius I #53046",
              tokenId: "53046",
              amount: {
                before: "1",
                after: "0",
              },
              counterparty: undefined,
              contract: {
                kind: "ACCOUNT",
                address: "0xc4a5025c4563ad0acc09d92c2506e6744dad58eb",
              },
              metadata: {
                previews: {
                  small: null,
                  medium: null,
                  large: null,
                },
                rawImageUrl:
                  "https://cdn.simplehash.com/assets/d6cadf475256eb6d9fac570671e6947133a2a53ce27fed2a3bfe222fd2cfe334.png",
              },
              assetPrice: {
                source: "Simplehash",
                updatedAt: 1690315826,
                dollarValuePerToken: 35.164152601171,
              },
            },
          },
        },
      ],
      error: null,
      protocol: null,
    },
  });

export const anyNftForWethOfferScanResult: EvmMessageScanResult =
  mapMessageResponse({
    requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
    action: "NONE",
    warnings: [],
    simulationResults: {
      expectedStateChanges: [
        {
          humanReadableDiff:
            "Receive any 1 NFT from the Prometheans collection",
          rawInfo: {
            kind: "ANY_NFT_FROM_COLLECTION_TRANSFER",
            data: {
              symbol: "PROMETHEANS",
              name: "Prometheans",
              amount: {
                before: "0",
                after: "1",
              },
              contract: {
                kind: "ACCOUNT" as const,
                address: "0xc4a5025c4563ad0acc09d92c2506e6744dad58eb",
              },
              imageUrl:
                "https://lh3.googleusercontent.com/U9TK_6D-iXvcUB-FgDa8AYhwd0nOeBK_Fsr0GaQpPJX1_iQGVWJr2pnhGYkUsZH4syW1gXIiZpQOUqRdvfikoIeshF1VJOZvlK8",
              assetPrice: {
                source: "Simplehash" as const,
                updatedAt: 1690495107,
                dollarValuePerToken: 35.20011125067005,
              },
              type: "ERC721",
            },
          },
        },
        {
          humanReadableDiff: "Send 0.01 WETH",
          rawInfo: {
            kind: "ERC20_TRANSFER",
            data: {
              amount: {
                before: "10000000000000000",
                after: "0",
              },
              contract: {
                kind: "ACCOUNT",
                address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
              },
              asset: {
                address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                symbol: "WETH",
                name: "Wrapped Ether",
                decimals: 18,
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
                  "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
                price: {
                  source: "Coingecko",
                  updatedAt: 1690495147,
                  dollarValuePerToken: 1858.85,
                },
              },
            },
          },
        },
      ],
      error: null,
      protocol: null,
    },
  });

export const usdcForPepeScanResult: EvmMessageScanResult = mapMessageResponse({
  requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
  action: "NONE",
  warnings: [],
  simulationResults: {
    expectedStateChanges: [
      {
        humanReadableDiff: "Receive 3784829.18258 PEPE",
        rawInfo: {
          kind: "ERC20_TRANSFER",
          data: {
            amount: {
              before: "0",
              after: "3784829182575000000000000",
            },
            contract: {
              kind: "ACCOUNT",
              address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
            },
            asset: {
              address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
              symbol: "PEPE",
              name: "Pepe",
              decimals: 18,
              verified: true,
              lists: ["COINGECKO", "UNISWAP"],
              imageUrl:
                "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0x6982508145454ce325ddbe47a25d4ec3d2311933.png",
              price: {
                source: "Coingecko",
                updatedAt: 1690417284,
                dollarValuePerToken: 0.00000133,
              },
            },
          },
        },
      },
      {
        humanReadableDiff: "Send 5 USDC",
        rawInfo: {
          kind: "ERC20_TRANSFER",
          data: {
            amount: {
              before: "59204541",
              after: "54204541",
            },
            contract: {
              kind: "ACCOUNT",
              address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            },
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
                source: "Coingecko",
                updatedAt: 1690417233,
                dollarValuePerToken: 0.999574,
              },
            },
          },
        },
      },
    ],
    error: null,
    protocol: {
      trustLevel: "TRUSTED",
      name: "0x",
      description: "A router for token exchanges",
      imageUrl: "https://d2xobe0ejktb0m.cloudfront.net/attYzMGqoCocgaJtr.png",
      websiteUrl: "https://0x.org/",
    },
  },
});

export const usdcForEthScanResult: EvmMessageScanResult = mapMessageResponse({
  requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
  action: "NONE",
  warnings: [],
  simulationResults: {
    expectedStateChanges: [
      {
        humanReadableDiff: "Send 5 USDC",
        rawInfo: {
          kind: "ERC20_TRANSFER",
          data: {
            amount: {
              before: "59204541",
              after: "54204541",
            },
            contract: {
              kind: "ACCOUNT",
              address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            },
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
                source: "Coingecko",
                updatedAt: 1690494784,
                dollarValuePerToken: 0.999985,
              },
            },
          },
        },
      },
      {
        humanReadableDiff: "Receive 0.00267 ETH",
        rawInfo: {
          kind: "NATIVE_ASSET_TRANSFER",
          data: {
            amount: {
              before: "137248305387542646",
              after: "139916364887542646",
            },
            contract: {
              kind: "ACCOUNT",
              address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            },
            asset: {
              address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              symbol: "ETH",
              name: "Ether",
              decimals: 18,
              verified: true,
              imageUrl:
                "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
              price: {
                source: "Coingecko",
                updatedAt: 1690494803,
                dollarValuePerToken: 1860.57,
              },
            },
          },
        },
      },
    ],
    error: null,
    protocol: {
      trustLevel: "TRUSTED",
      name: "1inch",
      description: "A router for token exchanges",
      imageUrl: "https://d2xobe0ejktb0m.cloudfront.net/att3hwaz5CWUj3hF8.png",
      websiteUrl: "https://1inch.io/",
    },
  },
});

export const transferNftFromTwoOutOfThreeGnosisSafeScanResult: EvmMessageScanResult =
  mapMessageResponse({
    requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
    action: "NONE",
    warnings: [],
    simulationResults: {
      expectedStateChanges: [
        {
          humanReadableDiff: "Send Curta #3402...1474",
          rawInfo: {
            kind: "ERC721_TRANSFER",
            data: {
              symbol: "CTF",
              name: "Curta",
              tokenId: "340282366920938463463374607431768211474",
              amount: {
                before: "1",
                after: "0",
              },
              counterparty: {
                kind: "ACCOUNT",
                address: "0x655af72e1500eb8a8d1c90856ae3b8f148a78471",
              },
              contract: {
                kind: "ACCOUNT",
                address: "0x0000000006bc8d9e5e9d436217b88de704a9f307",
              },
              metadata: {
                previews: {
                  small: null,
                  medium: null,
                  large: null,
                },
                rawImageUrl:
                  "https://cdn.simplehash.com/assets/618ae6278d159aefbff7489f030fcff96537df5fede1a6e8c8a0803b92a70ea4.svg",
              },
              assetPrice: null,
            },
          },
        },
      ],
      error: null,
      protocol: null,
    },
  });

export const unlimitedAmountPermit2ScanResult: EvmMessageScanResult =
  mapMessageResponse({
    requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
    action: "WARN",
    warnings: [
      {
        kind: "PERMIT_UNLIMITED_ALLOWANCE",
        message:
          "You are allowing this dApp to withdraw funds from your account in the future.",
        severity: "WARNING",
        data: null,
      },
    ],
    simulationResults: {
      expectedStateChanges: [
        {
          humanReadableDiff:
            "Permit to transfer any amount of your USDC within a month",
          rawInfo: {
            kind: "ERC20_PERMIT",
            data: {
              contract: {
                kind: "ACCOUNT",
                address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
              },
              owner: {
                kind: "ACCOUNT",
                address: "0xd854343f41b2138b686f2d3ba38402a9f7fb4337",
              },
              spender: {
                kind: "ACCOUNT",
                address: "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad",
              },
              amount: "1461501637330902918203684832716283019655932542975",
              nonce: "0",
              deadline: 1693008695,
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
                  source: "Coingecko",
                  updatedAt: 1690416632,
                  dollarValuePerToken: 0.999549,
                },
              },
            },
          },
        },
      ],
      error: null,
      protocol: {
        trustLevel: "TRUSTED",
        name: "Permit2",
        description: "A protocol for signature-based token approvals",
        imageUrl: "https://d2xobe0ejktb0m.cloudfront.net/attGMUjX0IpCJyZ1k.png",
        websiteUrl: "https://github.com/Uniswap/permit2",
      },
    },
  });

export const unlimitedAmountPermitScanResult: EvmMessageScanResult =
  mapMessageResponse({
    requestId: "e8cd35ce-f743-4ef2-8e94-f26857744db7",
    action: "WARN",
    simulationResults: {
      error: null,
      expectedStateChanges: [
        {
          humanReadableDiff: "Permit to transfer all your UNI within 2 days",
          rawInfo: {
            data: {
              amount:
                "115792089237316195423570985008687907853269984665640564039457584007913129639935",
              asset: {
                address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
                decimals: 18,
                imageUrl:
                  "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
                lists: [
                  "COINGECKO",
                  "ZERION",
                  "ONE_INCH",
                  "UNISWAP",
                  "MY_CRYPTO_API",
                  "KLEROS_TOKENS",
                ],
                name: "Uniswap",
                symbol: "UNI",
                verified: true,
                price: {
                  source: "Coingecko",
                  updatedAt: 1679331222,
                  dollarValuePerToken: 34.32,
                },
              },
              contract: {
                address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
                kind: "ACCOUNT",
              },
              deadline: 1667556263,
              nonce: "0",
              owner: {
                address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
                kind: "ACCOUNT",
              },
              spender: {
                address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
                kind: "ACCOUNT",
              },
            },
            kind: "ERC20_PERMIT",
          },
        },
      ],
      protocol: {
        trustLevel: "TRUSTED",
        name: "Uniswap",
        description: "An ERC-20 token contract",
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png",
        websiteUrl:
          "https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      },
    },
    warnings: [
      {
        kind: "PERMIT_UNLIMITED_ALLOWANCE",
        message:
          "You are allowing this dApp to withdraw funds from your account in the future.",
        severity: "WARNING",
        data: null,
      },
    ],
  });
