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
 * @interface EvmSignMessage
 */
export interface EvmSignMessage {
    /**
     * 
     * @type {string}
     * @memberof EvmSignMessage
     */
    kind: EvmSignMessageKindEnum;
    /**
     * The hex encoded eth_sign message that the dapp is proposing the user to sign.
     * @type {string}
     * @memberof EvmSignMessage
     */
    rawMessage: string;
}


/**
 * @export
 */
export const EvmSignMessageKindEnum = {
    SignMessage: 'SIGN_MESSAGE'
} as const;
export type EvmSignMessageKindEnum = typeof EvmSignMessageKindEnum[keyof typeof EvmSignMessageKindEnum];


/**
 * Check if a given object implements the EvmSignMessage interface.
 */
export function instanceOfEvmSignMessage(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "kind" in value;
    isInstance = isInstance && "rawMessage" in value;

    return isInstance;
}

export function EvmSignMessageFromJSON(json: any): EvmSignMessage {
    return EvmSignMessageFromJSONTyped(json, false);
}

export function EvmSignMessageFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvmSignMessage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'kind': json['kind'],
        'rawMessage': json['rawMessage'],
    };
}

export function EvmSignMessageToJSON(value?: EvmSignMessage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'kind': value.kind,
        'rawMessage': value.rawMessage,
    };
}

