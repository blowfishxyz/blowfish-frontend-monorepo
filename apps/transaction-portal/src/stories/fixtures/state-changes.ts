import { EvmExpectedStateChange } from "@blowfish/utils/BlowfishApiClient";

export const sendErc721: EvmExpectedStateChange = {
  humanReadableDiff: "Send BoredApeYachtClub #1726",
  rawInfo: {
    data: {
      amount: {
        after: "0",
        before: "1",
      },
      contract: {
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        kind: "ACCOUNT",
      },
      metadata: {
        rawImageUrl:
          "https://ipfs.io/ipfs/QmYqXQb3xFNWDkNno34GNL435yMbjt4B8b89LvBA75A9VP",
      },
      name: "BoredApeYachtClub",
      symbol: "BAYC",
      tokenId: "1726",
      assetPrice: {
        source: "Coingecko",
        last_updated_at: 1680006487,
        dollar_value_per_token: 4886.162862975,
      },
    },
    kind: "ERC721_TRANSFER",
  },
};

export const receiveErc721: EvmExpectedStateChange = {
  humanReadableDiff: "Receive PudgyPenguins #7238",
  rawInfo: {
    data: {
      amount: {
        after: "1",
        before: "0",
      },
      contract: {
        address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
        kind: "ACCOUNT",
      },
      metadata: {
        rawImageUrl:
          "https://ipfs.io/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/7238.png",
      },
      name: "PudgyPenguins",
      symbol: "PPG",
      tokenId: "7238",
      assetPrice: {
        source: "Coingecko",
        last_updated_at: 1680006487,
        dollar_value_per_token: 4886.162862975,
      },
    },
    kind: "ERC721_TRANSFER",
  },
};

export const sendErc20: EvmExpectedStateChange = {
  humanReadableDiff: "Send 3.181 ETH",
  rawInfo: {
    data: {
      amount: {
        after: "998426264937289938488",
        before: "1001607264937289938488",
      },
      contract: {
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        kind: "ACCOUNT",
      },
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
      asset: {
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        symbol: "ETH",
        name: "Ether",
        decimals: 18,
        verified: true,
        lists: ["ONE_INCH", "UNISWAP"],
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
        price: {
          source: "Coingecko",
          last_updated_at: 1670252058,
          dollar_value_per_token: 1288.41,
        },
      },
    },
    kind: "NATIVE_ASSET_TRANSFER",
  },
};

export const receiveErc20: EvmExpectedStateChange = {
  humanReadableDiff: "Receive 94.05 ETH",
  rawInfo: {
    data: {
      amount: {
        after: "97543955540688454378",
        before: "3493955540688454378",
      },
      contract: {
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        kind: "ACCOUNT",
      },
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
      asset: {
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        symbol: "ETH",
        name: "Ether",
        decimals: 18,
        verified: true,
        lists: [],
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png",
        price: {
          source: "Coingecko",
          last_updated_at: 1670252058,
          dollar_value_per_token: 1288.41,
        },
      },
    },
    kind: "NATIVE_ASSET_TRANSFER",
  },
};

export const approveAllErc721: EvmExpectedStateChange = {
  humanReadableDiff: "Approve to transfer all your BoredApeYachtClub",
  rawInfo: {
    data: {
      amount: {
        after:
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        before: "0",
      },
      contract: {
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        kind: "ACCOUNT",
      },
      name: "BoredApeYachtClub",
      owner: {
        address: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
        kind: "ACCOUNT",
      },
      spender: {
        address: "0x00000000006c3852cbef3e08e8df289169ede581",
        kind: "ACCOUNT",
      },
      symbol: "BAYC",
      assetPrice: null,
    },
    kind: "ERC721_APPROVAL_FOR_ALL",
  },
};

export const permitErc20NoExpiration: EvmExpectedStateChange = {
  humanReadableDiff:
    "Permit to transfer any amount of your USDC anytime in the future",
  rawInfo: {
    kind: "ERC20_PERMIT",
    data: {
      contract: {
        kind: "ACCOUNT",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      },
      name: "USDCoin",
      symbol: "USDC",
      decimals: 6,
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
          last_updated_at: 1680508934,
          dollar_value_per_token: 1.001,
        },
      },
    },
  },
};
