import {
  AssetData,
  EvmTokenMetadata,
  Price,
} from "@blowfish/utils/BlowfishApiClient";

const dummyTxnSimulationData = [
  {
    rawInfo: {
      kind: "ERC721_APPROVAL",
      data: {
        symbol: "TKN",
        name: "Bored Ape",
        spender: { kind: "ACCOUNT", address: "0x9876543210fedcba" },
        contract: { kind: "ACCOUNT", address: "0x1234567890abcdef" },
        owner: { kind: "ACCOUNT", address: "0xfedcba0987654321" },
        tokenId: "12345",
        amount: { before: "100", after: "200" },
        metadata: {
          rawImageUrl: "/placeholder/placeholder-nft.svg",
        },
      },
    },
  },
  {
    rawInfo: {
      kind: "ERC721_APPROVAL",
      data: {
        symbol: "TKN",
        name: "Bored Ape",
        spender: { kind: "ACCOUNT", address: "0x9876543210fedcba" },
        contract: { kind: "ACCOUNT", address: "0x1234567890abcdef" },
        owner: { kind: "ACCOUNT", address: "0xfedcba0987654321" },
        tokenId: "12345",
        amount: { before: "100", after: "200" },
        metadata: {
          rawImageUrl: "/placeholder/placeholder-nft.svg",
        },
      },
    },
  },
  {
    rawInfo: {
      kind: "ERC721_APPROVAL",
      data: {
        symbol: "TKN",
        name: "Bored Ape",
        spender: { kind: "ACCOUNT", address: "0x9876543210fedcba" },
        contract: { kind: "ACCOUNT", address: "0x1234567890abcdef" },
        owner: { kind: "ACCOUNT", address: "0xfedcba0987654321" },
        tokenId: "12345",
        amount: { before: "100", after: "200" },
        metadata: {
          rawImageUrl: "/placeholder/placeholder-nft.svg",
        },
      },
    },
  },
  {
    rawInfo: {
      kind: "ERC20_APPROVAL",
      data: {
        name: "Token Name",
        symbol: "TKN",
        decimals: 18,
        spender: { kind: "ACCOUNT", address: "0x9876543210fedcba" },
        amount: { before: "0", after: "100" },
        contract: { kind: "ACCOUNT", address: "0x1234567890abcdef" },
        owner: { kind: "ACCOUNT", address: "0xfedcba0987654321" },
        asset: {
          address: "0x1234567890abcdef",
          decimals: 18,
          imageUrl: "/placeholder/placeholder-token.svg",
          lists: [],
          name: "Token Name",
          price: null,
          symbol: "TKN",
          verified: false,
        },
      },
    },
  },
];

const dummySignatureData = [
  {
    imageUrl: "/placeholder/placeholder-signature-image.svg",
    url: "blur.io",
    challenge: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    message: "Sign in to Blur",
  },
];

interface TxnData {
  metadata?: EvmTokenMetadata;
  name: string;
  symbol: string;
  tokenId?: string;
  assetPrice?: Price;
  asset?: AssetData;
}

type TxnSimulationDataType = {
  rawInfo: {
    kind: string;
    data: TxnData;
  };
};

type SignatureDataType = {
  imageUrl: string;
  url: string;
  challenge: string;
  message: string;
};

export { dummyTxnSimulationData, dummySignatureData };
export type { TxnSimulationDataType, SignatureDataType };
