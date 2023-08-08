/* tslint:disable */
/* eslint-disable */
/**
 * API reference
 * The Blowfish API reference specification
 *
 * The version of the OpenAPI document: 2023-06-05
 * Contact: contact@blowfish.xyz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import type {
  BadRequest,
  InternalServerError,
  Languages,
  ScanTransactionsEvm200Response,
  ScanTransactionsEvmRequest,
  ScanTransactionsSolana200Response,
  ScanTransactionsSolanaRequest,
  Unauthorized,
} from "../models/index";

export interface ScanTransactionsEvmOperationRequest {
  xApiVersion: string;
  chainFamily: ScanTransactionsEvmOperationChainFamilyEnum;
  chainNetwork: ScanTransactionsEvmOperationChainNetworkEnum;
  language?: Languages;
  contentType?: string;
  scanTransactionsEvmRequest?: ScanTransactionsEvmRequest;
}

export interface ScanTransactionsSolanaOperationRequest {
  xApiVersion: string;
  chainNetwork: ScanTransactionsSolanaOperationChainNetworkEnum;
  scanTransactionsSolanaRequest: ScanTransactionsSolanaRequest;
  language?: Languages;
  simulationTimeoutMs?: number;
  simulateExpired?: ScanTransactionsSolanaOperationSimulateExpiredEnum;
  contentType?: string;
}

/**
 *
 */
