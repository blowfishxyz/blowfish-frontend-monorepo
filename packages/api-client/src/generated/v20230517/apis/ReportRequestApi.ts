/* tslint:disable */
/* eslint-disable */
/**
 * API reference
 * The Blowfish API reference specification
 *
 * The version of the OpenAPI document: 2023-05-17
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
  Report200Response,
  ReportRequest,
  Unauthorized,
} from "../models/index";

export interface ReportOperationRequest {
  xApiVersion: string;
  reportRequest: ReportRequest;
  contentType?: string;
}

/**
 *
 */
export class ReportRequestApi extends runtime.BaseAPI {
  /**
   * This endpoint allows to send additional data about user\'s behaviour after viewing a scanning result from Blowfish. For each scan, you can send events like `PROCEEDED` (when user decided to sign the transaction), `REJECTED` (when user decided to abort the transaction flow) and `REPORTED_MALICIOUS` (when user explicitly marked the submitted transaction as malicious).  We review and analyze reports to improve the accuracy of our security engine.
   * Report
   */
  async reportRaw(
    requestParameters: ReportOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<Report200Response>> {
    if (
      requestParameters.xApiVersion === null ||
      requestParameters.xApiVersion === undefined
    ) {
      throw new runtime.RequiredError(
        "xApiVersion",
        "Required parameter requestParameters.xApiVersion was null or undefined when calling report."
      );
    }

    if (
      requestParameters.reportRequest === null ||
      requestParameters.reportRequest === undefined
    ) {
      throw new runtime.RequiredError(
        "reportRequest",
        "Required parameter requestParameters.reportRequest was null or undefined when calling report."
      );
    }

    const queryParameters: any = {};

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
        path: `/v0/report`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.reportRequest,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * This endpoint allows to send additional data about user\'s behaviour after viewing a scanning result from Blowfish. For each scan, you can send events like `PROCEEDED` (when user decided to sign the transaction), `REJECTED` (when user decided to abort the transaction flow) and `REPORTED_MALICIOUS` (when user explicitly marked the submitted transaction as malicious).  We review and analyze reports to improve the accuracy of our security engine.
   * Report
   */
  async report(
    requestParameters: ReportOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<Report200Response> {
    const response = await this.reportRaw(requestParameters, initOverrides);
    return await response.value();
  }
}
