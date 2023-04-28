import {
  Configuration,
  ConfigurationParameters,
  EvmSignTypedData,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  ScanTransactionEvmRequestTxObject,
} from "./client";
import * as Clients from "./client/apis";

export const BLOWFISH_API_BASE_URL = process.env
  .NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string;

export class BlowfishApiClientV2 {
  readonly config = new Configuration(this.getConfig());

  private getConfig(): ConfigurationParameters {
    return {
      basePath: this.basePath,
      headers: this.getHeaders(),
    };
  }

  private getHeaders() {
    const headers: HTTPHeaders = {
      ["Content-Type"]: "application/json",
    };
    if (this.apiKey) {
      headers["X-Api-Key"] = this.apiKey;
    }
    return headers;
  }

  readonly apis = {
    messages: new Clients.ScanMessageApi(this.config),
    transactions: new Clients.ScanTransactionApi(this.config),
    blocklists: new Clients.DownloadBlocklistApi(this.config),
    domains: new Clients.ScanDomainApi(this.config),
  };

  constructor(readonly basePath: string, readonly apiKey?: string) {}
}

const client = new BlowfishApiClientV2(BLOWFISH_API_BASE_URL);

export function scanMessageEvm(
  rawMessage: string,
  userAccount: string,
  metadata: RequestMetadata
) {
  return client.apis.messages.scanMessageEvm({
    scanMessageEvmRequest: {
      message: {
        kind: "SIGN_MESSAGE",
        rawMessage,
      },
      userAccount,
      metadata,
    },
    xApiKey: "",
    xApiVersion: "2022-06-01",
  });
}

export interface SignTypedDataPayload {
  domain: {
    chainId?: string | number | bigint;
    name?: string;
    salt?: `0x${string}`;
    verifyingContract?: `0x${string}`;
    version?: string;
  };
  message: { [key: string]: unknown };

  types: {
    // TODO(kimpers): Proper typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  // TODO(kimpers): Proper typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface TypedDataV1Field {
  type: string;
  name: string;
  value: unknown;
}

export function scanSignTypedData(
  typedData: EvmSignTypedDataData,
  userAccount: string,
  metadata: RequestMetadata
) {
  return client.apis.messages.scanMessageEvm({
    scanMessageEvmRequest: {
      message: {
        kind: "SIGN_TYPED_DATA",
        data: typedData,
      },
      userAccount,
      metadata,
    },
    xApiKey: "",
    xApiVersion: "2022-06-01",
  });
}

export function scanTransactionEvm(
  txObject: ScanTransactionEvmRequestTxObject,
  userAccount: string,
  metadata: RequestMetadata
) {
  return client.apis.transactions.scanTransactionEvm({
    scanTransactionEvmRequest: {
      txObject,
      userAccount,
      metadata,
    },
    xApiKey: "",
    xApiVersion: "2022-06-01",
  });
}

export * from "./client/models";
