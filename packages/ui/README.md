![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# `@blowfish/ui` 🐡

This package offers a set of customizable React UI components designed to simplify the integration of the Blowfish API into your React applications.

# API Documentation

See https://docs.blowfish.xyz

# Key Features

- **Zero-overhead Integration:** You need to just pass the API response to the component.
- **TypeScript Support:** All components are using [`@blowfishxyz/api-client`](https://www.npmjs.com/package/@blowfishxyz/api-client) that relies on the latest Blowfish API version.
- **Customizable theme:** `BlowfishUIProvider` comes with a `light` and `dark` theme built-in. You can still override the theme with a `themeOverride`, it will deeply merge it with the default theme.

# Components

## EVM

Use `StateChangePreviewEvm` to display state changes simulated by the Blowfish API. You can use [`@blowfishxyz/api-client`](https://www.npmjs.com/package/@blowfishxyz/api-client) to simulate transactions and pass the response as `scanResult` prop.

You can also use `SimulationWarning` to display Blowfish warnings.

**Note:** For more control over how you want to display state changes, you can use `SimulationResultEvm` to display each state change separately.

### Example

```tsx
import useSWR from "swr";
import { createClient } from "@blowfishxyz/api-client";
import { SimulationWarning, StateChangePreviewEvm } from "@blowfishxyz/ui";

function EvmApp() {
  const userAccount = "0x...";
  const tx: EvmTxData = {};
  const origin = "app.uniswap.org";

  const scanTransactions = () => {
    return createEvmClient({
      basePath: API_BASE_URL,
      // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
      apiKey: API_KEY,
      chainFamily: "ethereum",
      chainNetwork: "mainnet",
    }).scanTransactions([tx], userAccount, {
      origin,
    });
  };

  const { data } = useSWR(getCacheKey(), scanTransactions, {
    refreshInterval: SCAN_REFRESH_INTERVAL_MS,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StateChangePreviewEvm
        scanResult={data}
        chainFamily="ethereum"
        chainNetwork="mainnet"
      />
      <div>
        {data.warnings.map((warning) => (
          <SimulationWarning key={warning.message} warning={warning} />
        ))}
      </div>
    </div>
  );
}
```

## Solana

Use `StateChangePreviewSolana` to display state changes for solana transactions.

**Note:** For more control over how you want to display state changes, you can use `SimulationResultSolana` to display each state change separately.

### Example

```tsx
import useSWR from "swr";
import { createSolanaClient } from "@blowfishxyz/api-client";
import { SimulationWarning, StateChangePreviewSolana } from "@blowfishxyz/ui";

function SolanaApp() {
  const userAccount = "5F64...";
  const tx1 = "AgAAA...";
  const tx2 = "AgAAA...";
  const origin = "app.uniswap.org";

  const scanTransactions = () => {
    return createSolanaClient({
      basePath: API_BASE_URL,
      // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
      apiKey: API_KEY,
      chainNetwork: "mainnet",
    }).scanTransactions([tx1, tx2], userAccount, {
      origin,
    });
  };

  const { data } = useSWR("cache-key", scanTransactions, {
    refreshInterval: SCAN_REFRESH_INTERVAL_MS,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StateChangePreviewSolana scanResult={data} chainNetwork="mainnet" />
      <div>
        {data.warnings.map((warning) => (
          <SimulationWarning key={warning.message} warning={warning} />
        ))}
      </div>
    </div>
  );
}
```

## BlowfishUIProvider

Wrap your app inside `BlowfishUIProvider`.

- `mode` – choose a styling theme: **light**, **dark**, or **auto** (relies on `prefers-color-scheme` user preference).
- `themeOverride` – override parts of the theme or the whole theme.
- `fontFamily` – sets a root font family for `@blowfishxyz/ui`. Make sure to set up font loading on your side.

### Example

```tsx
import React from "react";
import { BlowfishUIProvider } from "@blowfishxyz/ui";

function App(props: AppProps) {
  const themeOverride = useMemo(
    () => ({
      colors: {
        foregroundPrimary: yourTheme.foregroundPrimary,
        backgroundPrimary: yourTheme.backgroundPrimary,
      },
    }),
    []
  );
  return (
    <BlowfishUIProvider
      mode="light"
      themeOverride={themeOverride}
      fontFamily="Roboto"
    >
      {props.children}
    </BlowfishUIProvider>
  );
}
```
