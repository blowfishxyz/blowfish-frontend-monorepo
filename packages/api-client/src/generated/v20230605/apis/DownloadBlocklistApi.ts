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
  DownloadBlocklist200Response,
  DownloadBlocklistRequest,
  InternalServerError,
  Unauthorized,
} from "../models/index";

export interface DownloadBlocklistOperationRequest {
  xApiVersion: string;
  contentType?: string;
  downloadBlocklistRequest?: DownloadBlocklistRequest;
}

/**
 *
 */
export class DownloadBlocklistApi extends runtime.BaseAPI {
  /**
   * Generate a downloadable snapshot with all blocked domains in order to check domains a user visits against a local blocklist, preserving their browsing privacy.  ### Integration This API enables to verify domain safety while maintaining the end user\'s privacy. To integrate this API into your app, you should follow the steps below:  1. Regularly update the blocklist metadata from the `/v0/domains/blocklist` endpoint.   - In browser extensions, set up a timer to update the blocklist every 2-5 minutes.   - In mobile apps, update the blocklist each time the user opens the app and every 2-5 minutes while the user is using the app.   - New values of `recentlyAdded` and `recentlyRemoved` should be stored after each update, regardless of whether the bloom filter has changed. 2. During each update, check if the app has previously downloaded a bloom filter with the hash `bloomFilter.hash`. If not, download it from `bloomFilter.url`.   - Since the bloom filter can be up to 1MB in size, make sure you never re-download the same bloom filter. Identical bloom filters always have the same URL and the same hash.   - Store the blocklist metadata (`recentlyAdded`, `recentlyRemoved`), bloom filter hash, and downloaded bloom filter.   - Chrome extensions can use localStorage. The endpoint is designed with a 5MB limit on localStorage in mind.   - The bloom filter is changed once a day, so users will never use more than 1 MB of traffic per day if the download and local caching logic is implemented correctly. 3. When the user visits a domain, check if the domain is present on the bloom filter or the `recentlyAdded` list from the blocklist metadata and isn\'t present on the `recentlyRemoved` list. If this is the case, block the user from visiting the website.  Browser extensions and React Native apps can use the Javascript package [@blowfish/blocklist](https://www.npmjs.com/package/@blowfishxyz/blocklist) to implement the outlined logic. For example:  ```js // Regular updates import { fetchDomainBlocklist, fetchDomainBlocklistBloomFilter } from \'@blowfishxyz/blocklist\';  const blocklist = await fetchDomainBlocklist(apiConfig); [...] // save blocklist.recentlyAdded and blocklist.recentlyRemoved to a local database const storedHash = [...]; // fetch it from your storage if (storedHash != blocklist.bloomFilter.hash) {     const bloomFilter = await fetchDomainBlocklistBloomFilter(blocklist.bloomFilter.url);     [...] // save bloomFilter to a local database     [...] // save bloomFilter.hash or blocklist.bloomFilter.hash to a local database }  // Lookups import { scanDomain, Action } from \'@blowfishxyz/blocklist\';  const recentlyAdded = [...]; // get from storage const recentlyRemoved = [...]; // get from storage const bloomFilter = [...]; // get from storage  const action = scanDomain(     bloomFilter,     recentlyAdded,     recentlyRemoved,     \"https://example.com/\" );  if (action === Action.BLOCK) {     // block the domain } ```  For more information on how to use the package, please refer to the NPM package description.  ### Priority lists The API aggregates different proprietary Blowfish lists and ecosystem lists. In some cases, different lists may have conflicting data on whether to block or allow a domain. By providing `priorityBlockLists` and `priorityAllowLists`, you can override the results in these cases.  If a domain is blocked by one of the lists that Blowfish aggregates, but included in one of `priorityAllowLists`, it will not be included in the blocklist snapshot. Conversely, if a domain is allow-listed by one of the lists that Blowfish aggregates, but is included in one of `priorityBlockLists`, it will be included in the snapshot.  This is an advanced feature for integrators who want granular control over blocking domains. By default, the API uses internal list priority heuristics designed for most use cases. The Blowfish team continuously monitors the quality of the underlying blocklists and removes incorrect entries.  Blowfish can also ingest custom blocklists and allowlists. If you have a custom list, you can reach out to the Blowfish team and provide a publicly available URL with the domains in a .txt format.
   * Blocklist
   */
  async downloadBlocklistRaw(
    requestParameters: DownloadBlocklistOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<DownloadBlocklist200Response>> {
    if (
      requestParameters.xApiVersion === null ||
      requestParameters.xApiVersion === undefined
    ) {
      throw new runtime.RequiredError(
        "xApiVersion",
        "Required parameter requestParameters.xApiVersion was null or undefined when calling downloadBlocklist."
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
        path: `/v0/domains/blocklist`,
        method: "POST",
        headers: headerParameters,
        query: queryParameters,
        body: requestParameters.downloadBlocklistRequest,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Generate a downloadable snapshot with all blocked domains in order to check domains a user visits against a local blocklist, preserving their browsing privacy.  ### Integration This API enables to verify domain safety while maintaining the end user\'s privacy. To integrate this API into your app, you should follow the steps below:  1. Regularly update the blocklist metadata from the `/v0/domains/blocklist` endpoint.   - In browser extensions, set up a timer to update the blocklist every 2-5 minutes.   - In mobile apps, update the blocklist each time the user opens the app and every 2-5 minutes while the user is using the app.   - New values of `recentlyAdded` and `recentlyRemoved` should be stored after each update, regardless of whether the bloom filter has changed. 2. During each update, check if the app has previously downloaded a bloom filter with the hash `bloomFilter.hash`. If not, download it from `bloomFilter.url`.   - Since the bloom filter can be up to 1MB in size, make sure you never re-download the same bloom filter. Identical bloom filters always have the same URL and the same hash.   - Store the blocklist metadata (`recentlyAdded`, `recentlyRemoved`), bloom filter hash, and downloaded bloom filter.   - Chrome extensions can use localStorage. The endpoint is designed with a 5MB limit on localStorage in mind.   - The bloom filter is changed once a day, so users will never use more than 1 MB of traffic per day if the download and local caching logic is implemented correctly. 3. When the user visits a domain, check if the domain is present on the bloom filter or the `recentlyAdded` list from the blocklist metadata and isn\'t present on the `recentlyRemoved` list. If this is the case, block the user from visiting the website.  Browser extensions and React Native apps can use the Javascript package [@blowfish/blocklist](https://www.npmjs.com/package/@blowfishxyz/blocklist) to implement the outlined logic. For example:  ```js // Regular updates import { fetchDomainBlocklist, fetchDomainBlocklistBloomFilter } from \'@blowfishxyz/blocklist\';  const blocklist = await fetchDomainBlocklist(apiConfig); [...] // save blocklist.recentlyAdded and blocklist.recentlyRemoved to a local database const storedHash = [...]; // fetch it from your storage if (storedHash != blocklist.bloomFilter.hash) {     const bloomFilter = await fetchDomainBlocklistBloomFilter(blocklist.bloomFilter.url);     [...] // save bloomFilter to a local database     [...] // save bloomFilter.hash or blocklist.bloomFilter.hash to a local database }  // Lookups import { scanDomain, Action } from \'@blowfishxyz/blocklist\';  const recentlyAdded = [...]; // get from storage const recentlyRemoved = [...]; // get from storage const bloomFilter = [...]; // get from storage  const action = scanDomain(     bloomFilter,     recentlyAdded,     recentlyRemoved,     \"https://example.com/\" );  if (action === Action.BLOCK) {     // block the domain } ```  For more information on how to use the package, please refer to the NPM package description.  ### Priority lists The API aggregates different proprietary Blowfish lists and ecosystem lists. In some cases, different lists may have conflicting data on whether to block or allow a domain. By providing `priorityBlockLists` and `priorityAllowLists`, you can override the results in these cases.  If a domain is blocked by one of the lists that Blowfish aggregates, but included in one of `priorityAllowLists`, it will not be included in the blocklist snapshot. Conversely, if a domain is allow-listed by one of the lists that Blowfish aggregates, but is included in one of `priorityBlockLists`, it will be included in the snapshot.  This is an advanced feature for integrators who want granular control over blocking domains. By default, the API uses internal list priority heuristics designed for most use cases. The Blowfish team continuously monitors the quality of the underlying blocklists and removes incorrect entries.  Blowfish can also ingest custom blocklists and allowlists. If you have a custom list, you can reach out to the Blowfish team and provide a publicly available URL with the domains in a .txt format.
   * Blocklist
   */
  async downloadBlocklist(
    requestParameters: DownloadBlocklistOperationRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<DownloadBlocklist200Response> {
    const response = await this.downloadBlocklistRaw(
      requestParameters,
      initOverrides
    );
    return await response.value();
  }
}
