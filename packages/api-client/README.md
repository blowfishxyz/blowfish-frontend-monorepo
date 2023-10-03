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
    basePath: API_BASE_URL,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
    // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
    apiKey: API_KEY,
    // Optional
    language: Languages.En
});

// Scan multiple transactions
const transactionsScan = await client.scanTransactions(
  [
    {
      data: "0x35935...",
      from: "0x1ed8c3b56583497f4813ab38f1b4bf76a94496b6",
      to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      value: "0x5af3107a4000",
    },
    {
      data: "0x35935...",
      from: "0x1ed8c3b56583497f4813ab38f1b4bf76a94496b6",
      to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      value: "0x5af3107a4000",
    },
  ],
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  { origin: "https://app.uniswap.org" }
);

// Scan a raw message
const messageScan = await client.scanMessage(
    "0x7761676d692e...",
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    { origin: "https://app.uniswap.org" },
);

// Scan typed data
const typedDataScan = await client.scanSignTypedData(
    {
        domain: { ... },
        primaryType: "PermitBatch",
        types: { ... },
        message: { ... },
    },
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    { origin: "https://app.uniswap.org" },
);

// Scan domains
const domainsScan = await client.scanDomains([
    "https://app.uniswap.org"
]);
```

## Solana Client

```ts
import {
  createSolanaClient,
  Languages,
} from "@blowfishxyz/api-client/v20230605";

const client = createSolanaClient({
  basePath: API_BASE_URL,
  chainNetwork: "mainnet",
  // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
  apiKey: API_KEY,
  // Optional
  language: Languages.En,
});

const transactionsScan = await client.scanTransactions(
  ["AgAAA...", "AgAAA..."],
  "5F64...",
  {
    origin: "app.uniswap.org",
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
  basePath: API_BASE_URL,
  // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
  apiKey: API_KEY,
  // Optional
  language: Languages.En,
});

const evmTransactionsScan = await client.scanTransactionsEvm(
  [
    {
      data: "0x35935...",
      from: "0x1ed8c3b56583497f4813ab38f1b4bf76a94496b6",
      to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      value: "0x5af3107a4000",
    },
  ],
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  { origin: "https://app.uniswap.org" },
  "ethereum",
  "mainnet"
);
const solanaTransactionsScan = await client.scanTransactionsSolana(
  ["AgAAA...", "AgAAA..."],
  "5F64...",
  {
    origin: "app.uniswap.org",
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

## Report transaction

Send additional data about user's behaviour after viewing a scanning result from Blowfish. For each scan, you can send events like PROCEEDED (when user decided to sign the transaction), REJECTED (when user decided to abort the transaction flow) and REPORTED_MALICIOUS (when user explicitly marked the submitted transaction as malicious).

We review and analyze reports to improve the accuracy of our security engine.

Request ID of transaction/message scan can be found in both the headers and the returned objects of our requests as X-Request-Id.

```tsx
const { requestId } = await client.reportTransaction(
  // Scan request ID
  "eafdae18039f531b5a586310cfbd654e",
  ReportRequestEventEnum.ReportedMalicious
);
```

## Historical Simulations

Simulates historical transaction to get the actual state changes it produced.
**Note:** Only works in the API version **2023-06-05** and higher

```tsx
const historicalSimulation = await client.simulateHistoricalTransaction(
  "0x8010da429a651ca117e5c087497cdd8d62e2b7ac1d4095358897817a4d1aa477",
  "0xc1e42f862d202b4a0ed552c1145735ee088f6ccf"
);
```

## Blocklist

Checkout our Blocklist NPM package: https://www.npmjs.com/package/@blowfishxyz/blocklist
