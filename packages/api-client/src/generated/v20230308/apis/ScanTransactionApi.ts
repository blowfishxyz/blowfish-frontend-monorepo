/* tslint:disable */
/* eslint-disable */
/**
 * API reference
 * The Blowfish API reference specification
 *
 * The version of the OpenAPI document: 2023-03-08
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
  ScanTransactionEvm200Response,
  ScanTransactionEvmRequest,
  Unauthorized,
} from "../models/index";

export interface ScanTransactionEvmOperationRequest {
  xApiVersion: string;
  chainFamily: ScanTransactionEvmOperationChainFamilyEnum;
  chainNetwork: ScanTransactionEvmOperationChainNetworkEnum;
  language?: Languages;
  contentType?: string;
  scanTransactionEvmRequest?: ScanTransactionEvmRequest;
}

/**
 *
 */
export class ScanTransactionApi extends runtime.BaseAPI {
  /**
   * [DEPRECATED] Use Scan transactions endpoint instead. https://docs.blowfish.xyz/reference/scan-transactions-evm [Sunset] 31.12.2023 Scan an EVM transaction in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/transaction | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/transaction | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/transaction | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/transaction | | Polygon Mumbai Testnet  | https://api.blowfish.xyz/polygon/v0/mumbai/scan/transaction | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/transaction | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/transaction | | Arbitrum Sepolia Testnet | https://api.blowfish.xyz/arbitrum/v0/sepolia/scan/transaction | | Optimism Goerli Testnet | https://api.blowfish.xyz/optimism/v0/goerli/scan/transaction | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/transaction | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/transaction | | Base Goerli Testnet | https://api.blowfish.xyz/base/v0/goerli/scan/transaction | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats.
   * EVM
   */
  async scanTransactionEvmRaw(
    requestParameters: ScanTransactionEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ScanTransactionEvm200Response>> {
    if (
      requestParameters.xApiVersion === null ||
      requestParameters.xApiVersion === undefined
    ) {
      throw new runtime.RequiredError(
        "xApiVersion",
        "Required parameter requestParameters.xApiVersion was null or undefined when calling scanTransactionEvm."
      );
    }

    if (
      requestParameters.chainFamily === null ||
      requestParameters.chainFamily === undefined
    ) {
      throw new runtime.RequiredError(
        "chainFamily",
        "Required parameter requestParameters.chainFamily was null or undefined when calling scanTransactionEvm."
      );
    }

    if (
      requestParameters.chainNetwork === null ||
      requestParameters.chainNetwork === undefined
    ) {
      throw new runtime.RequiredError(
        "chainNetwork",
        "Required parameter requestParameters.chainNetwork was null or undefined when calling scanTransactionEvm."
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
        path: `/{chain-family}/v0/{chain-network}/scan/transaction`
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
        body: requestParameters.scanTransactionEvmRequest,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * [DEPRECATED] Use Scan transactions endpoint instead. https://docs.blowfish.xyz/reference/scan-transactions-evm [Sunset] 31.12.2023 Scan an EVM transaction in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/transaction | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/transaction | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/transaction | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/transaction | | Polygon Mumbai Testnet  | https://api.blowfish.xyz/polygon/v0/mumbai/scan/transaction | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/transaction | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/transaction | | Arbitrum Sepolia Testnet | https://api.blowfish.xyz/arbitrum/v0/sepolia/scan/transaction | | Optimism Goerli Testnet | https://api.blowfish.xyz/optimism/v0/goerli/scan/transaction | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/transaction | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/transaction | | Base Goerli Testnet | https://api.blowfish.xyz/base/v0/goerli/scan/transaction | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats.
   * EVM
   */
  async scanTransactionEvm(
    requestParameters: ScanTransactionEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ScanTransactionEvm200Response> {
    const response = await this.scanTransactionEvmRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}

/**
 * @export
 */
export const ScanTransactionEvmOperationChainFamilyEnum = {
  Ethereum: "ethereum",
  Polygon: "polygon",
  Bnb: "bnb",
  Arbitrum: "arbitrum",
  Optimism: "optimism",
  Base: "base",
} as const;
export type ScanTransactionEvmOperationChainFamilyEnum =
  (typeof ScanTransactionEvmOperationChainFamilyEnum)[keyof typeof ScanTransactionEvmOperationChainFamilyEnum];
/**
 * @export
 */
export const ScanTransactionEvmOperationChainNetworkEnum = {
  Mainnet: "mainnet",
  One: "one",
  Goerli: "goerli",
} as const;
export type ScanTransactionEvmOperationChainNetworkEnum =
  (typeof ScanTransactionEvmOperationChainNetworkEnum)[keyof typeof ScanTransactionEvmOperationChainNetworkEnum];
