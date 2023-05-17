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
import type { SolanaStateChangeSplApprovalData } from './SolanaStateChangeSplApprovalData';
import {
    SolanaStateChangeSplApprovalDataFromJSON,
    SolanaStateChangeSplApprovalDataFromJSONTyped,
    SolanaStateChangeSplApprovalDataToJSON,
} from './SolanaStateChangeSplApprovalData';

/**
 * Approval request to transfer user's tokens
 * @export
 * @interface SolanaStateChangeSplApproval
 */
export interface SolanaStateChangeSplApproval {
    /**
     * What kind of state change this object is
     * @type {string}
     * @memberof SolanaStateChangeSplApproval
     */
    kind: SolanaStateChangeSplApprovalKindEnum;
    /**
     * 
     * @type {SolanaStateChangeSplApprovalData}
     * @memberof SolanaStateChangeSplApproval
     */
    data: SolanaStateChangeSplApprovalData;
}


/**
 * @export
 */
export const SolanaStateChangeSplApprovalKindEnum = {
    SplApproval: 'SPL_APPROVAL'
} as const;
export type SolanaStateChangeSplApprovalKindEnum = typeof SolanaStateChangeSplApprovalKindEnum[keyof typeof SolanaStateChangeSplApprovalKindEnum];


/**
 * Check if a given object implements the SolanaStateChangeSplApproval interface.
 */
export function instanceOfSolanaStateChangeSplApproval(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "kind" in value;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function SolanaStateChangeSplApprovalFromJSON(json: any): SolanaStateChangeSplApproval {
    return SolanaStateChangeSplApprovalFromJSONTyped(json, false);
}

export function SolanaStateChangeSplApprovalFromJSONTyped(json: any, ignoreDiscriminator: boolean): SolanaStateChangeSplApproval {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'kind': json['kind'],
        'data': SolanaStateChangeSplApprovalDataFromJSON(json['data']),
    };
}

export function SolanaStateChangeSplApprovalToJSON(value?: SolanaStateChangeSplApproval | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'kind': value.kind,
        'data': SolanaStateChangeSplApprovalDataToJSON(value.data),
    };
}

