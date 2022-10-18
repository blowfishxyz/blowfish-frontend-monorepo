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

export enum WarningSeverity {
  Critical = "CRITICAL",
  Warning = "WARNING",
}

export interface Warning {
  severity: WarningSeverity;
  message: string;
}

export interface TransactionScanResponse {
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
  ): Promise<TransactionScanResponse> {
    // TODO(kimpers): handle multichain
    const url = `${this.baseUrl}/ethereum/v0/mainnet/scan/transaction`;
    const headers = new Headers({ "Content-Type": "application/json" });
    if (this.apiKey) {
      headers.set("X-Api-Key", this.apiKey);
    }

    const requestBody: TransactionRequestBody = {
      txObject,
      userAccount,
      metadata,
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();

    if (response.status !== 200) {
      throw new Error(responseBody.error);
    }

    return responseBody as TransactionScanResponse;
  }
}
