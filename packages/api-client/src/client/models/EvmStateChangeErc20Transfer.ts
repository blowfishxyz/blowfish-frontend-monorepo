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
import type { EvmStateChangeErc20TransferData } from './EvmStateChangeErc20TransferData';
import {
    EvmStateChangeErc20TransferDataFromJSON,
    EvmStateChangeErc20TransferDataFromJSONTyped,
    EvmStateChangeErc20TransferDataToJSON,
} from './EvmStateChangeErc20TransferData';

/**
 * ERC20 token transfers
 * @export
 * @interface EvmStateChangeErc20Transfer
 */
export interface EvmStateChangeErc20Transfer {
    /**
     * What kind of state change this object is
     * @type {string}
     * @memberof EvmStateChangeErc20Transfer
     */
    kind: EvmStateChangeErc20TransferKindEnum;
    /**
     * 
     * @type {EvmStateChangeErc20TransferData}
     * @memberof EvmStateChangeErc20Transfer
     */
    data: EvmStateChangeErc20TransferData;
}


/**
 * @export
 */
export const EvmStateChangeErc20TransferKindEnum = {
    Erc20Transfer: 'ERC20_TRANSFER'
} as const;
export type EvmStateChangeErc20TransferKindEnum = typeof EvmStateChangeErc20TransferKindEnum[keyof typeof EvmStateChangeErc20TransferKindEnum];


/**
 * Check if a given object implements the EvmStateChangeErc20Transfer interface.
 */
export function instanceOfEvmStateChangeErc20Transfer(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "kind" in value;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function EvmStateChangeErc20TransferFromJSON(json: any): EvmStateChangeErc20Transfer {
    return EvmStateChangeErc20TransferFromJSONTyped(json, false);
}

export function EvmStateChangeErc20TransferFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvmStateChangeErc20Transfer {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'kind': json['kind'],
        'data': EvmStateChangeErc20TransferDataFromJSON(json['data']),
    };
}

export function EvmStateChangeErc20TransferToJSON(value?: EvmStateChangeErc20Transfer | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'kind': value.kind,
        'data': EvmStateChangeErc20TransferDataToJSON(value.data),
    };
}

