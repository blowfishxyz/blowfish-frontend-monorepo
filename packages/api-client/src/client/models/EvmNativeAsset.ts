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
import type { AssetPrice } from './AssetPrice';
import {
    AssetPriceFromJSON,
    AssetPriceFromJSONTyped,
    AssetPriceToJSON,
} from './AssetPrice';

/**
 * 
 * @export
 * @interface EvmNativeAsset
 */
export interface EvmNativeAsset {
    /**
     * The contract address of the asset
     * @type {string}
     * @memberof EvmNativeAsset
     */
    address: string;
    /**
     * The symbol of the asset
     * @type {string}
     * @memberof EvmNativeAsset
     */
    symbol: string;
    /**
     * The name of the asset
     * @type {string}
     * @memberof EvmNativeAsset
     */
    name: string;
    /**
     * The number of decimal places used by the asset. Always true for the native asset.
     * @type {number}
     * @memberof EvmNativeAsset
     */
    decimals: number;
    /**
     * Whether the asset is verified as safe
     * @type {boolean}
     * @memberof EvmNativeAsset
     */
    verified: EvmNativeAssetVerifiedEnum;
    /**
     * The URL of the asset's image. Can be `null`.
     * @type {string}
     * @memberof EvmNativeAsset
     */
    imageUrl: string | null;
    /**
     * 
     * @type {AssetPrice}
     * @memberof EvmNativeAsset
     */
    price: AssetPrice | null;
}


/**
 * @export
 */
export const EvmNativeAssetVerifiedEnum = {
    True: true
} as const;
export type EvmNativeAssetVerifiedEnum = typeof EvmNativeAssetVerifiedEnum[keyof typeof EvmNativeAssetVerifiedEnum];


/**
 * Check if a given object implements the EvmNativeAsset interface.
 */
export function instanceOfEvmNativeAsset(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "address" in value;
    isInstance = isInstance && "symbol" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "decimals" in value;
    isInstance = isInstance && "verified" in value;
    isInstance = isInstance && "imageUrl" in value;
    isInstance = isInstance && "price" in value;

    return isInstance;
}

export function EvmNativeAssetFromJSON(json: any): EvmNativeAsset {
    return EvmNativeAssetFromJSONTyped(json, false);
}

export function EvmNativeAssetFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvmNativeAsset {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'address': json['address'],
        'symbol': json['symbol'],
        'name': json['name'],
        'decimals': json['decimals'],
        'verified': json['verified'],
        'imageUrl': json['imageUrl'],
        'price': AssetPriceFromJSON(json['price']),
    };
}

export function EvmNativeAssetToJSON(value?: EvmNativeAsset | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'address': value.address,
        'symbol': value.symbol,
        'name': value.name,
        'decimals': value.decimals,
        'verified': value.verified,
        'imageUrl': value.imageUrl,
        'price': AssetPriceToJSON(value.price),
    };
}

