import {
  EvmStateChangeErc20Transfer,
  EvmStateChangeErc721ApprovalForAll,
  EvmStateChangeErc721Transfer,
  EvmStateChangeNativeAssetTransfer,
  EvmTransactionExpectedStateChange,
  EvmStateChangeErc1155ApprovalForAll,
  EvmStateChangeErc721Approval,
  EvmStateChangeErc20Approval,
  EvmStateChangeErc1155Transfer,
  EvmStateChangeErc721Lock,
  EvmStateChangeErc721LockApproval,
  EvmStateChangeErc721LockApprovalForAll,
} from "../../clients/v20230605";

export const sendNativeToken: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Send 3.181 ETH",
  rawInfo: {
    kind: "NATIVE_ASSET_TRANSFER",
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
      counterparty: {
        kind: "ACCOUNT",
        address: "0x06924592cdf28acd3c1d23c37875c6c6a667bdf7",
      },
    },
  } as EvmStateChangeNativeAssetTransfer,
};

export const receiveNativeToken: EvmTransactionExpectedStateChange = {
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
      counterparty: {
        address: "0x3Ed5fFfe493D4066191D7B7E76784A33deFd0018",
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

export const approveErc20: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to transfer up to 1000 USDT",
  rawInfo: {
    kind: "ERC20_APPROVAL",
    data: {
      amount: {
        after: "1000000000",
        before: "0",
      },
      asset: {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        name: "Tether USD",
        decimals: 6,
        lists: [
          "COINGECKO",
          "ZERION",
          "ONE_INCH",
          "UNISWAP",
          "MY_CRYPTO_API",
          "KLEROS_TOKENS",
        ],
        symbol: "USDT",
        verified: true,
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        price: {
          source: "Coingecko",
          updatedAt: 1679331222,
          dollarValuePerToken: 0.99,
        },
      },
      owner: {
        address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
        kind: "ACCOUNT",
      },
      spender: {
        address: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
        kind: "ACCOUNT",
      },
    },
  } as EvmStateChangeErc20Approval,
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

export const sendErc20: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Send 7975.46196 USDC",
  rawInfo: {
    kind: "ERC20_TRANSFER",
    data: {
      amount: {
        before: "24352685875482",
        after: "24344710413524",
      },
      counterparty: {
        kind: "ACCOUNT",
        address: "0x06924592cdf28acd3c1d23c37875c6c6a667bdf7",
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
          updatedAt: 1689251215,
          dollarValuePerToken: 0.999694,
        },
      },
    },
  } as EvmStateChangeErc20Transfer,
};

export const receiveErc20: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Receive 5.30226 WETH",
  rawInfo: {
    kind: "ERC20_TRANSFER",
    data: {
      amount: {
        before: "16136345432750736474029",
        after: "16141647695670072810543",
      },
      counterparty: {
        kind: "ACCOUNT",
        address: "0x4a86c01d67965f8cb3d0aaa2c655705e64097c31",
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
          updatedAt: 1689251287,
          dollarValuePerToken: 1881.9,
        },
      },
    },
  } as EvmStateChangeErc20Transfer,
};

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
    kind: "ERC721_TRANSFER",
    data: {
      amount: {
        after: "1",
        before: "0",
      },
      metadata: {
        rawImageUrl: "",
        previews: {
          small:
            "https://cdn.simplehash.com/assets/97e1c9e3e9eb21a1114351f9c5c14fe611c94916f360c4eb3aa9263afd8b837b.png",
          medium:
            "https://cdn.simplehash.com/assets/97e1c9e3e9eb21a1114351f9c5c14fe611c94916f360c4eb3aa9263afd8b837b.png",
          large:
            "https://cdn.simplehash.com/assets/97e1c9e3e9eb21a1114351f9c5c14fe611c94916f360c4eb3aa9263afd8b837b.png",
        },
      },
      tokenId: "7238",
      asset: {
        address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
        name: "PudgyPenguins",
        collection: "PudgyPenguins",
        symbol: "PPG",
        price: {
          source: "Simplehash",
          updatedAt: 1679331222,
          dollarValuePerToken: 594.99,
        },
      },
      counterparty: {
        kind: "ACCOUNT",
        address: "0x06924592cdf28acd3c1d23c37875c6c6a667bdf7",
      },
    },
  } as EvmStateChangeErc721Transfer,
};

