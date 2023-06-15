import type { WindowPostMessageStream } from "@metamask/post-message-stream";
import { EthereumProviderError } from "eth-rpc-errors";
import type { providers } from "ethers";
import { Duplex } from "node:stream";

const sendTransactionMock = {
  method: "eth_sendTransaction",
  params: [
    {
      gas: "0x86b2",
      from: "0xd854343f41b2138b686f2d3ba38402a9f7fb4337",
      to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      data: "0xa9059cbb000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000002386f26fc10000",
    },
  ],
};

const signTypedDataV4Mock = {
  method: "eth_signTypedData_v4",
  params: [
    "0xd854343f41b2138b686f2d3ba38402a9f7fb4337",
    '{"types":{"Order":[{"name":"trader","type":"address"},{"name":"side","type":"uint8"},{"name":"matchingPolicy","type":"address"},{"name":"collection","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"amount","type":"uint256"},{"name":"paymentToken","type":"address"},{"name":"price","type":"uint256"},{"name":"listingTime","type":"uint256"},{"name":"expirationTime","type":"uint256"},{"name":"fees","type":"Fee[]"},{"name":"salt","type":"uint256"},{"name":"extraParams","type":"bytes"},{"name":"nonce","type":"uint256"}],"Fee":[{"name":"rate","type":"uint16"},{"name":"recipient","type":"address"}],"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}]},"domain":{"name":"Blur Exchange","version":"1.0","chainId":"1","verifyingContract":"0x000000000000ad05ccc4f10045630fb830b95127"},"primaryType":"Order","message":{"trader":"0xd854343f41b2138b686f2d3ba38402a9f7fb4337","side":"1","matchingPolicy":"0x0000000000dab4a563819e8fd93dba3b25bc3495","collection":"0x5531cc6980831ee1fa9b138892d681c5de4eab90","tokenId":"14","amount":"1","paymentToken":"0x0000000000000000000000000000000000000000","price":"0","listingTime":"1680564070","expirationTime":"9999999999","fees":[],"salt":"222828092082568175740341765420535858609","extraParams":"0x01","nonce":"0"}}',
  ],
};

const ethSignMock = {
  method: "eth_sign",
  params: [
    "0xd854343f41b2138b686f2d3ba38402a9f7fb4337",
    "0x307834306163313465663238643335666234353430653063643039353031323362333738323234643335383565633838376332366637613531306461353434353532",
  ],
};

const personalSignMock = {
  method: "personal_sign",
  params: [
    "0x492077616e7420746f206c6f67696e206f6e2052617269626c6520617420323032332d30362d31345431323a34363a31362e3633355a2e204920616363657074207468652052617269626c65205465726d73206f6620536572766963652068747470733a2f2f7374617469632e72617269626c652e636f6d2f7465726d732e70646620616e64204920616d206174206c65617374203133207965617273206f6c642e",
    "0xd854343f41b2138b686f2d3ba38402a9f7fb4337",
    null,
  ],
};

const mockId = "mock-id-213";

jest.mock("object-hash", () => jest.fn(() => mockId));

