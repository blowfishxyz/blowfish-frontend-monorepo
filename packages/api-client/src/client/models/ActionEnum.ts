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


/**
 * An enum value specifying the suggested action for a wallet to take.
 * Possible values:
 *   - `BLOCK`: Show the user a block screen instead of the signing UI since this is highly likely to be a malicious transaction. We suggest still having a greyed out link allowing the user to proceed if they really think they know better
 *   - `WARN`: Show the user the supplied warnings.
 *   - `NONE`: Show the signing UI without modification.
 * @export
 */
export const ActionEnum = {
    None: 'NONE',
    Block: 'BLOCK',
    Warn: 'WARN'
} as const;
export type ActionEnum = typeof ActionEnum[keyof typeof ActionEnum];


export function ActionEnumFromJSON(json: any): ActionEnum {
    return ActionEnumFromJSONTyped(json, false);
}

export function ActionEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActionEnum {
    return json as ActionEnum;
}

export function ActionEnumToJSON(value?: ActionEnum | null): any {
    return value as any;
}

