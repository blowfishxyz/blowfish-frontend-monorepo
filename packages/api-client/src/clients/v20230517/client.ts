import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  EvmTxData,
} from "../../generated/v20230517";
import {
  ScanTransactionsApi,
  ScanDomainApi,
  DownloadBlocklistApi,
  ScanMessageApi,
} from "../../generated/v20230517/apis";
import { Configuration } from "../../generated/v20230517/runtime";
import {
  EvmChainFamily,
  EvmChainNetwork,
  DownloadBlocklistRequest,
  SolanaChainNetwork,
} from "./types";

class BaseApiClient {
  protected apiVersion = "2023-05-17";
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
  };

  constructor(
    private readonly basePath: string,
    apiKey?: string
  ) {
    this.config = new Configuration(this.getConfig(apiKey));
    this.apis = {
      message: new ScanMessageApi(this.config),
      transactions: new ScanTransactionsApi(this.config),
      domain: new ScanDomainApi(this.config),
      blocklist: new DownloadBlocklistApi(this.config),
    };
  }
}

export class BlowfishEvmApiClient extends BaseApiClient {
  constructor(
    basePath: string,
    private readonly chainFamily: EvmChainFamily,
    private readonly chainNetwork: EvmChainNetwork,
    apiKey?: string
  ) {
    super(basePath, apiKey);
  }

  scanMessage(
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata
  ) {
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
  }

  scanSignTypedData(
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata
  ) {
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
  }

  scanTransactions(
    txObjects: EvmTxData[],
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.apis.transactions.scanTransactionsEvm({
      chainFamily: this.chainFamily,
      chainNetwork: this.chainNetwork,
      scanTransactionsEvmRequest: {
        txObjects,
        userAccount,
        metadata,
      },
      xApiVersion: this.apiVersion,
    });
  }

  scanDomains(domains: string[]) {
    return this.apis.domain.scanDomain({
      objectWithDomainsPropertyOfTypeArray: {
        domains,
      },
      xApiVersion: this.apiVersion,
    });
  }

  downloadBlocklist(request: DownloadBlocklistRequest = {}) {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      downloadBlocklistRequest: request,
    });
  }
}

export class BlowfishSolanaApiClient extends BaseApiClient {
  constructor(
    basePath: string,
    private readonly chainNetwork: SolanaChainNetwork,
    apiKey?: string
  ) {
    super(basePath, apiKey);
  }

  scanTransactions(
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.apis.transactions.scanTransactionsSolana({
      chainNetwork: this.chainNetwork,
      scanTransactionsSolanaRequest: {
        transactions,
        userAccount,
        metadata,
      },
      xApiVersion: this.apiVersion,
    });
  }

  scanDomains = (domains: string[]) => {
    return this.apis.domain.scanDomain({
      objectWithDomainsPropertyOfTypeArray: {
        domains,
      },
      xApiVersion: this.apiVersion,
    });
  };

  downloadBlocklist(request: DownloadBlocklistRequest = {}) {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      downloadBlocklistRequest: request,
    });
  }
}

export function createEvmClient({
  basePath,
  chainFamily,
  chainNetwork,
  apiKey,
}: {
  basePath: string;
  chainFamily: EvmChainFamily;
  chainNetwork: EvmChainNetwork;
  apiKey?: string;
}): BlowfishEvmApiClient {
  return new BlowfishEvmApiClient(basePath, chainFamily, chainNetwork, apiKey);
}

export function createSolanaClient({
  basePath,
  apiKey,
  chainNetwork,
}: {
  basePath: string;
  apiKey?: string;
  chainNetwork: SolanaChainNetwork;
}): BlowfishSolanaApiClient {
  return new BlowfishSolanaApiClient(basePath, chainNetwork, apiKey);
}
