export interface SocketMessageV2 {
  id: string;
  jsonrpc: string;
  method: string;
  params: {
    topic: string;
    message: string;
    ttl: number;
    prompt: boolean;
    tag: number;
  };
}

export interface DecryptedMessageV1 {
  id: number;
  jsonrpc: "2.0";
  method: RpcMethod;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}

export interface DecryptedMessageV2 {
  id: number;
  jsonrpc: "2.0";
  method: WcMethod;
  params: {
    chainId: string;
    request: {
      method: RpcMethod;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params: any;
    };
  };
}

export interface SocketMessageV1 {
  topic: string;
  type: string;
  payload: string;
  silent: boolean;
}

export interface EncryptedPayloadV1 {
  data: string;
  hmac: string;
  iv: string;
}

export interface Subscription {
  id: string;
  topic: string;
  relay: {
    protocol: string;
  };
}

export type WcMethod =
  | "wc_sessionPropose"
  | "wc_sessionSettle"
  | "wc_sessionUpdate"
  | "wc_sessionExtend"
  | "wc_sessionDelete"
  | "wc_sessionPing"
  | "wc_sessionRequest"
  | "wc_sessionEvent";

export type RpcMethod =
  | "personal_sign"
  | "eth_sendTransaction"
  | "eth_accounts"
  | "eth_requestAccounts"
  | "eth_call"
  | "eth_getBalance"
  | "eth_sendRawTransaction"
  | "eth_sign"
  | "eth_signTransaction"
  | "eth_signTypedData"
  | "eth_signTypedData_v1"
  | "eth_signTypedData_v3"
  | "eth_signTypedData_v4"
  | "wallet_switchEthereumChain"
  | "wallet_addEthereumChain"
  | "wallet_getPermissions"
  | "wallet_requestPermissions"
  | "wallet_registerOnboarding"
  | "wallet_watchAsset"
  | "wallet_scanQRCode";
