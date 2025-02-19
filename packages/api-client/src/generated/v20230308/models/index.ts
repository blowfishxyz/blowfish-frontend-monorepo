/* tslint:disable */
/* eslint-disable */

/**
 * An enum value specifying the suggested action for a wallet to take.
 * Possible values:
 *   - `BLOCK`: Show the user a block screen instead of the signing UI since this is highly likely to be a malicious transaction. We suggest still having a greyed out link allowing the user to proceed if they really think they know better
 *   - `WARN`: Show the user the supplied warnings.
 *   - `NONE`: Show the signing UI without modification.
 * @export
 */
export const ActionEnum = {
  None: "NONE",
  Block: "BLOCK",
  Warn: "WARN",
} as const;
export type ActionEnum = (typeof ActionEnum)[keyof typeof ActionEnum];

/**
 *
 * @export
 * @interface Asset
 */
export interface Asset {
  /**
   * The contract address of the asset
   * @type {string}
   * @memberof Asset
   */
  address: string;
  /**
   * The symbol of the asset
   * @type {string}
   * @memberof Asset
   */
  symbol: string | null;
  /**
   * The name of the asset
   * @type {string}
   * @memberof Asset
   */
  name: string | null;
  /**
   * The number of decimal places used by the asset
   * @type {number}
   * @memberof Asset
   */
  decimals: number | null;
  /**
   * Whether the asset is verified as safe
   * @type {boolean}
   * @memberof Asset
   */
  verified: boolean;
  /**
   * The trusted token lists on which this asset is listed
   * @type {Array<string>}
   * @memberof Asset
   */
  lists: Array<AssetListsEnum>;
  /**
   * The URL of the asset's image. Can be `null`.
   * @type {string}
   * @memberof Asset
   */
  imageUrl: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof Asset
   */
  price: AssetPrice | null;
}

/**
 * @export
 */
export const AssetListsEnum = {
  Coingecko: "COINGECKO",
  Zerion: "ZERION",
  OneInch: "ONE_INCH",
  Uniswap: "UNISWAP",
  MyCryptoApi: "MY_CRYPTO_API",
  KlerosTokens: "KLEROS_TOKENS",
  PolygonPopularTokens: "POLYGON_POPULAR_TOKENS",
  EvmNative: "EVM_NATIVE",
  Blowfish: "BLOWFISH",
} as const;
export type AssetListsEnum =
  (typeof AssetListsEnum)[keyof typeof AssetListsEnum];

/**
 *
 * @export
 * @interface AssetPrice
 */
export interface AssetPrice {
  /**
   *
   * @type {string}
   * @memberof AssetPrice
   */
  source: AssetPriceSourceEnum;
  /**
   *
   * @type {number}
   * @memberof AssetPrice
   */
  updatedAt: number;
  /**
   *
   * @type {number}
   * @memberof AssetPrice
   */
  dollarValuePerToken: number;
}

/**
 * @export
 */
export const AssetPriceSourceEnum = {
  Simplehash: "Simplehash",
  Defillama: "Defillama",
  Coingecko: "Coingecko",
} as const;
export type AssetPriceSourceEnum =
  (typeof AssetPriceSourceEnum)[keyof typeof AssetPriceSourceEnum];

/**
 *
 * @export
 * @interface BadRequest
 */
export interface BadRequest {
  /**
   * The error that caused the 400
   * @type {string}
   * @memberof BadRequest
   */
  error: string;
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof BadRequest
   */
  requestId?: string;
}

/**
 *
 * @export
 */
export const CompressedNftStandard = {
  MetaplexBubblegum: "metaplex_bubblegum",
} as const;
export type CompressedNftStandard =
  (typeof CompressedNftStandard)[keyof typeof CompressedNftStandard];

/**
 *
 * @export
 * @interface Diff
 */
export interface Diff {
  /**
   * Whether the amount is positive or negative
   * @type {string}
   * @memberof Diff
   */
  sign: DiffSignEnum;
  /**
   *
   * @type {number}
   * @memberof Diff
   */
  digits: number;
}

/**
 * @export
 */
export const DiffSignEnum = {
  Plus: "PLUS",
  Minus: "MINUS",
} as const;
export type DiffSignEnum = (typeof DiffSignEnum)[keyof typeof DiffSignEnum];

/**
 *
 * @export
 * @interface DownloadBlocklist200Response
 */
export interface DownloadBlocklist200Response {
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof DownloadBlocklist200Response
   */
  requestId: string;
  /**
   *
   * @type {DownloadBlocklist200ResponseBloomFilter}
   * @memberof DownloadBlocklist200Response
   */
  bloomFilter: DownloadBlocklist200ResponseBloomFilter;
  /**
   *
   * @type {Array<string>}
   * @memberof DownloadBlocklist200Response
   */
  recentlyAdded: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof DownloadBlocklist200Response
   */
  recentlyRemoved: Array<string>;
  /**
   * Cursor to fetch the next batch of `recentlyAdded` and `recentlyRemoved` domains. Use this value in the `cursor` field of the next request to only fetch new domains.
   * @type {string}
   * @memberof DownloadBlocklist200Response
   */
  nextCursor?: string;
}
/**
 *
 * @export
 * @interface DownloadBlocklist200ResponseBloomFilter
 */
export interface DownloadBlocklist200ResponseBloomFilter {
  /**
   *
   * @type {string}
   * @memberof DownloadBlocklist200ResponseBloomFilter
   */
  url: string;
  /**
   *
   * @type {string}
   * @memberof DownloadBlocklist200ResponseBloomFilter
   */
  hash: string;
}
/**
 *
 * @export
 * @interface DownloadBlocklistRequest
 */
export interface DownloadBlocklistRequest {
  /**
   * Excludes domain from the blocklist if it is present on one of these lists
   * @type {Array<string>}
   * @memberof DownloadBlocklistRequest
   */
  allowLists?: Array<DownloadBlocklistRequestAllowListsEnum>;
  /**
   * Block domain if it is present on one of these lists
   * @type {Array<string>}
   * @memberof DownloadBlocklistRequest
   */
  blockLists?: Array<DownloadBlocklistRequestBlockListsEnum>;
  /**
   * Override domain blocking if domain is present on one of these lists, even if it's block-listed on of regular block lists
   * @type {Array<string>}
   * @memberof DownloadBlocklistRequest
   */
  priorityAllowLists?: Array<DownloadBlocklistRequestPriorityAllowListsEnum>;
  /**
   * Always block domain if it present on one of these lists, even if it's allow-listed on one of regular allow lists
   * @type {Array<string>}
   * @memberof DownloadBlocklistRequest
   */
  priorityBlockLists?: Array<DownloadBlocklistRequestPriorityBlockListsEnum>;
  /**
   * How long a bloom filter and corresponding `hash` should remain static. By default, 24 hours. Minimum 24 hours, maximum 14 days. During this time, new domains will be added to `recentlyAdded` and removed from `recentlyRemoved` fields.
   * @type {number}
   * @memberof DownloadBlocklistRequest
   */
  bloomFilterTtl?: number;
  /**
   * A cursor to only fetch new `recentlyAdded` and `recentlyRemoved`. Has no impact on the bloom filter. Use value from `nextCursor` field in the previous response.
   * @type {string}
   * @memberof DownloadBlocklistRequest
   */
  cursor?: string;
}

/**
 * @export
 */
export const DownloadBlocklistRequestAllowListsEnum = {
  Blowfish: "BLOWFISH",
  Metamask: "METAMASK",
  Defillama: "DEFILLAMA",
} as const;
export type DownloadBlocklistRequestAllowListsEnum =
  (typeof DownloadBlocklistRequestAllowListsEnum)[keyof typeof DownloadBlocklistRequestAllowListsEnum];

/**
 * @export
 */
export const DownloadBlocklistRequestBlockListsEnum = {
  Phantom: "PHANTOM",
  Blowfish: "BLOWFISH",
  BlowfishAutomated: "BLOWFISH_AUTOMATED",
  Solfare: "SOLFARE",
  Phishfort: "PHISHFORT",
  Scamsniffer: "SCAMSNIFFER",
  Metamask: "METAMASK",
} as const;
export type DownloadBlocklistRequestBlockListsEnum =
  (typeof DownloadBlocklistRequestBlockListsEnum)[keyof typeof DownloadBlocklistRequestBlockListsEnum];

/**
 * @export
 */
export const DownloadBlocklistRequestPriorityAllowListsEnum = {
  Blowfish: "BLOWFISH",
  Metamask: "METAMASK",
  Defillama: "DEFILLAMA",
} as const;
export type DownloadBlocklistRequestPriorityAllowListsEnum =
  (typeof DownloadBlocklistRequestPriorityAllowListsEnum)[keyof typeof DownloadBlocklistRequestPriorityAllowListsEnum];

/**
 * @export
 */
export const DownloadBlocklistRequestPriorityBlockListsEnum = {
  Phantom: "PHANTOM",
  Blowfish: "BLOWFISH",
  BlowfishAutomated: "BLOWFISH_AUTOMATED",
  Solfare: "SOLFARE",
  Phishfort: "PHISHFORT",
  Scamsniffer: "SCAMSNIFFER",
  Metamask: "METAMASK",
} as const;
export type DownloadBlocklistRequestPriorityBlockListsEnum =
  (typeof DownloadBlocklistRequestPriorityBlockListsEnum)[keyof typeof DownloadBlocklistRequestPriorityBlockListsEnum];

/**
 * Override a EIP-4337 wallet contract to bypass signature validation during simulation. This allows you to pass bytes(0) instead of the user signature when encoding the EIP4337 entrypoint transaction for scanning & simulation. NOTE: This is an advanced feature that may require additional configuration on Blowfish's end to support your architecture. Please reach out to us if you have any issues
 * @export
 * @interface Eip4337WalletPreset
 */
export interface Eip4337WalletPreset {
  /**
   * The kind of simulator preset configuration to apply
   * @type {string}
   * @memberof Eip4337WalletPreset
   */
  kind: Eip4337WalletPresetKindEnum;
  /**
   * The address of the contract that will validate the user signature as part of the EIP-4337 transaction. In most cases this is the user's own wallet contract.
   * @type {string}
   * @memberof Eip4337WalletPreset
   */
  signatureValidationContract: string;
}

/**
 * @export
 */
export const Eip4337WalletPresetKindEnum = {
  Eip4337Wallet: "EIP4337_WALLET",
} as const;
export type Eip4337WalletPresetKindEnum =
  (typeof Eip4337WalletPresetKindEnum)[keyof typeof Eip4337WalletPresetKindEnum];

/**
 * Solidity token value. Addresses are serialized with `0x` prefix. Bytes and numbers are serialized as hex with `0x` prefix.
 * Serialized as a list of tokens if parameter is an array.
 * @export
 * @interface EvmAbiSerializedToken
 */
export interface EvmAbiSerializedToken {}
/**
 *
 * @export
 * @interface EvmAddressInfo
 */
export interface EvmAddressInfo {
  /**
   * The blockchain address
   * @type {string}
   * @memberof EvmAddressInfo
   */
  address: string;
  /**
   * The type of address
   * @type {string}
   * @memberof EvmAddressInfo
   */
  kind: EvmAddressInfoKindEnum;
}

/**
 * @export
 */
export const EvmAddressInfoKindEnum = {
  Account: "ACCOUNT",
} as const;
export type EvmAddressInfoKindEnum =
  (typeof EvmAddressInfoKindEnum)[keyof typeof EvmAddressInfoKindEnum];

/**
 *
 * @export
 * @interface EvmAmount
 */
export interface EvmAmount {
  /**
   * The value of the amount after the state change occurs
   * @type {string}
   * @memberof EvmAmount
   */
  after: string;
  /**
   * The value of the amount before the state change occurs
   * @type {string}
   * @memberof EvmAmount
   */
  before: string;
}
/**
 *
 * @export
 * @interface EvmAsset
 */
export interface EvmAsset {
  /**
   * The contract address of the asset
   * @type {string}
   * @memberof EvmAsset
   */
  address: string;
  /**
   * The symbol of the asset
   * @type {string}
   * @memberof EvmAsset
   */
  symbol: string;
  /**
   * The name of the asset
   * @type {string}
   * @memberof EvmAsset
   */
  name: string;
  /**
   * The number of decimal places used by the asset
   * @type {number}
   * @memberof EvmAsset
   */
  decimals: number;
  /**
   * Whether the asset is verified as safe
   * @type {boolean}
   * @memberof EvmAsset
   */
  verified: boolean;
  /**
   * The trusted token lists on which this asset is listed
   * @type {Array<string>}
   * @memberof EvmAsset
   */
  lists: Array<EvmAssetListsEnum>;
  /**
   * The URL of the asset's image. Can be `null`.
   * @type {string}
   * @memberof EvmAsset
   */
  imageUrl: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmAsset
   */
  price: AssetPrice | null;
}

/**
 * @export
 */
export const EvmAssetListsEnum = {
  Coingecko: "COINGECKO",
  Zerion: "ZERION",
  OneInch: "ONE_INCH",
  Uniswap: "UNISWAP",
  MyCryptoApi: "MY_CRYPTO_API",
  KlerosTokens: "KLEROS_TOKENS",
  PolygonPopularTokens: "POLYGON_POPULAR_TOKENS",
  EvmNative: "EVM_NATIVE",
  Blowfish: "BLOWFISH",
} as const;
export type EvmAssetListsEnum =
  (typeof EvmAssetListsEnum)[keyof typeof EvmAssetListsEnum];

/**
 * @type EvmDecodedCalldata
 * Parsed `data` field of the transaction using the contract's ABI. We don't recommend displaying this field to users when contract isn't trusted
 * (for example, using `protocol` field), as scammers can verify ABI with arbitrary and misleading function names (e.g. `withdraw`, when it's actually a transfer).
 * Can be `null` if ABI is not available for contract or we failed to parse it.
 * @export
 */
export type EvmDecodedCalldata =
  | ({ kind: "FUNCTION" } & EvmDecodedCalldataFunction)
  | ({ kind: "PROXIED_FUNCTION" } & EvmDecodedCalldataProxiedFunction);
/**
 * Argument of a function call.
 * @export
 * @interface EvmDecodedCalldataArgument
 */
export interface EvmDecodedCalldataArgument {
  /**
   * Name of the argument
   * @type {string}
   * @memberof EvmDecodedCalldataArgument
   */
  name: string;
  /**
   *
   * @type {EvmAbiSerializedToken}
   * @memberof EvmDecodedCalldataArgument
   */
  value: EvmAbiSerializedToken;
  /**
   * Type of the argument
   * @type {string}
   * @memberof EvmDecodedCalldataArgument
   */
  paramType: string;
}
/**
 * Direct function call in a contract.
 * @export
 * @interface EvmDecodedCalldataFunction
 */
export interface EvmDecodedCalldataFunction {
  /**
   *
   * @type {string}
   * @memberof EvmDecodedCalldataFunction
   */
  kind: EvmDecodedCalldataFunctionKindEnum;
  /**
   *
   * @type {EvmDecodedCalldataFunctionData}
   * @memberof EvmDecodedCalldataFunction
   */
  data: EvmDecodedCalldataFunctionData;
}

/**
 * @export
 */
export const EvmDecodedCalldataFunctionKindEnum = {
  Function: "FUNCTION",
} as const;
export type EvmDecodedCalldataFunctionKindEnum =
  (typeof EvmDecodedCalldataFunctionKindEnum)[keyof typeof EvmDecodedCalldataFunctionKindEnum];

/**
 *
 * @export
 * @interface EvmDecodedCalldataFunctionData
 */
export interface EvmDecodedCalldataFunctionData {
  /**
   * Contract address from `to` field that was called
   * @type {string}
   * @memberof EvmDecodedCalldataFunctionData
   */
  contract: string;
  /**
   * Name of the called function in the contract
   * @type {string}
   * @memberof EvmDecodedCalldataFunctionData
   */
  functionName: string;
  /**
   *
   * @type {Array<EvmDecodedCalldataArgument>}
   * @memberof EvmDecodedCalldataFunctionData
   */
  arguments: Array<EvmDecodedCalldataArgument>;
}
/**
 * Function call in a contract that went through a fallback on a proxy contract.
 * We include function name and arguments for the final implementation contract.
 * @export
 * @interface EvmDecodedCalldataProxiedFunction
 */
export interface EvmDecodedCalldataProxiedFunction {
  /**
   *
   * @type {string}
   * @memberof EvmDecodedCalldataProxiedFunction
   */
  kind: EvmDecodedCalldataProxiedFunctionKindEnum;
  /**
   *
   * @type {EvmDecodedCalldataProxiedFunctionData}
   * @memberof EvmDecodedCalldataProxiedFunction
   */
  data: EvmDecodedCalldataProxiedFunctionData;
}

/**
 * @export
 */
