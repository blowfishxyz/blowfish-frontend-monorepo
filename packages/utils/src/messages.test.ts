import { transformTypedDataV1FieldsToEIP712 } from "./messages";
import { TypedDataV1Field } from "./types";

describe("transformTypedDataV1FieldsToEIP712", () => {
  test("should transform data to EIP712 format correctly", () => {
    const data: TypedDataV1Field[] = [
      { name: "name", type: "string", value: "John" },
      { name: "age", type: "uint32", value: "28" },
      {
        name: "address",
        type: "address",
        value: "0x1234567890123456789012345678901234567890",
      },
    ];
    const chainId = "1";
    const expectedOutput = {
      types: {
        message: [
          { name: "name", type: "string" },
          { name: "age", type: "uint32" },
          { name: "address", type: "address" },
        ],
      },
      primaryType: "message",
      domain: {
        chainId: "1",
      },
      message: {
        name: "John",
        age: "28",
        address: "0x1234567890123456789012345678901234567890",
      },
    };

    expect(transformTypedDataV1FieldsToEIP712(data, chainId)).toEqual(
      expectedOutput
    );
  });
});
