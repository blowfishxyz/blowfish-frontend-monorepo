import {
  EvmMessageExpectedStateChange,
  EvmMessageStateChangeErc20Permit,
  EvmStateChangeErc20Transfer,
  EvmStateChangeErc721ApprovalForAll,
  EvmStateChangeErc721Transfer,
  EvmStateChangeNativeAssetTransfer,
  EvmTransactionExpectedStateChange,
  EvmMessageStateChangeAnyNftFromCollectionTransfer,
  EvmStateChangeErc1155ApprovalForAll,
  EvmStateChangeErc721Approval,
  EvmStateChangeErc20Approval,
  EvmStateChangeErc1155Transfer,
  SolanaExpectedStateChange,
  EvmStateChangeErc721Lock,
  EvmStateChangeErc721LockApproval,
  EvmStateChangeErc721LockApprovalForAll,
} from "../clients/v20230605";

export const sendNativeToken: EvmTransactionExpectedStateChange = {
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
  humanReadableDiff: "Approve to transfer 3.181 DAI",
  rawInfo: {
    data: {
      amount: {
        after: "998426264937289938488",
        before: "1001607264937289938488",
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
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        symbol: "DAI",
        name: "Dai Stablecoin",
        decimals: 18,
        verified: true,
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/evm__evm%3A%3Aethereum__evm%3A%3Aethereum%3A%3Amainnet__0x6b175474e89094c44da98b954eedeac495271d0f.png",
        price: {
          source: "Coingecko",
          updatedAt: 1681958792,
          dollarValuePerToken: 1,
        },
      },
    },
    kind: "ERC20_APPROVAL",
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
  humanReadableDiff: "Receive BoredApeYachtClub #1726",
  rawInfo: {
    data: {
      amount: {
        after: "1",
        before: "0",
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

export const unlockErc721: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Unlock BoredApeYachtClub #1726",
  rawInfo: {
    data: {
      amount: {
        after: "1",
        before: "0",
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
    kind: "ERC721_LOCK",
  } as EvmStateChangeErc721Lock,
};

export const approveErc721: EvmTransactionExpectedStateChange = {
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
    kind: "ERC721_APPROVAL",
  } as EvmStateChangeErc721Approval,
};

export const approveErc721Lock: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to lock all your BoredApeYachtClub",
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
    kind: "ERC721_LOCK_APPROVAL",
  } as EvmStateChangeErc721LockApproval,
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

export const approveAllErc721Lock: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to lock all your BoredApeYachtClub",
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

export const reveiveErc1155: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Send Parallel Alpha #10175",
  rawInfo: {
    data: {
      amount: {
        after: "1",
        before: "0",
      },
      metadata: {
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

export const approveAllErc1155: EvmTransactionExpectedStateChange = {
  humanReadableDiff: "Approve to transfer all your Parallel Alpha",
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
    kind: "ERC1155_APPROVAL_FOR_ALL",
  } as EvmStateChangeErc1155ApprovalForAll,
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
        imageUrl: null,
        price: {
          source: "Coingecko",
          updatedAt: 1691479249,
          dollarValuePerToken: 0.99998,
        },
      },
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
        imageUrl: null,
        metaplexTokenStandard: "unknown",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        supply: 5034943397677802,
        decimals: 6,
        price: {
          source: "Coingecko",
          updatedAt: 1691479249,
          dollarValuePerToken: 0.99998,
        },
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
        imageUrl:
          "https://d1ts37qlq4uz4s.cloudfront.net/solana__solana%3A%3Asolana__solana%3A%3Asolana%3A%3Amainnet__8ymi88q5DtmdNTn2sPRNFkvMkszMHuLJ1e3RVdWjPa3s.png",
      },
      diff: {
        sign: "MINUS",
        digits: 1,
      },
    },
  },
};
