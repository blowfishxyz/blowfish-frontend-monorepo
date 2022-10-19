const DEFAULT_BLOWFISH_BASE_URL = "https://api.blowfish.xyz";

export interface TransactionObject {
  from?: string;
  to?: string;
  value?: string;
  data?: string;
}

export interface Metadata {
  origin: string;
}

interface TransactionRequestBody {
  txObject: TransactionObject;
  userAccount: string;
  metadata: Metadata;
}

interface SignTypedDataRequest {
  kind: "SIGN_TYPED_DATA";
  data: object;
}

interface SignMessageRequest {
  kind: "SIGN_MESSAGE";
  rawMessage: string;
}

export interface MessageRequestBody {
  message: SignTypedDataRequest | SignMessageRequest;
  metadata: Metadata;
  userAccount: string;
}

export enum WarningSeverity {
  Critical = "CRITICAL",
  Warning = "WARNING",
}

export interface Warning {
  severity: WarningSeverity;
  message: string;
}

export interface ScanResponse {
  action: string;
  warnings: Warning[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  simulationResults: any;
}

export enum Action {
  None = "NONE",
  Warn = "WARN",
  Block = "BLOCK",
  HardBlock = "HARD_BLOCK",
}

export class BlowfishApiClient {
  private readonly baseUrl: string;
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string, baseUrl?: string) {
    this.baseUrl = baseUrl ?? DEFAULT_BLOWFISH_BASE_URL;
    this.apiKey = apiKey;
  }

  public async scanTransaction(
    txObject: TransactionObject,
    userAccount: string,
    metadata: Metadata
  ): Promise<ScanResponse> {
    const requestBody: TransactionRequestBody = {
      txObject,
      userAccount,
      metadata,
    };

    return this._fetchAndValidateStatus<ScanResponse>(
      "transaction",
      requestBody
    );
  }

  public async scanSignTypedData(
    typedData: object,
    userAccount: string,
    metadata: Metadata
  ): Promise<ScanResponse> {
    const requestBody: MessageRequestBody = {
      message: {
        kind: "SIGN_TYPED_DATA",
        data: typedData,
      },
      userAccount,
      metadata,
    };

    return this._fetchAndValidateStatus<ScanResponse>("message", requestBody);
  }

  public async scanSignMessage(
    rawMessage: string,
    userAccount: string,
    metadata: Metadata
  ): Promise<ScanResponse> {
    const requestBody: MessageRequestBody = {
      message: {
        kind: "SIGN_MESSAGE",
        rawMessage,
      },
      userAccount,
      metadata,
    };

    return this._fetchAndValidateStatus<ScanResponse>("message", requestBody);
  }

  async _fetchAndValidateStatus<T>(
    endpoint: "transaction" | "message",
    requestBody: object
  ): Promise<T> {
    // TODO(kimpers): handle multichain
    const url = `${this.baseUrl}/ethereum/v0/mainnet/scan/${endpoint}`;

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
