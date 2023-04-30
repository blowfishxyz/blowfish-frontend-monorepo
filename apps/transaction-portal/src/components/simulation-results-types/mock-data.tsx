const dummyTxnSimulationData = [
  {
    rawInfo: {
      kind: "ERC721_APPROVAL",
      data: {
        metadata: {
          rawImageUrl: "/placeholder/placeholder-nft.svg",
        },
        name: "Bored Ape Yatch Club",
        symbol: "DNFT",
        tokenId: "1",
        assetPrice: {
          source: "Dummy Price Source",
          last_updated_at: Date.now(),
          dollar_value_per_token: 123.45,
        },
      },
    },
  },
  {
    rawInfo: {
      kind: "ERC721_APPROVAL",
      data: {
        metadata: {
          rawImageUrl: "/placeholder/placeholder-nft.svg",
        },
        name: "Bored Ape Yatch Club",
        symbol: "DNFT",
        tokenId: "1",
        assetPrice: {
          source: "Dummy Price Source",
          last_updated_at: Date.now(),
          dollar_value_per_token: 123.45,
        },
      },
    },
  },
  {
    rawInfo: {
      kind: "ERC721_APPROVAL",
      data: {
        metadata: {
          rawImageUrl: "/placeholder/placeholder-nft.svg",
        },
        name: "Bored Ape Yatch Club",
        symbol: "DNFT",
        tokenId: "1",
        assetPrice: {
          source: "Dummy Price Source",
          last_updated_at: Date.now(),
          dollar_value_per_token: 123.45,
        },
      },
    },
  },
  {
    rawInfo: {
      kind: "",
      data: {
        metadata: {
          rawImageUrl: "/placeholder/placeholder-nft.svg",
        },
        name: "Bored Ape Yatch Club",
        symbol: "DNFT",
        tokenId: "1",
        assetPrice: {
          source: "Dummy Price Source",
          last_updated_at: Date.now(),
          dollar_value_per_token: 123.45,
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
interface NftMetadata {
  rawImageUrl: string;
}

interface AssetPrice {
  source: string;
  last_updated_at: number;
  dollar_value_per_token: number;
}

interface TxnData {
  metadata: NftMetadata;
  name: string;
  symbol: string;
  tokenId: string;
  assetPrice: AssetPrice;
}

type RawInfo = {
  kind: string;
  data: TxnData;
};

type TxnSimulationDataType = {
  rawInfo: RawInfo;
};

type SignatureDataType = {
  imageUrl: string;
  url: string;
  challenge: string;
  message: string;
};

export { dummyTxnSimulationData, dummySignatureData };
export type { TxnSimulationDataType, SignatureDataType, RawInfo };
