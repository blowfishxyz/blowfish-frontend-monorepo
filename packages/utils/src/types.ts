import type {
  EvmStateChangeErc721ApprovalData,
  EvmStateChangeErc721TransferData,
  EvmStateChangeErc1155TransferData,
  SignTypedDataPayload,
  EvmSimulatorConfig,
} from "@blowfishxyz/api-client";
import { ActionEnum } from "@blowfishxyz/api-client";

export { SignTypedDataPayload };

export interface TransactionPayload {
  to: string;
  from: string;
  value: string | undefined;
  data: string | undefined;
  gas?: string | undefined;
}

export type WarningSeverity = "WARNING" | "CRITICAL";
export type Severity = "INFO" | WarningSeverity;

export const actionToSeverity = (action: ActionEnum): Severity => {
  switch (action) {
    case ActionEnum.Block:
      return "CRITICAL";
    case ActionEnum.Warn:
      return "WARNING";
    case ActionEnum.None:
    default:
      return "INFO";
  }
};

export enum Identifier {
  MetamaskInpage = "METAMASK_INPAGE",
  MetamaskContentScript = "METAMASK_CONTENT_SCRIPT",
  MetamaskProvider = "METAMASK_PROVIDER",
  Inpage = "BLOWFISH_INPAGE",
  ContentScript = "BLOWFISH_CONTENTSCRIPT",
  Confirm = "BLOWFISH_CONFIRM",
}

export enum RequestType {
  Transaction = "TRANSACTION",
  SignTypedData = "SIGN_TYPED_DATA",
  SignMessage = "SIGN_MESSAGE",
  BatchRequests = "BATCH_REQUESTS",
  UserDecision = "USER_DECISION",
  BlowfishOptions = "BLOWFISH_OPTIONS",
  SetBlowfishOptions = "SET_BLOWFISH_OPTIONS",
  GetRequestToScan = "GET_REQUEST_TO_SCAN",
  MessageAck = "BLOWFISH_MESSAGE_ACK",
  BlockDomain = "BLOCK_DOMAIN",
  AllowlistedDomains = "ALLOWLISTED_DOMAINS",
  SolanaSignTransactionRequest = "SOLANA_SIGN_TRANSACTION_REQUEST",
}

// TODO(kimpers): Type message
export interface UntypedMessageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface Message<TType extends RequestType, TData extends object> {
  id: string;
  data: TData;
  type: TType;
  origin?: string;
}

export type DappRequest =
  | TransactionRequest
  | SignTypedDataRequest
  | SignMessageRequest
  | BatchRequests
  | SolanaSignTransactionRequest;

export const parseRequestFromMessage = (
  message: Message<DappRequest["type"], DappRequest>
): DappRequest => {
  switch (message.type) {
    case RequestType.Transaction:
    case RequestType.SignTypedData:
    case RequestType.SignMessage:
    case RequestType.BatchRequests:
      return message.data;
    default:
      throw new Error(`Unhandled request type ${message.type}`);
  }
};

interface BaseRequest {
  type: RequestType;
  chainId: string;
  userAccount: string;
}

export interface TransactionRequest extends BaseRequest {
  type: RequestType.Transaction;
  payload: TransactionPayload;
  isImpersonatingWallet?: boolean;
  extensionVersion: string;
  simulatorConfig?: EvmSimulatorConfig;
}

export type SolanaSignTransactionPayload = {
  transactions: string[];
};

export interface SolanaSignTransactionRequest extends BaseRequest {
  type: RequestType.SolanaSignTransactionRequest;
  payload: SolanaSignTransactionPayload;
  isImpersonatingWallet?: boolean;
  extensionVersion: string;
  simulatorConfig?: EvmSimulatorConfig;
}

export const isTransactionRequest = (
  req: DappRequest
): req is TransactionRequest => req.type === RequestType.Transaction;

export enum SignTypedDataVersion {
  V1 = "V1",
  V3 = "V3",
  V4 = "V4",
}

type SignTypedDataPayloadV1 = {
  payload: TypedDataV1Field[];
  signTypedDataVersion: SignTypedDataVersion.V1;
};

type SignTypedDataPayloadV3V4 = {
  payload: SignTypedDataPayload;
  signTypedDataVersion: SignTypedDataVersion.V3 | SignTypedDataVersion.V4;
};

export type SupportedSignTypedDataPayloadVersion =
  | SignTypedDataPayloadV1
  | SignTypedDataPayloadV3V4;

export type SignTypedDataRequest = BaseRequest & {
  type: RequestType.SignTypedData;
  isImpersonatingWallet?: boolean;
  extensionVersion: string;
} & SupportedSignTypedDataPayloadVersion;

export const isSignTypedDataRequest = (
  req: DappRequest
): req is SignTypedDataRequest => req.type === RequestType.SignTypedData;

export type SignMessageMethod = "eth_sign" | "personal_sign";

export interface SignMessagePayload {
  method: SignMessageMethod;
  message: string;
}

export interface SignMessageRequest extends BaseRequest {
  type: RequestType.SignMessage;
  payload: SignMessagePayload;
  isImpersonatingWallet?: boolean;
  extensionVersion: string;
}

export const isSignMessageRequest = (
  req: DappRequest
): req is SignMessageRequest => req.type === RequestType.SignMessage;

