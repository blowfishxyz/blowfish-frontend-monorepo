import {
  EvmMessageExpectedStateChange,
  EvmStateChangeErc20Permit,
  EvmStateChangeErc20Transfer,
  EvmStateChangeErc721ApprovalForAll,
  EvmStateChangeErc721Transfer,
  EvmStateChangeNativeAssetTransfer,
  EvmTransactionExpectedStateChange,
} from "../clients/v20230605";

export const sendErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Send BoredApeYachtClub #1726",
  rawInfo: {
    data: {
      amount: {
        after: "0",
        before: "1",
      },
      metadata: {
        rawImageUrl:
          "https://ipfs.io/ipfs/QmYqXQb3xFNWDkNno34GNL435yMbjt4B8b89LvBA75A9VP",
      },
      tokenId: "1726",
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
    kind: "ERC721_TRANSFER",
  } as EvmStateChangeErc721Transfer,
};

export const receiveErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Receive PudgyPenguins #7238",
  rawInfo: {
    data: {
      amount: {
        after: "1",
        before: "0",
      },
      metadata: {
        rawImageUrl:
          "https://ipfs.io/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/7238.png",
      },
      tokenId: "1726",
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
    kind: "ERC721_TRANSFER",
  } as EvmStateChangeErc721Transfer,
};

export const sendErc20: EvmTransactionExpectedStateChange = {
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
  } as EvmStateChangeNativeAssetTransfer,
};

export const receiveErc20: EvmTransactionExpectedStateChange = {
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
  } as EvmStateChangeNativeAssetTransfer,
};

export const approveAllErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to transfer all your BoredApeYachtClub",
  rawInfo: {
    data: {
      amount: {
        after:
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        before: "0",
      },
      owner: {
        address: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
        kind: "ACCOUNT",
      },
      spender: {
        address: "0x00000000006c3852cbef3e08e8df289169ede581",
        kind: "ACCOUNT",
      },
      tokenId: "1726",
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
    kind: "ERC721_APPROVAL_FOR_ALL",
  } as EvmStateChangeErc721ApprovalForAll,
};

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
  } as EvmStateChangeErc20Permit,
};

export const erc20UnverifedTransfer: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Receive 12 SQUID",
  rawInfo: {
    kind: "ERC20_TRANSFER",
    data: {
      amount: {
        before: "0",
        after: "12000000",
      },
      contract: {
        kind: "ACCOUNT",
        address: "0x21ad647b8F4Fe333212e735bfC1F36B4941E6Ad2",
      },
      asset: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "SQUID",
        name: "Squid DAO Governance Token",
        decimals: 6,
        verified: false,
        lists: [],
        imageUrl: "",
        price: null,
      },
    },
  } as EvmStateChangeErc20Transfer,
};
