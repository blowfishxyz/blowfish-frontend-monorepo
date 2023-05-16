import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  EvmTxData,
} from "./client";
import { ScanMessageApi, ScanTransactionApi } from "./client/apis";
import { Configuration } from "./client/runtime";
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
    transactions: new ScanTransactionApi(this.config),
  };

  constructor(
    readonly basePath: string,
    readonly chainFamily: ChainFamily,
    readonly chainNetwork: ChainNetwork,
    readonly apiVersion: string = "2023-03-08"
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
      xApiKey: "",
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
      xApiKey: "",
      xApiVersion: this.apiVersion,
    });
  };

  scanTransactionEvm = (
    txObject: EvmTxData,
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return this.apis.transactions.scanTransactionEvm({
      chainFamily: this.chainFamily,
      chainNetwork: this.chainNetwork,
      scanTransactionEvmRequest: {
        txObject,
        userAccount,
        metadata,
      },
      xApiKey: "",
      xApiVersion: this.apiVersion,
    });
  };
}
