import { transformToEIP712 } from "./messages";
import { EIP712Payload } from "./types";

describe("transformToEIP712", () => {
  test("should transform data to EIP712 format correctly", () => {
    const data: EIP712Payload[] = [
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

    expect(transformToEIP712(data, chainId)).toEqual(expectedOutput);
  });
});
