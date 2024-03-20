![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# `@blowfish/api-client` 🐡

## API Documentation

See [https://docs.blowfish.xyz](https://docs.blowfish.xyz/v2023-06-05)

Latest API version: **v2023-06-05**

## Transactions and Message Scanning

Scan EVM and Solana transactions in order to receive recommended actions, tailored warnings and human-readable simulation results explaining what the transaction will do. The API will return a list of warnings and a list of human-readable simulation results.

## EVM Client

```ts
import { createEvmClient, Languages } from "@blowfishxyz/api-client/v20230605";

const client = createEvmClient({
  basePath: "https://api.blowfish.xyz",
  // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
  apiKey: "4daa1e3b-87e6-40b2-8883-758feb6a8e46",
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
  // Optional
  language: Languages.En,
});

// Scan multiple transactions
const transactionsScan = await client.scanTransactions(
  [
    {
      data: "0xa9059cbb000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000002386f26fc10000",
      from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
    {
      data: "0xa9059cbb000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000002386f26fc10000",
      from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      to: "0xc03bbb39b223fe8d0a0e5c4f27ead9083c756ac2",
    },
  ],
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  { origin: "https://unkown-domain.dev" }
);

// Scan a raw message
const messageScan = await client.scanMessage(
  "0x40ac14ef28d35fb4540e0cd0950123b378224d3585ec887c26f7a510da544552",
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  { origin: "https://unkown-domain.dev" }
);

// Scan typed data
const typedDataScan = await client.scanSignTypedData(
  {
    domain: {
      name: "Permit2",
      chainId: "1",
      verifyingContract: "0xf0ffb02791362602acf0edce574e74dd9bd3120e",
    },
    types: {
      PermitBatch: [
        {
          name: "details",
          type: "PermitDetails[]",
        },
        {
          name: "spender",
          type: "address",
        },
        {
          name: "sigDeadline",
          type: "uint256",
        },
      ],
      PermitDetails: [
        {
          name: "token",
          type: "address",
        },
        {
          name: "amount",
          type: "uint160",
        },
        {
          name: "expiration",
          type: "uint48",
        },
        {
          name: "nonce",
          type: "uint48",
        },
      ],
    },
    primaryType: "PermitBatch",
    message: {
      details: [
        {
          token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          amount: "1461501637330902918203684832716283019655932542975",
          expiration: "281474976710655",
          nonce: "281474976710655",
        },
        {
          token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          amount: "1461501637330902918203684832716283019655932542975",
          expiration: "281474976710655",
          nonce: "281474976710655",
        },
        {
          token: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          amount: "1461501637330902918203684832716283019655932542975",
          expiration: "281474976710655",
          nonce: "281474976710655",
        },
      ],
      spender: "0x0000000000000000000000000000000000000001",
      sigDeadline:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    },
  },
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  { origin: "https://unkown-domain.dev" }
);

// Scan domains
const domainsScan = await client.scanDomains(["https://app.uniswap.org"]);
```

## Solana Client

```ts
import {
  createSolanaClient,
  Languages,
} from "@blowfishxyz/api-client/v20230605";

const client = createSolanaClient({
  basePath: "https://api.blowfish.xyz",
  // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
  apiKey: "4daa1e3b-87e6-40b2-8883-758feb6a8e46",
  chainNetwork: "mainnet",
  // Optional
  language: Languages.En,
});

const transactionsScan = await client.scanTransactions(
  [
    "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED1/GM77uLGslrQf0lxej6sBRDW3dUMBw4Mxo1zRrpZGZafbJORJb+gzh+vcMdhnn8px1N+NcuQ1Lj1KvhFRwAywbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpBn9A83Xu7uaFQt8+0152j5cclxp+kZToz5JJnbLwpxQBAgIBACMGAgF0db0rJ/DnR+R6kWV6kj4FchRRhx9TXx7HEF7/uDTADQ==",
  ],
  "FXxHSp14Yfmwn5c3ynpxx3AMHU3JVmdXJu1MgEwz3bAu",
  {
    origin: "https://unkown-domain.dev",
  }
);
```

## Multi-chain Client

```ts
import {
  createMultiChainClient,
  Languages,
} from "@blowfishxyz/api-client/v20230605";

const client = createMultiChainClient({
  basePath: "https://api.blowfish.xyz",
  // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
  apiKey: "4daa1e3b-87e6-40b2-8883-758feb6a8e46",
  // Optional
  language: Languages.En,
});

const evmTransactionsScan = await client.scanTransactionsEvm(
  [
    {
      data: "0xa9059cbb000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000002386f26fc10000",
      from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    },
  ],
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  { origin: "https://unkown-domain.dev" },
  "ethereum",
  "mainnet"
);
const solanaTransactionsScan = await client.scanTransactionsSolana(
  [
    "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED1/GM77uLGslrQf0lxej6sBRDW3dUMBw4Mxo1zRrpZGZafbJORJb+gzh+vcMdhnn8px1N+NcuQ1Lj1KvhFRwAywbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpBn9A83Xu7uaFQt8+0152j5cclxp+kZToz5JJnbLwpxQBAgIBACMGAgF0db0rJ/DnR+R6kWV6kj4FchRRhx9TXx7HEF7/uDTADQ==",
  ],
  "FXxHSp14Yfmwn5c3ynpxx3AMHU3JVmdXJu1MgEwz3bAu",
  {
    origin: "https://unkown-domain.dev",
  },
  "mainnet"
);
```

## Domains Scanning

Analyze dApp domains to determine if they are safe for users to interact with.

```tsx
const domainsScan = await client.scanDomains([
  "https://app.uniswap.org",
  "https://opensea.io",
]);
```

## Blocklist

Checkout our Blocklist NPM package: https://www.npmjs.com/package/@blowfishxyz/blocklist
