import type { ScanMessageEvm200Response as ScanMessageEvm200ResponseLegacy } from "../../../generated/v20230517/models";
import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  RequestMetadata,
  EvmTxData,
  ReportRequestEventEnum,
  Languages,
  EvmSimulatorConfig,
  FetchAPI,
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
import { BASE_HEADERS } from "../../common/constants";
import {
  EvmChainFamily,
  EvmChainNetwork,
  DownloadBlocklistRequest,
  SolanaChainNetwork,
} from "../types";
import { mapMessageResponse } from "../utils";

export { FetchAPI };

export class BlowfishMultiChainApiClient {
  protected apiVersion = "2023-06-05";
  private readonly config: Configuration;

  private getConfig(apiKey?: string): ConfigurationParameters {
    return {
      basePath: this.basePath,
      headers: this.getHeaders(),
      apiKey,
      fetchApi: this.fetchApi,
    };
  }

  private getHeaders() {
    return BASE_HEADERS;
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
    private readonly language?: Languages,
    private readonly fetchApi?: FetchAPI
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

  scanMessageEvm = async (
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) => {
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
  };

  scanSignTypedDataEvm = async (
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) => {
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
  };

  scanTransactionsEvm = async (
    txObjects: EvmTxData[],
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork,
    simulatorConfig?: EvmSimulatorConfig
  ) => {
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
  };

  simulateHistoricalTransaction = async (
    txHash: string,
    userAccount: string
  ) => {
    return this.apis.historical.historicalTransactionEvm({
      historicalTransactionEvmRequest: {
        txHash,
        userAccount,
      },
      xApiVersion: this.apiVersion,
      language: this.language,
    });
  };

  scanTransactionsSolana = async (
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata,
    chainNetwork: SolanaChainNetwork
  ) => {
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
  };

  scanDomains = async (domains: string[]) => {
    return this.apis.domain.scanDomain({
      objectWithDomainsPropertyOfTypeArray: {
        domains,
      },
      xApiVersion: this.apiVersion,
    });
  };

  downloadBlocklist = async (request: DownloadBlocklistRequest = {}) => {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      downloadBlocklistRequest: request,
    });
  };

  reportTransaction = async (
    requestId: string,
    eventType: ReportRequestEventEnum
  ) => {
    return this.apis.reporting.report({
      reportRequest: { requestId, event: eventType },
      xApiVersion: this.apiVersion,
    });
  };
}
