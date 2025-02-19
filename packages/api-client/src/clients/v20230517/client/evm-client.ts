import {
  EvmChainFamily,
  EvmChainNetwork,
  Languages,
  RequestMetadata,
  EvmSignTypedDataData,
  EvmTxData,
  EvmSimulatorConfig,
} from "../types";
import { BlowfishMultiChainApiClient, FetchAPI } from "./multi-chain-client";

export class BlowfishEvmApiClient {
  private readonly multiChainClient: BlowfishMultiChainApiClient;
  public scanDomains: BlowfishMultiChainApiClient["scanDomains"];
  public downloadBlocklist: BlowfishMultiChainApiClient["downloadBlocklist"];
  public reportTransaction: BlowfishMultiChainApiClient["reportTransaction"];
  public scanAssets: BlowfishMultiChainApiClient["scanAssets"];

  constructor(
    basePath: string,
    private readonly chainFamily: EvmChainFamily,
    private readonly chainNetwork: EvmChainNetwork,
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

  async scanMessage(
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.multiChainClient.scanMessageEvm(
      rawMessage,
      userAccount,
      metadata,
      this.chainFamily,
      this.chainNetwork
    );
  }

  async scanPersonalSign(
    rawMessage: string,
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.multiChainClient.scanPersonalSignEvm(
      rawMessage,
      userAccount,
      metadata,
      this.chainFamily,
      this.chainNetwork
    );
  }

  async scanSignTypedData(
    typedData: EvmSignTypedDataData,
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.multiChainClient.scanSignTypedDataEvm(
      typedData,
      userAccount,
      metadata,
      this.chainFamily,
      this.chainNetwork
    );
  }

  async scanTransactions(
    txObjects: EvmTxData[],
    userAccount: string,
    metadata: RequestMetadata,
    simulatorConfig?: EvmSimulatorConfig
  ) {
    return this.multiChainClient.scanTransactionsEvm(
      txObjects,
      userAccount,
      metadata,
      this.chainFamily,
      this.chainNetwork,
      simulatorConfig
    );
  }
}
