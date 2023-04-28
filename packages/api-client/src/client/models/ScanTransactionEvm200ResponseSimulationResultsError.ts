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

import {
  EvmSimulationFailedError,
  EvmSimulationFailedErrorFromJSON,
  EvmSimulationFailedErrorFromJSONTyped,
  EvmSimulationFailedErrorToJSON,
  instanceOfEvmSimulationFailedError,
} from "./EvmSimulationFailedError";
import {
  EvmTransactionError,
  EvmTransactionErrorFromJSON,
  EvmTransactionErrorFromJSONTyped,
  EvmTransactionErrorToJSON,
  instanceOfEvmTransactionError,
} from "./EvmTransactionError";
import {
  EvmTransactionRevertedError,
  EvmTransactionRevertedErrorFromJSON,
  EvmTransactionRevertedErrorFromJSONTyped,
  EvmTransactionRevertedErrorToJSON,
  instanceOfEvmTransactionRevertedError,
} from "./EvmTransactionRevertedError";
import {
  EvmUnknownError,
  EvmUnknownErrorFromJSON,
  EvmUnknownErrorFromJSONTyped,
  EvmUnknownErrorToJSON,
  instanceOfEvmUnknownError,
} from "./EvmUnknownError";

// import {
//     object,
//     instanceOfobject,
//     objectFromJSON,
//     objectFromJSONTyped,
//     objectToJSON,
// } from './object';

/**
 * @type ScanTransactionEvm200ResponseSimulationResultsError
 * A error object which includes the parsed simulation error encountered (if any). Can be `null`.
 * @export
 */
export type ScanTransactionEvm200ResponseSimulationResultsError =
  | ({ kind: "SIMULATION_FAILED" } & EvmSimulationFailedError)
  | ({ kind: "TRANSACTION_ERROR" } & EvmTransactionError)
  | ({ kind: "TRANSACTION_REVERTED" } & EvmTransactionRevertedError)
  | ({ kind: "UNKNOWN_ERROR" } & EvmUnknownError);

export function ScanTransactionEvm200ResponseSimulationResultsErrorFromJSON(
  json: any
): ScanTransactionEvm200ResponseSimulationResultsError {
  return ScanTransactionEvm200ResponseSimulationResultsErrorFromJSONTyped(
    json,
    false
  );
}

export function ScanTransactionEvm200ResponseSimulationResultsErrorFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): ScanTransactionEvm200ResponseSimulationResultsError {
  if (json === undefined || json === null) {
    return json;
  }
  switch (json["kind"]) {
    case "SIMULATION_FAILED":
      return {
        ...EvmSimulationFailedErrorFromJSONTyped(json, true),
        kind: "SIMULATION_FAILED",
      };
    case "TRANSACTION_ERROR":
      return {
        ...EvmTransactionErrorFromJSONTyped(json, true),
        kind: "TRANSACTION_ERROR",
      };
    case "TRANSACTION_REVERTED":
      return {
        ...EvmTransactionRevertedErrorFromJSONTyped(json, true),
        kind: "TRANSACTION_REVERTED",
      };
    case "UNKNOWN_ERROR":
      return {
        ...EvmUnknownErrorFromJSONTyped(json, true),
        kind: "UNKNOWN_ERROR",
      };
    default:
      throw new Error(
        `No variant of ScanTransactionEvm200ResponseSimulationResultsError exists with 'kind=${json["kind"]}'`
      );
  }
}

export function ScanTransactionEvm200ResponseSimulationResultsErrorToJSON(
  value?: ScanTransactionEvm200ResponseSimulationResultsError | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  switch (value["kind"]) {
    case "SIMULATION_FAILED":
      return EvmSimulationFailedErrorToJSON(value);
    case "TRANSACTION_ERROR":
      return EvmTransactionErrorToJSON(value);
    case "TRANSACTION_REVERTED":
      return EvmTransactionRevertedErrorToJSON(value);
    case "UNKNOWN_ERROR":
      return EvmUnknownErrorToJSON(value);
    default:
      throw new Error(
        `No variant of ScanTransactionEvm200ResponseSimulationResultsError exists with 'kind=${value["kind"]}'`
      );
  }
}
