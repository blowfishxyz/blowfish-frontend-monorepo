import { SolanaChainNetwork, RequestMetadata } from "../types";
import { BlowfishMultiChainApiClient } from "./multi-chain-client";

export class BlowfishSolanaApiClient {
  private readonly multiChainClient: BlowfishMultiChainApiClient;
  public scanDomains: BlowfishMultiChainApiClient["scanDomains"];
  public downloadBlocklist: BlowfishMultiChainApiClient["downloadBlocklist"];

  constructor(
    basePath: string,
    private readonly chainNetwork: SolanaChainNetwork,
    apiKey?: string
  ) {
    this.multiChainClient = new BlowfishMultiChainApiClient(basePath, apiKey);
    this.scanDomains = this.multiChainClient.scanDomains;
    this.downloadBlocklist = this.multiChainClient.downloadBlocklist;
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
