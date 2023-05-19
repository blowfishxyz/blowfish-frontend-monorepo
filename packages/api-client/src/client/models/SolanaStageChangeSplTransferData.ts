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
import type { Diff } from './Diff';
import {
    DiffFromJSON,
    DiffFromJSONTyped,
    DiffToJSON,
} from './Diff';
import type { LegacyAssetPrice } from './LegacyAssetPrice';
import {
    LegacyAssetPriceFromJSON,
    LegacyAssetPriceFromJSONTyped,
    LegacyAssetPriceToJSON,
} from './LegacyAssetPrice';
import type { MetaplexTokenStandard } from './MetaplexTokenStandard';
import {
    MetaplexTokenStandardFromJSON,
    MetaplexTokenStandardFromJSONTyped,
    MetaplexTokenStandardToJSON,
} from './MetaplexTokenStandard';

/**
 * 
 * @export
 * @interface SolanaStageChangeSplTransferData
 */
export interface SolanaStageChangeSplTransferData {
    /**
     * SPL token symbol
     * @type {string}
     * @memberof SolanaStageChangeSplTransferData
     */
    symbol: string;
    /**
     * SPL token name
     * @type {string}
     * @memberof SolanaStageChangeSplTransferData
     */
    name: string;
    /**
     * The SPL token mint program address
     * @type {string}
     * @memberof SolanaStageChangeSplTransferData
     */
    mint: string;
    /**
     * SPL token decimals
     * @type {number}
     * @memberof SolanaStageChangeSplTransferData
     */
    decimals: number;
    /**
     * 
     * @type {Diff}
     * @memberof SolanaStageChangeSplTransferData
     */
    diff: Diff;
    /**
     * SPL token supply
     * @type {number}
     * @memberof SolanaStageChangeSplTransferData
     */
    supply: number;
    /**
     * 
     * @type {MetaplexTokenStandard}
     * @memberof SolanaStageChangeSplTransferData
     */
    metaplexTokenStandard: MetaplexTokenStandard;
    /**
     * 
     * @type {LegacyAssetPrice}
     * @memberof SolanaStageChangeSplTransferData
     */
    assetPrice: LegacyAssetPrice | null;
}

/**
 * Check if a given object implements the SolanaStageChangeSplTransferData interface.
 */
export function instanceOfSolanaStageChangeSplTransferData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "symbol" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "mint" in value;
    isInstance = isInstance && "decimals" in value;
    isInstance = isInstance && "diff" in value;
    isInstance = isInstance && "supply" in value;
    isInstance = isInstance && "metaplexTokenStandard" in value;
    isInstance = isInstance && "assetPrice" in value;

    return isInstance;
}

export function SolanaStageChangeSplTransferDataFromJSON(json: any): SolanaStageChangeSplTransferData {
    return SolanaStageChangeSplTransferDataFromJSONTyped(json, false);
}

export function SolanaStageChangeSplTransferDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): SolanaStageChangeSplTransferData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'symbol': json['symbol'],
        'name': json['name'],
        'mint': json['mint'],
        'decimals': json['decimals'],
        'diff': DiffFromJSON(json['diff']),
        'supply': json['supply'],
        'metaplexTokenStandard': MetaplexTokenStandardFromJSON(json['metaplexTokenStandard']),
        'assetPrice': LegacyAssetPriceFromJSON(json['assetPrice']),
    };
}

export function SolanaStageChangeSplTransferDataToJSON(value?: SolanaStageChangeSplTransferData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'symbol': value.symbol,
        'name': value.name,
        'mint': value.mint,
        'decimals': value.decimals,
        'diff': DiffToJSON(value.diff),
        'supply': value.supply,
        'metaplexTokenStandard': MetaplexTokenStandardToJSON(value.metaplexTokenStandard),
        'assetPrice': LegacyAssetPriceToJSON(value.assetPrice),
    };
}

