![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# `@blowfish/api-client` 🐡

```ts
import { createClient } from "@blowfishxyz/api-client";

const client = createClient(
      API_BASE_URL,
      // Note: To not to leak your private API key consider using a proxy.
      API_KEY
    )
      .evm("ethereum", "mainnet");

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