export const EvmDecodedCalldataProxiedFunctionKindEnum = {
  ProxiedFunction: "PROXIED_FUNCTION",
} as const;
export type EvmDecodedCalldataProxiedFunctionKindEnum =
  (typeof EvmDecodedCalldataProxiedFunctionKindEnum)[keyof typeof EvmDecodedCalldataProxiedFunctionKindEnum];

/**
 *
 * @export
 * @interface EvmDecodedCalldataProxiedFunctionData
 */
export interface EvmDecodedCalldataProxiedFunctionData {
  /**
   * Original proxy contract address from `to` field
   * @type {string}
   * @memberof EvmDecodedCalldataProxiedFunctionData
   */
  contract: string;
  /**
   * Implementation contract address that was called after going through the proxy and contains the parsed function
   * @type {string}
   * @memberof EvmDecodedCalldataProxiedFunctionData
   */
  proxiedImplementation: string;
  /**
   * Name of the called function in the contract
   * @type {string}
   * @memberof EvmDecodedCalldataProxiedFunctionData
   */
  functionName: string;
  /**
   *
   * @type {Array<EvmDecodedCalldataArgument>}
   * @memberof EvmDecodedCalldataProxiedFunctionData
   */
  arguments: Array<EvmDecodedCalldataArgument>;
}
/**
 * Decoded event. Null if not decoded
 * @export
 * @interface EvmDecodedLog
 */
export interface EvmDecodedLog {
  /**
   * Event name
   * @type {string}
   * @memberof EvmDecodedLog
   */
  name: string;
  /**
   * Hash of event signature. First topic
   * @type {string}
   * @memberof EvmDecodedLog
   */
  signature: string;
  /**
   *
   * @type {Array<EvmDecodedLogParam>}
   * @memberof EvmDecodedLog
   */
  params: Array<EvmDecodedLogParam>;
}
/**
 *
 * @export
 * @interface EvmDecodedLogParam
 */
export interface EvmDecodedLogParam {
  /**
   * Parameter name
   * @type {string}
   * @memberof EvmDecodedLogParam
   */
  name: string;
  /**
   * Parameter type
   * @type {string}
   * @memberof EvmDecodedLogParam
   */
  paramType: string;
  /**
   *
   * @type {EvmAbiSerializedToken}
   * @memberof EvmDecodedLogParam
   */
  value: EvmAbiSerializedToken;
}
/**
 *
 * @export
 * @interface EvmExpectedStateChangesInner
 */
export interface EvmExpectedStateChangesInner {
  /**
   * Computed explanation of the state change that can be directly presented to the end-user. While the API is still in development, we suggest integrators expose this in their signing UI if they encounter a `rawInfo.kind` they don't recognize.
   * @type {string}
   * @memberof EvmExpectedStateChangesInner
   */
  humanReadableDiff: string;
  /**
   *
   * @type {EvmExpectedStateChangesInnerRawInfo}
   * @memberof EvmExpectedStateChangesInner
   */
  rawInfo: EvmExpectedStateChangesInnerRawInfo;
}
/**
 * @type EvmExpectedStateChangesInnerRawInfo
 * A machine-parsable state change object describing the state change.
 * @export
 */
export type EvmExpectedStateChangesInnerRawInfo =
  | ({
      kind: "ANY_NFT_FROM_COLLECTION_TRANSFER";
    } & EvmStateChangeAnyNftFromCollectionTransfer)
  | ({ kind: "ERC1155_APPROVAL_FOR_ALL" } & EvmStateChangeErc1155ApprovalForAll)
  | ({ kind: "ERC1155_TRANSFER" } & EvmStateChangeErc1155Transfer)
  | ({ kind: "ERC20_APPROVAL" } & EvmStateChangeErc20Approval)
  | ({ kind: "ERC20_TRANSFER" } & EvmStateChangeErc20Transfer)
  | ({ kind: "ERC721_APPROVAL" } & EvmStateChangeErc721Approval)
  | ({ kind: "ERC721_APPROVAL_FOR_ALL" } & EvmStateChangeErc721ApprovalForAll)
  | ({ kind: "ERC721_LOCK" } & EvmStateChangeErc721Lock)
  | ({ kind: "ERC721_LOCK_APPROVAL" } & EvmStateChangeErc721LockApproval)
  | ({
      kind: "ERC721_LOCK_APPROVAL_FOR_ALL";
    } & EvmStateChangeErc721LockApprovalForAll)
  | ({ kind: "ERC721_TRANSFER" } & EvmStateChangeErc721Transfer)
  | ({
      kind: "FARCASTER_CHANGE_RECOVERY_ADDRESS";
    } & EvmStateChangeFarcasterChangeRecoveryAddress)
  | ({ kind: "FARCASTER_STORAGE_RENT" } & EvmStateChangeFarcasterStorageRent)
  | ({ kind: "NATIVE_ASSET_TRANSFER" } & EvmStateChangeNativeAssetTransfer);
/**
 *
 * @export
 * @interface EvmLog
 */
export interface EvmLog {
  /**
   *
   * @type {string}
   * @memberof EvmLog
   */
  address: string;
  /**
   *
   * @type {Array<string>}
   * @memberof EvmLog
   */
  topics: Array<string>;
  /**
   *
   * @type {string}
   * @memberof EvmLog
   */
  data: string;
}
/**
 * A "wildcard" NFT transfer representing the transfer of any NFT from a given collection (eg. Opensea collection offers)
 * @export
 * @interface EvmMessageStateChangeAnyNftFromCollectionTransfer
 */
export interface EvmMessageStateChangeAnyNftFromCollectionTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransfer
   */
  kind: EvmMessageStateChangeAnyNftFromCollectionTransferKindEnum;
  /**
   *
   * @type {EvmMessageStateChangeAnyNftFromCollectionTransferData}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransfer
   */
  data: EvmMessageStateChangeAnyNftFromCollectionTransferData;
}

/**
 * @export
 */
export const EvmMessageStateChangeAnyNftFromCollectionTransferKindEnum = {
  AnyNftFromCollectionTransfer: "ANY_NFT_FROM_COLLECTION_TRANSFER",
} as const;
export type EvmMessageStateChangeAnyNftFromCollectionTransferKindEnum =
  (typeof EvmMessageStateChangeAnyNftFromCollectionTransferKindEnum)[keyof typeof EvmMessageStateChangeAnyNftFromCollectionTransferKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmMessageStateChangeAnyNftFromCollectionTransferData
 */
export interface EvmMessageStateChangeAnyNftFromCollectionTransferData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferData
   */
  asset: EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset;
}
/**
 * Represents NFT collection as a whole, including collection-level image, etc.
 * @export
 * @interface EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset
 */
export interface EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset {
  /**
   * The contract address of the asset
   * @type {string}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset
   */
  address: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset
   */
  symbol: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset
   */
  name: string;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset
   */
  price?: AssetPrice | null;
  /**
   * The URL of the collection's cover image
   * @type {string}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset
   */
  imageUrl?: string | null;
  /**
   * The type of specified NFT
   * @type {string}
   * @memberof EvmMessageStateChangeAnyNftFromCollectionTransferDataAsset
   */
  type: EvmMessageStateChangeAnyNftFromCollectionTransferDataAssetTypeEnum;
}

/**
 * @export
 */
export const EvmMessageStateChangeAnyNftFromCollectionTransferDataAssetTypeEnum =
  {
    Erc721: "ERC721",
    Erc1155: "ERC1155",
  } as const;
export type EvmMessageStateChangeAnyNftFromCollectionTransferDataAssetTypeEnum =
  (typeof EvmMessageStateChangeAnyNftFromCollectionTransferDataAssetTypeEnum)[keyof typeof EvmMessageStateChangeAnyNftFromCollectionTransferDataAssetTypeEnum];

/**
 * ERC1155 transfers
 * @export
 * @interface EvmMessageStateChangeErc1155Transfer
 */
export interface EvmMessageStateChangeErc1155Transfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmMessageStateChangeErc1155Transfer
   */
  kind: EvmMessageStateChangeErc1155TransferKindEnum;
  /**
   *
   * @type {EvmStateChangeErc1155TransferData}
   * @memberof EvmMessageStateChangeErc1155Transfer
   */
  data: EvmStateChangeErc1155TransferData;
}

/**
 * @export
 */
export const EvmMessageStateChangeErc1155TransferKindEnum = {
  Erc1155Transfer: "ERC1155_TRANSFER",
} as const;
export type EvmMessageStateChangeErc1155TransferKindEnum =
  (typeof EvmMessageStateChangeErc1155TransferKindEnum)[keyof typeof EvmMessageStateChangeErc1155TransferKindEnum];

/**
 * ERC20 token permit message
 * @export
 * @interface EvmMessageStateChangeErc20Permit
 */
export interface EvmMessageStateChangeErc20Permit {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmMessageStateChangeErc20Permit
   */
  kind: EvmMessageStateChangeErc20PermitKindEnum;
  /**
   *
   * @type {EvmMessageStateChangeErc20PermitData}
   * @memberof EvmMessageStateChangeErc20Permit
   */
  data: EvmMessageStateChangeErc20PermitData;
}

/**
 * @export
 */
export const EvmMessageStateChangeErc20PermitKindEnum = {
  Erc20Permit: "ERC20_PERMIT",
} as const;
export type EvmMessageStateChangeErc20PermitKindEnum =
  (typeof EvmMessageStateChangeErc20PermitKindEnum)[keyof typeof EvmMessageStateChangeErc20PermitKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmMessageStateChangeErc20PermitData
 */
export interface EvmMessageStateChangeErc20PermitData {
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeErc20PermitData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeErc20PermitData
   */
  owner: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeErc20PermitData
   */
  spender: EvmAddressInfo;
  /**
   * Stringified base unit amount of the token
   * @type {string}
   * @memberof EvmMessageStateChangeErc20PermitData
   */
  amount: string;
  /**
   * Stringified nonce number
   * @type {string}
   * @memberof EvmMessageStateChangeErc20PermitData
   */
  nonce: string;
  /**
   * Unix timestamp when this permit will expire. Can be `null`: indicates no deadline.
   * @type {number}
   * @memberof EvmMessageStateChangeErc20PermitData
   */
  deadline: number | null;
  /**
   *
   * @type {EvmAsset}
   * @memberof EvmMessageStateChangeErc20PermitData
   */
  asset: EvmAsset;
}
/**
 * ERC20 token transfers
 * @export
 * @interface EvmMessageStateChangeErc20Transfer
 */
export interface EvmMessageStateChangeErc20Transfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmMessageStateChangeErc20Transfer
   */
  kind: EvmMessageStateChangeErc20TransferKindEnum;
  /**
   *
   * @type {EvmStateChangeErc20TransferData}
   * @memberof EvmMessageStateChangeErc20Transfer
   */
  data: EvmStateChangeErc20TransferData;
}

/**
 * @export
 */
export const EvmMessageStateChangeErc20TransferKindEnum = {
  Erc20Transfer: "ERC20_TRANSFER",
} as const;
export type EvmMessageStateChangeErc20TransferKindEnum =
  (typeof EvmMessageStateChangeErc20TransferKindEnum)[keyof typeof EvmMessageStateChangeErc20TransferKindEnum];

/**
 * ERC721 NFT transfers
 * @export
 * @interface EvmMessageStateChangeErc721Transfer
 */
export interface EvmMessageStateChangeErc721Transfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmMessageStateChangeErc721Transfer
   */
  kind: EvmMessageStateChangeErc721TransferKindEnum;
  /**
   *
   * @type {EvmStateChangeErc721TransferData}
   * @memberof EvmMessageStateChangeErc721Transfer
   */
  data: EvmStateChangeErc721TransferData;
}

/**
 * @export
 */
export const EvmMessageStateChangeErc721TransferKindEnum = {
  Erc721Transfer: "ERC721_TRANSFER",
} as const;
export type EvmMessageStateChangeErc721TransferKindEnum =
  (typeof EvmMessageStateChangeErc721TransferKindEnum)[keyof typeof EvmMessageStateChangeErc721TransferKindEnum];

/**
 * ETH transfers
 * @export
 * @interface EvmMessageStateChangeNativeAssetTransfer
 */
export interface EvmMessageStateChangeNativeAssetTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmMessageStateChangeNativeAssetTransfer
   */
  kind: EvmMessageStateChangeNativeAssetTransferKindEnum;
  /**
   *
   * @type {EvmStateChangeNativeAssetTransferData}
   * @memberof EvmMessageStateChangeNativeAssetTransfer
   */
  data: EvmStateChangeNativeAssetTransferData;
}

/**
 * @export
 */
export const EvmMessageStateChangeNativeAssetTransferKindEnum = {
  NativeAssetTransfer: "NATIVE_ASSET_TRANSFER",
} as const;
export type EvmMessageStateChangeNativeAssetTransferKindEnum =
  (typeof EvmMessageStateChangeNativeAssetTransferKindEnum)[keyof typeof EvmMessageStateChangeNativeAssetTransferKindEnum];

/**
 * A Polymarket Order
 * @export
 * @interface EvmMessageStateChangePolymarketOrder
 */
export interface EvmMessageStateChangePolymarketOrder {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrder
   */
  kind: EvmMessageStateChangePolymarketOrderKindEnum;
  /**
   *
   * @type {EvmMessageStateChangePolymarketOrderData}
   * @memberof EvmMessageStateChangePolymarketOrder
   */
  data: EvmMessageStateChangePolymarketOrderData;
}

/**
 * @export
 */
