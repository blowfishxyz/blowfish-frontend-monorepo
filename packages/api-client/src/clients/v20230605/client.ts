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
import {
  EvmChainFamily,
  EvmChainNetwork,
  DownloadBlocklistRequest,
  SolanaChainNetwork,
} from "./types";

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
    private readonly apiKey: string
  ) {
    this.config = new Configuration(this.getConfig(apiKey));
    this.apis = {
      message: new ScanMessageApi(this.config),
      transactions: new ScanTransactionsApi(this.config),
      domain: new ScanDomainApi(this.config),
      blocklist: new DownloadBlocklistApi(this.config),
    };
  }

  solana = (chainNetwork: SolanaChainNetwork) => {
    return {
      scanTransactions: (
        transactions: string[],
        userAccount: string,
        metadata: RequestMetadata
      ) => {
        return this.apis.transactions.scanTransactionsSolana({
          chainNetwork,
          scanTransactionsSolanaRequest: {
            transactions,
            userAccount,
            metadata,
          },
          xApiVersion: this.apiVersion,
        });
      },
      scanDomains: this.scanDomains,
    };
  };

  evm = (chainFamily: EvmChainFamily, chainNetwork: EvmChainNetwork) => {
    return {
      scanMessage: (
        rawMessage: string,
        userAccount: string,
        metadata: RequestMetadata
      ) => {
        return this.apis.message.scanMessageEvm({
          chainFamily,
          chainNetwork,
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
      },

      scanSignTypedData: (
        typedData: EvmSignTypedDataData,
        userAccount: string,
        metadata: RequestMetadata
      ) => {
        return this.apis.message.scanMessageEvm({
          chainFamily,
          chainNetwork,
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
      },

      scanTransactions: (
        txObjects: EvmTxData[],
        userAccount: string,
        metadata: RequestMetadata
      ) => {
        return this.apis.transactions.scanTransactionsEvm({
          chainFamily,
          chainNetwork,
          scanTransactionsEvmRequest: {
            txObjects,
            userAccount,
            metadata,
          },
          xApiVersion: this.apiVersion,
        });
      },

      scanDomains: this.scanDomains,
    };
  };

  private scanDomains = (domains: string[]) => {
    return this.apis.domain.scanDomain({
      objectWithDomainsPropertyOfTypeArray: {
        domains,
      },
      xApiVersion: this.apiVersion,
    });
  };

  private downloadBlocklist = (request: DownloadBlocklistRequest) => {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      downloadBlocklistRequest: request,
    });
  };
}

export function createClient(
  basePath: string,
  apiKey: string
): BlowfishApiClient {
  return new BlowfishApiClient(basePath, apiKey);
}
