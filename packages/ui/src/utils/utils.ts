import type { SignTypedDataPayload } from "@blowfishxyz/api-client";

export enum RequestType {
  Transaction = "TRANSACTION",
  SignTypedData = "SIGN_TYPED_DATA",
  SignMessage = "SIGN_MESSAGE",
  BatchRequests = "BATCH_REQUESTS",
  UserDecision = "USER_DECISION",
  BlowfishOptions = "BLOWFISH_OPTIONS",
  SetBlowfishOptions = "SET_BLOWFISH_OPTIONS",
  GetRequestToScan = "GET_REQUEST_TO_SCAN",
  MessageAck = "BLOWFISH_MESSAGE_ACK",
  BlockDomain = "BLOCK_DOMAIN",
  AllowlistedDomains = "ALLOWLISTED_DOMAINS",
}

interface BaseRequest {
  type: RequestType;
  chainId: string;
  userAccount: string;
}

export interface TypedDataV1Field {
  type: string;
  name: string;
  value: unknown;
}

export enum SignTypedDataVersion {
  V1 = "V1",
  V3 = "V3",
  V4 = "V4",
}

export interface TypedDataV1Field {
  type: string;
  name: string;
  value: unknown;
}

type SignTypedDataPayloadV1 = {
  payload: TypedDataV1Field[];
  signTypedDataVersion: SignTypedDataVersion.V1;
};

type SignTypedDataPayloadV3V4 = {
  payload: SignTypedDataPayload;
  signTypedDataVersion: SignTypedDataVersion.V3 | SignTypedDataVersion.V4;
};

export type SupportedSignTypedDataPayloadVersion = BaseRequest &
  (SignTypedDataPayloadV1 | SignTypedDataPayloadV3V4);

export type SignTypedDataRequest = BaseRequest & {
  type: RequestType.SignTypedData;
  isImpersonatingWallet?: boolean;
  extensionVersion: string;
} & SupportedSignTypedDataPayloadVersion;

// https://github.com/0xProject/EIPs/blob/21abe254fe0452d8583d5b132b1d7be87c0439ca/EIPS/eip-signTypedData.md
// NOTE: this is the old version of the signTypedData spec, since v1 is not EIP712 compliant
export const transformTypedDataV1FieldsToEIP712 = (
  data: TypedDataV1Field[],
  chainId: string
) => {
  const schema: SignTypedDataPayload = {
    domain: {
      chainId,
    },
    //NOTE: set the primary type as message since the signTypeData v1 does not conform to the Blowfish API
    primaryType: "message",
    types: {
      message: [],
    },
    message: {},
  };

  const values: { [key: string]: unknown } = {};

  data.forEach(({ type, name, value }) => {
    schema.types.message.push({ name, type });
    values[name] = value;
  });

  return {
    types: schema.types,
    primaryType: schema.primaryType,
    domain: schema.domain,
    message: values,
  };
};
