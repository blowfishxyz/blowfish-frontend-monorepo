import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  ScanTransactionEvmRequestTxObject,
  ReportRequestEventEnum,
  Languages,
} from "../../../generated/v20220601";
import {
  ScanTransactionApi,
  ScanDomainApi,
  DownloadBlocklistApi,
  ScanMessageApi,
  ReportRequestApi,
} from "../../../generated/v20220601/apis";
import { Configuration } from "../../../generated/v20220601/runtime";
import {
  EvmChainFamily,
  EvmChainNetwork,
  DownloadBlocklistRequest,
  SolanaChainNetwork,
} from "../types";

export class BlowfishMultiChainApiClient {
  protected apiVersion = "2023-03-08";
  private readonly config: Configuration;

  private getConfig(apiKey?: string): ConfigurationParameters {
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

  protected readonly apis: {
    message: ScanMessageApi;
    transaction: ScanTransactionApi;
    domain: ScanDomainApi;
    blocklist: DownloadBlocklistApi;
    reporting: ReportRequestApi;
  };

  constructor(
    private readonly basePath: string,
    apiKey?: string,
    private readonly language?: Languages
  ) {
    this.config = new Configuration(this.getConfig(apiKey));
    this.apis = {
      message: new ScanMessageApi(this.config),
      transaction: new ScanTransactionApi(this.config),
      domain: new ScanDomainApi(this.config),
      blocklist: new DownloadBlocklistApi(this.config),
      reporting: new ReportRequestApi(this.config),
    };
  }

  async scanMessageEvm(
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) {
    return this.apis.message.scanMessageEvm({
      chainFamily: chainFamily,
      chainNetwork: chainNetwork,
      scanMessageEvmRequest: {
        message: {
          kind: "SIGN_MESSAGE",
          rawMessage,
        },
        userAccount,
        metadata,
      },
      language: this.language,
      xApiVersion: this.apiVersion,
    });
  }

  async scanSignTypedDataEvm(
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) {
    return this.apis.message.scanMessageEvm({
      chainFamily: chainFamily,
      chainNetwork: chainNetwork,
      scanMessageEvmRequest: {
        message: {
          kind: "SIGN_TYPED_DATA",
          data: typedData,
        },
        userAccount,
        metadata,
      },
      language: this.language,
      xApiVersion: this.apiVersion,
    });
  }

  // @deprecated consider updating to the latest version of Blowfish API
  async scanTransactionEvm(
    txObject: ScanTransactionEvmRequestTxObject,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) {
    return this.apis.transaction.scanTransactionEvm({
      chainFamily: chainFamily,
      chainNetwork: chainNetwork,
      scanTransactionEvmRequest: {
        txObject,
        userAccount,
        metadata,
      },
      language: this.language,
      xApiVersion: this.apiVersion,
    });
  }

  async scanTransactionsSolana(
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata,
    chainNetwork: SolanaChainNetwork
  ) {
    return this.apis.transaction.scanTransactionsSolana({
      chainNetwork: chainNetwork,
      scanTransactionsSolanaRequest: {
        transactions,
        userAccount,
        metadata,
      },
      language: this.language,
      xApiVersion: this.apiVersion,
    });
  }

  async scanDomains(domains: string[]) {
    return this.apis.domain.scanDomain({
      scanDomainRequest: {
        domains,
      },
      xApiVersion: this.apiVersion,
    });
  }

  async downloadBlocklist(request: DownloadBlocklistRequest = {}) {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      downloadBlocklistRequest: request,
    });
  }

  async reportTransaction(
    requestId: string,
    eventType: ReportRequestEventEnum
  ) {
    this.apis.reporting.report({
      reportRequest: { requestId, event: eventType },
      xApiVersion: this.apiVersion,
    });
  }
}
