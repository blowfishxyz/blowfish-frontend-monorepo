import type {
  EvmMessageScanResult,
  EvmTransactionObject,
  EvmTransactionRequest,
  EvmTransactionScanResult,
  RequestMetadata,
} from "./types/index";

const DEFAULT_BLOWFISH_BASE_URL = "https://api.blowfish.xyz";

export type ChainFamily = "ethereum" | "polygon" | "arbitrum";
export type ChainNetwork = "mainnet" | "goerli" | "one";

export interface SignTypedDataPayload {
  domain: {
    name: string;
    version: string | number;
    chainId: string | number;
    verifyingContract: string;
  };
  message: object;
  // TODO(kimpers): Proper typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface SignTypedDataRequest {
  kind: "SIGN_TYPED_DATA";
  data: SignTypedDataPayload;
}

export interface SignMessageRequest {
  kind: "SIGN_MESSAGE";
  rawMessage: string;
}

// TODO(kimpers): Figure out how to properly generate this from
// the Rust structs
export interface MessageRequestBody {
  message: SignTypedDataRequest | SignMessageRequest;
  metadata: RequestMetadata;
  userAccount: string;
}

export class BlowfishApiClient {
  private readonly chainFamily: ChainFamily;
  private readonly chainNetwork: ChainNetwork;
  private readonly baseUrl: string;
  private readonly apiKey: string | undefined;

  constructor(
    chainFamily: ChainFamily,
    chainNetwork: ChainNetwork,
    apiKey?: string,
    baseUrl?: string
  ) {
    this.chainFamily = chainFamily;
    this.chainNetwork = chainNetwork;
    this.baseUrl = baseUrl ?? DEFAULT_BLOWFISH_BASE_URL;
    this.apiKey = apiKey;
  }

  public async scanTransaction(
    txObject: EvmTransactionObject,
    userAccount: string,
    metadata: RequestMetadata
  ): Promise<EvmTransactionScanResult> {
    const requestBody: EvmTransactionRequest = {
      txObject,
      userAccount,
      metadata,
    };

    return this._fetchAndValidateStatus<EvmTransactionScanResult>(
      "transaction",
      requestBody
    );
  }

  public async scanSignTypedData(
    typedData: SignTypedDataPayload,
    userAccount: string,
    metadata: RequestMetadata
  ): Promise<EvmMessageScanResult> {
    const requestBody: MessageRequestBody = {
      message: {
        kind: "SIGN_TYPED_DATA",
        data: typedData,
      },
      userAccount,
      metadata,
    };

    return this._fetchAndValidateStatus<EvmMessageScanResult>(
      "message",
      requestBody
    );
  }

  public async scanSignMessage(
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata
  ): Promise<EvmMessageScanResult> {
    const requestBody: MessageRequestBody = {
      message: {
        kind: "SIGN_MESSAGE",
        rawMessage,
      },
      userAccount,
      metadata,
    };

    return this._fetchAndValidateStatus<EvmMessageScanResult>(
      "message",
      requestBody
    );
  }

  async _fetchAndValidateStatus<T>(
    endpoint: "transaction" | "message",
    requestBody: object
  ): Promise<T> {
    const url = `${this.baseUrl}/${this.chainFamily}/v0/${this.chainNetwork}/scan/${endpoint}`;

    const headers = new Headers({ "Content-Type": "application/json" });
    if (this.apiKey) {
      headers.set("X-Api-Key", this.apiKey);
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    if (response.status !== 200) {
      throw new Error(responseBody.error);
    }

    return responseBody as T;
  }
}