export const EvmMessageStateChangePolymarketOrderKindEnum = {
  PolymarketOrder: "POLYMARKET_ORDER",
} as const;
export type EvmMessageStateChangePolymarketOrderKindEnum =
  (typeof EvmMessageStateChangePolymarketOrderKindEnum)[keyof typeof EvmMessageStateChangePolymarketOrderKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmMessageStateChangePolymarketOrderData
 */
export interface EvmMessageStateChangePolymarketOrderData {
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  maker: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  taker: EvmAddressInfo;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  tokenId: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  question: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  outcome: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  outcomePrice: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  makerAmount: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  takerAmount: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangePolymarketOrderData
   */
  side: EvmMessageStateChangePolymarketOrderDataSideEnum;
}

/**
 * @export
 */
export const EvmMessageStateChangePolymarketOrderDataSideEnum = {
  Buy: "BUY",
  Sell: "SELL",
} as const;
export type EvmMessageStateChangePolymarketOrderDataSideEnum =
  (typeof EvmMessageStateChangePolymarketOrderDataSideEnum)[keyof typeof EvmMessageStateChangePolymarketOrderDataSideEnum];

/**
 *
 * @export
 * @interface EvmNativeAsset
 */
export interface EvmNativeAsset {
  /**
   * The contract address of the asset
   * @type {string}
   * @memberof EvmNativeAsset
   */
  address: string;
  /**
   * The symbol of the asset
   * @type {string}
   * @memberof EvmNativeAsset
   */
  symbol: string;
  /**
   * The name of the asset
   * @type {string}
   * @memberof EvmNativeAsset
   */
  name: string;
  /**
   * The number of decimal places used by the asset. Always true for the native asset.
   * @type {number}
   * @memberof EvmNativeAsset
   */
  decimals: number;
  /**
   * Whether the asset is verified as safe
   * @type {boolean}
   * @memberof EvmNativeAsset
   */
  verified: boolean;
  /**
   * The URL of the asset's image. Can be `null`.
   * @type {string}
   * @memberof EvmNativeAsset
   */
  imageUrl: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmNativeAsset
   */
  price: AssetPrice | null;
}
/**
 * Metadata associated with the NFT
 * @export
 * @interface EvmNftMetadata
 */
export interface EvmNftMetadata {
  /**
   *
   * @type {string}
   * @memberof EvmNftMetadata
   */
  rawImageUrl: string;
  /**
   *
   * @type {NftPreviews}
   * @memberof EvmNftMetadata
   */
  previews?: NftPreviews;
}
/**
 *
 * @export
 * @interface EvmPersonalSign
 */
export interface EvmPersonalSign {
  /**
   *
   * @type {string}
   * @memberof EvmPersonalSign
   */
  kind: EvmPersonalSignKindEnum;
  /**
   * The unprefixed personal sign message that the dapp is proposing the user to sign.
   * @type {string}
   * @memberof EvmPersonalSign
   */
  rawMessage: string;
}

/**
 * @export
 */
export const EvmPersonalSignKindEnum = {
  PersonalSign: "PERSONAL_SIGN",
} as const;
export type EvmPersonalSignKindEnum =
  (typeof EvmPersonalSignKindEnum)[keyof typeof EvmPersonalSignKindEnum];

/**
 * Human-readable protocol information. Note that a single protocol can consist of multiple contracts.
 * @export
 * @interface EvmProtocol
 */
export interface EvmProtocol {
  /**
   * `NATIVE` means it’s a native asset transfer, an operation on WETH or any other transaction that is considered to be as secure as the chain itself. `TRUSTED` means it’s one of core projects that control 80-90% of TVL on the chain. `KNOWN` means it’s one of “long tail projects” without significant adoption.
   * @type {string}
   * @memberof EvmProtocol
   */
  trustLevel: EvmProtocolTrustLevelEnum;
  /**
   *
   * @type {string}
   * @memberof EvmProtocol
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof EvmProtocol
   */
  description: string;
  /**
   * URL of the protocol's logo. Can be null if no logo is available.
   * @type {string}
   * @memberof EvmProtocol
   */
  imageUrl: string | null;
  /**
   *
   * @type {string}
   * @memberof EvmProtocol
   */
  websiteUrl: string;
}

/**
 * @export
 */
export const EvmProtocolTrustLevelEnum = {
  Known: "KNOWN",
  Trusted: "TRUSTED",
  Native: "NATIVE",
} as const;
export type EvmProtocolTrustLevelEnum =
  (typeof EvmProtocolTrustLevelEnum)[keyof typeof EvmProtocolTrustLevelEnum];

/**
 *
 * @export
 * @interface EvmSignMessage
 */
export interface EvmSignMessage {
  /**
   *
   * @type {string}
   * @memberof EvmSignMessage
   */
  kind: EvmSignMessageKindEnum;
  /**
   * The hex encoded eth_sign message that the dapp is proposing the user to sign.
   * @type {string}
   * @memberof EvmSignMessage
   */
  rawMessage: string;
}

/**
 * @export
 */
export const EvmSignMessageKindEnum = {
  SignMessage: "SIGN_MESSAGE",
} as const;
export type EvmSignMessageKindEnum =
  (typeof EvmSignMessageKindEnum)[keyof typeof EvmSignMessageKindEnum];

/**
 *
 * @export
 * @interface EvmSignTypedData
 */
export interface EvmSignTypedData {
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedData
   */
  kind?: EvmSignTypedDataKindEnum;
  /**
   *
   * @type {EvmSignTypedDataData}
   * @memberof EvmSignTypedData
   */
  data?: EvmSignTypedDataData;
}

/**
 * @export
 */
export const EvmSignTypedDataKindEnum = {
  SignTypedData: "SIGN_TYPED_DATA",
} as const;
export type EvmSignTypedDataKindEnum =
  (typeof EvmSignTypedDataKindEnum)[keyof typeof EvmSignTypedDataKindEnum];

/**
 *
 * @export
 * @interface EvmSignTypedDataData
 */
export interface EvmSignTypedDataData {
  /**
   *
   * @type {EvmSignTypedDataDataTypes}
   * @memberof EvmSignTypedDataData
   */
  types?: EvmSignTypedDataDataTypes;
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedDataData
   */
  primaryType?: string;
  /**
   *
   * @type {EvmSignTypedDataDataDomain}
   * @memberof EvmSignTypedDataData
   */
  domain?: EvmSignTypedDataDataDomain;
  /**
   *
   * @type {{ [key: string]: any | undefined; }}
   * @memberof EvmSignTypedDataData
   */
  message?: { [key: string]: any | undefined };
}
/**
 *
 * @export
 * @interface EvmSignTypedDataDataDomain
 */
export interface EvmSignTypedDataDataDomain {
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedDataDataDomain
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedDataDataDomain
   */
  version?: string;
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedDataDataDomain
   */
  chainId?: string;
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedDataDataDomain
   */
  verifyingContract?: string;
}
/**
 *
 * @export
 * @interface EvmSignTypedDataDataTypes
 */
export interface EvmSignTypedDataDataTypes {
  [key: string]: any | any;
  /**
   *
   * @type {Array<EvmSignTypedDataDataTypesEIP712DomainInner>}
   * @memberof EvmSignTypedDataDataTypes
   */
  eIP712Domain?: Array<EvmSignTypedDataDataTypesEIP712DomainInner>;
}
/**
 *
 * @export
 * @interface EvmSignTypedDataDataTypesEIP712DomainInner
 */
export interface EvmSignTypedDataDataTypesEIP712DomainInner {
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedDataDataTypesEIP712DomainInner
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof EvmSignTypedDataDataTypesEIP712DomainInner
   */
  type?: string;
}
/**
 *
 * @export
 * @interface EvmSimulationFailedError
 */
export interface EvmSimulationFailedError {
  /**
   *
   * @type {string}
   * @memberof EvmSimulationFailedError
   */
  kind: EvmSimulationFailedErrorKindEnum;
  /**
   * Human readable explanation of the error
   * @type {string}
   * @memberof EvmSimulationFailedError
   */
  humanReadableError: string;
  /**
   * Internal reason for the simulation failure
   * @type {string}
   * @memberof EvmSimulationFailedError
   */
  reason: string;
}

/**
 * @export
 */
export const EvmSimulationFailedErrorKindEnum = {
  SimulationFailed: "SIMULATION_FAILED",
} as const;
export type EvmSimulationFailedErrorKindEnum =
  (typeof EvmSimulationFailedErrorKindEnum)[keyof typeof EvmSimulationFailedErrorKindEnum];

/**
 * An optional advanced usage configuration to change the simulator environment during simulation. Under normal circumstances this configuration should not be set when making requests.
 * @export
 * @interface EvmSimulatorConfig
 */
export interface EvmSimulatorConfig {
  /**
   * Simulate the transaction at the head of this historical block. Note that transaction enrichment data may not contain historical values and execution may differ from on-chain execution due to block transaction index variations affecting the outcome
   * @type {string}
   * @memberof EvmSimulatorConfig
   */
  blockNumber?: string;
  /**
   *
   * @type {EvmSimulatorConfigStateOverrides}
   * @memberof EvmSimulatorConfig
   */
  stateOverrides?: EvmSimulatorConfigStateOverrides;
  /**
   * Apply a preset configuration for common simulator override scenarios like simulating a Gnosis Safe transaction
   * @type {Array<EvmSimulatorConfigPresetsInner>}
   * @memberof EvmSimulatorConfig
   */
  presets?: Array<EvmSimulatorConfigPresetsInner>;
}
/**
 * @type EvmSimulatorConfigPresetsInner
 *
 * @export
 */
export type EvmSimulatorConfigPresetsInner =
  | Eip4337WalletPreset
  | GnosisSafePreset;
/**
 *
 * @export
 * @interface EvmSimulatorConfigStateOverrides
 */
export interface EvmSimulatorConfigStateOverrides {
  /**
   *
   * @type {Array<EvmSimulatorConfigStateOverridesNativeBalancesInner>}
   * @memberof EvmSimulatorConfigStateOverrides
   */
  nativeBalances: Array<EvmSimulatorConfigStateOverridesNativeBalancesInner>;
  /**
   *
   * @type {Array<EvmSimulatorConfigStateOverridesStorageInner>}
   * @memberof EvmSimulatorConfigStateOverrides
   */
  storage: Array<EvmSimulatorConfigStateOverridesStorageInner>;
}
/**
 *
 * @export
 * @interface EvmSimulatorConfigStateOverridesNativeBalancesInner
 */
export interface EvmSimulatorConfigStateOverridesNativeBalancesInner {
  /**
   * The account for which to override the native balance during simulation
   * @type {string}
   * @memberof EvmSimulatorConfigStateOverridesNativeBalancesInner
   */
  address: string;
  /**
   * The amount in native token base units to set the account balance to. This value can be passed in either decimal or 0x prefixed hexadecimal form
   * @type {string}
   * @memberof EvmSimulatorConfigStateOverridesNativeBalancesInner
   */
  value: string;
}
/**
 *
 * @export
 * @interface EvmSimulatorConfigStateOverridesStorageInner
 */
export interface EvmSimulatorConfigStateOverridesStorageInner {
  /**
   * The address of the contract for which to override storage in the simulation
   * @type {string}
   * @memberof EvmSimulatorConfigStateOverridesStorageInner
   */
  address: string;
  /**
   * The storage slot in the contract's storage to override. This value can be passed in either decimal or 0x prefixed hexadecimal form
   * @type {string}
   * @memberof EvmSimulatorConfigStateOverridesStorageInner
   */
  slot: string;
  /**
   * The numerical value to set the storage slot to. This value can be passed in either decimal or 0x prefixed hexadecimal form
   * @type {string}
   * @memberof EvmSimulatorConfigStateOverridesStorageInner
   */
  value: string;
}
/**
 * A "wildcard" NFT transfer representing the transfer of any NFT from a given collection (eg. Opensea collection offers)
 * @export
 * @interface EvmStateChangeAnyNftFromCollectionTransfer
 */
export interface EvmStateChangeAnyNftFromCollectionTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeAnyNftFromCollectionTransfer
   */
  kind: EvmStateChangeAnyNftFromCollectionTransferKindEnum;
  /**
   *
   * @type {EvmStateChangeAnyNftFromCollectionTransferData}
   * @memberof EvmStateChangeAnyNftFromCollectionTransfer
   */
  data: EvmStateChangeAnyNftFromCollectionTransferData;
}

/**
 * @export
 */
export const EvmStateChangeAnyNftFromCollectionTransferKindEnum = {
  AnyNftFromCollectionTransfer: "ANY_NFT_FROM_COLLECTION_TRANSFER",
} as const;
export type EvmStateChangeAnyNftFromCollectionTransferKindEnum =
  (typeof EvmStateChangeAnyNftFromCollectionTransferKindEnum)[keyof typeof EvmStateChangeAnyNftFromCollectionTransferKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeAnyNftFromCollectionTransferData
 */
export interface EvmStateChangeAnyNftFromCollectionTransferData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmTransferCounterparty}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  counterparty?: EvmTransferCounterparty;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  symbol: string;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  assetPrice?: AssetPrice | null;
  /**
   * The URL of the collection's cover image
   * @type {string}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  imageUrl?: string | null;
  /**
   * The type of specified NFT
   * @type {string}
   * @memberof EvmStateChangeAnyNftFromCollectionTransferData
   */
  type: EvmStateChangeAnyNftFromCollectionTransferDataTypeEnum;
}

/**
 * @export
 */
export const EvmStateChangeAnyNftFromCollectionTransferDataTypeEnum = {
  Erc721: "ERC721",
  Erc1155: "ERC1155",
} as const;
export type EvmStateChangeAnyNftFromCollectionTransferDataTypeEnum =
  (typeof EvmStateChangeAnyNftFromCollectionTransferDataTypeEnum)[keyof typeof EvmStateChangeAnyNftFromCollectionTransferDataTypeEnum];

/**
 * Approval request for all owned ERC1155 assets
 * @export
 * @interface EvmStateChangeErc1155ApprovalForAll
 */
export interface EvmStateChangeErc1155ApprovalForAll {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc1155ApprovalForAll
   */
  kind: EvmStateChangeErc1155ApprovalForAllKindEnum;
  /**
   *
   * @type {EvmStateChangeErc1155ApprovalForAllData}
   * @memberof EvmStateChangeErc1155ApprovalForAll
   */
  data: EvmStateChangeErc1155ApprovalForAllData;
}

/**
 * @export
 */
export const EvmStateChangeErc1155ApprovalForAllKindEnum = {
  Erc1155ApprovalForAll: "ERC1155_APPROVAL_FOR_ALL",
} as const;
export type EvmStateChangeErc1155ApprovalForAllKindEnum =
  (typeof EvmStateChangeErc1155ApprovalForAllKindEnum)[keyof typeof EvmStateChangeErc1155ApprovalForAllKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc1155ApprovalForAllData
 */
export interface EvmStateChangeErc1155ApprovalForAllData {
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  name: string;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  owner: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  spender: EvmAddressInfo;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  assetPrice: AssetPrice | null;
}
/**
 * ERC1155 transfers
 * @export
 * @interface EvmStateChangeErc1155Transfer
 */
export interface EvmStateChangeErc1155Transfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc1155Transfer
   */
  kind: EvmStateChangeErc1155TransferKindEnum;
  /**
   *
   * @type {EvmStateChangeErc1155TransferData}
   * @memberof EvmStateChangeErc1155Transfer
   */
  data: EvmStateChangeErc1155TransferData;
}

/**
 * @export
 */
export const EvmStateChangeErc1155TransferKindEnum = {
  Erc1155Transfer: "ERC1155_TRANSFER",
} as const;
export type EvmStateChangeErc1155TransferKindEnum =
  (typeof EvmStateChangeErc1155TransferKindEnum)[keyof typeof EvmStateChangeErc1155TransferKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc1155TransferData
 */
export interface EvmStateChangeErc1155TransferData {
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc1155TransferData
   */
  name: string;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc1155TransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc1155TransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmNftMetadata}
   * @memberof EvmStateChangeErc1155TransferData
   */
  metadata: EvmNftMetadata;
  /**
   * The ID of the ERC1155 token. Can be `null`.
   * @type {string}
   * @memberof EvmStateChangeErc1155TransferData
   */
  tokenId: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmStateChangeErc1155TransferData
   */
  assetPrice: AssetPrice | null;
}
/**
 * Approval request to transfer user's ERC20 tokens
 * @export
 * @interface EvmStateChangeErc20Approval
 */
export interface EvmStateChangeErc20Approval {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc20Approval
   */
  kind: EvmStateChangeErc20ApprovalKindEnum;
  /**
   *
   * @type {EvmStateChangeErc20ApprovalData}
   * @memberof EvmStateChangeErc20Approval
   */
  data: EvmStateChangeErc20ApprovalData;
}

/**
 * @export
 */
export const EvmStateChangeErc20ApprovalKindEnum = {
  Erc20Approval: "ERC20_APPROVAL",
} as const;
export type EvmStateChangeErc20ApprovalKindEnum =
  (typeof EvmStateChangeErc20ApprovalKindEnum)[keyof typeof EvmStateChangeErc20ApprovalKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc20ApprovalData
 */
export interface EvmStateChangeErc20ApprovalData {
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc20ApprovalData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc20ApprovalData
   */
  owner: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc20ApprovalData
   */
  spender: EvmAddressInfo;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc20ApprovalData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAsset}
   * @memberof EvmStateChangeErc20ApprovalData
   */
  asset: EvmAsset;
}
/**
 * ERC20 token transfers
 * @export
 * @interface EvmStateChangeErc20Transfer
 */
export interface EvmStateChangeErc20Transfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc20Transfer
   */
  kind: EvmStateChangeErc20TransferKindEnum;
  /**
   *
   * @type {EvmStateChangeErc20TransferData}
   * @memberof EvmStateChangeErc20Transfer
   */
  data: EvmStateChangeErc20TransferData;
}

/**
 * @export
 */
export const EvmStateChangeErc20TransferKindEnum = {
  Erc20Transfer: "ERC20_TRANSFER",
} as const;
export type EvmStateChangeErc20TransferKindEnum =
  (typeof EvmStateChangeErc20TransferKindEnum)[keyof typeof EvmStateChangeErc20TransferKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc20TransferData
 */
export interface EvmStateChangeErc20TransferData {
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc20TransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc20TransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAsset}
   * @memberof EvmStateChangeErc20TransferData
   */
  asset: EvmAsset;
}
/**
 * Approval request for a specific token in an ERC721 collection
 * @export
 * @interface EvmStateChangeErc721Approval
 */
export interface EvmStateChangeErc721Approval {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc721Approval
   */
  kind: EvmStateChangeErc721ApprovalKindEnum;
  /**
   *
   * @type {EvmStateChangeErc721ApprovalData}
   * @memberof EvmStateChangeErc721Approval
   */
  data: EvmStateChangeErc721ApprovalData;
}

/**
 * @export
 */
export const EvmStateChangeErc721ApprovalKindEnum = {
  Erc721Approval: "ERC721_APPROVAL",
} as const;
export type EvmStateChangeErc721ApprovalKindEnum =
  (typeof EvmStateChangeErc721ApprovalKindEnum)[keyof typeof EvmStateChangeErc721ApprovalKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc721ApprovalData
 */
export interface EvmStateChangeErc721ApprovalData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmNftMetadata}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  metadata: EvmNftMetadata;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  name: string;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  owner: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  spender: EvmAddressInfo;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  symbol: string;
  /**
   * The ID of the ERC721 token. Can be `null` in some edge cases where we are temporarily unable to parse it.
   * @type {string}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  tokenId: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  assetPrice: AssetPrice | null;
}
/**
 * Approval request for all owned ERC721 NFTs in a collection
 * @export
 * @interface EvmStateChangeErc721ApprovalForAll
 */
export interface EvmStateChangeErc721ApprovalForAll {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc721ApprovalForAll
   */
  kind: EvmStateChangeErc721ApprovalForAllKindEnum;
  /**
   *
   * @type {EvmStateChangeErc721ApprovalForAllData}
   * @memberof EvmStateChangeErc721ApprovalForAll
   */
  data: EvmStateChangeErc721ApprovalForAllData;
}

/**
 * @export
 */
