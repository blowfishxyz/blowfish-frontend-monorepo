import {
  EvmChainFamily,
  EvmChainNetwork,
  Languages,
  RequestMetadata,
  EvmSignTypedDataData,
  EvmTxData,
  EvmSimulatorConfig,
} from "../types";
import { BlowfishMultiChainApiClient } from "./multi-chain-client";

export class BlowfishEvmApiClient {
  private readonly multiChainClient: BlowfishMultiChainApiClient;
  public scanDomains: BlowfishMultiChainApiClient["scanDomains"];
  public downloadBlocklist: BlowfishMultiChainApiClient["downloadBlocklist"];
  public reportTransaction: BlowfishMultiChainApiClient["reportTransaction"];

  constructor(
    basePath: string,
    private readonly chainFamily: EvmChainFamily,
    private readonly chainNetwork: EvmChainNetwork,
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
