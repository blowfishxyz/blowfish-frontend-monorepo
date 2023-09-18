import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  HTTPHeaders,
  RequestMetadata,
  ScanTransactionEvmRequestTxObject,
} from "../../generated/v20220601";
import {
  ScanDomainApi,
  ScanTransactionApi,
  DownloadBlocklistApi,
  ScanMessageApi,
} from "../../generated/v20220601/apis";
import { Configuration } from "../../generated/v20220601/runtime";
import {
  EvmChainFamily,
  EvmChainNetwork,
  DownloadBlocklistRequest,
  SolanaChainNetwork,
} from "./types";

class BaseApiClient {
  protected apiVersion = "2022-06-01";
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
  };

  constructor(
    private readonly basePath: string,
    apiKey?: string
  ) {
    this.config = new Configuration(this.getConfig(apiKey));
    this.apis = {
      message: new ScanMessageApi(this.config),
      transaction: new ScanTransactionApi(this.config),
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
    txObject: ScanTransactionEvmRequestTxObject,
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.apis.transaction.scanTransactionEvm({
      chainFamily: this.chainFamily,
      chainNetwork: this.chainNetwork,
      scanTransactionEvmRequest: {
        txObject,
        userAccount,
        metadata,
      },
      xApiVersion: this.apiVersion,
    });
  }

  scanDomains(domains: string[]) {
    return this.apis.domain.scanDomain({
      scanDomainRequest: {
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
    return this.apis.transaction.scanTransactionsSolana({
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
      scanDomainRequest: {
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