export const EvmStateChangeErc721ApprovalForAllKindEnum = {
  Erc721ApprovalForAll: "ERC721_APPROVAL_FOR_ALL",
} as const;
export type EvmStateChangeErc721ApprovalForAllKindEnum =
  (typeof EvmStateChangeErc721ApprovalForAllKindEnum)[keyof typeof EvmStateChangeErc721ApprovalForAllKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc721ApprovalForAllData
 */
export interface EvmStateChangeErc721ApprovalForAllData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  name: string;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  owner: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  spender: EvmAddressInfo;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  symbol: string;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  assetPrice: AssetPrice | null;
}
/**
 * Lock approval request for a specific token in an ERC721 collection
 * @export
 * @interface EvmStateChangeErc721Lock
 */
export interface EvmStateChangeErc721Lock {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc721Lock
   */
  kind: EvmStateChangeErc721LockKindEnum;
  /**
   *
   * @type {EvmStateChangeErc721LockData}
   * @memberof EvmStateChangeErc721Lock
   */
  data: EvmStateChangeErc721LockData;
}

/**
 * @export
 */
export const EvmStateChangeErc721LockKindEnum = {
  Erc721Lock: "ERC721_LOCK",
} as const;
export type EvmStateChangeErc721LockKindEnum =
  (typeof EvmStateChangeErc721LockKindEnum)[keyof typeof EvmStateChangeErc721LockKindEnum];

/**
 * Lock approval request for a specific token in an ERC721 collection
 * @export
 * @interface EvmStateChangeErc721LockApproval
 */
export interface EvmStateChangeErc721LockApproval {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc721LockApproval
   */
  kind: EvmStateChangeErc721LockApprovalKindEnum;
  /**
   *
   * @type {EvmStateChangeErc721ApprovalData}
   * @memberof EvmStateChangeErc721LockApproval
   */
  data: EvmStateChangeErc721ApprovalData;
}

/**
 * @export
 */
export const EvmStateChangeErc721LockApprovalKindEnum = {
  Erc721LockApproval: "ERC721_LOCK_APPROVAL",
} as const;
export type EvmStateChangeErc721LockApprovalKindEnum =
  (typeof EvmStateChangeErc721LockApprovalKindEnum)[keyof typeof EvmStateChangeErc721LockApprovalKindEnum];

/**
 * Lock approval request for all owned ERC721 NFTs in a collection
 * @export
 * @interface EvmStateChangeErc721LockApprovalForAll
 */
export interface EvmStateChangeErc721LockApprovalForAll {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc721LockApprovalForAll
   */
  kind: EvmStateChangeErc721LockApprovalForAllKindEnum;
  /**
   *
   * @type {EvmStateChangeErc721ApprovalForAllData}
   * @memberof EvmStateChangeErc721LockApprovalForAll
   */
  data: EvmStateChangeErc721ApprovalForAllData;
}

/**
 * @export
 */
export const EvmStateChangeErc721LockApprovalForAllKindEnum = {
  Erc721LockApprovalForAll: "ERC721_LOCK_APPROVAL_FOR_ALL",
} as const;
export type EvmStateChangeErc721LockApprovalForAllKindEnum =
  (typeof EvmStateChangeErc721LockApprovalForAllKindEnum)[keyof typeof EvmStateChangeErc721LockApprovalForAllKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc721LockData
 */
export interface EvmStateChangeErc721LockData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc721LockData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721LockData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmNftMetadata}
   * @memberof EvmStateChangeErc721LockData
   */
  metadata: EvmNftMetadata;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721LockData
   */
  name: string;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721LockData
   */
  owner: EvmAddressInfo;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721LockData
   */
  symbol: string;
  /**
   * The ID of the ERC721 token. Can be `null` in some edge cases where we are temporarily unable to parse it.
   * @type {string}
   * @memberof EvmStateChangeErc721LockData
   */
  tokenId: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmStateChangeErc721LockData
   */
  assetPrice: AssetPrice | null;
}
/**
 * ERC721 NFT transfers
 * @export
 * @interface EvmStateChangeErc721Transfer
 */
export interface EvmStateChangeErc721Transfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeErc721Transfer
   */
  kind: EvmStateChangeErc721TransferKindEnum;
  /**
   *
   * @type {EvmStateChangeErc721TransferData}
   * @memberof EvmStateChangeErc721Transfer
   */
  data: EvmStateChangeErc721TransferData;
}

/**
 * @export
 */
export const EvmStateChangeErc721TransferKindEnum = {
  Erc721Transfer: "ERC721_TRANSFER",
} as const;
export type EvmStateChangeErc721TransferKindEnum =
  (typeof EvmStateChangeErc721TransferKindEnum)[keyof typeof EvmStateChangeErc721TransferKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeErc721TransferData
 */
export interface EvmStateChangeErc721TransferData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc721TransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmTransferCounterparty}
   * @memberof EvmStateChangeErc721TransferData
   */
  counterparty?: EvmTransferCounterparty;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721TransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmNftMetadata}
   * @memberof EvmStateChangeErc721TransferData
   */
  metadata: EvmNftMetadata;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721TransferData
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof EvmStateChangeErc721TransferData
   */
  symbol: string;
  /**
   * The ID of the ERC721 token. Can be `null` in some edge cases where we are temporarily unable to parse it.
   * @type {string}
   * @memberof EvmStateChangeErc721TransferData
   */
  tokenId: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmStateChangeErc721TransferData
   */
  assetPrice: AssetPrice | null;
}
/**
 * Farcaster Change Recovery Address
 * @export
 * @interface EvmStateChangeFarcasterChangeRecoveryAddress
 */
export interface EvmStateChangeFarcasterChangeRecoveryAddress {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeFarcasterChangeRecoveryAddress
   */
  kind: EvmStateChangeFarcasterChangeRecoveryAddressKindEnum;
  /**
   *
   * @type {EvmStateChangeFarcasterChangeRecoveryAddressData}
   * @memberof EvmStateChangeFarcasterChangeRecoveryAddress
   */
  data: EvmStateChangeFarcasterChangeRecoveryAddressData;
}

/**
 * @export
 */
export const EvmStateChangeFarcasterChangeRecoveryAddressKindEnum = {
  FarcasterChangeRecoveryAddress: "FARCASTER_CHANGE_RECOVERY_ADDRESS",
} as const;
export type EvmStateChangeFarcasterChangeRecoveryAddressKindEnum =
  (typeof EvmStateChangeFarcasterChangeRecoveryAddressKindEnum)[keyof typeof EvmStateChangeFarcasterChangeRecoveryAddressKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeFarcasterChangeRecoveryAddressData
 */
export interface EvmStateChangeFarcasterChangeRecoveryAddressData {
  /**
   * The Farcaster ID of the user changing the recovery address
   * @type {string}
   * @memberof EvmStateChangeFarcasterChangeRecoveryAddressData
   */
  id: string;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeFarcasterChangeRecoveryAddressData
   */
  recovery: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeFarcasterChangeRecoveryAddressData
   */
  contract: EvmAddressInfo;
}
/**
 * Farcaster Storage Rent Purchase
 * @export
 * @interface EvmStateChangeFarcasterStorageRent
 */
export interface EvmStateChangeFarcasterStorageRent {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeFarcasterStorageRent
   */
  kind: EvmStateChangeFarcasterStorageRentKindEnum;
  /**
   *
   * @type {EvmStateChangeFarcasterStorageRentData}
   * @memberof EvmStateChangeFarcasterStorageRent
   */
  data: EvmStateChangeFarcasterStorageRentData;
}

/**
 * @export
 */
export const EvmStateChangeFarcasterStorageRentKindEnum = {
  FarcasterStorageRent: "FARCASTER_STORAGE_RENT",
} as const;
export type EvmStateChangeFarcasterStorageRentKindEnum =
  (typeof EvmStateChangeFarcasterStorageRentKindEnum)[keyof typeof EvmStateChangeFarcasterStorageRentKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeFarcasterStorageRentData
 */
export interface EvmStateChangeFarcasterStorageRentData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeFarcasterStorageRentData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeFarcasterStorageRentData
   */
  contract: EvmAddressInfo;
  /**
   * The Farcaster ID of the storage rent recipient
   * @type {string}
   * @memberof EvmStateChangeFarcasterStorageRentData
   */
  fid: string;
  /**
   *
   * @type {EvmAsset}
   * @memberof EvmStateChangeFarcasterStorageRentData
   */
  asset: EvmAsset;
}
/**
 * ETH transfers
 * @export
 * @interface EvmStateChangeNativeAssetTransfer
 */
export interface EvmStateChangeNativeAssetTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof EvmStateChangeNativeAssetTransfer
   */
  kind: EvmStateChangeNativeAssetTransferKindEnum;
  /**
   *
   * @type {EvmStateChangeNativeAssetTransferData}
   * @memberof EvmStateChangeNativeAssetTransfer
   */
  data: EvmStateChangeNativeAssetTransferData;
}

/**
 * @export
 */
export const EvmStateChangeNativeAssetTransferKindEnum = {
  NativeAssetTransfer: "NATIVE_ASSET_TRANSFER",
} as const;
export type EvmStateChangeNativeAssetTransferKindEnum =
  (typeof EvmStateChangeNativeAssetTransferKindEnum)[keyof typeof EvmStateChangeNativeAssetTransferKindEnum];

/**
 * Data associated with the state change
 * @export
 * @interface EvmStateChangeNativeAssetTransferData
 */
export interface EvmStateChangeNativeAssetTransferData {
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeNativeAssetTransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmStateChangeNativeAssetTransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmNativeAsset}
   * @memberof EvmStateChangeNativeAssetTransferData
   */
  asset: EvmNativeAsset;
}
/**
 *
 * @export
 * @interface EvmTransactionError
 */
export interface EvmTransactionError {
  /**
   *
   * @type {string}
   * @memberof EvmTransactionError
   */
  kind: EvmTransactionErrorKindEnum;
  /**
   * Human readable explanation of the error
   * @type {string}
   * @memberof EvmTransactionError
   */
  humanReadableError: string;
  /**
   * For all the errors during the execution that do not have a revert reason. Like InvalidOpcode or LackOfFundForGasLimit.
   * @type {string}
   * @memberof EvmTransactionError
   */
  errorType: string;
}

/**
 * @export
 */
export const EvmTransactionErrorKindEnum = {
  TransactionError: "TRANSACTION_ERROR",
} as const;
export type EvmTransactionErrorKindEnum =
  (typeof EvmTransactionErrorKindEnum)[keyof typeof EvmTransactionErrorKindEnum];

/**
 *
 * @export
 * @interface EvmTransactionRevertedError
 */
export interface EvmTransactionRevertedError {
  /**
   *
   * @type {string}
   * @memberof EvmTransactionRevertedError
   */
  kind: EvmTransactionRevertedErrorKindEnum;
  /**
   * Human readable explanation of the error
   * @type {string}
   * @memberof EvmTransactionRevertedError
   */
  humanReadableError: string;
  /**
   * Why the transaction reverted
   * @type {string}
   * @memberof EvmTransactionRevertedError
   */
  revertReason: string;
}

/**
 * @export
 */
export const EvmTransactionRevertedErrorKindEnum = {
  TransactionReverted: "TRANSACTION_REVERTED",
} as const;
export type EvmTransactionRevertedErrorKindEnum =
  (typeof EvmTransactionRevertedErrorKindEnum)[keyof typeof EvmTransactionRevertedErrorKindEnum];

/**
 * Contains counterparty address if known. To whom the transfer was made for Send or from whom was it made for Receive
 * @export
 * @interface EvmTransferCounterparty
 */
export interface EvmTransferCounterparty {
  /**
   * The blockchain address
   * @type {string}
   * @memberof EvmTransferCounterparty
   */
  address: string;
  /**
   * The type of address
   * @type {string}
   * @memberof EvmTransferCounterparty
   */
  kind: EvmTransferCounterpartyKindEnum;
}

/**
 * @export
 */
export const EvmTransferCounterpartyKindEnum = {
  Account: "ACCOUNT",
} as const;
export type EvmTransferCounterpartyKindEnum =
  (typeof EvmTransferCounterpartyKindEnum)[keyof typeof EvmTransferCounterpartyKindEnum];

/**
 *
 * @export
 * @interface EvmTxData
 */
export interface EvmTxData {
  /**
   * Hex-representation address of transaction signer
   * @type {string}
   * @memberof EvmTxData
   */
  from?: string;
  /**
   * Hex-representation address of transaction recipient
   * @type {string}
   * @memberof EvmTxData
   */
  to?: string;
  /**
   * Hex-representation of ABI encoded call data
   * @type {string}
   * @memberof EvmTxData
   */
  data?: string;
  /**
   * String representation of Ether/Matic (in Wei) to send with the transaction
   * @type {string}
   * @memberof EvmTxData
   */
  value?: string;
  /**
   * String representation of the maximum amount of gas allowed for the transaction
   * @type {string}
   * @memberof EvmTxData
   */
  gas?: string;
}
/**
 *
 * @export
 * @interface EvmUnknownError
 */
export interface EvmUnknownError {
  /**
   *
   * @type {string}
   * @memberof EvmUnknownError
   */
  kind: EvmUnknownErrorKindEnum;
  /**
   * Human readable explanation of the error
   * @type {string}
   * @memberof EvmUnknownError
   */
  humanReadableError: string;
}

/**
 * @export
 */
export const EvmUnknownErrorKindEnum = {
  UnknownError: "UNKNOWN_ERROR",
} as const;
export type EvmUnknownErrorKindEnum =
  (typeof EvmUnknownErrorKindEnum)[keyof typeof EvmUnknownErrorKindEnum];

/**
 * Override a Gnosis Safe multi-signature wallet during simulation to change the signature threshold 1 of N. Allowing simulation of unsigned transactions. NOTE: The transaction sender needs to be one of the signers of the Safe.
 * @export
 * @interface GnosisSafePreset
 */
export interface GnosisSafePreset {
  /**
   * The kind of simulator preset configuration to apply
   * @type {string}
   * @memberof GnosisSafePreset
   */
  kind: GnosisSafePresetKindEnum;
  /**
   * The address of the Gnosis safe to override
   * @type {string}
   * @memberof GnosisSafePreset
   */
  walletAddress: string;
}

/**
 * @export
 */
export const GnosisSafePresetKindEnum = {
  GnosisSafe: "GNOSIS_SAFE",
} as const;
export type GnosisSafePresetKindEnum =
  (typeof GnosisSafePresetKindEnum)[keyof typeof GnosisSafePresetKindEnum];

/**
 *
 * @export
 * @interface InternalServerError
 */
export interface InternalServerError {
  /**
   *
   * @type {string}
   * @memberof InternalServerError
   */
  error: InternalServerErrorErrorEnum;
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof InternalServerError
   */
  requestId?: string;
}

/**
 * @export
 */
export const InternalServerErrorErrorEnum = {
  InternalServerError: "Internal Server Error",
} as const;
export type InternalServerErrorErrorEnum =
  (typeof InternalServerErrorErrorEnum)[keyof typeof InternalServerErrorErrorEnum];

/**
 * Specify the desired language for the returned warning messages and human-readable simulation results. If unknown, defaults to English.
 * @export
 */
export const Languages = {
  Am: "am",
  Ar: "ar",
  ArSa: "ar-SA",
  ArEg: "ar-EG",
  ArDz: "ar-DZ",
  ArMa: "ar-MA",
  ArIq: "ar-IQ",
  ArJo: "ar-JO",
  ArKw: "ar-KW",
  ArLb: "ar-LB",
  ArLy: "ar-LY",
  ArOm: "ar-OM",
  ArQa: "ar-QA",
  ArSy: "ar-SY",
  ArTn: "ar-TN",
  ArAe: "ar-AE",
  ArYe: "ar-YE",
  Bn: "bn",
  Fr: "fr",
  FrBe: "fr-BE",
  FrCa: "fr-CA",
  FrFr: "fr-FR",
  FrLu: "fr-LU",
  FrCh: "fr-CH",
  De: "de",
  DeAt: "de-AT",
  DeDe: "de-DE",
  DeLi: "de-LI",
  DeLu: "de-LU",
  DeCh: "de-CH",
  En: "en",
  EnUs: "en-US",
  EnGb: "en-GB",
  EnCa: "en-CA",
  EnAu: "en-AU",
  EnNz: "en-NZ",
  EnZa: "en-ZA",
  EnIe: "en-IE",
  EnIn: "en-IN",
  EnSg: "en-SG",
  EnJm: "en-JM",
  EnBz: "en-BZ",
  EnTt: "en-TT",
  EnPh: "en-PH",
  It: "it",
  ItIt: "it-IT",
  ItCh: "it-CH",
  Ms: "ms",
  MsBn: "ms-BN",
  MsMy: "ms-MY",
  Pt: "pt",
  PtBr: "pt-BR",
  PtPt: "pt-PT",
  Ru: "ru",
  RuRu: "ru-RU",
  Es: "es",
  EsAr: "es-AR",
  EsBo: "es-BO",
  EsCl: "es-CL",
  EsCo: "es-CO",
  EsCr: "es-CR",
  EsCu: "es-CU",
  EsDo: "es-DO",
  EsEc: "es-EC",
  EsSv: "es-SV",
  EsGq: "es-GQ",
  EsGt: "es-GT",
  EsHn: "es-HN",
  EsMx: "es-MX",
  EsNi: "es-NI",
  EsPa: "es-PA",
  EsPy: "es-PY",
  EsPe: "es-PE",
  EsPh: "es-PH",
  EsPr: "es-PR",
  EsEs: "es-ES",
  EsUs: "es-US",
  EsUy: "es-UY",
  EsVe: "es-VE",
  Sw: "sw",
  Tr: "tr",
  TrTr: "tr-TR",
  Fil: "fil",
  GuIn: "gu_IN",
  Ha: "ha",
  Hi: "hi",
  Id: "id",
  Ig: "ig",
  Ja: "ja",
  Ko: "ko",
  My: "my",
  Pa: "pa",
  Ta: "ta",
  Th: "th",
  Vi: "vi",
  Yo: "yo",
  ZhCn: "zh_CN",
  ZhTw: "zh_TW",
} as const;
export type Languages = (typeof Languages)[keyof typeof Languages];

