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
  EvmSimulationResults,
  HistoricalTransactionEvmRequest,
  InternalServerError,
  Languages,
  Unauthorized,
} from "../models/index";

export interface HistoricalTransactionEvmOperationRequest {
  xApiVersion: string;
  language?: Languages;
  contentType?: string;
  historicalTransactionEvmRequest?: HistoricalTransactionEvmRequest;
}

/**
 *
 */
export class SimulateHistoricalTransactionApi extends runtime.BaseAPI {
  /**
   * Simulates historical transaction to get the actual state changes it produced. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/historical/transaction | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/historical/transaction | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/historical/transaction | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/historical/transaction | | Polygon Mumbai Testnet  | https://api.blowfish.xyz/polygon/v0/mumbai/historical/transaction | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/historical/transaction | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/historical/transaction | | Optimism Goerli Testnet | https://api.blowfish.xyz/optimism/v0/goerli/historical/transaction | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/historical/transaction | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/historical/transaction | | Base Goerli Testnet | https://api.blowfish.xyz/base/v0/goerli/historical/transaction |
   * EVM
   */
  async historicalTransactionEvmRaw(
    requestParameters: HistoricalTransactionEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<EvmSimulationResults>> {
    if (
      requestParameters.xApiVersion === null ||
      requestParameters.xApiVersion === undefined
    ) {
      throw new runtime.RequiredError(
        "xApiVersion",
        "Required parameter requestParameters.xApiVersion was null or undefined when calling historicalTransactionEvm."
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
        path: `/ethereum/v0/mainnet/historical/transaction`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.historicalTransactionEvmRequest,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Simulates historical transaction to get the actual state changes it produced. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/historical/transaction | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/historical/transaction | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/historical/transaction | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/historical/transaction | | Polygon Mumbai Testnet  | https://api.blowfish.xyz/polygon/v0/mumbai/historical/transaction | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/historical/transaction | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/historical/transaction | | Optimism Goerli Testnet | https://api.blowfish.xyz/optimism/v0/goerli/historical/transaction | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/historical/transaction | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/historical/transaction | | Base Goerli Testnet | https://api.blowfish.xyz/base/v0/goerli/historical/transaction |
   * EVM
   */
  async historicalTransactionEvm(
    requestParameters: HistoricalTransactionEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<EvmSimulationResults> {
    const response = await this.historicalTransactionEvmRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
