import type { Action, SignTypedDataPayload } from "./BlowfishApiClient";
import { Warning } from "./BlowfishApiClient";

export { SignTypedDataPayload };

export interface TransactionPayload {
  to: string;
  from: string;
  value: string | null;
  data: string | null;
  gas?: string | null;
}

export type WarningSeverity = "WARNING" | "CRITICAL";
export type Severity = "INFO" | WarningSeverity;

export const actionToSeverity = (action: Action): Severity => {
  switch (action) {
    case "BLOCK":
      return "CRITICAL";
    case "WARN":
      return "WARNING";
    case "NONE":
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
  UserDecision = "USER_DECISION",
  BlowfishOptions = "BLOWFISH_OPTIONS",
  SetBlowfishOptions = "SET_BLOWFISH_OPTIONS",
  MessageAck = "BLOWFISH_MESSAGE_ACK",
}

// TODO(kimpers): Type message
export interface UntypedMessageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface Message<T extends object> {
  id: string;
  data: T;
  type: RequestType;
  origin?: string;
}

export type DappRequest =
  | TransactionRequest
  | SignTypedDataRequest
  | SignMessageRequest;

export const parseRequestFromMessage = (
  message: Message<DappRequest>
): DappRequest => {
  switch (message.type) {
    case RequestType.Transaction:
      return message.data as TransactionRequest;
    case RequestType.SignTypedData:
      return message.data as SignTypedDataRequest;
    case RequestType.SignMessage:
      return message.data as SignMessageRequest;
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
}

export const isTransactionRequest = (
  req: DappRequest
): req is TransactionRequest => req.type === RequestType.Transaction;

export interface SignTypedDataRequest extends BaseRequest {
  type: RequestType.SignTypedData;
  payload: SignTypedDataPayload;
  isImpersonatingWallet?: boolean;
}
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
}

export interface BlowfishOptionRequest {
  type: RequestType.BlowfishOptions;
  option: string;
}

interface WithExcludedDangerousWarning extends Omit<Warning, "kind"> {
  kind: "EXCLUDED_DANGEROUS_REQUEST";
}

export interface ExcludedDangerousRequestResult {
  action: Action;
  warnings: Array<WithExcludedDangerousWarning>;
  simulationResults: undefined;
}

export const isSignMessageRequest = (
  req: DappRequest
): req is SignMessageRequest => req.type === RequestType.SignMessage;

export type UserDecisionOpts = {
  skipUnsupportedChainWarning?: boolean;
  chainId: string;
};

const EXCLUDED_DANGEROUS_REQUESTS = new Set<string>(["eth_sign"]);

export const isExcludedDangerousRequest = (
  request: DappRequest | undefined
): boolean => {
  return (
    !!request &&
    isSignMessageRequest(request) &&
    EXCLUDED_DANGEROUS_REQUESTS.has(request.payload.method)
  );
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

export const isUserDecisionResponseMessage = (
  message: Message<UntypedMessageData>
): message is Message<UserDecisionResponse> =>
  message.type === RequestType.UserDecision;