/**
 *
 * @export
 * @interface LegacyAssetPrice
 */
export interface LegacyAssetPrice {
  /**
   *
   * @type {string}
   * @memberof LegacyAssetPrice
   */
  source: LegacyAssetPriceSourceEnum;
  /**
   *
   * @type {number}
   * @memberof LegacyAssetPrice
   */
  lastUpdatedAt: number;
  /**
   *
   * @type {number}
   * @memberof LegacyAssetPrice
   */
  dollarValuePerToken: number;
}

/**
 * @export
 */
export const LegacyAssetPriceSourceEnum = {
  Simplehash: "Simplehash",
  Defillama: "Defillama",
  Coingecko: "Coingecko",
} as const;
export type LegacyAssetPriceSourceEnum =
  (typeof LegacyAssetPriceSourceEnum)[keyof typeof LegacyAssetPriceSourceEnum];

/**
 *
 * @export
 */
export const MetaplexTokenStandard = {
  NonFungible: "non_fungible",
  FungibleAsset: "fungible_asset",
  Fungible: "fungible",
  NonFungibleEdition: "non_fungible_edition",
  Unknown: "unknown",
} as const;
export type MetaplexTokenStandard =
  (typeof MetaplexTokenStandard)[keyof typeof MetaplexTokenStandard];

/**
 * Thumbnails of different sizes for NFTs
 * @export
 * @interface NftPreviews
 */
export interface NftPreviews {
  /**
   * 250x250px
   * @type {string}
   * @memberof NftPreviews
   */
  small: string | null;
  /**
   * 512x512px
   * @type {string}
   * @memberof NftPreviews
   */
  medium: string | null;
  /**
   * 1000x1000px
   * @type {string}
   * @memberof NftPreviews
   */
  large: string | null;
}
/**
 *
 * @export
 * @interface ObjectWithDomainsPropertyOfTypeArray
 */
export interface ObjectWithDomainsPropertyOfTypeArray {
  /**
   *
   * @type {Array<string>}
   * @memberof ObjectWithDomainsPropertyOfTypeArray
   */
  domains?: Array<string>;
}
/**
 *
 * @export
 * @interface Report200Response
 */
export interface Report200Response {
  /**
   * The Request ID of the successfully reported transaction/message scan.
   * @type {string}
   * @memberof Report200Response
   */
  reportedRequestId?: string;
}
/**
 *
 * @export
 * @interface ReportRequest
 */
export interface ReportRequest {
  /**
   * Request ID of transaction/message scan to report. This can be found in both the headers as `X-Request-Id`
   * and the returned objects as the `requestId` field.
   * @type {string}
   * @memberof ReportRequest
   */
  requestId?: string;
  /**
   * What event occurred to cause the report. "PROCEEDED" means the user proceeded with signing
   * the proposed action, "REJECTED" means the user rejected the proposed action, and "Reported
   * Malicious" means the user explicitly reported the transaction as malicious.
   * @type {string}
   * @memberof ReportRequest
   */
  event?: ReportRequestEventEnum;
}

/**
 * @export
 */
export const ReportRequestEventEnum = {
  Proceeded: "PROCEEDED",
  Rejected: "REJECTED",
  ReportedMalicious: "REPORTED_MALICIOUS",
} as const;
export type ReportRequestEventEnum =
  (typeof ReportRequestEventEnum)[keyof typeof ReportRequestEventEnum];

/**
 *
 * @export
 * @interface RequestMetadata
 */
export interface RequestMetadata {
  /**
   * DApp domain proposing these transactions
   * @type {string}
   * @memberof RequestMetadata
   */
  origin: string;
}
/**
 *
 * @export
 * @interface RiskSignalsInner
 */
export interface RiskSignalsInner {
  /**
   * Risk signal severity level.
   * @type {string}
   * @memberof RiskSignalsInner
   */
  severity: RiskSignalsInnerSeverityEnum;
  /**
   * Risk signal kind.
   * @type {string}
   * @memberof RiskSignalsInner
   */
  kind: RiskSignalsInnerKindEnum;
  /**
   * human-readable message to present to the end-user
   * @type {string}
   * @memberof RiskSignalsInner
   */
  message: string;
}

/**
 * @export
 */
export const RiskSignalsInnerSeverityEnum = {
  Critical: "CRITICAL",
  Warning: "WARNING",
} as const;
export type RiskSignalsInnerSeverityEnum =
  (typeof RiskSignalsInnerSeverityEnum)[keyof typeof RiskSignalsInnerSeverityEnum];

/**
 * @export
 */
export const RiskSignalsInnerKindEnum = {
  RiskThresholdHit: "RISK_THRESHOLD_HIT",
  TradingRestrictions: "TRADING_RESTRICTIONS",
  CallsExternalContract: "CALLS_EXTERNAL_CONTRACT",
  TokensCanBeStolen: "TOKENS_CAN_BE_STOLEN",
  SuspiciousCreationMinting: "SUSPICIOUS_CREATION_MINTING",
  AntiWhaleModifiable: "ANTI_WHALE_MODIFIABLE",
  OwnershipNotRenounced: "OWNERSHIP_NOT_RENOUNCED",
  HiddenOwner: "HIDDEN_OWNER",
  PreviousScamByCreator: "PREVIOUS_SCAM_BY_CREATOR",
  Honeypot: "HONEYPOT",
  Mintable: "MINTABLE",
  Proxy: "PROXY",
  BlocklistAllowlist: "BLOCKLIST_ALLOWLIST",
  BalancesModifiable: "BALANCES_MODIFIABLE",
  HighTokenOwnership: "HIGH_TOKEN_OWNERSHIP",
  VeryHighTokenOwnership: "VERY_HIGH_TOKEN_OWNERSHIP",
  ContractSelfDestruct: "CONTRACT_SELF_DESTRUCT",
  HighTradingTax: "HIGH_TRADING_TAX",
  TradingTaxModifiable: "TRADING_TAX_MODIFIABLE",
  TradingCooldown: "TRADING_COOLDOWN",
  TradingCanBeStopped: "TRADING_CAN_BE_STOPPED",
  GasMinting: "GAS_MINTING",
  CopycatToken: "COPYCAT_TOKEN",
  TradingTax: "TRADING_TAX",
  RugPull: "RUG_PULL",
} as const;
export type RiskSignalsInnerKindEnum =
  (typeof RiskSignalsInnerKindEnum)[keyof typeof RiskSignalsInnerKindEnum];

/**
 * Result of scanning an asset
 * @export
 * @interface ScanAssetResult
 */
export interface ScanAssetResult {
  /**
   * EVM asset ids:
   *  - For tokens: chain:network:contract_address
   *  - For NFTs: chain:network:collection_address:id
   * Solana asset ids:
   *  - Both tokens and NFTs: solana:mainnet:address
   * @type {string}
   * @memberof ScanAssetResult
   */
  assetId: string;
  /**
   *
   * @type {string}
   * @memberof ScanAssetResult
   */
  chain: string;
  /**
   *
   * @type {Asset}
   * @memberof ScanAssetResult
   */
  asset: Asset;
  /**
   * An array of warnings generated from scanning the transactions. All these warnings won't be returned in a single response (some are mutually exclusive) but it is advisable that your UI can display multiple warnings. Warnings are returned sorted by severity, so if you can only show a user one warning, show them the one at the 0th index.
   * @type {Array<WarningInner>}
   * @memberof ScanAssetResult
   */
  warnings: Array<WarningInner>;
  /**
   * An array of risk signals generated from scanning the assets.
   * @type {Array<RiskSignalsInner>}
   * @memberof ScanAssetResult
   */
  riskSignals: Array<RiskSignalsInner>;
}
/**
 *
 * @export
 * @interface ScanAssets200Response
 */
export interface ScanAssets200Response {
  /**
   *
   * @type {Array<ScanAssetResult>}
   * @memberof ScanAssets200Response
   */
  assets: Array<ScanAssetResult>;
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof ScanAssets200Response
   */
  requestId: string;
}
/**
 *
 * @export
 * @interface ScanAssetsRequest
 */
export interface ScanAssetsRequest {
  /**
   *
   * @type {Array<string>}
   * @memberof ScanAssetsRequest
   */
  assets?: Array<string>;
}
/**
 *
 * @export
 * @interface ScanDomain200ResponseInner
 */
export interface ScanDomain200ResponseInner {
  /**
   * A sanitized, registerable representation of the URL submitted. By registerable, we mean either the domain registerable with a domain registrar (e.g., example.com) or a sub-domain registerable on a hosting providers domain (e.g., my-project.vercel.app).
   * @type {string}
   * @memberof ScanDomain200ResponseInner
   */
  domain: string;
  /**
   * The status of our domain analysis. Since our analysis can take some time, rather than block the API request until we've finished, we schedule the evaluation and return a response immediately.
   *
   * PROCESSING -> The analysis is under way
   * UNPROCESSABLE -> The URL submitted is invalid
   * PROCESSED -> Our analysis completed successfully
   * @type {string}
   * @memberof ScanDomain200ResponseInner
   */
  status: ScanDomain200ResponseInnerStatusEnum;
  /**
   * A risk score from 0.0 to 1.0. The higher the score, the higher our certainty that this domain is hosting a crypto-native scam.
   * @type {number}
   * @memberof ScanDomain200ResponseInner
   */
  riskScore: number | null;
  /**
   * Additional metadata about the domain and our evaluation. Possible labels include
   *
   * Blockchain -> Which blockchain this domain attempts to interact with
   * Warning -> If we've detected scam-like behavior, a warning label describing what was found will be included. If we know which blockchain the scam dApp is built for, this information is also included. We reserve the right to add new warnings at any time so handle new additions gracefully.
   * Copy-cat -> If this dApp is a copy-cat of a well-known brand, we include a copy-cat label with information of the brand it is impersonating and it's official domain
   * @type {Array<string>}
   * @memberof ScanDomain200ResponseInner
   */
  labels: Array<ScanDomain200ResponseInnerLabelsEnum>;
  /**
   * An array of warnings generated from scanning the transactions. All these warnings won't be returned in a single response (some are mutually exclusive) but it is advisable that your UI can display multiple warnings. Warnings are returned sorted by severity, so if you can only show a user one warning, show them the one at the 0th index.
   * @type {Array<WarningInner>}
   * @memberof ScanDomain200ResponseInner
   */
  warnings: Array<WarningInner>;
}

/**
 * @export
 */
export const ScanDomain200ResponseInnerStatusEnum = {
  Processed: "PROCESSED",
  Processing: "PROCESSING",
  Unprocessable: "UNPROCESSABLE",
} as const;
export type ScanDomain200ResponseInnerStatusEnum =
  (typeof ScanDomain200ResponseInnerStatusEnum)[keyof typeof ScanDomain200ResponseInnerStatusEnum];

/**
 * @export
 */
export const ScanDomain200ResponseInnerLabelsEnum = {
  Blockchainsolana: "blockchain=solana",
  Blockchainethereum: "blockchain=ethereum",
  Blockchainpolygon: "blockchain=polygon",
  WarningAllBlocklistedDomainCrossOrigin:
    "warning[all]=BLOCKLISTED_DOMAIN_CROSS_ORIGIN",
  WarningAllObfuscatedCode: "warning[all]=OBFUSCATED_CODE",
  WarningAllDevtoolsDisabled: "warning[all]=DEVTOOLS_DISABLED",
  WarningAllWhitelistedDomainCrossOrigin:
    "warning[all]=WHITELISTED_DOMAIN_CROSS_ORIGIN",
  WarningAllTrustedBlocklistDomain: "warning[all]=TRUSTED_BLOCKLIST_DOMAIN",
  WarningAllNonAsciiUrl: "warning[all]=NON_ASCII_URL",
  WarningEvmBlocklistedDomainCrossOrigin:
    "warning[evm]=BLOCKLISTED_DOMAIN_CROSS_ORIGIN",
  WarningEvmObfuscatedCode: "warning[evm]=OBFUSCATED_CODE",
  WarningEvmDevtoolsDisabled: "warning[evm]=DEVTOOLS_DISABLED",
  WarningEvmWhitelistedDomainCrossOrigin:
    "warning[evm]=WHITELISTED_DOMAIN_CROSS_ORIGIN",
  WarningEvmTrustedBlocklistDomain: "warning[evm]=TRUSTED_BLOCKLIST_DOMAIN",
  WarningSolanaNonAsciiUrl: "warning[solana]=NON_ASCII_URL",
  WarningSolanaBlocklistedDomainCrossOrigin:
    "warning[solana]=BLOCKLISTED_DOMAIN_CROSS_ORIGIN",
  WarningSolanaObfuscatedCode: "warning[solana]=OBFUSCATED_CODE",
  WarningSolanaDevtoolsDisabled: "warning[solana]=DEVTOOLS_DISABLED",
  WarningSolanaWhitelistedDomainCrossOrigin:
    "warning[solana]=WHITELISTED_DOMAIN_CROSS_ORIGIN",
  WarningSolanaTrustedBlocklistDomain:
    "warning[solana]=TRUSTED_BLOCKLIST_DOMAIN",
  SourceblowfishBlocklist: "source=blowfish_blocklist",
  SourceblowfishWhitelist: "source=blowfish_whitelist",
  SourcemetamaskBlocklist: "source=metamask_blocklist",
  SourcemetamaskWhitelist: "source=metamask_whitelist",
  SourcephishfortBlocklist: "source=phishfort_blocklist",
  SourcescamsnifferBlocklist: "source=scamsniffer_blocklist",
  SourcephantomBlocklist: "source=phantom_blocklist",
  SourcesolflareBlocklist: "source=solflare_blocklist",
  SourcedefiLlamaWhitelist: "source=defi_llama_whitelist",
  SourcebrandWhitelist: "source=brand_whitelist",
  CopyCatbrandNamedomain: "copy_cat=brand_name:domain",
} as const;
export type ScanDomain200ResponseInnerLabelsEnum =
  (typeof ScanDomain200ResponseInnerLabelsEnum)[keyof typeof ScanDomain200ResponseInnerLabelsEnum];

/**
 *
 * @export
 * @interface ScanMessageEvm200Response
 */
export interface ScanMessageEvm200Response {
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof ScanMessageEvm200Response
   */
  requestId: string;
  /**
   *
   * @type {ActionEnum}
   * @memberof ScanMessageEvm200Response
   */
  action: ActionEnum;
  /**
   * An array of warnings generated from scanning the transactions. All these warnings won't be returned in a single response (some are mutually exclusive) but it is advisable that your UI can display multiple warnings. Warnings are returned sorted by severity, so if you can only show a user one warning, show them the one at the 0th index.
   * @type {Array<WarningInner>}
   * @memberof ScanMessageEvm200Response
   */
  warnings: Array<WarningInner>;
  /**
   *
   * @type {ScanMessageEvm200ResponseSimulationResults}
   * @memberof ScanMessageEvm200Response
   */
  simulationResults: ScanMessageEvm200ResponseSimulationResults | null;
}
/**
 * Can be `null`. Message simulation requires in-depth understanding of the contract verifying the message and is not a generalizable solution that works for any message. If we do not support simulating a particular message the simulationResults property will be returned as null and the recommended action is to fallback to showing the raw message data to the user before they sign
 * Currently supported messages: OpenSea Seaport orders & ERC20 Permit approvals
 * @export
 * @interface ScanMessageEvm200ResponseSimulationResults
 */
export interface ScanMessageEvm200ResponseSimulationResults {
  /**
   *
   * @type {Array<ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner>}
   * @memberof ScanMessageEvm200ResponseSimulationResults
   */
  expectedStateChanges: Array<ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner>;
  /**
   *
   * @type {ScanMessageEvm200ResponseSimulationResultsError}
   * @memberof ScanMessageEvm200ResponseSimulationResults
   */
  error: ScanMessageEvm200ResponseSimulationResultsError | null;
  /**
   *
   * @type {EvmProtocol}
   * @memberof ScanMessageEvm200ResponseSimulationResults
   */
  protocol: EvmProtocol | null;
}
/**
 * A nullable error object which includes the parsed simulation error encountered (if any)
 * @export
 * @interface ScanMessageEvm200ResponseSimulationResultsError
 */