export const unlockErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Unlock DeGods #1364",
  rawInfo: {
    data: {
      amount: {
        after: "0",
        before: "1",
      },
      metadata: {
        rawImageUrl:
          "https://cdn.simplehash.com/assets/650f9feb029953d015931c62c0f1e1428b55b08a9e94dff5795239b272e6c9a1.png",
      },
      tokenId: "1364",
      asset: {
        address: "0x8821bee2ba0df28761afff119d66390d594cd280",
        collection: "DeGods",
        name: "DeGod #1365",
        price: {
          source: "Simplehash",
          updatedAt: 1681958792,
          dollarValuePerToken: 1945.92,
        },
      },
      owner: {
        address: "0x83988265eb9dfac380575fb2c37f72422aac3df6",
        kind: "ACCOUNT",
      },
    },
    kind: "ERC721_LOCK",
  } as EvmStateChangeErc721Lock,
};

export const lockErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Lock DeGods #6927",
  rawInfo: {
    data: {
      amount: {
        before: "0",
        after: "1",
      },
      metadata: {
        rawImageUrl:
          "https://cdn.simplehash.com/assets/d4a95f61e3e494131e349a15750cafbdc3dae4d9717a64e6354d9a04cb9cb20a.png",
      },
      tokenId: "1364",
      asset: {
        address: "0x8821bee2ba0df28761afff119d66390d594cd280",
        collection: "DeGods",
        name: "DeGod #6928",
        price: {
          source: "Simplehash",
          updatedAt: 1681958792,
          dollarValuePerToken: 1945.92,
        },
      },
      owner: {
        address: "0x83988265eb9dfac380575fb2c37f72422aac3df6",
        kind: "ACCOUNT",
      },
    },
    kind: "ERC721_LOCK",
  } as EvmStateChangeErc721Lock,
};

export const approveErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to transfer BoredApeYachtClub",
  rawInfo: {
    kind: "ERC721_APPROVAL",
    data: {
      amount: {
        after: "1",
        before: "0",
      },
      metadata: {
        rawImageUrl:
          "https://cdn.simplehash.com/assets/beca5f0f88c267276318edd8a6019b6b47327f42efd0ba22a3835e77f27732e5.png",
      },
      owner: {
        address: "0xed2ab4948ba6a909a7751dec4f34f303eb8c7236",
        kind: "ACCOUNT",
      },
      spender: {
        address: "0x1e0049783f008a0085193e00003d00cd54003c71",
        kind: "ACCOUNT",
      },
      tokenId: "6603",
      asset: {
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        name: "BoredApeYachtClub",
        collection: "BoredApeYachtClub",
        symbol: "BAYC",
        price: {
          source: "Simplehash",
          updatedAt: 1679331222,
          dollarValuePerToken: 7865.43,
        },
      },
    },
  } as EvmStateChangeErc721Approval,
};

export const approveErc721Lock: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to lock any amount of your y00ts",
  rawInfo: {
    data: {
      amount: {
        before: "0",
        after:
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      },
      owner: {
        address: "0xe8b574b4bc261351c85f369c5fe84cfcc0f3095b",
        kind: "ACCOUNT",
      },
      spender: {
        address: "0xfa3ce71036dd4564d7d8de19d2b90fb856c5be82",
        kind: "ACCOUNT",
      },
      asset: {
        address: "0x670fd103b1a08628e9557cd66b87ded841115190",
        symbol: "y00t",
        name: "y00ts",
        collection: "y00ts",
        price: {
          source: "Simplehash",
          updatedAt: 1681958792,
          dollarValuePerToken: 1945.92,
        },
      },
    },
    kind: "ERC721_LOCK_APPROVAL",
  } as EvmStateChangeErc721LockApproval,
};

