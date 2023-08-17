![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# `@blowfish/api-client` 🐡

## API Documentation

See https://docs.blowfish.xyz

## EVM Message and Transactions Scanning

```ts
import { createEvmClient } from "@blowfishxyz/api-client";

const client = createEvmClient({
    basePath: API_BASE_URL,
    // Optional: Use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
    apiKey: API_KEY,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
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

## Solana Transactions Scanning

```ts
import { createSolanaClient } from "@blowfishxyz/api-client";

const client = createSolanaClient({
  basePath: API_BASE_URL,
  // Optional: Use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
  apiKey: API_KEY,
  chainNetwork: "mainnet",
});

const transactionsScan = await client.scanTransactions(
  ["AgAAA...", "AgAAA..."],
  "5F64...",
  {
    origin: "app.uniswap.org",
  }
);
```

## Domains Scanning

```tsx
// Scan domains
const domainsScan = await client.scanDomains([
  "https://app.uniswap.org",
  "https://opensea.io",
]);
```

## Blocklist

Checkout our Blocklist NPM package: https://www.npmjs.com/package/@blowfishxyz/blocklist
