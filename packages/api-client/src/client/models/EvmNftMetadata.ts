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
 * Metadata associated with the NFT
 * @export
 * @interface EvmNftMetadata
 */
export interface EvmNftMetadata {
    /**
     * 
     * @type {string}
     * @memberof EvmNftMetadata
     */
    rawImageUrl: string;
}

/**
 * Check if a given object implements the EvmNftMetadata interface.
 */
export function instanceOfEvmNftMetadata(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "rawImageUrl" in value;

    return isInstance;
}

export function EvmNftMetadataFromJSON(json: any): EvmNftMetadata {
    return EvmNftMetadataFromJSONTyped(json, false);
}

export function EvmNftMetadataFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvmNftMetadata {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'rawImageUrl': json['rawImageUrl'],
    };
}

export function EvmNftMetadataToJSON(value?: EvmNftMetadata | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'rawImageUrl': value.rawImageUrl,
    };
}