describe("request proxy", () => {
  beforeAll(() => {
    process.env = {
      PLASMO_PUBLIC_BLOWFISH_WALLET_IMPERSONATION_AVAILABLE: "true",
    } as any;
  });

  test(`intercepts "wallet_requestPermissions" when impersonating a wallet`, async () => {
    const mockAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
    const { provider, forwardToWallet, stream } = setupTest({});

    const { requestHandler } = await import("~utils/proxy-handlers");

    const res = await requestHandler({
      request: { method: "wallet_requestPermissions" },
      provider,
      forwardToWallet,
      impersonatingAddress: mockAddress,
      stream,
    });

    expect(res).toEqual([
      {
        type: "restrictReturnedAccounts",
        value: [mockAddress],
      },
    ]);
  });

  test(`intercepts "eth_requestAccounts" and "eth_accounts" when impersonating a wallet`, async () => {
    const { provider, forwardToWallet, stream } = setupTest({});

    const mockAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

    const { requestHandler } = await import("~utils/proxy-handlers");

    const res1 = await requestHandler({
      request: { method: "eth_requestAccounts" },
      provider,
      forwardToWallet,
      impersonatingAddress: mockAddress,
      stream,
    });

    expect(res1).toEqual([mockAddress]);

    const res2 = await requestHandler({
      request: { method: "eth_accounts" },
      provider,
      forwardToWallet,
      impersonatingAddress: mockAddress,
      stream,
    });

    expect(res2).toEqual([mockAddress]);
  });

  test(`forwards to wallet any request that is not intercepted`, async () => {
    const { provider, forwardToWallet, stream } = setupTest({});
    const { requestHandler } = await import("~utils/proxy-handlers");

    await requestHandler({
      request: { method: "eth_chainId" },
      provider,
      forwardToWallet,
      stream,
      impersonatingAddress: undefined,
    });

    await requestHandler({
      request: { method: "eth_accounts" },
      provider,
      forwardToWallet,
      stream,
      impersonatingAddress: undefined,
    });

    expect(forwardToWallet).toBeCalledTimes(2);
  });

  describe(`when intercepts batch requests`, () => {
    test(`returns data if approved through Blowfish`, async () => {
      const request = [sendTransactionMock, sendTransactionMock];
      const mockResult = "mock-result-approve-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: true,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");
      const res = await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });
      expect(res).toEqual(mockResult);
    });

    test(`throws an error if canceled through Blowfish`, async () => {
      const request = [sendTransactionMock, sendTransactionMock];
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: false,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      try {
        await requestHandler({
          request,
          provider,
          forwardToWallet,
          impersonatingAddress: undefined,
          stream,
        });
      } catch (err) {
        if (err instanceof EthereumProviderError) {
          expect(err.message).toEqual("User denied transaction signature.");
          return;
        }
        throw new Error("Should throw EthereumProviderError");
      }
    });

    test(`forwards to wallet if unsuported chain`, async () => {
      const request = [sendTransactionMock, sendTransactionMock];
      const mockResponse = {
        id: mockId,
        data: {},
      };
      const { provider, forwardToWallet, stream } = setupTest({
        chainId: 1523,
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });

    test(`forwards to wallet if is paused`, async () => {
      const request = [sendTransactionMock, sendTransactionMock];
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: true,
          },
          isOk: false,
          result: mockResult,
        },
      };
      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });
  });

  describe(`when intercepts "eth_sendTransaction"`, () => {
    test(`returns data if approved through Blowfish`, async () => {
      const request = sendTransactionMock;
      const mockResult = "mock-result-approve-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: true,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");
      const res = await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });
      expect(res).toEqual(mockResult);
    });

    test(`throws an error if canceled through Blowfish`, async () => {
      const request = sendTransactionMock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: false,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      try {
        await requestHandler({
          request,
          provider,
          forwardToWallet,
          impersonatingAddress: undefined,
          stream,
        });
      } catch (err) {
        if (err instanceof EthereumProviderError) {
          expect(err.message).toEqual("User denied transaction signature.");
          return;
        }
        throw new Error("Should throw EthereumProviderError");
      }
    });

    test(`forwards to wallet if unsuported chain`, async () => {
      const request = sendTransactionMock;
      const mockResponse = {
        id: mockId,
        data: {},
      };
      const { provider, forwardToWallet, stream } = setupTest({
        chainId: 1523,
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });

    test(`forwards to wallet if is paused`, async () => {
      const request = sendTransactionMock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: true,
          },
          isOk: false,
          result: mockResult,
        },
      };
      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });
  });

  describe(`when intercepts "eth_signTypedData"`, () => {
    test(`returns data if approved through Blowfish`, async () => {
      const request = signTypedDataV4Mock;
      const mockResult = "mock-result-approve-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: true,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");
      const res = await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });
      expect(res).toEqual(mockResult);
    });

    test(`throws an error if canceled through Blowfish`, async () => {
      const request = signTypedDataV4Mock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: false,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      try {
        await requestHandler({
          request,
          provider,
          forwardToWallet,
          impersonatingAddress: undefined,
          stream,
        });
      } catch (err) {
        if (err instanceof EthereumProviderError) {
          expect(err.message).toEqual("User denied message signature.");
          return;
        }
        throw new Error("Should throw EthereumProviderError");
      }
    });

    test(`forwards to wallet if unsuported chain`, async () => {
      const request = signTypedDataV4Mock;
      const mockResponse = {
        id: mockId,
        data: {},
      };
      const { provider, forwardToWallet, stream } = setupTest({
        chainId: 1523,
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });

    test(`forwards to wallet if is paused`, async () => {
      const request = signTypedDataV4Mock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: true,
          },
          isOk: false,
          result: mockResult,
        },
      };
      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });
  });

  describe(`when intercepts "eth_sign"`, () => {
    test(`returns data if approved through Blowfish`, async () => {
      const request = ethSignMock;
      const mockResult = "mock-result-approve-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: true,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");
      const res = await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });
      expect(res).toEqual(mockResult);
    });

    test(`throws an error if canceled through Blowfish`, async () => {
      const request = ethSignMock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: false,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      try {
        await requestHandler({
          request,
          provider,
          forwardToWallet,
          impersonatingAddress: undefined,
          stream,
        });
      } catch (err) {
        if (err instanceof EthereumProviderError) {
          expect(err.message).toEqual("User denied message signature.");
          return;
        }
        throw new Error("Should throw EthereumProviderError");
      }
    });

    test(`forwards to wallet if unsuported chain`, async () => {
      const request = ethSignMock;
      const mockResponse = {
        id: mockId,
        data: {},
      };
      const { provider, forwardToWallet, stream } = setupTest({
        chainId: 1523,
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });

    test(`forwards to wallet if is paused`, async () => {
      const request = ethSignMock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: true,
          },
          isOk: false,
          result: mockResult,
        },
      };
      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });
  });

  describe(`when intercepts "personal_sign"`, () => {
    test(`forwards to wallet if approved through Blowfish`, async () => {
      const request = personalSignMock;
      const mockResult = "mock-result-approve-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: true,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");
      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });

    test(`throws an error if canceled through Blowfish`, async () => {
      const request = personalSignMock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: false,
          },
          isOk: false,
          result: mockResult,
        },
      };

      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      try {
        await requestHandler({
          request,
          provider,
          forwardToWallet,
          impersonatingAddress: undefined,
          stream,
        });
      } catch (err) {
        if (err instanceof EthereumProviderError) {
          expect(err.message).toEqual("User denied message signature.");
          return;
        }
        throw new Error("Should throw EthereumProviderError");
      }
    });

    test(`forwards to wallet if unsuported chain`, async () => {
      const request = personalSignMock;
      const mockResponse = {
        id: mockId,
        data: {},
      };
      const { provider, forwardToWallet, stream } = setupTest({
        chainId: 1523,
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });

    test(`forwards to wallet if is paused`, async () => {
      const request = personalSignMock;
      const mockResult = "mock-result-reject-123";
      const mockResponse = {
        id: mockId,
        data: {
          opts: {
            pauseScan: true,
          },
          isOk: false,
          result: mockResult,
        },
      };
      const { provider, forwardToWallet, stream } = setupTest({
        mockResponse,
      });

      const { requestHandler } = await import("~utils/proxy-handlers");

      await requestHandler({
        request,
        provider,
        forwardToWallet,
        impersonatingAddress: undefined,
        stream,
      });

      expect(forwardToWallet).toBeCalledTimes(1);
    });
  });
});

function setupTest({
  mockResponse,
  address,
  chainId = 1,
}: {
  mockResponse?: any;
  address?: string;
  chainId?: number;
}) {
  const provider = {
    getNetwork: jest.fn(() => Promise.resolve({ chainId })),
    listAccounts: jest.fn(() => (address ? [address] : [])),
  } as unknown as providers.Web3Provider;
  const stream = new Duplex() as unknown as WindowPostMessageStream;
  const forwardToWallet = jest
    .fn()
    .mockImplementation(() => "mock-forward-to-wallet");

  if (mockResponse) {
    jest.spyOn(stream, "write").mockImplementation(() => {
      setTimeout(() => {
        stream.emit("data", mockResponse);
      }, 10);
      return true;
    });
    jest.spyOn(stream, "_read").mockImplementation(() => jest.fn());
  }

  return {
    stream,
    forwardToWallet,
    provider,
  };
}
