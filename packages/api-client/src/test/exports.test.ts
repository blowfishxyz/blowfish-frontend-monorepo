import { describe, it, expect } from "vitest";
import * as v20230605 from "../clients/v20230605";
import * as v20230517 from "../clients/v20230517";
import * as v20230308 from "../clients/v20230308";
import * as v20220601 from "../clients/v20220601";

describe("All API Clients", () => {
  it("should export custom errors", async () => {
    const errors = {
      v20230605: [
        v20230605.BlowfishBadRequestError,
        v20230605.BlowfishInternalServerError,
        v20230605.BlowfishRateLimitError,
        v20230605.BlowfishUnknownError,
      ],
      v20230517: [
        v20230517.BlowfishBadRequestError,
        v20230517.BlowfishInternalServerError,
        v20230517.BlowfishRateLimitError,
        v20230517.BlowfishUnknownError,
      ],
      v20230308: [
        v20230308.BlowfishBadRequestError,
        v20230308.BlowfishInternalServerError,
        v20230308.BlowfishRateLimitError,
        v20230308.BlowfishUnknownError,
      ],
      v20220601: [
        v20220601.BlowfishBadRequestError,
        v20220601.BlowfishInternalServerError,
        v20220601.BlowfishRateLimitError,
        v20220601.BlowfishUnknownError,
      ],
    };

    expect(errors.v20230605.length).toEqual(
      v20230605.BlowfishErrorTypes.length
    );
    expect(errors.v20230517.length).toEqual(
      v20230517.BlowfishErrorTypes.length
    );
    expect(errors.v20230308.length).toEqual(
      v20230308.BlowfishErrorTypes.length
    );
    expect(errors.v20220601.length).toEqual(
      v20220601.BlowfishErrorTypes.length
    );
  });

  it("should have correct version header", async () => {
    // read the version from package.json
    const packageJson = require("../../package.json");

    const client = new v20230605.BlowfishMultiChainApiClient("/test-path");
    expect(client.getHeaders()["X-Api-Client-Version"]).toEqual(
      packageJson.version
    );

    const client2 = new v20230517.BlowfishMultiChainApiClient("/test-path");
    expect(client2.getHeaders()["X-Api-Client-Version"]).toEqual(
      packageJson.version
    );

    const client3 = new v20230308.BlowfishMultiChainApiClient("/test-path");
    expect(client3.getHeaders()["X-Api-Client-Version"]).toEqual(
      packageJson.version
    );

    const client4 = new v20220601.BlowfishMultiChainApiClient("/test-path");
    expect(client4.getHeaders()["X-Api-Client-Version"]).toEqual(
      packageJson.version
    );
  });

  it("should have all methods", async () => {
    const multiClientMethods = [
      "scanMessageEvm",
      "scanTransactionsEvm",
      "scanTransactionsSolana",
      "scanDomains",
      "downloadBlocklist",
      "reportTransaction",
      "scanAssets",
    ];
    const evmClientMethods = [
      "scanMessage",
      "scanPersonalSign",
      "scanSignTypedData",
      "scanTransactions",
      "scanDomains",
      "scanAssets",
    ];
    const solanaClientMethods = [
      "scanTransactions",
      "scanDomains",
      "scanAssets",
    ];

    const client = new v20230605.BlowfishMultiChainApiClient("/test-path");
    const evmClient = new v20230605.BlowfishEvmApiClient(
      "/test-path",
      "ethereum",
      "mainnet"
    );
    const solanaClient = new v20230605.BlowfishSolanaApiClient(
      "/test-path",
      "mainnet"
    );
    for (const method of multiClientMethods) {
      expect(client).toHaveProperty(method);
    }
    for (const method of evmClientMethods) {
      expect(evmClient).toHaveProperty(method);
    }
    for (const method of solanaClientMethods) {
      expect(solanaClient).toHaveProperty(method);
    }

    const client2 = new v20230517.BlowfishMultiChainApiClient("/test-path");
    const evmClient2 = new v20230517.BlowfishEvmApiClient(
      "/test-path",
      "ethereum",
      "mainnet"
    );
    const solanaClient2 = new v20230517.BlowfishSolanaApiClient(
      "/test-path",
      "mainnet"
    );
    for (const method of multiClientMethods) {
      expect(client2).toHaveProperty(method);
    }
    for (const method of evmClientMethods) {
      expect(evmClient2).toHaveProperty(method);
    }
    for (const method of solanaClientMethods) {
      expect(solanaClient2).toHaveProperty(method);
    }

    const client3 = new v20230308.BlowfishMultiChainApiClient("/test-path");
    const evmClient3 = new v20230308.BlowfishEvmApiClient(
      "/test-path",
      "ethereum",
      "mainnet"
    );
    const solanaClient3 = new v20230308.BlowfishSolanaApiClient(
      "/test-path",
      "mainnet"
    );
    for (const method of multiClientMethods) {
      expect(client3).toHaveProperty(method);
    }
    for (const method of evmClientMethods) {
      expect(evmClient3).toHaveProperty(method);
    }
    for (const method of solanaClientMethods) {
      expect(solanaClient3).toHaveProperty(method);
    }

    const client4 = new v20220601.BlowfishMultiChainApiClient("/test-path");
    const evmClient4 = new v20220601.BlowfishEvmApiClient(
      "/test-path",
      "ethereum",
      "mainnet"
    );
    const solanaClient4 = new v20220601.BlowfishSolanaApiClient(
      "/test-path",
      "mainnet"
    );
    for (const method of multiClientMethods.filter(
      (x) => x !== "scanTransactionsEvm"
    )) {
      expect(client4).toHaveProperty(method);
    }
    for (const method of evmClientMethods.filter(
      (x) => x !== "scanTransactions"
    )) {
      expect(evmClient4).toHaveProperty(method);
    }
    for (const method of solanaClientMethods) {
      expect(solanaClient4).toHaveProperty(method);
    }
  });
});
