import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  EvmTxData,
} from "../../generated/v20230517";
import {
  ScanMessageApi,
  ScanTransactionsApi,
  ScanDomainApi,
  DownloadBlocklistApi,
} from "../../generated/v20230517/apis";
import { Configuration } from "../../generated/v20230517/runtime";
import { ChainFamily, ChainNetwork, DownloadBlocklistRequest } from "./types";
import { mapTransactionsToLegacy } from "./utils";

export class BlowfishApiClient {
  private apiVersion = "2023-05-17";
  private readonly config: Configuration;

  private getConfig(apiKey: string): ConfigurationParameters {
    return {
      basePath: this.basePath,
      headers: this.getHeaders(),
      apiKey,
    };
  }

  private getHeaders() {
    const headers: HTTPHeaders = {
      ["Content-Type"]: "application/json",
    };
    return headers;
  }

  private readonly apis: {
    message: ScanMessageApi;
    transactions: ScanTransactionsApi;
    domain: ScanDomainApi;
    blocklist: DownloadBlocklistApi;
  };

  constructor(
    readonly basePath: string,
    apiKey: string,
    readonly chainFamily: ChainFamily,
    readonly chainNetwork: ChainNetwork
  ) {
    this.config = new Configuration(this.getConfig(apiKey));
    this.apis = {
      message: new ScanMessageApi(this.config),
      transactions: new ScanTransactionsApi(this.config),
      domain: new ScanDomainApi(this.config),
      blocklist: new DownloadBlocklistApi(this.config),
    };
  }

  scanMessageEvm = (
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return this.apis.message.scanMessageEvm({
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
    return this.apis.message.scanMessageEvm({
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
    return this.apis.transactions
      .scanTransactionsEvm({
        chainFamily: this.chainFamily,
        chainNetwork: this.chainNetwork,
        scanTransactionsEvmRequest: {
          txObjects: [txObject],
          userAccount,
          metadata,
        },
        xApiVersion: this.apiVersion,
      })
      .then(mapTransactionsToLegacy);
  };

  scanDomains = (domains: string[]) => {
    return this.apis.domain.scanDomain({
      objectWithDomainsPropertyOfTypeArray: {
        domains,
      },
      xApiVersion: this.apiVersion,
    });
  };

  downloadBlocklist = (request: DownloadBlocklistRequest) => {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      downloadBlocklistRequest: request,
    });
  };
}
