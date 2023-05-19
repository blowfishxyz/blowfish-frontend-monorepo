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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface RequestMetadata
 */
export interface RequestMetadata {
    /**
     * DApp domain proposing these transactions
     * @type {string}
     * @memberof RequestMetadata
     */
    origin: string;
}

/**
 * Check if a given object implements the RequestMetadata interface.
 */
export function instanceOfRequestMetadata(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "origin" in value;

    return isInstance;
}

export function RequestMetadataFromJSON(json: any): RequestMetadata {
    return RequestMetadataFromJSONTyped(json, false);
}

export function RequestMetadataFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestMetadata {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'origin': json['origin'],
    };
}

export function RequestMetadataToJSON(value?: RequestMetadata | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'origin': value.origin,
    };
}

