import { EIP712Payload, SignTypedDataPayload } from "../types";

const transformToEIP712 = (data: EIP712Payload[], chainId: number) => {
  const schema: SignTypedDataPayload = {
    domain: {
      chainId,
    },
    primaryType: "message",
    types: {
      message: [],
    },
    message: {},
  };

  const fieldTypes: { [key: string]: string } = {
    string: "string",
    uint8: "uint8",
    uint16: "uint16",
    uint32: "uint32",
    uint64: "uint64",
    uint128: "uint128",
    uint256: "uint256",
    int8: "int8",
    int16: "int16",
    int32: "int32",
    int64: "int64",
    int128: "int128",
    int256: "int256",
    bytes: "bytes",
    bool: "bool",
    address: "address",
  };

  const values: { [key: string]: unknown } = {};

  data.forEach(({ type, name, value }) => {
    const fieldType = fieldTypes[type];
    if (!fieldType) {
      throw new Error(`Invalid type: ${type}`);
    }
    schema.types.message.push({ name, type: fieldType });
    values[name] = value;
  });

  return {
    types: schema.types,
    primaryType: schema.primaryType,
    domain: schema.domain,
    message: values,
  };
};

export default transformToEIP712;
