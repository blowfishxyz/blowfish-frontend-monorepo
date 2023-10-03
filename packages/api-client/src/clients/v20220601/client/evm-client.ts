import {
  EvmChainFamily,
  EvmChainNetwork,
  Languages,
  RequestMetadata,
  EvmSignTypedDataData,
  ScanTransactionEvmRequestTxObject,
} from "../types";
import { BlowfishMultiChainApiClient } from "./multi-chain-client";

export class BlowfishEvmApiClient {
  private readonly multiChainClient: BlowfishMultiChainApiClient;
  public scanDomains: BlowfishMultiChainApiClient["scanDomains"];
  public downloadBlocklist: BlowfishMultiChainApiClient["downloadBlocklist"];

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

  async scanTransaction(
    txObject: ScanTransactionEvmRequestTxObject,
    userAccount: string,
    metadata: RequestMetadata
  ) {
    return this.multiChainClient.scanTransactionEvm(
      txObject,
      userAccount,
      metadata,
      this.chainFamily,
      this.chainNetwork
    );
  }
}
