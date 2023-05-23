/* tslint:disable */
/* eslint-disable */
/**
 * API reference
 * The Blowfish API reference specification
 *
 * The version of the OpenAPI document: 2022-06-01
 * Contact: contact@blowfish.xyz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BadRequest,
  InternalServerError,
  Languages,
  ScanTransactionsEvm200Response,
  ScanTransactionsEvmRequest,
  ScanTransactionsSolana200Response,
  ScanTransactionsSolanaRequest,
  Unauthorized,
} from '../models';

export interface ScanTransactionsEvmOperationRequest {
    xApiKey: string;
    xApiVersion: string;
    language?: Languages;
    contentType?: string;
    scanTransactionsEvmRequest?: ScanTransactionsEvmRequest;
}

export interface ScanTransactionsSolanaOperationRequest {
    xApiKey: string;
    xApiVersion: string;
    scanTransactionsSolanaRequest: ScanTransactionsSolanaRequest;
    language?: Languages;
    contentType?: string;
}

/**
 * 
 */
export class ScanTransactionsApi extends runtime.BaseAPI {

    /**
     * Scan a list of EVM transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transactions will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/transactions | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/transactions | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/transactions | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/transactions | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/transactions | Note:  All EVM endpoints are equivalent when it comes to functionality as well as request and response formats. Note 2: If you are using a free, self-service API key from our Developer Portal, be sure to add the `free` subdomain (e.g., `https://free.api.blowfish.xyz`) to the above endpoints. 
     * EVM
     */
    async scanTransactionsEvmRaw(requestParameters: ScanTransactionsEvmOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ScanTransactionsEvm200Response>> {
        if (requestParameters.xApiKey === null || requestParameters.xApiKey === undefined) {
            throw new runtime.RequiredError('xApiKey','Required parameter requestParameters.xApiKey was null or undefined when calling scanTransactionsEvm.');
        }

        if (requestParameters.xApiVersion === null || requestParameters.xApiVersion === undefined) {
            throw new runtime.RequiredError('xApiVersion','Required parameter requestParameters.xApiVersion was null or undefined when calling scanTransactionsEvm.');
        }

        const queryParameters: any = {};

        if (requestParameters.language !== undefined) {
            queryParameters['language'] = requestParameters.language;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xApiKey !== undefined && requestParameters.xApiKey !== null) {
            headerParameters['X-Api-Key'] = String(requestParameters.xApiKey);
        }

        if (requestParameters.xApiVersion !== undefined && requestParameters.xApiVersion !== null) {
            headerParameters['X-Api-Version'] = String(requestParameters.xApiVersion);
        }

        if (requestParameters.contentType !== undefined && requestParameters.contentType !== null) {
            headerParameters['Content-Type'] = String(requestParameters.contentType);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Api-Key"] = this.configuration.apiKey("X-Api-Key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/ethereum/v0/mainnet/scan/transactions`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.scanTransactionsEvmRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Scan a list of EVM transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transactions will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/transactions | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/transactions | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/transactions | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/transactions | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/transactions | Note:  All EVM endpoints are equivalent when it comes to functionality as well as request and response formats. Note 2: If you are using a free, self-service API key from our Developer Portal, be sure to add the `free` subdomain (e.g., `https://free.api.blowfish.xyz`) to the above endpoints. 
     * EVM
     */
    async scanTransactionsEvm(requestParameters: ScanTransactionsEvmOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ScanTransactionsEvm200Response> {
        const response = await this.scanTransactionsEvmRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Scan Solana transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. The API will return a list of warnings and a list of human-readable simulation results. ### Supported networks | Network | Base URL | | --- | --- | | Mainnet | https://api.blowfish.xyz/solana/v0/mainnet/scan/transactions | | Testnet | https://api.blowfish.xyz/solana/v0/testnet/scan/transactions | | Devnet | https://api.blowfish.xyz/solana/v0/devnet/scan/transactions | Note: If you are using a free, self-service API key from our Developer Portal, be sure to add the `free` subdomain (e.g., `https://free.api.blowfish.xyz`) to the above endpoints. 
     * Solana
     */
    async scanTransactionsSolanaRaw(requestParameters: ScanTransactionsSolanaOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ScanTransactionsSolana200Response>> {
        if (requestParameters.xApiKey === null || requestParameters.xApiKey === undefined) {
            throw new runtime.RequiredError('xApiKey','Required parameter requestParameters.xApiKey was null or undefined when calling scanTransactionsSolana.');
        }

        if (requestParameters.xApiVersion === null || requestParameters.xApiVersion === undefined) {
            throw new runtime.RequiredError('xApiVersion','Required parameter requestParameters.xApiVersion was null or undefined when calling scanTransactionsSolana.');
        }

        if (requestParameters.scanTransactionsSolanaRequest === null || requestParameters.scanTransactionsSolanaRequest === undefined) {
            throw new runtime.RequiredError('scanTransactionsSolanaRequest','Required parameter requestParameters.scanTransactionsSolanaRequest was null or undefined when calling scanTransactionsSolana.');
        }

        const queryParameters: any = {};

        if (requestParameters.language !== undefined) {
            queryParameters['language'] = requestParameters.language;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xApiKey !== undefined && requestParameters.xApiKey !== null) {
            headerParameters['X-Api-Key'] = String(requestParameters.xApiKey);
        }

        if (requestParameters.xApiVersion !== undefined && requestParameters.xApiVersion !== null) {
            headerParameters['X-Api-Version'] = String(requestParameters.xApiVersion);
        }

        if (requestParameters.contentType !== undefined && requestParameters.contentType !== null) {
            headerParameters['Content-Type'] = String(requestParameters.contentType);
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Api-Key"] = this.configuration.apiKey("X-Api-Key"); // ApiKeyAuth authentication
        }

        const response = await this.request({
            path: `/solana/v0/mainnet/scan/transactions`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.scanTransactionsSolanaRequest,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Scan Solana transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. The API will return a list of warnings and a list of human-readable simulation results. ### Supported networks | Network | Base URL | | --- | --- | | Mainnet | https://api.blowfish.xyz/solana/v0/mainnet/scan/transactions | | Testnet | https://api.blowfish.xyz/solana/v0/testnet/scan/transactions | | Devnet | https://api.blowfish.xyz/solana/v0/devnet/scan/transactions | Note: If you are using a free, self-service API key from our Developer Portal, be sure to add the `free` subdomain (e.g., `https://free.api.blowfish.xyz`) to the above endpoints. 
     * Solana
     */
    async scanTransactionsSolana(requestParameters: ScanTransactionsSolanaOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ScanTransactionsSolana200Response> {
        const response = await this.scanTransactionsSolanaRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
