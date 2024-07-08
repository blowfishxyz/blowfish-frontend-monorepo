import { SolanaChainNetwork, RequestMetadata, Languages } from "../types";
import { BlowfishMultiChainApiClient, FetchAPI } from "./multi-chain-client";

export class BlowfishSolanaApiClient {
  private readonly multiChainClient: BlowfishMultiChainApiClient;
  public scanDomains: BlowfishMultiChainApiClient["scanDomains"];
  public downloadBlocklist: BlowfishMultiChainApiClient["downloadBlocklist"];
  public reportTransaction: BlowfishMultiChainApiClient["reportTransaction"];
  public scanAssets: BlowfishMultiChainApiClient["scanAssets"];

  constructor(
    basePath: string,
    private readonly chainNetwork: SolanaChainNetwork,
    apiKey?: string,
    language?: Languages,
    fetchApi?: FetchAPI
  ) {
    this.multiChainClient = new BlowfishMultiChainApiClient(
      basePath,
      apiKey,
      language,
      fetchApi
    );
    this.scanDomains = this.multiChainClient.scanDomains;
    this.downloadBlocklist = this.multiChainClient.downloadBlocklist;
    this.reportTransaction = this.multiChainClient.reportTransaction;
    this.scanAssets = this.multiChainClient.scanAssets;
  }

  scanTransactions(
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata,
    method?: string
  ) {
    return this.multiChainClient.scanTransactionsSolana(
      transactions,
      userAccount,
      metadata,
      this.chainNetwork,
      method
    );
  }
}