export interface ScanMessageEvm200ResponseSimulationResultsError {
  /**
   * A unique representation of the error kind
   *
   * UNSUPPORTED_ORDER_TYPE: Opensea order simulation currently supports basic order types for swapping ERC20/721/1155 <-> ERC20/721/1155, advanced order types using attribute criteria are not supported. If the message is a valid OpenSea order but of a type not supported UNSUPPORTED_ORDER_TYPE will be returned
   *
   * UNKNOWN_ERROR: We were not able to simulate the state changes of the message for an unknown reason, however the transaction it self did not revert so the user can proceed with caution
   *
   * UNSUPPORTED_MESSAGE: We do not support decoding this message type.
   * @type {string}
   * @memberof ScanMessageEvm200ResponseSimulationResultsError
   */
  kind: ScanMessageEvm200ResponseSimulationResultsErrorKindEnum;
  /**
   * Human readable & translated string that can be directly exposed to end-users
   * @type {string}
   * @memberof ScanMessageEvm200ResponseSimulationResultsError
   */
  humanReadableError: string;
}

/**
 * @export
 */
export const ScanMessageEvm200ResponseSimulationResultsErrorKindEnum = {
  UnsupportedOrderType: "UNSUPPORTED_ORDER_TYPE",
  UnknownError: "UNKNOWN_ERROR",
  UnsupportedMessage: "UNSUPPORTED_MESSAGE",
} as const;
export type ScanMessageEvm200ResponseSimulationResultsErrorKindEnum =
  (typeof ScanMessageEvm200ResponseSimulationResultsErrorKindEnum)[keyof typeof ScanMessageEvm200ResponseSimulationResultsErrorKindEnum];

/**
 *
 * @export
 * @interface ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner
 */
export interface ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner {
  /**
   * Computed explanation of the state change that can be directly presented to the end-user. While the API is still in development, we suggest integrators expose this in their signing UI if they encounter a `rawInfo.kind` they don't recognize.
   * @type {string}
   * @memberof ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner
   */
  humanReadableDiff: string;
  /**
   *
   * @type {ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInnerRawInfo}
   * @memberof ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner
   */
  rawInfo: ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInnerRawInfo;
}
/**
 * @type ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInnerRawInfo
 * A machine-parsable state change object describing the state change.
 * @export
 */
export type ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInnerRawInfo =

    | ({
        kind: "ANY_NFT_FROM_COLLECTION_TRANSFER";
      } & EvmMessageStateChangeAnyNftFromCollectionTransfer)
    | ({ kind: "ERC1155_TRANSFER" } & EvmMessageStateChangeErc1155Transfer)
    | ({ kind: "ERC20_PERMIT" } & EvmMessageStateChangeErc20Permit)
    | ({ kind: "ERC20_TRANSFER" } & EvmMessageStateChangeErc20Transfer)
    | ({ kind: "ERC721_TRANSFER" } & EvmMessageStateChangeErc721Transfer)
    | ({
        kind: "NATIVE_ASSET_TRANSFER";
      } & EvmMessageStateChangeNativeAssetTransfer)
    | ({ kind: "POLYMARKET_ORDER" } & EvmMessageStateChangePolymarketOrder);
/**
 *
 * @export
 * @interface ScanMessageEvmRequest
 */
export interface ScanMessageEvmRequest {
  /**
   *
   * @type {ScanMessageEvmRequestMessage}
   * @memberof ScanMessageEvmRequest
   */
  message: ScanMessageEvmRequestMessage;
  /**
   *
   * @type {RequestMetadata}
   * @memberof ScanMessageEvmRequest
   */
  metadata: RequestMetadata;
  /**
   * A hex-representation of the user account who is being asked to sign the supplied transaction. In most cases this will be the same as the from property in the txObject
   * @type {string}
   * @memberof ScanMessageEvmRequest
   */
  userAccount: string;
}
/**
 * @type ScanMessageEvmRequestMessage
 * An object containing the message type and contents
 * @export
 */
export type ScanMessageEvmRequestMessage =
  | ({ kind: "PERSONAL_SIGN" } & EvmPersonalSign)
  | ({ kind: "SIGN_MESSAGE" } & EvmSignMessage)
  | ({ kind: "SIGN_TYPED_DATA" } & EvmSignTypedData);
/**
 *
 * @export
 * @interface ScanTransactionsEvm200Response
 */
export interface ScanTransactionsEvm200Response {
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof ScanTransactionsEvm200Response
   */
  requestId: string;
  /**
   *
   * @type {ActionEnum}
   * @memberof ScanTransactionsEvm200Response
   */
  action: ActionEnum;
  /**
   * An array of warnings generated from scanning the transactions. All these warnings won't be returned in a single response (some are mutually exclusive) but it is advisable that your UI can display multiple warnings. Warnings are returned sorted by severity, so if you can only show a user one warning, show them the one at the 0th index.
   * @type {Array<WarningInner>}
   * @memberof ScanTransactionsEvm200Response
   */
  warnings: Array<WarningInner>;
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResults}
   * @memberof ScanTransactionsEvm200Response
   */
  simulationResults: ScanTransactionsEvm200ResponseSimulationResults;
}
/**
 *
 * @export
 * @interface ScanTransactionsEvm200ResponseSimulationResults
 */
export interface ScanTransactionsEvm200ResponseSimulationResults {
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResultsAggregated}
   * @memberof ScanTransactionsEvm200ResponseSimulationResults
   */
  aggregated: ScanTransactionsEvm200ResponseSimulationResultsAggregated;
  /**
   *
   * @type {Array<ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner>}
   * @memberof ScanTransactionsEvm200ResponseSimulationResults
   */
  perTransaction: Array<ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner>;
}
/**
 *
 * @export
 * @interface ScanTransactionsEvm200ResponseSimulationResultsAggregated
 */
export interface ScanTransactionsEvm200ResponseSimulationResultsAggregated {
  /**
   *
   * @type {Array<EvmExpectedStateChangesInner>}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsAggregated
   */
  expectedStateChanges: Array<EvmExpectedStateChangesInner>;
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResultsAggregatedError}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsAggregated
   */
  error: ScanTransactionsEvm200ResponseSimulationResultsAggregatedError | null;
}
/**
 * @type ScanTransactionsEvm200ResponseSimulationResultsAggregatedError
 * A error object which includes the aggregated parsed simulation error encountered (if any). Can be `null`.
 * @export
 */
export type ScanTransactionsEvm200ResponseSimulationResultsAggregatedError =
  | ({ kind: "SIMULATION_FAILED" } & EvmSimulationFailedError)
  | ({ kind: "UNKNOWN_ERROR" } & EvmUnknownError);
/**
 *
 * @export
 * @interface ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner
 */
export interface ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner {
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner
   */
  error: ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError | null;
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerGas}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner
   */
  gas: ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerGas;
  /**
   *
   * @type {EvmProtocol}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner
   */
  protocol: EvmProtocol | null;
  /**
   * Events emmited by this transaction
   * @type {Array<EvmLog>}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner
   */
  logs: Array<EvmLog>;
  /**
   * Decoded events emmited by this transaction
   * @type {Array<EvmDecodedLog>}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner
   */
  decodedLogs: Array<EvmDecodedLog>;
  /**
   *
   * @type {EvmDecodedCalldata}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInner
   */
  decodedCalldata: EvmDecodedCalldata | null;
}
/**
 * @type ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError
 * A error object which includes the parsed simulation error encountered (if any). Can be `null`.
 * @export
 */
export type ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError =

    | ({ kind: "SIMULATION_FAILED" } & EvmSimulationFailedError)
    | ({ kind: "TRANSACTION_ERROR" } & EvmTransactionError)
    | ({ kind: "TRANSACTION_REVERTED" } & EvmTransactionRevertedError)
    | ({ kind: "UNKNOWN_ERROR" } & EvmUnknownError);
/**
 * An object that contains nullable fields with information about the estimated gas consumption of the simulated transaction
 * @export
 * @interface ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerGas
 */
export interface ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerGas {
  /**
   * A field that if the simulation was successful contains the estimated gas used while simulating the transaction. **NOTE:** Despite the name, this should be viewed as a realistic usage estimate, not an upper bound for how much gas the transaction could consume in the worst case. In future versions this field may be renamed to `gasUsageEstimate`. Can be null.
   * @type {string}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerGas
   */
  gasLimit: string | null;
}
/**
 *
 * @export
 * @interface ScanTransactionsEvmRequest
 */
export interface ScanTransactionsEvmRequest {
  /**
   *
   * @type {Array<EvmTxData>}
   * @memberof ScanTransactionsEvmRequest
   */
  txObjects: Array<EvmTxData>;
  /**
   *
   * @type {RequestMetadata}
   * @memberof ScanTransactionsEvmRequest
   */
  metadata: RequestMetadata;
  /**
   * A hex-representation of the user account who is being asked to sign the supplied transaction. In most cases this will be the same as the from property in the txObject
   * @type {string}
   * @memberof ScanTransactionsEvmRequest
   */
  userAccount: string;
  /**
   *
   * @type {EvmSimulatorConfig}
   * @memberof ScanTransactionsEvmRequest
   */
  simulatorConfig?: EvmSimulatorConfig;
}
/**
 *
 * @export
 * @interface ScanTransactionsSolana200Response
 */
export interface ScanTransactionsSolana200Response {
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof ScanTransactionsSolana200Response
   */
  requestId: string;
  /**
   *
   * @type {ActionEnum}
   * @memberof ScanTransactionsSolana200Response
   */
  action: ActionEnum;
  /**
   * An array of warnings generated from scanning the transactions. All these warnings won't be returned in a single response (some are mutually exclusive) but it is advisable that your UI can display multiple warnings. Warnings are returned sorted by severity, so if you can only show a user one warning, show them the one at the 0th index.
   * @type {Array<WarningInner>}
   * @memberof ScanTransactionsSolana200Response
   */
  warnings: Array<WarningInner>;
  /**
   *
   * @type {ScanTransactionsSolana200ResponseSimulationResults}
   * @memberof ScanTransactionsSolana200Response
   */
  simulationResults: ScanTransactionsSolana200ResponseSimulationResults;
  /**
   * An enum value describing whether a program in the proposed transactions was either a known or suspected malicious program. Deprecated. Use `action` instead.
   * @type {string}
   * @memberof ScanTransactionsSolana200Response
   * @deprecated
   */
  status: ScanTransactionsSolana200ResponseStatusEnum;
}

/**
 * @export
 */
export const ScanTransactionsSolana200ResponseStatusEnum = {
  ChecksPassed: "CHECKS_PASSED",
  SuspectedMalicious: "SUSPECTED_MALICIOUS",
  KnownMalicious: "KNOWN_MALICIOUS",
} as const;
export type ScanTransactionsSolana200ResponseStatusEnum =
  (typeof ScanTransactionsSolana200ResponseStatusEnum)[keyof typeof ScanTransactionsSolana200ResponseStatusEnum];

/**
 *
 * @export
 * @interface ScanTransactionsSolana200ResponseSimulationResults
 */
export interface ScanTransactionsSolana200ResponseSimulationResults {
  /**
   * Whether all of the transaction's recentBlockhashes have expired
   * @type {boolean}
   * @memberof ScanTransactionsSolana200ResponseSimulationResults
   */
  isRecentBlockhashExpired: boolean;
  /**
   * An array of state changes one could expect if these transactions were submitted on-chain. Each state change represents a meaningful change to the end-user's assets or permissions on-chain. We reserve the right to add new state change types, so any handling logic custom to state change types should fallback gracefully to showing the end-user the `humanReadableDiff` of any unrecognized state change types.
   * @type {Array<ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner>}
   * @memberof ScanTransactionsSolana200ResponseSimulationResults
   */
  expectedStateChanges: Array<ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner>;
  /**
   *
   * @type {ScanTransactionsSolana200ResponseSimulationResultsError}
   * @memberof ScanTransactionsSolana200ResponseSimulationResults
   */
  error: ScanTransactionsSolana200ResponseSimulationResultsError | null;
  /**
   *
   * @type {ScanTransactionsSolana200ResponseSimulationResultsRaw}
   * @memberof ScanTransactionsSolana200ResponseSimulationResults
   */
  raw: ScanTransactionsSolana200ResponseSimulationResultsRaw;
}
/**
 * An error object which includes the parsed simulation error encountered (if any). Can be `null`.
 * @export
 * @interface ScanTransactionsSolana200ResponseSimulationResultsError
 */
export interface ScanTransactionsSolana200ResponseSimulationResultsError {
  /**
   * A unique representation of the error kind. Currently maps to the screaming case of the SystemError enum values, TokenError and TransactionError enum values. It returns `UNKNOWN_ERROR` if the Solana program reverts with an error we are unable to decode.
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsError
   */
  kind: ScanTransactionsSolana200ResponseSimulationResultsErrorKindEnum;
  /**
   * Human readable version of the error
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsError
   */
  humanReadableError: string;
}

/**
 * @export
 */
