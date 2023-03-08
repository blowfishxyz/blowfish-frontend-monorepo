import type { EvmMessageScanResult, EvmTransactionObject, EvmTransactionScanResult, RequestMetadata } from "./types";
export type ChainFamily = "ethereum" | "polygon";
export type ChainNetwork = "mainnet" | "goerli";
export interface SignTypedDataPayload {
    domain: {
        name: string;
        version: string | number;
        chainId: string | number;
        verifyingContract: string;
    };
    message: object;
    [key: string]: any;
}
export interface SignTypedDataRequest {
    kind: "SIGN_TYPED_DATA";
    data: SignTypedDataPayload;
}
export interface SignMessageRequest {
    kind: "SIGN_MESSAGE";
    rawMessage: string;
}
export interface MessageRequestBody {
    message: SignTypedDataRequest | SignMessageRequest;
    metadata: RequestMetadata;
    userAccount: string;
}
export declare class BlowfishApiClient {
    private readonly chainFamily;
    private readonly chainNetwork;
    private readonly baseUrl;
    private readonly apiKey;
    constructor(chainFamily: ChainFamily, chainNetwork: ChainNetwork, apiKey?: string, baseUrl?: string);
    scanTransaction(txObject: EvmTransactionObject, userAccount: string, metadata: RequestMetadata): Promise<EvmTransactionScanResult>;
    scanSignTypedData(typedData: SignTypedDataPayload, userAccount: string, metadata: RequestMetadata): Promise<EvmMessageScanResult>;
    scanSignMessage(rawMessage: string, userAccount: string, metadata: RequestMetadata): Promise<EvmMessageScanResult>;
    _fetchAndValidateStatus<T>(endpoint: "transaction" | "message", requestBody: object): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map