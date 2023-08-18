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
}
/**
 * An error object describing why we were unable to simulate the transactions in the request. Can be `null`.
 * @export
 * @interface BlowfishSimulationError
 */
export interface BlowfishSimulationError {
  /**
   * The error that caused us to be unable to run transaction simulation for this request. `SIMULATION_TIMED_OUT` is returned if the simulation took too long and timed out. `BAD_REQUEST` is returned if the transaction(s) or `user_account` submitted were invalid (this is similar to a 400 bad request). `TOO_MANY_TRANSACTIONS` us returned if a request includes too many transactions (current max: 100 txns). `SIMULATION_FAILED` is returned if simulation failed because of a dependent RPC failure or internal server error during simulation execution.
   * @type {string}
   * @memberof BlowfishSimulationError
   */
  kind: BlowfishSimulationErrorKindEnum;
  /**
   * Human readable version of the error with more details about why it failed (esp. for BAD_REQUEST). SIMULATION_FAILED is only returned if we were unable to run the simulation because of an internal error (akin to a 500 error code).
   * @type {string}
   * @memberof BlowfishSimulationError
   */
  humanReadableError: string;
}

/**
 * @export
 */
export const BlowfishSimulationErrorKindEnum = {
  SimulationFailed: "SIMULATION_FAILED",
  SimulationTimedOut: "SIMULATION_TIMED_OUT",
  TooManyTransactions: "TOO_MANY_TRANSACTIONS",
  BadRequest: "BAD_REQUEST",
} as const;
export type BlowfishSimulationErrorKindEnum =
  (typeof BlowfishSimulationErrorKindEnum)[keyof typeof BlowfishSimulationErrorKindEnum];

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
  Solfare: "SOLFARE",
  Phishfort: "PHISHFORT",
  Scamsniffer: "SCAMSNIFFER",
  Metamask: "METAMASK",
} as const;
export type DownloadBlocklistRequestPriorityBlockListsEnum =
  (typeof DownloadBlocklistRequestPriorityBlockListsEnum)[keyof typeof DownloadBlocklistRequestPriorityBlockListsEnum];

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
 * @interface EvmErc1155Asset
 */
export interface EvmErc1155Asset {
  /**
   * The contract address of the asset
   * @type {string}
   * @memberof EvmErc1155Asset
   */
  address: string;
  /**
   *
   * @type {string}
   * @memberof EvmErc1155Asset
   */
  name: string;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmErc1155Asset
   */
  price: AssetPrice | null;
}
/**
 *
 * @export
 * @interface EvmErc20Asset
 */
export interface EvmErc20Asset {
  /**
   * The contract address of the asset
   * @type {string}
   * @memberof EvmErc20Asset
   */
  address: string;
  /**
   * The symbol of the asset
   * @type {string}
   * @memberof EvmErc20Asset
   */
  symbol: string;
  /**
   * The name of the asset
   * @type {string}
   * @memberof EvmErc20Asset
   */
  name: string;
  /**
   * The number of decimal places used by the asset
   * @type {number}
   * @memberof EvmErc20Asset
   */
  decimals: number;
  /**
   * Whether the asset is verified as safe
   * @type {boolean}
   * @memberof EvmErc20Asset
   */
  verified: boolean;
  /**
   * The trusted token lists on which this asset is listed
   * @type {Array<string>}
   * @memberof EvmErc20Asset
   */
  lists: Array<EvmErc20AssetListsEnum>;
  /**
   * The URL of the asset's image. Can be `null`.
   * @type {string}
   * @memberof EvmErc20Asset
   */
  imageUrl: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmErc20Asset
   */
  price: AssetPrice | null;
}

/**
 * @export
 */
