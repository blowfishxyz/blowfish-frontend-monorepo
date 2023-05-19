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
import type { EvmStateChangeErc20PermitData } from './EvmStateChangeErc20PermitData';
import {
    EvmStateChangeErc20PermitDataFromJSON,
    EvmStateChangeErc20PermitDataFromJSONTyped,
    EvmStateChangeErc20PermitDataToJSON,
} from './EvmStateChangeErc20PermitData';

/**
 * ERC20 token permit message
 * @export
 * @interface EvmStateChangeErc20Permit
 */
export interface EvmStateChangeErc20Permit {
    /**
     * What kind of state change this object is
     * @type {string}
     * @memberof EvmStateChangeErc20Permit
     */
    kind: EvmStateChangeErc20PermitKindEnum;
    /**
     * 
     * @type {EvmStateChangeErc20PermitData}
     * @memberof EvmStateChangeErc20Permit
     */
    data: EvmStateChangeErc20PermitData;
}


/**
 * @export
 */
export const EvmStateChangeErc20PermitKindEnum = {
    Erc20Permit: 'ERC20_PERMIT'
} as const;
export type EvmStateChangeErc20PermitKindEnum = typeof EvmStateChangeErc20PermitKindEnum[keyof typeof EvmStateChangeErc20PermitKindEnum];


/**
 * Check if a given object implements the EvmStateChangeErc20Permit interface.
 */
export function instanceOfEvmStateChangeErc20Permit(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "kind" in value;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function EvmStateChangeErc20PermitFromJSON(json: any): EvmStateChangeErc20Permit {
    return EvmStateChangeErc20PermitFromJSONTyped(json, false);
}

export function EvmStateChangeErc20PermitFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvmStateChangeErc20Permit {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'kind': json['kind'],
        'data': EvmStateChangeErc20PermitDataFromJSON(json['data']),
    };
}

export function EvmStateChangeErc20PermitToJSON(value?: EvmStateChangeErc20Permit | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'kind': value.kind,
        'data': EvmStateChangeErc20PermitDataToJSON(value.data),
    };
}