export class ScanTransactionsApi extends runtime.BaseAPI {
  /**
   * Scan a list of EVM transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transactions will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/transactions | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/transactions | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/transactions | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/transactions | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/transactions | | Optimism Goerli Testnet | https://api.blowfish.xyz/optimism/v0/goerli/scan/transactions | Note:  All EVM endpoints are equivalent when it comes to functionality as well as request and response formats.
   * EVM
   */
  async scanTransactionsEvmRaw(
    requestParameters: ScanTransactionsEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ScanTransactionsEvm200Response>> {
    if (
      requestParameters.xApiVersion === null ||
      requestParameters.xApiVersion === undefined
    ) {
      throw new runtime.RequiredError(
        "xApiVersion",
        "Required parameter requestParameters.xApiVersion was null or undefined when calling scanTransactionsEvm."
      );
    }

    if (
      requestParameters.chainFamily === null ||
      requestParameters.chainFamily === undefined
    ) {
      throw new runtime.RequiredError(
        "chainFamily",
        "Required parameter requestParameters.chainFamily was null or undefined when calling scanTransactionsEvm."
      );
    }

    if (
      requestParameters.chainNetwork === null ||
      requestParameters.chainNetwork === undefined
    ) {
      throw new runtime.RequiredError(
        "chainNetwork",
        "Required parameter requestParameters.chainNetwork was null or undefined when calling scanTransactionsEvm."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.language !== undefined) {
      queryParameters["language"] = requestParameters.language;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (
      requestParameters.xApiVersion !== undefined &&
      requestParameters.xApiVersion !== null
    ) {
      headerParameters["X-Api-Version"] = String(requestParameters.xApiVersion);
    }

    if (
      requestParameters.contentType !== undefined &&
      requestParameters.contentType !== null
    ) {
      headerParameters["Content-Type"] = String(requestParameters.contentType);
    }

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["X-Api-Key"] = this.configuration.apiKey("X-Api-Key"); // ApiKeyAuth authentication
    }

    const response = await this.request(
      {
        path: `/{chain-family}/v0/{chain-network}/scan/transactions`
          .replace(
            `{${"chain-family"}}`,
            encodeURIComponent(String(requestParameters.chainFamily))
          )
          .replace(
            `{${"chain-network"}}`,
            encodeURIComponent(String(requestParameters.chainNetwork))
          ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.scanTransactionsEvmRequest,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Scan a list of EVM transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transactions will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/transactions | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/transactions | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/transactions | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/transactions | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/transactions | | Optimism Goerli Testnet | https://api.blowfish.xyz/optimism/v0/goerli/scan/transactions | Note:  All EVM endpoints are equivalent when it comes to functionality as well as request and response formats.
   * EVM
   */
  async scanTransactionsEvm(
    requestParameters: ScanTransactionsEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ScanTransactionsEvm200Response> {
    const response = await this.scanTransactionsEvmRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }

  /**
   * Scan Solana transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. The API will return a list of warnings and a list of human-readable simulation results. ### Supported networks | Network | Base URL | | --- | --- | | Mainnet | https://api.blowfish.xyz/solana/v0/mainnet/scan/transactions | | Testnet | https://api.blowfish.xyz/solana/v0/testnet/scan/transactions | | Devnet | https://api.blowfish.xyz/solana/v0/devnet/scan/transactions |
   * Solana
   */
  async scanTransactionsSolanaRaw(
    requestParameters: ScanTransactionsSolanaOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ScanTransactionsSolana200Response>> {
    if (
      requestParameters.xApiVersion === null ||
      requestParameters.xApiVersion === undefined
    ) {
      throw new runtime.RequiredError(
        "xApiVersion",
        "Required parameter requestParameters.xApiVersion was null or undefined when calling scanTransactionsSolana."
      );
    }

    if (
      requestParameters.chainNetwork === null ||
      requestParameters.chainNetwork === undefined
    ) {
      throw new runtime.RequiredError(
        "chainNetwork",
        "Required parameter requestParameters.chainNetwork was null or undefined when calling scanTransactionsSolana."
      );
    }

    if (
      requestParameters.scanTransactionsSolanaRequest === null ||
      requestParameters.scanTransactionsSolanaRequest === undefined
    ) {
      throw new runtime.RequiredError(
        "scanTransactionsSolanaRequest",
        "Required parameter requestParameters.scanTransactionsSolanaRequest was null or undefined when calling scanTransactionsSolana."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.language !== undefined) {
      queryParameters["language"] = requestParameters.language;
    }

    if (requestParameters.simulationTimeoutMs !== undefined) {
      queryParameters["simulationTimeoutMs"] =
        requestParameters.simulationTimeoutMs;
    }

    if (requestParameters.simulateExpired !== undefined) {
      queryParameters["simulateExpired"] = requestParameters.simulateExpired;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (
      requestParameters.xApiVersion !== undefined &&
      requestParameters.xApiVersion !== null
    ) {
      headerParameters["X-Api-Version"] = String(requestParameters.xApiVersion);
    }

    if (
      requestParameters.contentType !== undefined &&
      requestParameters.contentType !== null
    ) {
      headerParameters["Content-Type"] = String(requestParameters.contentType);
    }

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["X-Api-Key"] = this.configuration.apiKey("X-Api-Key"); // ApiKeyAuth authentication
    }

    const response = await this.request(
      {
        path: `/solana/v0/{chain-network}/scan/transactions`.replace(
          `{${"chain-network"}}`,
          encodeURIComponent(String(requestParameters.chainNetwork))
        ),
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.scanTransactionsSolanaRequest,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Scan Solana transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. The API will return a list of warnings and a list of human-readable simulation results. ### Supported networks | Network | Base URL | | --- | --- | | Mainnet | https://api.blowfish.xyz/solana/v0/mainnet/scan/transactions | | Testnet | https://api.blowfish.xyz/solana/v0/testnet/scan/transactions | | Devnet | https://api.blowfish.xyz/solana/v0/devnet/scan/transactions |
   * Solana
   */
  async scanTransactionsSolana(
    requestParameters: ScanTransactionsSolanaOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ScanTransactionsSolana200Response> {
    const response = await this.scanTransactionsSolanaRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}

/**
 * @export
 */
export const ScanTransactionsEvmOperationChainFamilyEnum = {
  Ethereum: "ethereum",
  Polygon: "polygon",
  Bnb: "bnb",
  Arbitrum: "arbitrum",
  Optimism: "optimism",
} as const;
export type ScanTransactionsEvmOperationChainFamilyEnum =
  typeof ScanTransactionsEvmOperationChainFamilyEnum[keyof typeof ScanTransactionsEvmOperationChainFamilyEnum];
/**
 * @export
 */
export const ScanTransactionsEvmOperationChainNetworkEnum = {
  Mainnet: "mainnet",
  One: "one",
  Goerli: "goerli",
} as const;
export type ScanTransactionsEvmOperationChainNetworkEnum =
  typeof ScanTransactionsEvmOperationChainNetworkEnum[keyof typeof ScanTransactionsEvmOperationChainNetworkEnum];
/**
 * @export
 */
export const ScanTransactionsSolanaOperationChainNetworkEnum = {
  Mainnet: "mainnet",
  Testnet: "testnet",
  Devnet: "devnet",
} as const;
export type ScanTransactionsSolanaOperationChainNetworkEnum =
  typeof ScanTransactionsSolanaOperationChainNetworkEnum[keyof typeof ScanTransactionsSolanaOperationChainNetworkEnum];
/**
 * @export
 */
export const ScanTransactionsSolanaOperationSimulateExpiredEnum = {
  True: "true",
  False: "false",
} as const;
export type ScanTransactionsSolanaOperationSimulateExpiredEnum =
  typeof ScanTransactionsSolanaOperationSimulateExpiredEnum[keyof typeof ScanTransactionsSolanaOperationSimulateExpiredEnum];