export const EvmErc20AssetListsEnum = {
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
export type EvmErc20AssetListsEnum =
  (typeof EvmErc20AssetListsEnum)[keyof typeof EvmErc20AssetListsEnum];

/**
 *
 * @export
 * @interface EvmErc721Asset
 */
export interface EvmErc721Asset {
  /**
   * The contract address of the asset
   * @type {string}
   * @memberof EvmErc721Asset
   */
  address: string;
  /**
   *
   * @type {string}
   * @memberof EvmErc721Asset
   */
  symbol: string;
  /**
   *
   * @type {string}
   * @memberof EvmErc721Asset
   */
  name: string;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmErc721Asset
   */
  price: AssetPrice | null;
}
/**
 *
 * @export
 * @interface EvmExpectedStateChange
 */
export interface EvmExpectedStateChange {
  /**
   * Computed explanation of the state change that can be directly presented to the end-user. While the API is still in development, we suggest integrators expose this in their signing UI if they encounter a `rawInfo.kind` they don't recognize.
   * @type {string}
   * @memberof EvmExpectedStateChange
   */
  humanReadableDiff: string;
  /**
   *
   * @type {EvmExpectedStateChangeRawInfo}
   * @memberof EvmExpectedStateChange
   */
  rawInfo: EvmExpectedStateChangeRawInfo;
}
/**
 * @type EvmExpectedStateChangeRawInfo
 * A machine-parsable state change object describing the state change.
 * @export
 */
export type EvmExpectedStateChangeRawInfo =
  | ({ kind: "ERC1155_APPROVAL_FOR_ALL" } & EvmStateChangeErc1155ApprovalForAll)
  | ({ kind: "ERC1155_TRANSFER" } & EvmStateChangeErc1155Transfer)
  | ({ kind: "ERC20_APPROVAL" } & EvmStateChangeErc20Approval)
  | ({ kind: "ERC20_TRANSFER" } & EvmStateChangeErc20Transfer)
  | ({ kind: "ERC721_APPROVAL" } & EvmStateChangeErc721Approval)
  | ({ kind: "ERC721_APPROVAL_FOR_ALL" } & EvmStateChangeErc721ApprovalForAll)
  | ({ kind: "ERC721_TRANSFER" } & EvmStateChangeErc721Transfer)
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
   * @type {EvmMessageStateChangeErc1155TransferData}
   * @memberof EvmMessageStateChangeErc1155Transfer
   */
  data: EvmMessageStateChangeErc1155TransferData;
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
 * Data associated with the state change
 * @export
 * @interface EvmMessageStateChangeErc1155TransferData
 */
export interface EvmMessageStateChangeErc1155TransferData {
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangeErc1155TransferData
   */
  name: string;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmMessageStateChangeErc1155TransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeErc1155TransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmNftMetadata}
   * @memberof EvmMessageStateChangeErc1155TransferData
   */
  metadata: EvmNftMetadata;
  /**
   * The ID of the ERC1155 token. Can be `null`.
   * @type {string}
   * @memberof EvmMessageStateChangeErc1155TransferData
   */
  tokenId: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmMessageStateChangeErc1155TransferData
   */
  assetPrice: AssetPrice | null;
}
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
   * @type {EvmMessageStateChangeErc20TransferData}
   * @memberof EvmMessageStateChangeErc20Transfer
   */
  data: EvmMessageStateChangeErc20TransferData;
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
 * Data associated with the state change
 * @export
 * @interface EvmMessageStateChangeErc20TransferData
 */
export interface EvmMessageStateChangeErc20TransferData {
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeErc20TransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmMessageStateChangeErc20TransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAsset}
   * @memberof EvmMessageStateChangeErc20TransferData
   */
  asset: EvmAsset;
}
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
   * @type {EvmMessageStateChangeErc721TransferData}
   * @memberof EvmMessageStateChangeErc721Transfer
   */
  data: EvmMessageStateChangeErc721TransferData;
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
 * Data associated with the state change
 * @export
 * @interface EvmMessageStateChangeErc721TransferData
 */
