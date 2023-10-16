import type { ScanMessageEvm200Response as ScanMessageEvm200ResponseLegacy } from "../../../generated/v20230517/models";
import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  EvmTxData,
  ReportRequestEventEnum,
  Languages,
  EvmSimulatorConfig,
} from "../../../generated/v20230605";
import {
  ScanTransactionsApi,
  ScanDomainApi,
  DownloadBlocklistApi,
  ScanMessageApi,
  ReportRequestApi,
  SimulateHistoricalTransactionApi,
} from "../../../generated/v20230605/apis";
import { Configuration } from "../../../generated/v20230605/runtime";
import {
  EvmChainFamily,
  EvmChainNetwork,
  DownloadBlocklistRequest,
  SolanaChainNetwork,
} from "../types";
import { mapMessageResponse } from "../utils";

export class BlowfishMultiChainApiClient {
  protected apiVersion = "2023-06-05";
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
    transactions: ScanTransactionsApi;
    domain: ScanDomainApi;
    blocklist: DownloadBlocklistApi;
    reporting: ReportRequestApi;
    historical: SimulateHistoricalTransactionApi;
  };

  constructor(
    private readonly basePath: string,
    apiKey?: string,
    private readonly language?: Languages
  ) {
    this.config = new Configuration(this.getConfig(apiKey));
    this.apis = {
      message: new ScanMessageApi(this.config),
      transactions: new ScanTransactionsApi(this.config),
      domain: new ScanDomainApi(this.config),
      blocklist: new DownloadBlocklistApi(this.config),
      reporting: new ReportRequestApi(this.config),
      historical: new SimulateHistoricalTransactionApi(this.config),
    };
  }

  async scanMessageEvm(
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) {
    return this.apis.message
      .scanMessageEvm({
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
      })
      .then((x) => mapMessageResponse(x as ScanMessageEvm200ResponseLegacy));
  }

  async scanSignTypedDataEvm(
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) {
    return this.apis.message
      .scanMessageEvm({
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
      })
      .then((x) => mapMessageResponse(x as ScanMessageEvm200ResponseLegacy));
  }

  async scanTransactionsEvm(
    txObjects: EvmTxData[],
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork,
    simulatorConfig?: EvmSimulatorConfig
  ) {
    return this.apis.transactions.scanTransactionsEvm({
      chainFamily: chainFamily,
      chainNetwork: chainNetwork,
      scanTransactionsEvmRequest: {
        txObjects,
        userAccount,
        metadata,
        simulatorConfig,
      },
      language: this.language,
      xApiVersion: this.apiVersion,
    });
  }

  async simulateHistoricalTransaction(txHash: string, userAccount: string) {
    return this.apis.historical.historicalTransactionEvm({
      historicalTransactionEvmRequest: {
        txHash,
        userAccount,
      },
      xApiVersion: this.apiVersion,
      language: this.language,
    });
  }

  async scanTransactionsSolana(
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata,
    chainNetwork: SolanaChainNetwork
  ) {
    return this.apis.transactions.scanTransactionsSolana({
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
      objectWithDomainsPropertyOfTypeArray: {
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
    return this.apis.reporting.report({
      reportRequest: { requestId, event: eventType },
      xApiVersion: this.apiVersion,
    });
  }
}
