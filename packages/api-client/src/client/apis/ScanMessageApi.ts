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
  ScanMessageEvm200Response,
  ScanMessageEvmRequest,
  Unauthorized,
} from '../models';
import {
    BadRequestFromJSON,
    BadRequestToJSON,
    InternalServerErrorFromJSON,
    InternalServerErrorToJSON,
    LanguagesFromJSON,
    LanguagesToJSON,
    ScanMessageEvm200ResponseFromJSON,
    ScanMessageEvm200ResponseToJSON,
    ScanMessageEvmRequestFromJSON,
    ScanMessageEvmRequestToJSON,
    UnauthorizedFromJSON,
    UnauthorizedToJSON,
} from '../models';

export interface ScanMessageEvmOperationRequest {
    xApiKey: string;
    xApiVersion: string;
    language?: Languages;
    contentType?: string;
    scanMessageEvmRequest?: ScanMessageEvmRequest;
}

/**
 * 
 */
export class ScanMessageApi extends runtime.BaseAPI {

    /**
     * Scan an EVM message in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what signing the message will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/message | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/message | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/message | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/message | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/message | Note:  All EVM endpoints are equivalent when it comes to functionality as well as request and response formats. Note 2: If you are using a free, self-service API key from our Developer Portal, be sure to add the `free` subdomain (e.g., `https://free.api.blowfish.xyz`) to the above endpoints. 
     * EVM
     */
    async scanMessageEvmRaw(requestParameters: ScanMessageEvmOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ScanMessageEvm200Response>> {
        if (requestParameters.xApiKey === null || requestParameters.xApiKey === undefined) {
            throw new runtime.RequiredError('xApiKey','Required parameter requestParameters.xApiKey was null or undefined when calling scanMessageEvm.');
        }

        if (requestParameters.xApiVersion === null || requestParameters.xApiVersion === undefined) {
            throw new runtime.RequiredError('xApiVersion','Required parameter requestParameters.xApiVersion was null or undefined when calling scanMessageEvm.');
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
            path: `/ethereum/v0/mainnet/scan/message`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ScanMessageEvmRequestToJSON(requestParameters.scanMessageEvmRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ScanMessageEvm200ResponseFromJSON(jsonValue));
    }

    /**
     * Scan an EVM message in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what signing the message will do. ### Supported networks | Network | Base URL | | --- | --- | | Ethereum Mainnet | https://api.blowfish.xyz/ethereum/v0/mainnet/scan/message | | Goerli Testnet | https://api.blowfish.xyz/ethereum/v0/goerli/scan/message | | Polygon Mainnet | https://api.blowfish.xyz/polygon/v0/mainnet/scan/message | | BNB Chain Mainnet | https://api.blowfish.xyz/bnb/v0/mainnet/scan/message | | Arbitrum One | https://api.blowfish.xyz/arbitrum/v0/one/scan/message | Note:  All EVM endpoints are equivalent when it comes to functionality as well as request and response formats. Note 2: If you are using a free, self-service API key from our Developer Portal, be sure to add the `free` subdomain (e.g., `https://free.api.blowfish.xyz`) to the above endpoints. 
     * EVM
     */
    async scanMessageEvm(requestParameters: ScanMessageEvmOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ScanMessageEvm200Response> {
        const response = await this.scanMessageEvmRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