export const approveAllErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to transfer all your BoredApeYachtClub",
  rawInfo: {
    kind: "ERC721_APPROVAL_FOR_ALL",
    data: {
      amount: {
        after:
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        before: "0",
      },
      owner: {
        address: "0x38191ca1307ebf67ca1a7caf5346dbd91d882ca6",
        kind: "ACCOUNT",
      },
      spender: {
        address: "0x1e0049783f008a0085193e00003d00cd54003c71",
        kind: "ACCOUNT",
      },
      asset: {
        address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        name: "BoredApeYachtClub",
        collection: "BoredApeYachtClub",
        symbol: "BAYC",
        price: {
          source: "Simplehash",
          updatedAt: 1679331222,
          dollarValuePerToken: 7865.43,
        },
      },
    },
  } as EvmStateChangeErc721ApprovalForAll,
};

export const approveAllErc721Lock: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to lock any amount of your y00ts",
  rawInfo: {
    data: {
      amount: {
        before: "0",
        after:
          "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      },
      owner: {
        address: "0xe8b574b4bc261351c85f369c5fe84cfcc0f3095b",
        kind: "ACCOUNT",
      },
      spender: {
        address: "0xfa3ce71036dd4564d7d8de19d2b90fb856c5be82",
        kind: "ACCOUNT",
      },
      asset: {
        address: "0x670fd103b1a08628e9557cd66b87ded841115190",
        symbol: "y00t",
        name: "y00ts",
        collection: "y00ts",
        price: {
          source: "Simplehash",
          updatedAt: 1681958792,
          dollarValuePerToken: 1945.92,
        },
      },
    },
    kind: "ERC721_LOCK_APPROVAL_FOR_ALL",
  } as EvmStateChangeErc721LockApprovalForAll,
};

export const sendErc1155: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Send Parallel Alpha #10175",
  rawInfo: {
    data: {
      amount: {
        after: "0",
        before: "1",
      },
      metadata: {
        previews: {
          small: null,
          medium: null,
          large: null,
        },
        rawImageUrl:
          "https://lh3.googleusercontent.com/K0NLPpwmnDLG07FIxVrQuvGBR31azDTwx3VPy-GS0waeg5ORsZ_eZSZVpkZ-YHHt6eggoF_SUW5pNcm0yJ7XPJjymRDW0YqK37NQQQ=w650",
      },
      tokenId: "10175",
      asset: {
        address: "0x76BE3b62873462d2142405439777e971754E8E77",
        name: "Parallel Alpha",
        symbol: "LL",
        price: {
          source: "Coingecko",
          updatedAt: 1681958792,
          dollarValuePerToken: 0.93,
        },
      },
    },
    kind: "ERC1155_TRANSFER",
  } as EvmStateChangeErc1155Transfer,
};

export const receiveErc1155: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Receive Corgi",
  rawInfo: {
    kind: "ERC1155_TRANSFER",
    data: {
      amount: {
        after: "1",
        before: "0",
      },
      metadata: {
        rawImageUrl:
          "https://cdn.simplehash.com/assets/4bedd702e7ea8c4a9d04d83302138fa5b63d0cca0f06df9b87bdb09cff253b88.png",
      },
      tokenId: "13014975",
      counterparty: {
        kind: "ACCOUNT",
        address: "0x06924592cdf28acd3c1d23c37875c6c6a667bdf7",
      },
      asset: {
        address: "0x51e613727fdd2e0b91b51c3e5427e9440a7957e4",
        name: "Corgi",
        price: {
          source: "Simplehash",
          updatedAt: 1679331222,
          dollarValuePerToken: 232.43,
        },
      },
    },
  } as EvmStateChangeErc1155Transfer,
};

export const approveAllErc1155: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to transfer all your Sandbox's ASSETs",
  rawInfo: {
    kind: "ERC1155_APPROVAL_FOR_ALL",
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
      asset: {
        address: "0xa342f5d851e866e18ff98f351f2c6637f4478db5",
        name: "Sandbox ASSET",
        price: {
          source: "Simplehash",
          updatedAt: 1679331222,
          dollarValuePerToken: 232.43,
        },
      },
    },
  } as EvmStateChangeErc1155ApprovalForAll,
};
