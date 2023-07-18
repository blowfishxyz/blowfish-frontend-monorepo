import type {
  ScanMessageEvm200Response as ScanMessageEvm200ResponseLegacy,
  ScanTransactionsEvm200Response as ScanTransactionsEvm200ResponseLegacy,
} from "../../generated/v20230517/models";
import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  EvmTxData,
} from "../../generated/v20230605";
import {
  ScanTransactionsApi,
  ScanDomainApi,
  DownloadBlocklistApi,
  ScanMessageApi,
} from "../../generated/v20230605/apis";
import { Configuration } from "../../generated/v20230605/runtime";
import { ChainFamily, ChainNetwork, DownloadBlocklistRequest } from "./types";
import {
  mapMessageResponse,
  mapTransactionsFromV20230517,
  mapTransactionsToLegacy,
} from "./utils";

export class BlowfishApiClient {
  private apiVersion = "2023-06-05";
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
    private readonly basePath: string,
    private readonly apiKey: string,
    private readonly chainFamily: ChainFamily,
    private readonly chainNetwork: ChainNetwork
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
    return this.apis.message
      .scanMessageEvm({
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
        xApiKey: this.apiKey,
        xApiVersion: this.apiVersion,
      })
      .then((x) => mapMessageResponse(x as ScanMessageEvm200ResponseLegacy));
  };

  scanSignTypedData = (
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return this.apis.message
      .scanMessageEvm({
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
        xApiKey: this.apiKey,
        xApiVersion: this.apiVersion,
      })
      .then((x) => mapMessageResponse(x as ScanMessageEvm200ResponseLegacy));
  };

  /**
   * @deprecated use scanTransactionsEvm instead
   */
  scanTransactionEvm = (
    txObject: EvmTxData,
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return (
      this.apis.transactions
        .scanTransactionsEvm({
          chainFamily: this.chainFamily,
          chainNetwork: this.chainNetwork,
          scanTransactionsEvmRequest: {
            txObjects: [txObject],
            userAccount,
            metadata,
          },
          xApiKey: this.apiKey,
          xApiVersion: this.apiVersion,
        })
        // HACK: Remove mapTransactionsFromV20230517  when proxy is deployed
        .then((x) => {
          if (
            Array.isArray(x.simulationResults.aggregated.expectedStateChanges)
          ) {
            return mapTransactionsFromV20230517(
              x as unknown as ScanTransactionsEvm200ResponseLegacy
            );
          }
          return mapTransactionsToLegacy(x);
        })
    );
  };

  scanTransactionsEvm = (
    txObjects: EvmTxData[],
    userAccount: string,
    metadata: RequestMetadata
  ) => {
    return this.apis.transactions.scanTransactionsEvm({
      chainFamily: this.chainFamily,
      chainNetwork: this.chainNetwork,
      scanTransactionsEvmRequest: {
        txObjects,
        userAccount,
        metadata,
      },
      xApiKey: this.apiKey,
      xApiVersion: this.apiVersion,
    });
  };

  scanDomains = (domains: string[]) => {
    return this.apis.domain.scanDomain({
      objectWithDomainsPropertyOfTypeArray: {
        domains,
      },
      xApiKey: this.apiKey,
      xApiVersion: this.apiVersion,
    });
  };

  downloadBlocklist = (request: DownloadBlocklistRequest) => {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      xApiKey: this.apiKey,
      downloadBlocklistRequest: request,
    });
  };
}
