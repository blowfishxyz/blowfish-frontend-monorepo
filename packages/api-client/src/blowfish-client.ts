import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  EvmTxData,
} from "./clients/v20230517";
import { ScanMessageApi, ScanTransactionsApi } from "./clients/v20230517/apis";
import { Configuration } from "./clients/v20230517/runtime";
import { ChainFamily, ChainNetwork } from "./types";

export class BlowfishApiClient {
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
    return headers;
  }

  readonly apis = {
    messages: new ScanMessageApi(this.config),
    transactions: new ScanTransactionsApi(this.config),
  };

  constructor(
    readonly basePath: string,
    readonly chainFamily: ChainFamily,
    readonly chainNetwork: ChainNetwork,
    readonly apiVersion: string = "2023-05-17"
  ) {}

  scanMessageEvm = (
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return this.apis.messages.scanMessageEvm({
      chainFamily: this.chainFamily,
      chainNetwork: this.chainNetwork,
      scanMessageEvmRequest: {
        message: {
          kind: "SIGN_MESSAGE",
          rawMessage,
        },
        userAccount,
        metadata,
      },
      xApiVersion: this.apiVersion,
    });
  };

  scanSignTypedData = (
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return this.apis.messages.scanMessageEvm({
      chainFamily: this.chainFamily,
      chainNetwork: this.chainNetwork,
      scanMessageEvmRequest: {
        message: {
          kind: "SIGN_TYPED_DATA",
          data: typedData,
        },
        userAccount,
        metadata,
      },
      xApiVersion: this.apiVersion,
    });
  };

  scanTransactionEvm = (
    txObject: EvmTxData,
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return this.apis.transactions.scanTransactionsEvm({
      chainFamily: this.chainFamily,
      chainNetwork: this.chainNetwork,
      scanTransactionsEvmRequest: {
        txObjects: [txObject],
        userAccount,
        metadata,
      },
      // xApiKey: "",
      xApiVersion: this.apiVersion,
    });
  };
}
