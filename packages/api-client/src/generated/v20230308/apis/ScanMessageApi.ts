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
  ScanMessageEvm200Response,
  ScanMessageEvmRequest,
  Unauthorized,
} from "../models/index";

export interface ScanMessageEvmOperationRequest {
  xApiVersion: string;
  chainFamily: ScanMessageEvmOperationChainFamilyEnum;
  chainNetwork: ScanMessageEvmOperationChainNetworkEnum;
  language?: Languages;
  method?: string | null;
  contentType?: string;
  scanMessageEvmRequest?: ScanMessageEvmRequest;
}

/**
 *
 */
export class ScanMessageApi extends runtime.BaseAPI {
  /**
   * Scan an EVM message in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what signing the message will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/message | | Goerli Testnet (deprecated) | https://api.blowfish.xyz/ethereum/v0/goerli/scan/message | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/message | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/message | | Polygon Amoy Testnet  | https://api.blowfish.xyz/polygon/v0/amoy/scan/message | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/message | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/message | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/message | | Optimism Goerli Testnet (deprecated) | https://api.blowfish.xyz/optimism/v0/goerli/scan/message | | Optimism Sepolia Testnet | https://api.blowfish.xyz/optimism/v0/sepolia/scan/message | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/message | | Base Goerli Testnet (deprecated) | https://api.blowfish.xyz/base/v0/goerli/scan/message | | Base Sepolia Testnet | https://api.blowfish.xyz/base/v0/sepolia/scan/message | | Avalanche Mainnet | https://api.blowfish.xyz/avalanche/v0/mainnet/scan/message | | Avalanche Fuji Testnet | https://api.blowfish.xyz/avalanche/v0/fuji/scan/message | | Degen Mainnet| https://api.blowfish.xyz/degen/v0/mainnet/scan/message | | Blast Mainnet | https://api.blowfish.xyz/blast/v0/mainnet/scan/message | | Blast Sepolia | https://api.blowfish.xyz/blast/v0/sepolia/scan/message | | Gnosis Mainnet | https://api.blowfish.xyz/gnosis/v0/mainnet/scan/message | | Linea Mainnet | https://api.blowfish.xyz/linea/v0/mainnet/scan/message | | Zora Mainnet | https://api.blowfish.xyz/zora/v0/mainnet/scan/message | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats.  One exception is Zora Mainnet, where ERC20 token prices are currently not supported. `price` for token-related state changes on Zora will always be `null`. NFT prices should work as usual.
   * EVM
   */
  async scanMessageEvmRaw(
    requestParameters: ScanMessageEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<ScanMessageEvm200Response>> {
    if (
      requestParameters.xApiVersion === null ||
      requestParameters.xApiVersion === undefined
    ) {
      throw new runtime.RequiredError(
        "xApiVersion",
        "Required parameter requestParameters.xApiVersion was null or undefined when calling scanMessageEvm."
      );
    }

    if (
      requestParameters.chainFamily === null ||
      requestParameters.chainFamily === undefined
    ) {
      throw new runtime.RequiredError(
        "chainFamily",
        "Required parameter requestParameters.chainFamily was null or undefined when calling scanMessageEvm."
      );
    }

    if (
      requestParameters.chainNetwork === null ||
      requestParameters.chainNetwork === undefined
    ) {
      throw new runtime.RequiredError(
        "chainNetwork",
        "Required parameter requestParameters.chainNetwork was null or undefined when calling scanMessageEvm."
      );
    }

    const queryParameters: any = {};

    if (requestParameters.language !== undefined) {
      queryParameters["language"] = requestParameters.language;
    }

    if (requestParameters.method !== undefined) {
      queryParameters["method"] = requestParameters.method;
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
        path: `/{chain-family}/v0/{chain-network}/scan/message`
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
        body: requestParameters.scanMessageEvmRequest,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Scan an EVM message in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what signing the message will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/message | | Goerli Testnet (deprecated) | https://api.blowfish.xyz/ethereum/v0/goerli/scan/message | | Sepolia Testnet | https://api.blowfish.xyz/ethereum/v0/sepolia/scan/message | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/message | | Polygon Amoy Testnet  | https://api.blowfish.xyz/polygon/v0/amoy/scan/message | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/message | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/message | | Optimism Mainnet | https://api.blowfish.xyz/optimism/v0/mainnet/scan/message | | Optimism Goerli Testnet (deprecated) | https://api.blowfish.xyz/optimism/v0/goerli/scan/message | | Optimism Sepolia Testnet | https://api.blowfish.xyz/optimism/v0/sepolia/scan/message | | Base Mainnet | https://api.blowfish.xyz/base/v0/mainnet/scan/message | | Base Goerli Testnet (deprecated) | https://api.blowfish.xyz/base/v0/goerli/scan/message | | Base Sepolia Testnet | https://api.blowfish.xyz/base/v0/sepolia/scan/message | | Avalanche Mainnet | https://api.blowfish.xyz/avalanche/v0/mainnet/scan/message | | Avalanche Fuji Testnet | https://api.blowfish.xyz/avalanche/v0/fuji/scan/message | | Degen Mainnet| https://api.blowfish.xyz/degen/v0/mainnet/scan/message | | Blast Mainnet | https://api.blowfish.xyz/blast/v0/mainnet/scan/message | | Blast Sepolia | https://api.blowfish.xyz/blast/v0/sepolia/scan/message | | Gnosis Mainnet | https://api.blowfish.xyz/gnosis/v0/mainnet/scan/message | | Linea Mainnet | https://api.blowfish.xyz/linea/v0/mainnet/scan/message | | Zora Mainnet | https://api.blowfish.xyz/zora/v0/mainnet/scan/message | Note:  All EVM scan endpoints are equivalent when it comes to functionality as well as request and response formats.  One exception is Zora Mainnet, where ERC20 token prices are currently not supported. `price` for token-related state changes on Zora will always be `null`. NFT prices should work as usual.
   * EVM
   */
  async scanMessageEvm(
    requestParameters: ScanMessageEvmOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<ScanMessageEvm200Response> {
    const response = await this.scanMessageEvmRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}

/**
 * @export
 */
export const ScanMessageEvmOperationChainFamilyEnum = {
  Ethereum: "ethereum",
  Polygon: "polygon",
  Bnb: "bnb",
  Arbitrum: "arbitrum",
  Optimism: "optimism",
  Base: "base",
  Zora: "zora",
  Avalanche: "avalanche",
  Degen: "degen",
  Gnosis: "gnosis",
  Linea: "linea",
  Blast: "blast",
  ImmutableZkevm: "immutable_zkevm",
} as const;
export type ScanMessageEvmOperationChainFamilyEnum =
  (typeof ScanMessageEvmOperationChainFamilyEnum)[keyof typeof ScanMessageEvmOperationChainFamilyEnum];
/**
 * @export
 */
export const ScanMessageEvmOperationChainNetworkEnum = {
  Mainnet: "mainnet",
  One: "one",
  Goerli: "goerli",
  Sepolia: "sepolia",
  Fuji: "fuji",
  Testnet: "testnet",
} as const;
export type ScanMessageEvmOperationChainNetworkEnum =
  (typeof ScanMessageEvmOperationChainNetworkEnum)[keyof typeof ScanMessageEvmOperationChainNetworkEnum];
