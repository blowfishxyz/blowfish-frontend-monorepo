import { TypedDataV1Field, SignTypedDataPayload } from "./types";

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