export interface EvmMessageStateChangeErc721TransferData {
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  counterparty?: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmNftMetadata}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  metadata: EvmNftMetadata;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  symbol: string;
  /**
   * The ID of the ERC721 token. Can be `null` in some edge cases where we are temporarily unable to parse it.
   * @type {string}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  tokenId: string | null;
  /**
   *
   * @type {AssetPrice}
   * @memberof EvmMessageStateChangeErc721TransferData
   */
  assetPrice: AssetPrice | null;
}
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
   * @type {EvmMessageStateChangeNativeAssetTransferData}
   * @memberof EvmMessageStateChangeNativeAssetTransfer
   */
  data: EvmMessageStateChangeNativeAssetTransferData;
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
 * Data associated with the state change
 * @export
 * @interface EvmMessageStateChangeNativeAssetTransferData
 */
export interface EvmMessageStateChangeNativeAssetTransferData {
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmMessageStateChangeNativeAssetTransferData
   */
  contract: EvmAddressInfo;
  /**
   *
   * @type {EvmAmount}
   * @memberof EvmMessageStateChangeNativeAssetTransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmNativeAsset}
   * @memberof EvmMessageStateChangeNativeAssetTransferData
   */
  asset: EvmNativeAsset;
}
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
}
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
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  amount: EvmAmount;
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
   * @type {EvmErc1155Asset}
   * @memberof EvmStateChangeErc1155ApprovalForAllData
   */
  asset: EvmErc1155Asset;
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
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc1155TransferData
   */
  amount: EvmAmount;
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
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc1155TransferData
   */
  counterparty?: EvmAddressInfo;
  /**
   *
   * @type {EvmErc1155Asset}
   * @memberof EvmStateChangeErc1155TransferData
   */
  asset: EvmErc1155Asset;
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
   * @type {EvmErc20Asset}
   * @memberof EvmStateChangeErc20ApprovalData
   */
  asset: EvmErc20Asset;
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
   * @type {EvmAmount}
   * @memberof EvmStateChangeErc20TransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc20TransferData
   */
  counterparty?: EvmAddressInfo;
  /**
   *
   * @type {EvmErc20Asset}
   * @memberof EvmStateChangeErc20TransferData
   */
  asset: EvmErc20Asset;
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
   * @type {EvmNftMetadata}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  metadata: EvmNftMetadata;
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
   * The ID of the ERC721 token. Can be `null` in some edge cases where we are temporarily unable to parse it.
   * @type {string}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  tokenId: string | null;
  /**
   *
   * @type {EvmErc721Asset}
   * @memberof EvmStateChangeErc721ApprovalData
   */
  asset: EvmErc721Asset;
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
  owner: EvmAddressInfo;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  spender: EvmAddressInfo;
  /**
   *
   * @type {EvmErc721Asset}
   * @memberof EvmStateChangeErc721ApprovalForAllData
   */
  asset: EvmErc721Asset;
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
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeErc721TransferData
   */
  counterparty: EvmAddressInfo;
  /**
   *
   * @type {EvmNftMetadata}
   * @memberof EvmStateChangeErc721TransferData
   */
  metadata: EvmNftMetadata;
  /**
   * The ID of the ERC721 token. Can be `null` in some edge cases where we are temporarily unable to parse it.
   * @type {string}
   * @memberof EvmStateChangeErc721TransferData
   */
  tokenId: string | null;
  /**
   *
   * @type {EvmErc721Asset}
   * @memberof EvmStateChangeErc721TransferData
   */
  asset: EvmErc721Asset;
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
   * @type {EvmAmount}
   * @memberof EvmStateChangeNativeAssetTransferData
   */
  amount: EvmAmount;
  /**
   *
   * @type {EvmAddressInfo}
   * @memberof EvmStateChangeNativeAssetTransferData
   */
  counterparty: EvmAddressInfo;
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
   * UNPROCESSABLE -> We were unable to analyze the domain. This usually means that the website was unreachable or did not include valid HTML
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
      } & EvmMessageStateChangeNativeAssetTransfer);
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
  | ({ kind: "SIGN_MESSAGE" } & EvmSignMessage)
  | ({ kind: "SIGN_TYPED_DATA" } & EvmSignTypedData);
