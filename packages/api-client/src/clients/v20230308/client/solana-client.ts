import { SolanaChainNetwork, RequestMetadata, Languages } from "../types";
import { BlowfishMultiChainApiClient } from "./multi-chain-client";

export class BlowfishSolanaApiClient {
  private readonly multiChainClient: BlowfishMultiChainApiClient;
  public scanDomains: BlowfishMultiChainApiClient["scanDomains"];
  public downloadBlocklist: BlowfishMultiChainApiClient["downloadBlocklist"];
  public reportTransaction: BlowfishMultiChainApiClient["reportTransaction"];

  constructor(
    basePath: string,
    private readonly chainNetwork: SolanaChainNetwork,
    apiKey?: string,
    language?: Languages
  ) {
    this.multiChainClient = new BlowfishMultiChainApiClient(
      basePath,
      apiKey,
      language
    );
    this.scanDomains = this.multiChainClient.scanDomains;
    this.downloadBlocklist = this.multiChainClient.downloadBlocklist;
    this.reportTransaction = this.multiChainClient.reportTransaction;
  }

  scanTransactions(
    transactions: string[],
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.multiChainClient.scanTransactionsSolana(
      transactions,
      userAccount,
      metadata,
      this.chainNetwork
    );
  }
}
