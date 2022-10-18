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
}

// TODO(kimpers): Type message
export interface MessageData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface Message {
  id: string;
  data: MessageData;
  type: RequestType;
  origin?: string;
}

export type DappRequest =
  | TransactionRequest
  | SignTypedDataRequest
  | SignMessageRequest;

export const parseRequestFromMessage = (message: Message): DappRequest => {
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
}
export interface TransactionPayload {
  from: string;
  to: string;
  data: string;
  gas?: string;
  value?: string;
}
export interface TransactionRequest extends BaseRequest {
  type: RequestType.Transaction;
  payload: TransactionPayload;
}

export const isTransactionRequest = (
  req: DappRequest
): req is TransactionRequest => req.type === RequestType.Transaction;

export interface SignTypedDataPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface SignTypedDataRequest extends BaseRequest {
  type: RequestType.SignTypedData;
  payload: SignTypedDataPayload;
}

export interface SignMessagePayload {
  message: string;
}
export interface SignMessageRequest extends BaseRequest {
  type: RequestType.SignMessage;
  payload: SignMessagePayload;
}