/**
 *
 * @export
 * @interface ScanTransactionEvm200Response
 */
export interface ScanTransactionEvm200Response {
  /**
   *
   * @type {ActionEnum}
   * @memberof ScanTransactionEvm200Response
   */
  action: ActionEnum;
  /**
   * An array of warnings generated from scanning the transactions. All these warnings won't be returned in a single response (some are mutually exclusive) but it is advisable that your UI can display multiple warnings. Warnings are returned sorted by severity, so if you can only show a user one warning, show them the one at the 0th index.
   * @type {Array<WarningInner>}
   * @memberof ScanTransactionEvm200Response
   */
  warnings: Array<WarningInner>;
  /**
   *
   * @type {ScanTransactionEvm200ResponseSimulationResults}
   * @memberof ScanTransactionEvm200Response
   */
  simulationResults: ScanTransactionEvm200ResponseSimulationResults;
}
/**
 *
 * @export
 * @interface ScanTransactionEvm200ResponseSimulationResults
 */
export interface ScanTransactionEvm200ResponseSimulationResults {
  /**
   *
   * @type {Array<EvmExpectedStateChange>}
   * @memberof ScanTransactionEvm200ResponseSimulationResults
   */
  expectedStateChanges: Array<EvmExpectedStateChange>;
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError}
   * @memberof ScanTransactionEvm200ResponseSimulationResults
   */
  error: ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerError | null;
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerGas}
   * @memberof ScanTransactionEvm200ResponseSimulationResults
   */
  gas: ScanTransactionsEvm200ResponseSimulationResultsPerTransactionInnerGas;
  /**
   *
   * @type {EvmProtocol}
   * @memberof ScanTransactionEvm200ResponseSimulationResults
   */
  protocol: EvmProtocol | null;
}
/**
 *
 * @export
 * @interface ScanTransactionEvmRequest
 */
export interface ScanTransactionEvmRequest {
  /**
   *
   * @type {EvmTxData}
   * @memberof ScanTransactionEvmRequest
   */
  txObject: EvmTxData;
  /**
   *
   * @type {RequestMetadata}
   * @memberof ScanTransactionEvmRequest
   */
  metadata: RequestMetadata;
  /**
   * A hex-representation of the user account who is being asked to sign the supplied transaction. In most cases this will be the same as the from property in the txObject
   * @type {string}
   * @memberof ScanTransactionEvmRequest
   */
  userAccount: string;
}
/**
 *
 * @export
 * @interface ScanTransactionsEvm200Response
 */
export interface ScanTransactionsEvm200Response {
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
   * A hex-representation of the user account who is being asked to sign the supplied transaction. In most cases this will be the same as the from property in the txObject
   * @type {string}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsAggregated
   */
  userAccount: string;
  /**
   * A mapping of account to the state changes to expect if these transactions were submitted on-chain. Each state change represents a meaningful change to the account's assets or permissions on-chain. We reserve the right to add new state change types, so any handling logic custom to state change types should fallback gracefully to showing the end-user the `humanReadableDiff` of any unrecognized state change types.
   * @type {{ [key: string]: Array<EvmExpectedStateChange> | undefined; }}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsAggregated
   */
  expectedStateChanges: {
    [key: string]: Array<EvmExpectedStateChange> | undefined;
  };
  /**
   *
   * @type {ScanTransactionsEvm200ResponseSimulationResultsAggregatedError}
   * @memberof ScanTransactionsEvm200ResponseSimulationResultsAggregated
   */
  error: ScanTransactionsEvm200ResponseSimulationResultsAggregatedError | null;
}
/**
 * @type ScanTransactionsEvm200ResponseSimulationResultsAggregatedError
 * A error object which includes the parsed simulation error encountered (if any). Can be `null`.
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
   * A field that if the simulation was successful contains the estimated upper limit of gas usage for this transaction. The gasLimit should be viewed as an upper bound of how much gas the transaction can use, not as an accurate estimate how much it will realistically consume when submitted on-chain. Can be `null`.
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
}
/**
 *
 * @export
 * @interface ScanTransactionsSolana200Response
 */
