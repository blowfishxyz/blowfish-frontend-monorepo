import type {
  ConfigurationParameters,
  EvmSignTypedDataData,
  RequestMetadata,
  ScanTransactionEvmRequestTxObject,
  ReportRequestEventEnum,
  Languages,
  EvmSimulatorConfig,
  FetchAPI,
} from "../../../generated/v20220601";
import {
  ScanTransactionApi,
  ScanDomainApi,
  DownloadBlocklistApi,
  ScanMessageApi,
  ReportRequestApi,
  ScanAssetsApi,
} from "../../../generated/v20220601/apis";
import { Configuration } from "../../../generated/v20220601/runtime";
import { BASE_HEADERS } from "../../common/constants";
import {
  EvmChainFamily,
  EvmChainNetwork,
  DownloadBlocklistRequest,
  SolanaChainNetwork,
} from "../types";

export { FetchAPI };

export class BlowfishMultiChainApiClient {
  protected apiVersion = "2022-06-01";
  private readonly config: Configuration;

  private getConfig(apiKey?: string): ConfigurationParameters {
    return {
      basePath: this.basePath,
      headers: this.getHeaders(),
      apiKey,
      fetchApi: this.fetchApi,
    };
  }

  getHeaders() {
    return BASE_HEADERS;
  }

  protected readonly apis: {
    message: ScanMessageApi;
    transaction: ScanTransactionApi;
    domain: ScanDomainApi;
    blocklist: DownloadBlocklistApi;
    reporting: ReportRequestApi;
    assets: ScanAssetsApi;
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
      transaction: new ScanTransactionApi(this.config),
      domain: new ScanDomainApi(this.config),
      blocklist: new DownloadBlocklistApi(this.config),
      reporting: new ReportRequestApi(this.config),
      assets: new ScanAssetsApi(this.config),
    };
  }

  scanMessageEvm = async (
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) => {
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
  };

  scanPersonalSignEvm = async (
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) => {
    return this.apis.message.scanMessageEvm({
      chainFamily: chainFamily,
      chainNetwork: chainNetwork,
      scanMessageEvmRequest: {
        message: {
          kind: "PERSONAL_SIGN",
          rawMessage,
        },
        userAccount,
        metadata,
      },
      language: this.language,
      xApiVersion: this.apiVersion,
    });
  };

  scanSignTypedDataEvm = async (
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork
  ) => {
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
  };

  // @deprecated consider updating to the latest version of Blowfish API
  scanTransactionEvm = async (
    txObject: ScanTransactionEvmRequestTxObject,
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork,
    simulatorConfig?: EvmSimulatorConfig
  ) => {
    return this.apis.transaction.scanTransactionEvm({
      chainFamily: chainFamily,
      chainNetwork: chainNetwork,
      scanTransactionEvmRequest: {
        txObject,
        userAccount,
        metadata,
        simulatorConfig,
      },
      language: this.language,
      xApiVersion: this.apiVersion,
    });
  };

  scanTransactionsSolana = async (
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata,
    chainNetwork: SolanaChainNetwork
  ) => {
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
  };

  scanDomains = async (domains: string[]) => {
    return this.apis.domain.scanDomain({
      scanDomainRequest: {
        domains,
      },
      xApiVersion: this.apiVersion,
    });
  };

  /**
   * Scan a list of assets in order to receive recommended actions, tailored warnings and human-readable warnings and risk signals.
   * Max amount of assets per request is 100.  Assets can be NFTs or tokens and the format is:
   * - EVM compatible NFTs: `{chain}:{network}:{collection_address}:{item_id}`
   * For example: `ethereum:mainnet:0x60e4d786628fea6478f785a6d7e704777c86a7c6:7330`
   * - EVM compatible Tokens: `{chain}:{network}:{token_address}`
   * For example: `ethereum:mainnet:0xdAC17F958D2ee523a2206206994597C13D831ec7`
   * - Solana assets: `solana:{network}:{address/pubkey}`
   * For example: `solana:mainnet:6eqgcVBG7PbQkjaRHnJ6YKGVEHCCFSKxXwx2WDLsxv6N`
   * Scan assets
   */
  scanAssets = async (assets: string[]) => {
    return this.apis.assets.scanAssets({
      scanAssetsRequest: {
        assets,
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
