# Blowfish API Client

```ts
import { BlowfishApiClient } from "@blowfishxyz/api-client";

const client = const client = new BlowfishApiClient(
    baseUrl,
    apiKey,
    chainFamily,
    chainNetwork
);

// scan multiple transactions
const transactionsScan = await client.scanTransactionsEvm(
    txObjects: [
        {
            data: "0x35935...",
            from: "0x1ed8c3b56583497f4813ab38f1b4bf76a94496b6",
            gas: "0x2c977",
            to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
            value: "0x5af3107a4000",
        },
        {
            data: "0x35935...",
            from: "0x1ed8c3b56583497f4813ab38f1b4bf76a94496b6",
            gas: "0x2c977",
            to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
            value: "0x5af3107a4000",
        },
    ],
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    { origin: "https://app.uniswap.org" },
);

// scan a raw message
const messageScan = await client.scanMessageEvm(
    "0x7761676d692e...",
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    { origin: "https://app.uniswap.org" },
);

// scan typed data
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

// scan domains
const domainsScan = await client.scanDomains([
    "https://app.uniswap.org"
]);
```