export interface ScanTransactionsSolana200Response {
  /**
   *
   * @type {ScanTransactionsSolana200ResponseAggregated}
   * @memberof ScanTransactionsSolana200Response
   */
  aggregated: ScanTransactionsSolana200ResponseAggregated;
  /**
   *
   * @type {Array<ScanTransactionsSolana200ResponsePerTransactionInner>}
   * @memberof ScanTransactionsSolana200Response
   */
  perTransaction: Array<ScanTransactionsSolana200ResponsePerTransactionInner>;
}
/**
 *
 * @export
 * @interface ScanTransactionsSolana200ResponseAggregated
 */
export interface ScanTransactionsSolana200ResponseAggregated {
  /**
   *
   * @type {ActionEnum}
   * @memberof ScanTransactionsSolana200ResponseAggregated
   */
  action: ActionEnum;
  /**
   * An array of warnings generated from scanning the transactions. All these warnings won't be returned in a single response (some are mutually exclusive) but it is advisable that your UI can display multiple warnings. Warnings are returned sorted by severity, so if you can only show a user one warning, show them the one at the 0th index.
   * @type {Array<WarningInner>}
   * @memberof ScanTransactionsSolana200ResponseAggregated
   */
  warnings: Array<WarningInner>;
  /**
   *
   * @type {BlowfishSimulationError}
   * @memberof ScanTransactionsSolana200ResponseAggregated
   */
  error: BlowfishSimulationError | null;
  /**
   * A mapping of account to the state changes to expect if these transactions were submitted on-chain. Each state change represents a meaningful change to the account's assets or permissions on-chain. We reserve the right to add new state change types, so any handling logic custom to state change types should fallback gracefully to showing the end-user the `humanReadableDiff` of any unrecognized state change types.
   * @type {{ [key: string]: Array<ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner> | undefined; }}
   * @memberof ScanTransactionsSolana200ResponseAggregated
   */
  expectedStateChanges: {
    [key: string]:
      | Array<ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner>
      | undefined;
  };
}
/**
 *
 * @export
 * @interface ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner
 */
export interface ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner {
  /**
   * Computed explanation of the state change that can be directly presented to the end-user. While the API is still in development, we suggest integrators expose this in their signing UI since the list of state change kinds has not yet stabilized.
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner
   */
  humanReadableDiff: string;
  /**
   * Suggested text color when presenting the diff to end-users
   * @type {string}
   * @memberof ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner
   */
  suggestedColor: ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerSuggestedColorEnum;
  /**
   *
   * @type {ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerRawInfo}
   * @memberof ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInner
   */
  rawInfo: ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerRawInfo;
}

/**
 * @export
 */
export const ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerSuggestedColorEnum =
  {
    Credit: "CREDIT",
    Debit: "DEBIT",
  } as const;
export type ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerSuggestedColorEnum =
  (typeof ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerSuggestedColorEnum)[keyof typeof ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerSuggestedColorEnum];

/**
 * @type ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerRawInfo
 * A machine-parsable state change object describing the state change.
 * @export
 */
export type ScanTransactionsSolana200ResponseAggregatedExpectedStateChangesValueInnerRawInfo =

    | ({
        kind: "SOL_STAKE_AUTHORITY_CHANGE";
      } & SolanaStateChangeSolStakeAuthorityChange)
    | ({ kind: "SOL_TRANSFER" } & SolanaStateChangeSolTransfer)
    | ({ kind: "SPL_APPROVAL" } & SolanaStateChangeSplApproval)
    | ({ kind: "SPL_TRANSFER" } & SolanaStageChangeSplTransfer)
    | ({
        kind: "USER_ACCOUNT_OWNER_CHANGE";
      } & SolanaStateChangeUserAccountOwnerChange);