export type BatchRequestsPayload = Message<DappRequest["type"], DappRequest>[];

export interface BatchRequests extends BaseRequest {
  type: RequestType.BatchRequests;
  payload: BatchRequestsPayload;
  isImpersonatingWallet?: boolean;
  extensionVersion: string;
}

export const isBatchRequests = (req: DappRequest): req is BatchRequests =>
  req.type === RequestType.BatchRequests;

export type UserDecisionOpts = {
  pauseScan?: boolean;
  skipUnsupportedChainWarning?: boolean;
  chainId: string;
};

export type UserDecisionResponse =
  | {
      isOk: false;
      opts?: UserDecisionOpts;
    }
  | {
      isOk: true;
      result: string;
      opts?: UserDecisionOpts;
    };

export interface TypedDataV1Field {
  type: string;
  name: string;
  value: unknown;
}

export enum BlowfishOption {
  PREFERENCES_BLOWFISH_PAUSED = "PREFERENCES_BLOWFISH_PAUSED",
  PREFERENCES_BLOWFISH_IMPERSONATION_WALLET = "PREFERENCES_BLOWFISH_IMPERSONATION_WALLET",
  PREFERENCES_BLOWFISH_CUSTOM_PORTAL_URL = "PREFERENCES_BLOWFISH_CUSTOM_PORTAL_URL",
  PREFERENCES_BLOWFISH_V2_ENABLED = "PREFERENCES_BLOWFISH_V2_ENABLED",
  ALLOWLISTED_DOMAINS = "ALLOWLISTED_DOMAINS",
}

export type BlowfishPausedOptionType = {
  until: number | null;
  isPaused: boolean;
};

export type BlowfishOptionKey = {
  key: BlowfishOption;
};

export type BlowfishOptionKeyValue =
  | {
      key: BlowfishOption.PREFERENCES_BLOWFISH_PAUSED;
      value: BlowfishPausedOptionType;
    }
  | {
      key: BlowfishOption.PREFERENCES_BLOWFISH_IMPERSONATION_WALLET;
      value: string;
    }
  | {
      key: BlowfishOption.ALLOWLISTED_DOMAINS;
      value: string;
    };

export type BlowfishBlockDomainPayload = {
  href: string;
  host: string;
};

export type BlowfishPortalBackgroundMessage =
  | Message<RequestType.UserDecision, UserDecisionResponse>
  | Message<RequestType.GetRequestToScan, { key: string }>
  | Message<RequestType.BlowfishOptions, BlowfishOptionKey>
  | Message<RequestType.SetBlowfishOptions, BlowfishOptionKeyValue>
  | Message<RequestType.BlockDomain, BlowfishBlockDomainPayload>
  | Message<RequestType.AllowlistedDomains, BlowfishBlockDomainPayload>
  | Message<DappRequest["type"], DappRequest>;

export const isUserDecisionResponseMessage = (
  message: BlowfishPortalBackgroundMessage
): message is Message<RequestType.UserDecision, UserDecisionResponse> =>
  message.type === RequestType.UserDecision;

export const isTransactionRequestMessage = (
  message: Message<DappRequest["type"], DappRequest>
): message is Message<RequestType.Transaction, TransactionRequest> => {
  return message.type === RequestType.Transaction;
};

export const isSolanaSignTransactionRequestMessage = (
  message: Message<DappRequest["type"], DappRequest>
): message is Message<
  RequestType.SolanaSignTransactionRequest,
  SolanaSignTransactionRequest
> => {
  return message.type === RequestType.SolanaSignTransactionRequest;
};

export const isSignTypedDataRequestMessage = (
  message: Message<DappRequest["type"], DappRequest>
): message is Message<RequestType.SignTypedData, SignTypedDataRequest> => {
  return message.type === RequestType.SignTypedData;
};

export const isSignRequestMessage = (
  message: Message<DappRequest["type"], DappRequest>
): message is Message<RequestType.SignMessage, SignMessageRequest> => {
  return message.type === RequestType.SignMessage;
};

export const isBatchRequestsMessage = (
  message: Message<DappRequest["type"], DappRequest>
): message is Message<RequestType.BatchRequests, BatchRequests> => {
  return message.type === RequestType.BatchRequests;
};

export const isDappRequestMessage = (
  message: BlowfishPortalBackgroundMessage
): message is Message<DappRequest["type"], DappRequest> => {
  return (
    message.type === RequestType.Transaction ||
    message.type === RequestType.SignTypedData ||
    message.type === RequestType.SignMessage ||
    message.type === RequestType.BatchRequests ||
    message.type === RequestType.SolanaSignTransactionRequest
  );
};

export type ParsedScanUrl =
  | Message<DappRequest["type"], DappRequest>
  | { id: string; chainId: string };

//TODO: We should remove the urlScan as soon as possible since it introduces a security risk
export const isUrlScan = (
  parsedUrl: ParsedScanUrl
): parsedUrl is Message<DappRequest["type"], DappRequest> => {
  return "type" in parsedUrl;
};

export type NftStateChangeWithTokenId =
  | EvmStateChangeErc721TransferData
  | EvmStateChangeErc1155TransferData
  | EvmStateChangeErc721ApprovalData;