export const ScanTransactionsSolana200ResponseSimulationResultsErrorKindEnum = {
  SimulationFailed: "SIMULATION_FAILED",
  SimulationTimedOut: "SIMULATION_TIMED_OUT",
  TooManyTransactions: "TOO_MANY_TRANSACTIONS",
  BadRequest: "BAD_REQUEST",
  AnAccountWithTheSameAddressAlreadyExists:
    "AN_ACCOUNT_WITH_THE_SAME_ADDRESS_ALREADY_EXISTS",
  AccountDoesNotHaveEnoughSolToPerformTheOperation:
    "ACCOUNT_DOES_NOT_HAVE_ENOUGH_SOL_TO_PERFORM_THE_OPERATION",
  CannotAssignAccountToThisProgramId:
    "CANNOT_ASSIGN_ACCOUNT_TO_THIS_PROGRAM_ID",
  CannotAllocateAccountDataOfThisLength:
    "CANNOT_ALLOCATE_ACCOUNT_DATA_OF_THIS_LENGTH",
  LengthOfRequestedSeedIsTooLong: "LENGTH_OF_REQUESTED_SEED_IS_TOO_LONG",
  ProvidedAddressDoesNotMatchAddressedDerivedFromSeed:
    "PROVIDED_ADDRESS_DOES_NOT_MATCH_ADDRESSED_DERIVED_FROM_SEED",
  AdvancingStoredNonceRequiresAPopulatedRecentblockhashesSysvar:
    "ADVANCING_STORED_NONCE_REQUIRES_A_POPULATED_RECENTBLOCKHASHES_SYSVAR",
  StoredNonceIsStillInRecentBlockhashes:
    "STORED_NONCE_IS_STILL_IN_RECENT_BLOCKHASHES",
  SpecifiedNonceDoesNotMatchStoredNonce:
    "SPECIFIED_NONCE_DOES_NOT_MATCH_STORED_NONCE",
  LamportBalanceBelowRentExemptThreshold:
    "LAMPORT_BALANCE_BELOW_RENT-EXEMPT_THRESHOLD",
  InsufficientFunds: "INSUFFICIENT_FUNDS",
  InvalidMint: "INVALID_MINT",
  AccountNotAssociatedWithThisMint: "ACCOUNT_NOT_ASSOCIATED_WITH_THIS_MINT",
  OwnerDoesNotMatch: "OWNER_DOES_NOT_MATCH",
  FixedSupply: "FIXED_SUPPLY",
  AlreadyInUse: "ALREADY_IN_USE",
  InvalidNumberOfProvidedSigners: "INVALID_NUMBER_OF_PROVIDED_SIGNERS",
  InvalidNumberOfRequiredSigners: "INVALID_NUMBER_OF_REQUIRED_SIGNERS",
  StateIsUninitialized: "STATE_IS_UNINITIALIZED",
  InstructionDoesNotSupportNativeTokens:
    "INSTRUCTION_DOES_NOT_SUPPORT_NATIVE_TOKENS",
  NonNativeAccountCanOnlyBeClosedIfItsBalanceIsZero:
    "NON-NATIVE_ACCOUNT_CAN_ONLY_BE_CLOSED_IF_ITS_BALANCE_IS_ZERO",
  InvalidInstruction: "INVALID_INSTRUCTION",
  StateIsInvalidForRequestedOperation:
    "STATE_IS_INVALID_FOR_REQUESTED_OPERATION",
  OperationOverflowed: "OPERATION_OVERFLOWED",
  AccountDoesNotSupportSpecifiedAuthorityType:
    "ACCOUNT_DOES_NOT_SUPPORT_SPECIFIED_AUTHORITY_TYPE",
  ThisTokenMintCannotFreezeAccounts: "THIS_TOKEN_MINT_CANNOT_FREEZE_ACCOUNTS",
  AccountIsFrozen: "ACCOUNT_IS_FROZEN",
  TheProvidedDecimalsValueDifferentFromTheMintDecimals:
    "THE_PROVIDED_DECIMALS_VALUE_DIFFERENT_FROM_THE_MINT_DECIMALS",
  InstructionDoesNotSupportNonNativeTokens:
    "INSTRUCTION_DOES_NOT_SUPPORT_NON-NATIVE_TOKENS",
  AccountInUse: "ACCOUNT_IN_USE",
  AccountLoadedTwice: "ACCOUNT_LOADED_TWICE",
  AttemptToDebitAnAccountButFoundNoRecordOfAPriorCredit:
    "ATTEMPT_TO_DEBIT_AN_ACCOUNT_BUT_FOUND_NO_RECORD_OF_A_PRIOR_CREDIT.",
  AttemptToLoadAProgramThatDoesNotExist:
    "ATTEMPT_TO_LOAD_A_PROGRAM_THAT_DOES_NOT_EXIST",
  InsufficientFundsForFee: "INSUFFICIENT_FUNDS_FOR_FEE",
  ThisAccountMayNotBeUsedToPayTransactionFees:
    "THIS_ACCOUNT_MAY_NOT_BE_USED_TO_PAY_TRANSACTION_FEES",
  ThisTransactionHasAlreadyBeenProcessed:
    "THIS_TRANSACTION_HAS_ALREADY_BEEN_PROCESSED",
  BlockhashNotFound: "BLOCKHASH_NOT_FOUND",
  ErrorProcessingInstruction01: "ERROR_PROCESSING_INSTRUCTION_{0}:_{1}",
  LoaderCallChainIsTooDeep: "LOADER_CALL_CHAIN_IS_TOO_DEEP",
  TransactionRequiresAFeeButHasNoSignaturePresent:
    "TRANSACTION_REQUIRES_A_FEE_BUT_HAS_NO_SIGNATURE_PRESENT",
  TransactionContainsAnInvalidAccountReference:
    "TRANSACTION_CONTAINS_AN_INVALID_ACCOUNT_REFERENCE",
  TransactionDidNotPassSignatureVerification:
    "TRANSACTION_DID_NOT_PASS_SIGNATURE_VERIFICATION",
  ThisProgramMayNotBeUsedForExecutingInstructions:
    "THIS_PROGRAM_MAY_NOT_BE_USED_FOR_EXECUTING_INSTRUCTIONS",
  TransactionFailedToSanitizeAccountsOffsetsCorrectly:
    "TRANSACTION_FAILED_TO_SANITIZE_ACCOUNTS_OFFSETS_CORRECTLY",
  TransactionsAreCurrentlyDisabledDueToClusterMaintenance:
    "TRANSACTIONS_ARE_CURRENTLY_DISABLED_DUE_TO_CLUSTER_MAINTENANCE",
  TransactionProcessingLeftAnAccountWithAnOutstandingBorrowedReference:
    "TRANSACTION_PROCESSING_LEFT_AN_ACCOUNT_WITH_AN_OUTSTANDING_BORROWED_REFERENCE",
  TransactionWouldExceedMaxBlockCostLimit:
    "TRANSACTION_WOULD_EXCEED_MAX_BLOCK_COST_LIMIT",
  TransactionVersionIsUnsupported: "TRANSACTION_VERSION_IS_UNSUPPORTED",
  TransactionLoadsAWritableAccountThatCannotBeWritten:
    "TRANSACTION_LOADS_A_WRITABLE_ACCOUNT_THAT_CANNOT_BE_WRITTEN",
  TransactionWouldExceedMaxAccountLimitWithinTheBlock:
    "TRANSACTION_WOULD_EXCEED_MAX_ACCOUNT_LIMIT_WITHIN_THE_BLOCK",
  TransactionWouldExceedAccountDataLimitWithinTheBlock:
    "TRANSACTION_WOULD_EXCEED_ACCOUNT_DATA_LIMIT_WITHIN_THE_BLOCK",
  TransactionLockedTooManyAccounts: "TRANSACTION_LOCKED_TOO_MANY_ACCOUNTS",
  TransactionLoadsAnAddressTableAccountThatDoesntExist:
    "TRANSACTION_LOADS_AN_ADDRESS_TABLE_ACCOUNT_THAT_DOESN'T_EXIST",
  TransactionLoadsAnAddressTableAccountWithAnInvalidOwner:
    "TRANSACTION_LOADS_AN_ADDRESS_TABLE_ACCOUNT_WITH_AN_INVALID_OWNER",
  TransactionLoadsAnAddressTableAccountWithInvalidData:
    "TRANSACTION_LOADS_AN_ADDRESS_TABLE_ACCOUNT_WITH_INVALID_DATA",
  TransactionAddressTableLookupUsesAnInvalidIndex:
    "TRANSACTION_ADDRESS_TABLE_LOOKUP_USES_AN_INVALID_INDEX",
  TransactionLeavesAnAccountWithALowerBalanceThanRentExemptMinimum:
    "TRANSACTION_LEAVES_AN_ACCOUNT_WITH_A_LOWER_BALANCE_THAN_RENT-EXEMPT_MINIMUM",
  TransactionWouldExceedMaxVoteCostLimit:
    "TRANSACTION_WOULD_EXCEED_MAX_VOTE_COST_LIMIT",
  TransactionWouldExceedTotalAccountDataLimit:
    "TRANSACTION_WOULD_EXCEED_TOTAL_ACCOUNT_DATA_LIMIT",
  TransactionContainsADuplicateInstruction0ThatIsNotAllowed:
    "TRANSACTION_CONTAINS_A_DUPLICATE_INSTRUCTION_({0})_THAT_IS_NOT_ALLOWED",
  UnknownError: "UNKNOWN_ERROR",
} as const;
export type ScanTransactionsSolana200ResponseSimulationResultsErrorKindEnum =
  (typeof ScanTransactionsSolana200ResponseSimulationResultsErrorKindEnum)[keyof typeof ScanTransactionsSolana200ResponseSimulationResultsErrorKindEnum];

/**
 *
 * @export
 * @interface ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner
 */
export interface ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner {
  /**
   * Computed explanation of the state change that can be directly presented to the end-user. While the API is still in development, we suggest integrators expose this in their signing UI since the list of state change kinds has not yet stabilized.
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner
   */
  humanReadableDiff: string;
  /**
   * Suggested text color when presenting the diff to end-users
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner
   */
  suggestedColor: ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerSuggestedColorEnum;
  /**
   *
   * @type {ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerRawInfo}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInner
   */
  rawInfo: ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerRawInfo;
}

/**
 * @export
 */
export const ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerSuggestedColorEnum =
  {
    Credit: "CREDIT",
    Debit: "DEBIT",
    Info: "INFO",
  } as const;
export type ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerSuggestedColorEnum =
  (typeof ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerSuggestedColorEnum)[keyof typeof ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerSuggestedColorEnum];

/**
 * @type ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerRawInfo
 * A machine-parsable state change object describing the state change.
 * @export
 */
export type ScanTransactionsSolana200ResponseSimulationResultsExpectedStateChangesInnerRawInfo =

    | ({
        kind: "BFP_LOADER_AUTHORITY_CHANGE";
      } & SolanaStateChangeBfpLoaderAuthorityChange)
    | ({
        kind: "COMPRESSED_NFT_TRANSFER";
      } & SolanaStateChangeCompressedNftTransfer)
    | ({
        kind: "SOL_STAKE_ACCOUNT_DEPOSIT";
      } & SolanaStateChangeSolStakeAccountDeposit)
    | ({
        kind: "SOL_STAKE_ACCOUNT_WITHDRAWAL";
      } & SolanaStateChangeSolStakeAccountWithdrawal)
    | ({
        kind: "SOL_STAKE_AUTHORITY_CHANGE";
      } & SolanaStateChangeSolStakeAuthorityChange)
    | ({ kind: "SOL_TRANSFER" } & SolanaStateChangeSolTransfer)
    | ({ kind: "SPL_APPROVAL" } & SolanaStateChangeSplApproval)
    | ({ kind: "SPL_TRANSFER" } & SolanaStateChangeSplTransfer)
    | ({
        kind: "USER_ACCOUNT_OWNER_CHANGE";
      } & SolanaStateChangeUserAccountOwnerChange);
/**
 * Raw results of the simulation
 * @export
 * @interface ScanTransactionsSolana200ResponseSimulationResultsRaw
 */
export interface ScanTransactionsSolana200ResponseSimulationResultsRaw {
  /**
   * Program instruction error causing the failure. Can be `null`.
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsRaw
   */
  err: string | null;
  /**
   * Program logs generated during execution
   * @type {Array<string>}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsRaw
   */
  logs: Array<string>;
  /**
   *
   * @type {number}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsRaw
   */
  unitsConsumed: number;
  /**
   *
   * @type {ScanTransactionsSolana200ResponseSimulationResultsRawReturnData}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsRaw
   */
  returnData: ScanTransactionsSolana200ResponseSimulationResultsRawReturnData | null;
}
/**
 * Can be `null`.
 * @export
 * @interface ScanTransactionsSolana200ResponseSimulationResultsRawReturnData
 */
export interface ScanTransactionsSolana200ResponseSimulationResultsRawReturnData {
  /**
   * the program that generated the return data, as base-58 encoded Pubkey
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsRawReturnData
   */
  programId: string;
  /**
   * The return data itself, as base-64 encoded binary data and it's encoding as the second element
   * @type {Array<string>}
   * @memberof ScanTransactionsSolana200ResponseSimulationResultsRawReturnData
   */
  data: Array<string>;
}
/**
 *
 * @export
 * @interface ScanTransactionsSolanaRequest
 */
export interface ScanTransactionsSolanaRequest {
  /**
   * Base58 or Base64 encoded Solana transactions to scan
   * @type {Array<string>}
   * @memberof ScanTransactionsSolanaRequest
   */
  transactions: Array<string>;
  /**
   * Base58-encoded account of signer of transactions
   * @type {string}
   * @memberof ScanTransactionsSolanaRequest
   */
  userAccount: string;
  /**
   *
   * @type {RequestMetadata}
   * @memberof ScanTransactionsSolanaRequest
   */
  metadata: RequestMetadata;
}
/**
 * Changing the authority on the BFP loader. It allows the new authority to change the deployed program at any time
 * @export
 * @interface SolanaStateChangeBfpLoaderAuthorityChange
 */
export interface SolanaStateChangeBfpLoaderAuthorityChange {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeBfpLoaderAuthorityChange
   */
  kind: SolanaStateChangeBfpLoaderAuthorityChangeKindEnum;
  /**
   *
   * @type {SolanaStateChangeBfpLoaderAuthorityChangeData}
   * @memberof SolanaStateChangeBfpLoaderAuthorityChange
   */
  data: SolanaStateChangeBfpLoaderAuthorityChangeData;
}

/**
 * @export
 */
export const SolanaStateChangeBfpLoaderAuthorityChangeKindEnum = {
  BfpLoaderAuthorityChange: "BFP_LOADER_AUTHORITY_CHANGE",
} as const;
export type SolanaStateChangeBfpLoaderAuthorityChangeKindEnum =
  (typeof SolanaStateChangeBfpLoaderAuthorityChangeKindEnum)[keyof typeof SolanaStateChangeBfpLoaderAuthorityChangeKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeBfpLoaderAuthorityChangeData
 */
export interface SolanaStateChangeBfpLoaderAuthorityChangeData {
  /**
   * The program account address
   * @type {string}
   * @memberof SolanaStateChangeBfpLoaderAuthorityChangeData
   */
  account: string;
  /**
   * Current authority with control over the loader
   * @type {string}
   * @memberof SolanaStateChangeBfpLoaderAuthorityChangeData
   */
  currentAuthority: string | null;
  /**
   * Future authority with control over the loader
   * @type {string}
   * @memberof SolanaStateChangeBfpLoaderAuthorityChangeData
   */
  futureAuthority: string | null;
}
/**
 * cNFT transfer
 * @export
 * @interface SolanaStateChangeCompressedNftTransfer
 */
export interface SolanaStateChangeCompressedNftTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeCompressedNftTransfer
   */
  kind: SolanaStateChangeCompressedNftTransferKindEnum;
  /**
   *
   * @type {SolanaStateChangeCompressedNftTransferData}
   * @memberof SolanaStateChangeCompressedNftTransfer
   */
  data: SolanaStateChangeCompressedNftTransferData;
}

/**
 * @export
 */
