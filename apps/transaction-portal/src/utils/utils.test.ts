import { DappRequest, Message } from "@blowfish/utils/types";
import {
  checkVersionAndTransformMessage,
  EXTENSION_VERSION_TRANSFORMERS,
  getTransformersForVersion,
  MessageError,
  TransformFunction,
} from "./utils";

describe("checkVersionAndTransformMessage", () => {
  const messageWithSupportedVersion = {
    id: "b64e19985bcaf6bb842fd7f9507611a37ab44786",
    data: {
      payload: {
        types: {
          EIP712Domain: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "version",
              type: "string",
            },
            {
              name: "chainId",
              type: "uint256",
            },
            {
              name: "verifyingContract",
              type: "address",
            },
          ],
          Person: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "wallet",
              type: "address",
            },
          ],
          Mail: [
            {
              name: "from",
              type: "Person",
            },
            {
              name: "to",
              type: "Person",
            },
            {
              name: "contents",
              type: "string",
            },
          ],
        },
        primaryType: "Mail",
        domain: {
          name: "Ether Mail",
          version: "1",
          chainId: 5,
          verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
        },
        message: {
          from: {
            name: "Cow",
            wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
          },
          to: {
            name: "Bob",
            wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
          },
          contents: "Hello, Bob!",
        },
      },
      signTypedDataVersion: "V3",
      userAccount: "0x2dB22f5983C42DAFa970461C809a2d853A44f5f3",
      chainId: "5",
      type: "SIGN_TYPED_DATA",
      extensionVersion: "0.0.10",
      isImpersonatingWallet: false,
    },
    type: "SIGN_TYPED_DATA",
    origin: "https://metamask.github.io",
  } as Message<DappRequest["type"], DappRequest>;
  test("should throw NO_MESSAGE if the message is empty", () => {
    const emptyMessage = {} as Message<DappRequest["type"], DappRequest>;
    expect(() => checkVersionAndTransformMessage(emptyMessage)).toThrowError(
      MessageError.NO_MESSAGE
    );
  });

  test("should throw OUTDATED_EXTENSION if the the extensionVersion is outdated", () => {
    const outdatedExtensionMessage = {
      ...messageWithSupportedVersion,
      data: {
        ...messageWithSupportedVersion.data,
        extensionVersion: "0.0.1",
      },
    } as Message<DappRequest["type"], DappRequest>;
    expect(() =>
      checkVersionAndTransformMessage(outdatedExtensionMessage)
    ).toThrowError(MessageError.OUTDATED_EXTENSION);
  });

  test("should return the same request if no transformation is needed", () => {
    const transformedMessage = checkVersionAndTransformMessage(
      messageWithSupportedVersion
    );
    expect(transformedMessage).toEqual(messageWithSupportedVersion);
  });

  // dummy transformation
  test("should transform the request if a transformer is available", () => {
    const transformerKey = messageWithSupportedVersion.data.extensionVersion;
    const transformedMessage = {
      ...messageWithSupportedVersion,
      data: {
        ...messageWithSupportedVersion.data,
        payload: {
          ...messageWithSupportedVersion.data.payload,
          // dummy transformation
        },
        prop1: "value1",
        prop2: "value2",
      },
    };
    const transformer1: TransformFunction = (
      msg: Message<DappRequest["type"], DappRequest>
    ) => ({
      ...msg,
      data: {
        ...msg.data,
        prop1: "value1",
      },
    });

    const transformer2: TransformFunction = (
      msg: Message<DappRequest["type"], DappRequest>
    ) => ({
      ...msg,
      data: {
        ...msg.data,
        prop2: "value2",
      },
    });

    // Set up transformers for version
    EXTENSION_VERSION_TRANSFORMERS[transformerKey] = [
      transformer1,
      transformer2,
    ];

    expect(
      checkVersionAndTransformMessage(messageWithSupportedVersion)
    ).toEqual(transformedMessage);
  });
});
describe("getTransformersForVersion", () => {
  afterEach(() => {
    delete EXTENSION_VERSION_TRANSFORMERS["1.0.0"];
    delete EXTENSION_VERSION_TRANSFORMERS["2.0.0"];
    delete EXTENSION_VERSION_TRANSFORMERS["3.0.0"];
  });

  it("should return null if no transformers are available", () => {
    jest.mock("./utils", () => ({
      EXTENSION_VERSION_TRANSFORMERS: {},
    }));
    const result = getTransformersForVersion("1.0.0");
    expect(result).toBeNull();
  });

  it("should return the transformers for the specified version", () => {
    const transformer1 = jest.fn((msg) => msg);
    const transformer2 = jest.fn((msg) => ({
      ...msg,
      transform: "transform2",
    }));
    EXTENSION_VERSION_TRANSFORMERS["1.0.0"] = [transformer1];
    EXTENSION_VERSION_TRANSFORMERS["2.0.0"] = [transformer2];

    const result = getTransformersForVersion("2.0.0");
    expect(result).toEqual([transformer2]);
  });

  it("should return the transformers for the nearest version", () => {
    const transformer1 = jest.fn((msg) => msg);
    const transformer2 = jest.fn((msg) => ({
      ...msg,
      transform: "transform2",
    }));
    const transformer3 = jest.fn((msg) => ({
      ...msg,
      transf3: "transf3",
    }));
    EXTENSION_VERSION_TRANSFORMERS["1.0.0"] = [transformer1];
    EXTENSION_VERSION_TRANSFORMERS["2.0.0"] = [transformer2];
    EXTENSION_VERSION_TRANSFORMERS["3.0.0"] = [transformer3];

    const result = getTransformersForVersion("2.5.0");
    expect(result).toEqual([transformer3]);
  });
});

export {};
