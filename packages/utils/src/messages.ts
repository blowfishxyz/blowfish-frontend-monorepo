import { EIP712Payload, SignTypedDataPayload } from "./types";

// https://github.com/0xProject/EIPs/blob/21abe254fe0452d8583d5b132b1d7be87c0439ca/EIPS/eip-signTypedData.md
export const transformToEIP712 = (data: EIP712Payload[], chainId: string) => {
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