export const SolanaStateChangeCompressedNftTransferKindEnum = {
  CompressedNftTransfer: "COMPRESSED_NFT_TRANSFER",
} as const;
export type SolanaStateChangeCompressedNftTransferKindEnum =
  (typeof SolanaStateChangeCompressedNftTransferKindEnum)[keyof typeof SolanaStateChangeCompressedNftTransferKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeCompressedNftTransferData
 */
export interface SolanaStateChangeCompressedNftTransferData {
  /**
   * cNFT symbol
   * @type {string}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  id: string;
  /**
   * cNFT symbol
   * @type {string}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  symbol: string;
  /**
   * cNFT name
   * @type {string}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  name: string;
  /**
   *
   * @type {CompressedNftStandard}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  compressedNftStandard: CompressedNftStandard;
  /**
   *
   * @type {LegacyAssetPrice}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  assetPrice: LegacyAssetPrice | null;
  /**
   * The URL of the asset's image. Can be `null`.
   * @type {string}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  imageUrl: string | null;
  /**
   *
   * @type {NftPreviews}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  previews: NftPreviews;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  diff: Diff;
  /**
   * Contains counterparty address if known. To whom the transfer was made for Send or from whom was it made for Receive
   * @type {string}
   * @memberof SolanaStateChangeCompressedNftTransferData
   */
  counterparty: string | null;
}
/**
 * Creation of a SOL staking account
 * @export
 * @interface SolanaStateChangeSolStakeAccountDeposit
 */
export interface SolanaStateChangeSolStakeAccountDeposit {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountDeposit
   */
  kind: SolanaStateChangeSolStakeAccountDepositKindEnum;
  /**
   *
   * @type {SolanaStateChangeSolStakeAccountDepositData}
   * @memberof SolanaStateChangeSolStakeAccountDeposit
   */
  data: SolanaStateChangeSolStakeAccountDepositData;
}

/**
 * @export
 */
export const SolanaStateChangeSolStakeAccountDepositKindEnum = {
  SolStakeAccountDeposit: "SOL_STAKE_ACCOUNT_DEPOSIT",
} as const;
export type SolanaStateChangeSolStakeAccountDepositKindEnum =
  (typeof SolanaStateChangeSolStakeAccountDepositKindEnum)[keyof typeof SolanaStateChangeSolStakeAccountDepositKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeSolStakeAccountDepositData
 */
export interface SolanaStateChangeSolStakeAccountDepositData {
  /**
   * The stake account address
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountDepositData
   */
  stakeAccount: string;
  /**
   * Symbol of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountDepositData
   */
  symbol: string;
  /**
   * Name of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountDepositData
   */
  name: string;
  /**
   * Decimals of the Solana native token
   * @type {number}
   * @memberof SolanaStateChangeSolStakeAccountDepositData
   */
  decimals: number;
  /**
   * Amount of SOL staked by this account
   * @type {number}
   * @memberof SolanaStateChangeSolStakeAccountDepositData
   */
  solStaked: number;
}
/**
 * Withdrawal from a SOL staking account
 * @export
 * @interface SolanaStateChangeSolStakeAccountWithdrawal
 */
export interface SolanaStateChangeSolStakeAccountWithdrawal {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountWithdrawal
   */
  kind: SolanaStateChangeSolStakeAccountWithdrawalKindEnum;
  /**
   *
   * @type {SolanaStateChangeSolStakeAccountWithdrawalData}
   * @memberof SolanaStateChangeSolStakeAccountWithdrawal
   */
  data: SolanaStateChangeSolStakeAccountWithdrawalData;
}

/**
 * @export
 */
export const SolanaStateChangeSolStakeAccountWithdrawalKindEnum = {
  SolStakeAccountWithdrawal: "SOL_STAKE_ACCOUNT_WITHDRAWAL",
} as const;
export type SolanaStateChangeSolStakeAccountWithdrawalKindEnum =
  (typeof SolanaStateChangeSolStakeAccountWithdrawalKindEnum)[keyof typeof SolanaStateChangeSolStakeAccountWithdrawalKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeSolStakeAccountWithdrawalData
 */
export interface SolanaStateChangeSolStakeAccountWithdrawalData {
  /**
   * The stake account address
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountWithdrawalData
   */
  stakeAccount: string;
  /**
   * Symbol of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountWithdrawalData
   */
  symbol: string;
  /**
   * Name of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAccountWithdrawalData
   */
  name: string;
  /**
   * Decimals of the Solana native token
   * @type {number}
   * @memberof SolanaStateChangeSolStakeAccountWithdrawalData
   */
  decimals: number;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStateChangeSolStakeAccountWithdrawalData
   */
  diff: Diff;
}
/**
 * Transferring control over a user's SOL staking account
 * @export
 * @interface SolanaStateChangeSolStakeAuthorityChange
 */
export interface SolanaStateChangeSolStakeAuthorityChange {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChange
   */
  kind: SolanaStateChangeSolStakeAuthorityChangeKindEnum;
  /**
   *
   * @type {SolanaStateChangeSolStakeAuthorityChangeData}
   * @memberof SolanaStateChangeSolStakeAuthorityChange
   */
  data: SolanaStateChangeSolStakeAuthorityChangeData;
}

/**
 * @export
 */
export const SolanaStateChangeSolStakeAuthorityChangeKindEnum = {
  SolStakeAuthorityChange: "SOL_STAKE_AUTHORITY_CHANGE",
} as const;
export type SolanaStateChangeSolStakeAuthorityChangeKindEnum =
  (typeof SolanaStateChangeSolStakeAuthorityChangeKindEnum)[keyof typeof SolanaStateChangeSolStakeAuthorityChangeKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeSolStakeAuthorityChangeData
 */
export interface SolanaStateChangeSolStakeAuthorityChangeData {
  /**
   * The stake account address
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  stakeAccount: string;
  /**
   *
   * @type {SolanaStateChangeSolStakeAuthorityChangeDataCurrentAuthorities}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  currentAuthorities: SolanaStateChangeSolStakeAuthorityChangeDataCurrentAuthorities;
  /**
   *
   * @type {SolanaStateChangeSolStakeAuthorityChangeDataFutureAuthorities}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  futureAuthorities: SolanaStateChangeSolStakeAuthorityChangeDataFutureAuthorities;
  /**
   * Symbol of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  symbol: string;
  /**
   * Name of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  name: string;
  /**
   * Decimals of the Solana native token
   * @type {number}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  decimals: number;
  /**
   * Amount of SOL staked by this account
   * @type {number}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  solStaked: number;
}
/**
 * Current authorities with control over the staking account
 * @export
 * @interface SolanaStateChangeSolStakeAuthorityChangeDataCurrentAuthorities
 */
export interface SolanaStateChangeSolStakeAuthorityChangeDataCurrentAuthorities {
  /**
   * Authority who can make staking changes
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeDataCurrentAuthorities
   */
  staker: string;
  /**
   * Authority who can withdraw the funds from the staking account
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeDataCurrentAuthorities
   */
  withdrawer: string;
}
/**
 * Future authorities who will have control over the staking account
 * @export
 * @interface SolanaStateChangeSolStakeAuthorityChangeDataFutureAuthorities
 */
export interface SolanaStateChangeSolStakeAuthorityChangeDataFutureAuthorities {
  /**
   * Authority who can make staking changes
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeDataFutureAuthorities
   */
  staker: string;
  /**
   * Authority who can withdraw the funds from the staking account
   * @type {string}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeDataFutureAuthorities
   */
  withdrawer: string;
}
/**
 * Solana native token transfer
 * @export
 * @interface SolanaStateChangeSolTransfer
 */
export interface SolanaStateChangeSolTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeSolTransfer
   */
  kind: SolanaStateChangeSolTransferKindEnum;
  /**
   *
   * @type {SolanaStateChangeSolTransferData}
   * @memberof SolanaStateChangeSolTransfer
   */
  data: SolanaStateChangeSolTransferData;
}

/**
 * @export
 */
export const SolanaStateChangeSolTransferKindEnum = {
  SolTransfer: "SOL_TRANSFER",
} as const;
export type SolanaStateChangeSolTransferKindEnum =
  (typeof SolanaStateChangeSolTransferKindEnum)[keyof typeof SolanaStateChangeSolTransferKindEnum];

/**
 * Machine-parseable data relevant to this state change kind
 * @export
 * @interface SolanaStateChangeSolTransferData
 */
export interface SolanaStateChangeSolTransferData {
  /**
   * Symbol of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolTransferData
   */
  symbol: string;
  /**
   * Name of the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolTransferData
   */
  name: string;
  /**
   * Decimals of the Solana native token
   * @type {number}
   * @memberof SolanaStateChangeSolTransferData
   */
  decimals: number;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStateChangeSolTransferData
   */
  diff: Diff;
  /**
   * Image URL for the Solana native token
   * @type {string}
   * @memberof SolanaStateChangeSolTransferData
   */
  imageUrl: string;
}
/**
 * Approval request to transfer user's tokens
 * @export
 * @interface SolanaStateChangeSplApproval
 */
export interface SolanaStateChangeSplApproval {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeSplApproval
   */
  kind: SolanaStateChangeSplApprovalKindEnum;
  /**
   *
   * @type {SolanaStateChangeSplApprovalData}
   * @memberof SolanaStateChangeSplApproval
   */
  data: SolanaStateChangeSplApprovalData;
}

/**
 * @export
 */
export const SolanaStateChangeSplApprovalKindEnum = {
  SplApproval: "SPL_APPROVAL",
} as const;
export type SolanaStateChangeSplApprovalKindEnum =
  (typeof SolanaStateChangeSplApprovalKindEnum)[keyof typeof SolanaStateChangeSplApprovalKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeSplApprovalData
 */
export interface SolanaStateChangeSplApprovalData {
  /**
   * Who will be able to transfer the user's tokens on their behalf
   * @type {string}
   * @memberof SolanaStateChangeSplApprovalData
   */
  delegate: string;
  /**
   * The SPL token mint program address
   * @type {string}
   * @memberof SolanaStateChangeSplApprovalData
   */
  mint: string;
  /**
   * SPL token symbol
   * @type {string}
   * @memberof SolanaStateChangeSplApprovalData
   */
  symbol: string;
  /**
   * SPL token name
   * @type {string}
   * @memberof SolanaStateChangeSplApprovalData
   */
  name: string;
  /**
   * SPL token decimals
   * @type {number}
   * @memberof SolanaStateChangeSplApprovalData
   */
  decimals: number;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStateChangeSplApprovalData
   */
  diff: Diff;
  /**
   * Total supply of the token
   * @type {number}
   * @memberof SolanaStateChangeSplApprovalData
   */
  supply: number;
  /**
   *
   * @type {MetaplexTokenStandard}
   * @memberof SolanaStateChangeSplApprovalData
   */
  metaplexTokenStandard: MetaplexTokenStandard;
  /**
   *
   * @type {LegacyAssetPrice}
   * @memberof SolanaStateChangeSplApprovalData
   */
  assetPrice: LegacyAssetPrice | null;
  /**
   * Image URL of the asset if any
   * @type {string}
   * @memberof SolanaStateChangeSplApprovalData
   */
  imageUrl: string | null;
  /**
   *
   * @type {NftPreviews}
   * @memberof SolanaStateChangeSplApprovalData
   */
  previews: NftPreviews;
}
/**
 * SPL token transfer
 * @export
 * @interface SolanaStateChangeSplTransfer
 */
export interface SolanaStateChangeSplTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeSplTransfer
   */
  kind: SolanaStateChangeSplTransferKindEnum;
  /**
   *
   * @type {SolanaStateChangeSplTransferData}
   * @memberof SolanaStateChangeSplTransfer
   */
  data: SolanaStateChangeSplTransferData;
}

/**
 * @export
 */
export const SolanaStateChangeSplTransferKindEnum = {
  SplTransfer: "SPL_TRANSFER",
} as const;
export type SolanaStateChangeSplTransferKindEnum =
  (typeof SolanaStateChangeSplTransferKindEnum)[keyof typeof SolanaStateChangeSplTransferKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeSplTransferData
 */
export interface SolanaStateChangeSplTransferData {
  /**
   * SPL token symbol
   * @type {string}
   * @memberof SolanaStateChangeSplTransferData
   */
  symbol: string;
  /**
   * SPL token name
   * @type {string}
   * @memberof SolanaStateChangeSplTransferData
   */
  name: string;
  /**
   * The SPL token mint program address
   * @type {string}
   * @memberof SolanaStateChangeSplTransferData
   */
  mint: string;
  /**
   * SPL token decimals
   * @type {number}
   * @memberof SolanaStateChangeSplTransferData
   */
  decimals: number;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStateChangeSplTransferData
   */
  diff: Diff;
  /**
   * Contains counterparty address if known. To whom the transfer was made for Send or from whom was it made for Receive
   * @type {string}
   * @memberof SolanaStateChangeSplTransferData
   */
  counterparty?: string | null;
  /**
   * SPL token supply
   * @type {number}
   * @memberof SolanaStateChangeSplTransferData
   */
  supply: number;
  /**
   *
   * @type {MetaplexTokenStandard}
   * @memberof SolanaStateChangeSplTransferData
   */
  metaplexTokenStandard: MetaplexTokenStandard;
  /**
   *
   * @type {LegacyAssetPrice}
   * @memberof SolanaStateChangeSplTransferData
   */
  assetPrice: LegacyAssetPrice | null;
  /**
   * Image URL of the asset if any
   * @type {string}
   * @memberof SolanaStateChangeSplTransferData
   */
  imageUrl: string | null;
  /**
   *
   * @type {NftPreviews}
   * @memberof SolanaStateChangeSplTransferData
   */
  previews: NftPreviews;
  /**
   * Whether the asset is verified as safe
   * @type {boolean}
   * @memberof SolanaStateChangeSplTransferData
   */
  verified: boolean;
  /**
   * The trusted token lists on which this asset is listed
   * @type {Array<string>}
   * @memberof SolanaStateChangeSplTransferData
   */
  lists: Array<SolanaStateChangeSplTransferDataListsEnum>;
}

/**
 * @export
 */
export const SolanaStateChangeSplTransferDataListsEnum = {
  Jupiter: "JUPITER",
  Blowfish: "BLOWFISH",
  Solflare: "SOLFLARE",
} as const;
export type SolanaStateChangeSplTransferDataListsEnum =
  (typeof SolanaStateChangeSplTransferDataListsEnum)[keyof typeof SolanaStateChangeSplTransferDataListsEnum];

/**
 * Transferring control over a user's Solana account to a different program (defaults to Solana system program)
 * @export
 * @interface SolanaStateChangeUserAccountOwnerChange
 */
export interface SolanaStateChangeUserAccountOwnerChange {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStateChangeUserAccountOwnerChange
   */
  kind: SolanaStateChangeUserAccountOwnerChangeKindEnum;
  /**
   *
   * @type {SolanaStateChangeUserAccountOwnerChangeData}
   * @memberof SolanaStateChangeUserAccountOwnerChange
   */
  data: SolanaStateChangeUserAccountOwnerChangeData;
}

/**
 * @export
 */
export const SolanaStateChangeUserAccountOwnerChangeKindEnum = {
  UserAccountOwnerChange: "USER_ACCOUNT_OWNER_CHANGE",
} as const;
export type SolanaStateChangeUserAccountOwnerChangeKindEnum =
  (typeof SolanaStateChangeUserAccountOwnerChangeKindEnum)[keyof typeof SolanaStateChangeUserAccountOwnerChangeKindEnum];

/**
 *
 * @export
 * @interface SolanaStateChangeUserAccountOwnerChangeData
 */
export interface SolanaStateChangeUserAccountOwnerChangeData {
  /**
   * The Solana account whose ownership would be changed
   * @type {string}
   * @memberof SolanaStateChangeUserAccountOwnerChangeData
   */
  account: string;
  /**
   * Amount of lamports in this account
   * @type {number}
   * @memberof SolanaStateChangeUserAccountOwnerChangeData
   */
  lamports: number;
  /**
   * Current program that is the owner for this account
   * @type {string}
   * @memberof SolanaStateChangeUserAccountOwnerChangeData
   */
  currentOwner: string;
  /**
   * Future program that will be the new owner for this account
   * @type {string}
   * @memberof SolanaStateChangeUserAccountOwnerChangeData
   */
  futureOwner: string;
}
/**
 *
 * @export
 * @interface Unauthorized
 */
export interface Unauthorized {
  /**
   * The error that caused the 401
   * @type {string}
   * @memberof Unauthorized
   */
  error: string;
  /**
   * Request ID uniquely identifies the HTTP request sent to our service
   * @type {string}
   * @memberof Unauthorized
   */
  requestId?: string;
}
/**
 *
 * @export
 * @interface WarningInner
 */
export interface WarningInner {
  /**
   * warning severity level. We suggest a yellow message if "WARNING", and a red message if "CRITICAL".
   * @type {string}
   * @memberof WarningInner
   */
  severity: WarningInnerSeverityEnum;
  /**
   * Warning kind. Can be used to override specific warnings with your own custom versions. We reserve the right to add new warnings as the need arises, so your UI should likewise defer to the supplied message if the kind isn't recognized by your code.
   * @type {string}
   * @memberof WarningInner
   */
  kind: WarningInnerKindEnum;
  /**
   * human-readable message to present to the end-user
   * @type {string}
   * @memberof WarningInner
   */
  message: string;
}

/**
 * @export
 */
export const WarningInnerSeverityEnum = {
  Critical: "CRITICAL",
  Warning: "WARNING",
} as const;
export type WarningInnerSeverityEnum =
  (typeof WarningInnerSeverityEnum)[keyof typeof WarningInnerSeverityEnum];

/**
 * @export
 */
export const WarningInnerKindEnum = {
  ApprovalToEoa: "APPROVAL_TO_EOA",
  BlocklistedDomainCrossOrigin: "BLOCKLISTED_DOMAIN_CROSS_ORIGIN",
  BlurBulkOrderNotOnBlur: "BLUR_BULK_ORDER_NOT_ON_BLUR",
  BlurV2OrderNotOnBlur: "BLUR_V2_ORDER_NOT_ON_BLUR",
  BulkApprovalsRequest: "BULK_APPROVALS_REQUEST",
  CompromisedAuthorityUpgrade: "COMPROMISED_AUTHORITY_UPGRADE",
  CopyCatDomain: "COPY_CAT_DOMAIN",
  CopyCatImageUnresponsiveDomain: "COPY_CAT_IMAGE_UNRESPONSIVE_DOMAIN",
  DanglingApproval: "DANGLING_APPROVAL",
  DebuggerPaused: "DEBUGGER_PAUSED",
  DurableNonce: "DURABLE_NONCE",
  EthSignTxHash: "ETH_SIGN_TX_HASH",
  Forta: "FORTA",
  ImbalancedDollarValue: "IMBALANCED_DOLLAR_VALUE",
  KnownMalicious: "KNOWN_MALICIOUS",
  MaliciousPackages: "MALICIOUS_PACKAGES",
  MultiCopyCatDomain: "MULTI_COPY_CAT_DOMAIN",
  NewDomain: "NEW_DOMAIN",
  PermitNoExpiration: "PERMIT_NO_EXPIRATION",
  PermitUnlimitedAllowance: "PERMIT_UNLIMITED_ALLOWANCE",
  PoisonedAddress: "POISONED_ADDRESS",
  ReferencedOfacAddress: "REFERENCED_OFAC_ADDRESS",
  SemiTrustedBlocklistDomain: "SEMI_TRUSTED_BLOCKLIST_DOMAIN",
  SetOwnerAuthority: "SET_OWNER_AUTHORITY",
  SuspectedMalicious: "SUSPECTED_MALICIOUS",
  TooManyTransactions: "TOO_MANY_TRANSACTIONS",
  TradeForNothing: "TRADE_FOR_NOTHING",
  TradeForUnverifiedNft: "TRADE_FOR_UNVERIFIED_NFT",
  TransferringErc20ToOwnContract: "TRANSFERRING_ERC20_TO_OWN_CONTRACT",
  TransferringTooMuchSol: "TRANSFERRING_TOO_MUCH_SOL",
  TransfersMajorityOfYourSol: "TRANSFERS_MAJORITY_OF_YOUR_SOL",
  TrustedBlocklistDomain: "TRUSTED_BLOCKLIST_DOMAIN",
  UnlimitedAllowanceToNfts: "UNLIMITED_ALLOWANCE_TO_NFTS",
  UnusualGasConsumption: "UNUSUAL_GAS_CONSUMPTION",
  UserAccountOwnerChange: "USER_ACCOUNT_OWNER_CHANGE",
  TransferToMintAccount: "TRANSFER_TO_MINT_ACCOUNT",
  WhitelistedDomainCrossOrigin: "WHITELISTED_DOMAIN_CROSS_ORIGIN",
  YakoaNftIpInfringement: "YAKOA_NFT_IP_INFRINGEMENT",
  ReliableSimulationNotPossible: "RELIABLE_SIMULATION_NOT_POSSIBLE",
} as const;
export type WarningInnerKindEnum =
  (typeof WarningInnerKindEnum)[keyof typeof WarningInnerKindEnum];
