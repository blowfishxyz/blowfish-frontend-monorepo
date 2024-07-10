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
  RequestSimulatorConfig,
} from "../../../generated/v20230605";
import {
  ScanTransactionsApi,
  ScanDomainApi,
  ScanAssetsApi,
  DownloadBlocklistApi,
  ScanMessageApi,
  ReportRequestApi,
  ScanTransactionsSolanaOperationSimulateExpiredEnum,
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

  getHeaders() {
    return BASE_HEADERS;
  }

  protected readonly apis: {
    message: ScanMessageApi;
    transactions: ScanTransactionsApi;
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
      transactions: new ScanTransactionsApi(this.config),
      domain: new ScanDomainApi(this.config),
      blocklist: new DownloadBlocklistApi(this.config),
      reporting: new ReportRequestApi(this.config),
      assets: new ScanAssetsApi(this.config),
    };
  }

  /**
   * Scan an EVM message in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what signing the message will do.  Click on Request → Examples to see example requests for different message types. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/message | | Goerli Testnet (deprecated) | https://api.blowfish.xyz/ethereum/v0/goerli/scan/message | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/message | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/message | | Polygon Amoy Testnet  | https://api.blowfish.xyz/polygon/v0/amoy/scan/message | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/message | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/message | | Arbitrum Sepolia Testnet | https://api.blowfish.xyz/arbitrum/v0/sepolia/scan/message | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/message | | Optimism Goerli Testnet (deprecated) | https://api.blowfish.xyz/optimism/v0/goerli/scan/message | | Optimism Sepolia Testnet | https://api.blowfish.xyz/optimism/v0/sepolia/scan/message | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/message | | Base Goerli Testnet (deprecated) | https://api.blowfish.xyz/base/v0/goerli/scan/message | | Base Sepolia Testnet | https://api.blowfish.xyz/base/v0/sepolia/scan/message | | Avalanche Mainnet | https://api.blowfish.xyz/avalanche/v0/mainnet/scan/message | | Avalanche Fuji Testnet | https://api.blowfish.xyz/avalanche/v0/fuji/scan/message | | Degen Mainnet| https://api.blowfish.xyz/degen/v0/mainnet/scan/message | | Blast Mainnet | https://api.blowfish.xyz/blast/v0/mainnet/scan/message | | Blast Sepolia | https://api.blowfish.xyz/blast/v0/sepolia/scan/message | | Gnosis Mainnet | https://api.blowfish.xyz/gnosis/v0/mainnet/scan/message | | Linea Mainnet | https://api.blowfish.xyz/linea/v0/mainnet/scan/message | | Zora Mainnet | https://api.blowfish.xyz/zora/v0/mainnet/scan/message | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats. One exception is Zora Mainnet, where ERC20 token prices are currently not supported. `price` for token-related state changes on Zora will always be `null`. NFT prices should work as usual.
   * EVM
   */
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

  /**
   * Scan an EVM message in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what signing the message will do.  Click on Request → Examples to see example requests for different message types. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/message | | Goerli Testnet (deprecated) | https://api.blowfish.xyz/ethereum/v0/goerli/scan/message | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/message | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/message | | Polygon Amoy Testnet  | https://api.blowfish.xyz/polygon/v0/amoy/scan/message | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/message | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/message | | Arbitrum Sepolia Testnet | https://api.blowfish.xyz/arbitrum/v0/sepolia/scan/message | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/message | | Optimism Goerli Testnet (deprecated) | https://api.blowfish.xyz/optimism/v0/goerli/scan/message | | Optimism Sepolia Testnet | https://api.blowfish.xyz/optimism/v0/sepolia/scan/message | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/message | | Base Goerli Testnet (deprecated) | https://api.blowfish.xyz/base/v0/goerli/scan/message | | Base Sepolia Testnet | https://api.blowfish.xyz/base/v0/sepolia/scan/message | | Avalanche Mainnet | https://api.blowfish.xyz/avalanche/v0/mainnet/scan/message | | Avalanche Fuji Testnet | https://api.blowfish.xyz/avalanche/v0/fuji/scan/message | | Degen Mainnet| https://api.blowfish.xyz/degen/v0/mainnet/scan/message | | Blast Mainnet | https://api.blowfish.xyz/blast/v0/mainnet/scan/message | | Blast Sepolia | https://api.blowfish.xyz/blast/v0/sepolia/scan/message | | Gnosis Mainnet | https://api.blowfish.xyz/gnosis/v0/mainnet/scan/message | | Linea Mainnet | https://api.blowfish.xyz/linea/v0/mainnet/scan/message | | Zora Mainnet | https://api.blowfish.xyz/zora/v0/mainnet/scan/message | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats. One exception is Zora Mainnet, where ERC20 token prices are currently not supported. `price` for token-related state changes on Zora will always be `null`. NFT prices should work as usual.
   * EVM
   */
  scanPersonalSignEvm = async (
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
            kind: "PERSONAL_SIGN",
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

  /**
   * Scan an EVM message in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what signing the message will do.  Click on Request → Examples to see example requests for different message types. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/message | | Goerli Testnet (deprecated) | https://api.blowfish.xyz/ethereum/v0/goerli/scan/message | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/message | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/message | | Polygon Amoy Testnet  | https://api.blowfish.xyz/polygon/v0/amoy/scan/message | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/message | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/message | | Arbitrum Sepolia Testnet | https://api.blowfish.xyz/arbitrum/v0/sepolia/scan/message | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/message | | Optimism Goerli Testnet (deprecated) | https://api.blowfish.xyz/optimism/v0/goerli/scan/message | | Optimism Sepolia Testnet | https://api.blowfish.xyz/optimism/v0/sepolia/scan/message | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/message | | Base Goerli Testnet (deprecated) | https://api.blowfish.xyz/base/v0/goerli/scan/message | | Base Sepolia Testnet | https://api.blowfish.xyz/base/v0/sepolia/scan/message | | Avalanche Mainnet | https://api.blowfish.xyz/avalanche/v0/mainnet/scan/message | | Avalanche Fuji Testnet | https://api.blowfish.xyz/avalanche/v0/fuji/scan/message | | Degen Mainnet| https://api.blowfish.xyz/degen/v0/mainnet/scan/message | | Blast Mainnet | https://api.blowfish.xyz/blast/v0/mainnet/scan/message | | Blast Sepolia | https://api.blowfish.xyz/blast/v0/sepolia/scan/message | | Gnosis Mainnet | https://api.blowfish.xyz/gnosis/v0/mainnet/scan/message | | Linea Mainnet | https://api.blowfish.xyz/linea/v0/mainnet/scan/message | | Zora Mainnet | https://api.blowfish.xyz/zora/v0/mainnet/scan/message | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats. One exception is Zora Mainnet, where ERC20 token prices are currently not supported. `price` for token-related state changes on Zora will always be `null`. NFT prices should work as usual.
   * EVM
   */
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

  /**
   * Scan a list of EVM transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transactions will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/transactions | | Goerli Testnet (deprecated) | https://api.blowfish.xyz/ethereum/v0/goerli/scan/transactions | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/transactions | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/transactions | | Polygon Amoy Testnet  | https://api.blowfish.xyz/polygon/v0/amoy/scan/transactions | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/transactions | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/transactions | | Arbitrum Sepolia Testnet | https://api.blowfish.xyz/arbitrum/v0/sepolia/scan/transactions | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/transactions | | Optimism Goerli Testnet (deprecated) | https://api.blowfish.xyz/optimism/v0/goerli/scan/transactions | | Optimism Sepolia Testnet | https://api.blowfish.xyz/optimism/v0/sepolia/scan/transactions | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/transactions | | Base Goerli Testnet (deprecated) | https://api.blowfish.xyz/base/v0/goerli/scan/transactions | | Base Sepolia Testnet | https://api.blowfish.xyz/base/v0/sepolia/scan/transactions | | Avalanche Mainnet | https://api.blowfish.xyz/avalanche/v0/mainnet/scan/transactions | | Avalanche Fuji Testnet | https://api.blowfish.xyz/avalanche/v0/fuji/scan/transactions | | Degen Mainnet| https://api.blowfish.xyz/degen/v0/mainnet/scan/transactions | | Blast Mainnet | https://api.blowfish.xyz/blast/v0/mainnet/scan/transactions | | Blast Sepolia | https://api.blowfish.xyz/blast/v0/sepolia/scan/transactions | | Gnosis Mainnet | https://api.blowfish.xyz/gnosis/v0/mainnet/scan/transactions | | Linea Mainnet | https://api.blowfish.xyz/linea/v0/mainnet/scan/transactions | | Zora Mainnet | https://api.blowfish.xyz/zora/v0/mainnet/scan/transactions | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats. One exception is Zora Mainnet, where ERC20 token prices are currently not supported. `price` for token-related state changes on Zora will always be `null`. NFT prices should work as usual.
   * EVM
   */
  scanTransactionsEvm = async (
    txObjects: EvmTxData[],
    userAccount: string,
    metadata: RequestMetadata,
    chainFamily: EvmChainFamily,
    chainNetwork: EvmChainNetwork,
    simulatorConfig?: EvmSimulatorConfig,
    method?: string
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
      method,
    });
  };

  /**
   * Scan Solana transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. The API will return a list of warnings and a list of human-readable simulation results. ### Supported networks | Network | Base URL | | --- | --- | | Mainnet | https://api.blowfish.xyz/solana/v0/mainnet/scan/transactions | | Testnet | https://api.blowfish.xyz/solana/v0/testnet/scan/transactions | | Devnet | https://api.blowfish.xyz/solana/v0/devnet/scan/transactions |
   * Solana
   */
  scanTransactionsSolana = async (
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata,
    chainNetwork: SolanaChainNetwork,
    method?: string,
    simulatorConfig?: RequestSimulatorConfig,
    simulateExpired?: boolean,
    simulationTimeoutMs?: number
  ) => {
    const expired =
      typeof simulateExpired === "boolean"
        ? simulateExpired
          ? ScanTransactionsSolanaOperationSimulateExpiredEnum.True
          : ScanTransactionsSolanaOperationSimulateExpiredEnum.False
        : undefined;
    return this.apis.transactions.scanTransactionsSolana({
      chainNetwork: chainNetwork,
      scanTransactionsSolanaRequest: {
        transactions,
        userAccount,
        metadata,
        simulatorConfig,
      },
      simulationTimeoutMs,
      simulateExpired: expired,
      language: this.language,
      xApiVersion: this.apiVersion,
      method,
    });
  };

  /**
   * This endpoint allows customers to analyze dApp domains to determine if they are safe for users to interact with
   * Domain
   */
  scanDomains = async (domains: string[]) => {
    return this.apis.domain.scanDomain({
      objectWithDomainsPropertyOfTypeArray: {
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

  /**
   * Generate a downloadable snapshot with all blocked domains in order to check domains a user visits against a local blocklist, preserving their browsing privacy.  ### Integration This API enables to verify domain safety while maintaining the end user\'s privacy. To integrate this API into your app, you should follow the steps below:  1. Regularly update the blocklist metadata from the `/v0/domains/blocklist` endpoint.   - In browser extensions, set up a timer to update the blocklist every 2-5 minutes.   - In mobile apps, update the blocklist each time the user opens the app and every 2-5 minutes while the user is using the app.   - New values of `recentlyAdded` and `recentlyRemoved` should be stored after each update, regardless of whether the bloom filter has changed. 2. During each update, check if the app has previously downloaded a bloom filter with the hash `bloomFilter.hash`. If not, download it from `bloomFilter.url`.   - Since the bloom filter can be up to 1MB in size, make sure you never re-download the same bloom filter. Identical bloom filters always have the same URL and the same hash.   - Store the blocklist metadata (`recentlyAdded`, `recentlyRemoved`), bloom filter hash, and downloaded bloom filter.   - Chrome extensions can use localStorage. The endpoint is designed with a 5MB limit on localStorage in mind.   - The bloom filter is changed once a day, so users will never use more than 1 MB of traffic per day if the download and local caching logic is implemented correctly. 3. When the user visits a domain, check if the domain is present on the bloom filter or the `recentlyAdded` list from the blocklist metadata and isn\'t present on the `recentlyRemoved` list. If this is the case, block the user from visiting the website.  Browser extensions and React Native apps can use the Javascript package [@blowfish/blocklist](https://www.npmjs.com/package/@blowfishxyz/blocklist) to implement the outlined logic. For example:  ```js // Regular updates import { fetchDomainBlocklist, fetchDomainBlocklistBloomFilter } from \'@blowfishxyz/blocklist\';  const blocklist = await fetchDomainBlocklist(apiConfig); [...] // save blocklist.recentlyAdded and blocklist.recentlyRemoved to a local database const storedHash = [...]; // fetch it from your storage if (storedHash != blocklist.bloomFilter.hash) {     const bloomFilter = await fetchDomainBlocklistBloomFilter(blocklist.bloomFilter.url);     [...] // save bloomFilter to a local database     [...] // save bloomFilter.hash or blocklist.bloomFilter.hash to a local database }  // Lookups import { scanDomain, Action } from \'@blowfishxyz/blocklist\';  const recentlyAdded = [...]; // get from storage const recentlyRemoved = [...]; // get from storage const bloomFilter = [...]; // get from storage  const action = scanDomain(     bloomFilter,     recentlyAdded,     recentlyRemoved,     \"https://example.com/\" );  if (action === Action.BLOCK) {     // block the domain } ```  For more information on how to use the package, please refer to the NPM package description.  ### Priority lists The API aggregates different proprietary Blowfish lists and ecosystem lists. In some cases, different lists may have conflicting data on whether to block or allow a domain. By providing `priorityBlockLists` and `priorityAllowLists`, you can override the results in these cases.  If a domain is blocked by one of the lists that Blowfish aggregates, but included in one of `priorityAllowLists`, it will not be included in the blocklist snapshot. Conversely, if a domain is allow-listed by one of the lists that Blowfish aggregates, but is included in one of `priorityBlockLists`, it will be included in the snapshot.  This is an advanced feature for integrators who want granular control over blocking domains. By default, the API uses internal list priority heuristics designed for most use cases. The Blowfish team continuously monitors the quality of the underlying blocklists and removes incorrect entries.  Blowfish can also ingest custom blocklists and allowlists. If you have a custom list, you can reach out to the Blowfish team and provide a publicly available URL with the domains in a .txt format.
   * Blocklist
   */
  downloadBlocklist = async (request: DownloadBlocklistRequest = {}) => {
    return this.apis.blocklist.downloadBlocklist({
      xApiVersion: this.apiVersion,
      downloadBlocklistRequest: request,
    });
  };

  /**
   * This endpoint allows to send additional data about user\'s behaviour after viewing a scanning result from Blowfish. For each scan, you can send events like `PROCEEDED` (when user decided to sign the transaction), `REJECTED` (when user decided to abort the transaction flow) and `REPORTED_MALICIOUS` (when user explicitly marked the submitted transaction as malicious).  We review and analyze reports to improve the accuracy of our security engine.
   * Report
   */
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