/**
 *
 * @export
 * @interface ScanTransactionsSolana200ResponsePerTransactionInner
 */
export interface ScanTransactionsSolana200ResponsePerTransactionInner {
  /**
   * Whether the tx nonce is valid
   * @type {boolean}
   * @memberof ScanTransactionsSolana200ResponsePerTransactionInner
   */
  isNonceValid: boolean;
  /**
   *
   * @type {SolanaSimulationError}
   * @memberof ScanTransactionsSolana200ResponsePerTransactionInner
   */
  error: SolanaSimulationError | null;
  /**
   *
   * @type {SolanaRawSimulationResults}
   * @memberof ScanTransactionsSolana200ResponsePerTransactionInner
   */
  raw: SolanaRawSimulationResults;
  /**
   *
   * @type {Array<SolanaProtocol>}
   * @memberof ScanTransactionsSolana200ResponsePerTransactionInner
   */
  protocols: Array<SolanaProtocol>;
  /**
   *
   * @type {Array<SolanaInstruction>}
   * @memberof ScanTransactionsSolana200ResponsePerTransactionInner
   */
  instructions: Array<SolanaInstruction>;
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
 *
 * @export
 * @interface SolAsset
 */
export interface SolAsset {
  /**
   * Symbol of the Solana native token
   * @type {string}
   * @memberof SolAsset
   */
  symbol: string;
  /**
   * Name of the Solana native token
   * @type {string}
   * @memberof SolAsset
   */
  name: string;
  /**
   * Decimals of the Solana native token
   * @type {number}
   * @memberof SolAsset
   */
  decimals: number;
  /**
   *
   * @type {AssetPrice}
   * @memberof SolAsset
   */
  price: AssetPrice | null;
}
/**
 * Information about each instruction
 * @export
 * @interface SolanaInstruction
 */
export interface SolanaInstruction {
  /**
   * Index of the protocol in the list of protocols for this instruction
   * @type {number}
   * @memberof SolanaInstruction
   */
  protocolIndex: number | null;
}
/**
 * Human-readable protocol information. Note that a single protocol can consist of multiple programs.
 * @export
 * @interface SolanaProtocol
 */
export interface SolanaProtocol {
  /**
   * `NATIVE` means it’s a SOL transfer, an SPL Program or any other program written and maintained by the Solana Foundation. `TRUSTED` means it’s one of the core projects that control 80-90% of TVL on the chain. `KNOWN` means it’s one of “long tail projects” without significant adoption."
   * @type {string}
   * @memberof SolanaProtocol
   */
  trustLevel: SolanaProtocolTrustLevelEnum;
  /**
   *
   * @type {string}
   * @memberof SolanaProtocol
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof SolanaProtocol
   */
  description: string;
  /**
   * URL of the protocol's logo. Can be null if no logo is available.
   * @type {string}
   * @memberof SolanaProtocol
   */
  imageUrl: string | null;
  /**
   *
   * @type {string}
   * @memberof SolanaProtocol
   */
  websiteUrl: string;
}

/**
 * @export
 */
export const SolanaProtocolTrustLevelEnum = {
  Known: "KNOWN",
  Trusted: "TRUSTED",
  Native: "NATIVE",
} as const;
export type SolanaProtocolTrustLevelEnum =
  (typeof SolanaProtocolTrustLevelEnum)[keyof typeof SolanaProtocolTrustLevelEnum];

/**
 * Raw results of the simulation
 * @export
 * @interface SolanaRawSimulationResults
 */
export interface SolanaRawSimulationResults {
  /**
   * Program instruction error causing the failure. Can be `null`.
   * @type {string}
   * @memberof SolanaRawSimulationResults
   */
  err: string | null;
  /**
   * Program logs generated during execution
   * @type {Array<string>}
   * @memberof SolanaRawSimulationResults
   */
  logs: Array<string>;
  /**
   *
   * @type {number}
   * @memberof SolanaRawSimulationResults
   */
  unitsConsumed: number;
  /**
   *
   * @type {SolanaRawSimulationResultsReturnData}
   * @memberof SolanaRawSimulationResults
   */
  returnData: SolanaRawSimulationResultsReturnData | null;
}
/**
 * Can be `null`.
 * @export
 * @interface SolanaRawSimulationResultsReturnData
 */
export interface SolanaRawSimulationResultsReturnData {
  /**
   * the program that generated the return data, as base-58 encoded Pubkey
   * @type {string}
   * @memberof SolanaRawSimulationResultsReturnData
   */
  programId: string;
  /**
   * The return data itself, as base-64 encoded binary data and it's encoding as the second element
   * @type {Array<string>}
   * @memberof SolanaRawSimulationResultsReturnData
   */
  data: Array<string>;
}
/**
 * @type SolanaSimulationError
 * A error object which includes the parsed simulation error encountered (if any). Can be `null`.
 * @export
 */
export type SolanaSimulationError =
  | ({ kind: "PROGRAM_ERROR" } & SolanaSimulationProgramError)
  | ({ kind: "TRANSACTION_ERROR" } & SolanaSimulationTransactionError);
/**
 *
 * @export
 * @interface SolanaSimulationProgramError
 */
export interface SolanaSimulationProgramError {
  /**
   *
   * @type {string}
   * @memberof SolanaSimulationProgramError
   */
  kind: SolanaSimulationProgramErrorKindEnum;
  /**
   * Human-readable version of the error.
   * @type {string}
   * @memberof SolanaSimulationProgramError
   */
  humanReadableError: string;
  /**
   * The address of the Solana program where this revert error occurred
   * @type {string}
   * @memberof SolanaSimulationProgramError
   */
  solanaProgramAddress: string;
}

/**
 * @export
 */
export const SolanaSimulationProgramErrorKindEnum = {
  ProgramError: "PROGRAM_ERROR",
} as const;
export type SolanaSimulationProgramErrorKindEnum =
  (typeof SolanaSimulationProgramErrorKindEnum)[keyof typeof SolanaSimulationProgramErrorKindEnum];

/**
 *
 * @export
 * @interface SolanaSimulationTransactionError
 */
export interface SolanaSimulationTransactionError {
  /**
   *
   * @type {string}
   * @memberof SolanaSimulationTransactionError
   */
  kind?: SolanaSimulationTransactionErrorKindEnum;
  /**
   * Human-readable version of the error. Values match the string version of the `TransactionError` enum values in the Solana repo
   * @type {string}
   * @memberof SolanaSimulationTransactionError
   */
  humanReadableError: string;
}

/**
 * @export
 */
export const SolanaSimulationTransactionErrorKindEnum = {
  TransactionError: "TRANSACTION_ERROR",
} as const;
export type SolanaSimulationTransactionErrorKindEnum =
  (typeof SolanaSimulationTransactionErrorKindEnum)[keyof typeof SolanaSimulationTransactionErrorKindEnum];

/**
 * SPL token transfer
 * @export
 * @interface SolanaStageChangeSplTransfer
 */
export interface SolanaStageChangeSplTransfer {
  /**
   * What kind of state change this object is
   * @type {string}
   * @memberof SolanaStageChangeSplTransfer
   */
  kind: SolanaStageChangeSplTransferKindEnum;
  /**
   *
   * @type {SolanaStageChangeSplTransferData}
   * @memberof SolanaStageChangeSplTransfer
   */
  data: SolanaStageChangeSplTransferData;
}

/**
 * @export
 */
export const SolanaStageChangeSplTransferKindEnum = {
  SplTransfer: "SPL_TRANSFER",
} as const;
export type SolanaStageChangeSplTransferKindEnum =
  (typeof SolanaStageChangeSplTransferKindEnum)[keyof typeof SolanaStageChangeSplTransferKindEnum];

/**
 *
 * @export
 * @interface SolanaStageChangeSplTransferData
 */
export interface SolanaStageChangeSplTransferData {
  /**
   *
   * @type {SplAsset}
   * @memberof SolanaStageChangeSplTransferData
   */
  asset: SplAsset;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStageChangeSplTransferData
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
   *
   * @type {SolAsset}
   * @memberof SolanaStateChangeSolStakeAuthorityChangeData
   */
  asset: SolAsset;
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
   *
   * @type {SolAsset}
   * @memberof SolanaStateChangeSolTransferData
   */
  asset: SolAsset;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStateChangeSolTransferData
   */
  diff: Diff;
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
   *
   * @type {SplAsset}
   * @memberof SolanaStateChangeSplApprovalData
   */
  asset: SplAsset;
  /**
   *
   * @type {Diff}
   * @memberof SolanaStateChangeSplApprovalData
   */
  diff: Diff;
}
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
 * @interface SplAsset
 */
export interface SplAsset {
  /**
   * SPL token symbol
   * @type {string}
   * @memberof SplAsset
   */
  symbol: string;
  /**
   * SPL token name
   * @type {string}
   * @memberof SplAsset
   */
  name: string;
  /**
   * The SPL token mint program address
   * @type {string}
   * @memberof SplAsset
   */
  mint: string;
  /**
   * SPL token decimals
   * @type {number}
   * @memberof SplAsset
   */
  decimals: number;
  /**
   * SPL token supply
   * @type {number}
   * @memberof SplAsset
   */
  supply: number;
  /**
   *
   * @type {MetaplexTokenStandard}
   * @memberof SplAsset
   */
  metaplexTokenStandard: MetaplexTokenStandard;
  /**
   *
   * @type {AssetPrice}
   * @memberof SplAsset
   */
  price: AssetPrice | null;
  /**
   *  HACK(metreniuk): updated manually until it's not fixed in schema
   * @type {string}
   * @memberof SplAsset
   */
  imageUrl: string | null;
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
  SuspectedMalicious: "SUSPECTED_MALICIOUS",
  KnownMalicious: "KNOWN_MALICIOUS",
  TransferringErc20ToOwnContract: "TRANSFERRING_ERC20_TO_OWN_CONTRACT",
  UnlimitedAllowanceToNfts: "UNLIMITED_ALLOWANCE_TO_NFTS",
  BulkApprovalsRequest: "BULK_APPROVALS_REQUEST",
  SetOwnerAuthority: "SET_OWNER_AUTHORITY",
  TrustedBlocklistDomain: "TRUSTED_BLOCKLIST_DOMAIN",
  SemiTrustedBlocklistDomain: "SEMI_TRUSTED_BLOCKLIST_DOMAIN",
  DanglingApproval: "DANGLING_APPROVAL",
  TradeForNothing: "TRADE_FOR_NOTHING",
  PermitUnlimitedAllowance: "PERMIT_UNLIMITED_ALLOWANCE",
  PermitNoExpiration: "PERMIT_NO_EXPIRATION",
  EthSignTxHash: "ETH_SIGN_TX_HASH",
  ObfuscatedCode: "OBFUSCATED_CODE",
  DevtoolsDisabled: "DEVTOOLS_DISABLED",
  BlocklistedDomainCrossOrigin: "BLOCKLISTED_DOMAIN_CROSS_ORIGIN",
  WhitelistedDomainCrossOrigin: "WHITELISTED_DOMAIN_CROSS_ORIGIN",
  TooManyTransactions: "TOO_MANY_TRANSACTIONS",
  NonAsciiUrl: "NON_ASCII_URL",
  CompromisedAuthorityUpgrade: "COMPROMISED_AUTHORITY_UPGRADE",
  PoisonedAddress: "POISONED_ADDRESS",
  ApprovalToEOA: "APPROVAL_TO_E_O_A",
  CopyCatDomain: "COPY_CAT_DOMAIN",
} as const;
export type WarningInnerKindEnum =
  (typeof WarningInnerKindEnum)[keyof typeof WarningInnerKindEnum];
