![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# `@blowfish/ui` 🐡

This package offers a set of customizable React UI components designed to simplify the integration of the Blowfish API into your React applications.

# API Documentation

See https://docs.blowfish.xyz

# Examples

See https://storybook.blowfish.xyz

# Key Features

- **Zero-overhead Integration:** You need to just pass the API response to the component.
- **TypeScript Support:** All components are using [`@blowfishxyz/api-client`](https://www.npmjs.com/package/@blowfishxyz/api-client) that relies on the latest Blowfish API version.
- **Customizable theme:** `BlowfishUIProvider` comes with a `light` and `dark` theme built-in. You can still override the theme with a `themeOverride`, it will deeply merge it with the selected theme.

# Components

## EVM

Use `StateChangePreviewEvm` to display state changes simulated by the Blowfish API. You can use [`@blowfishxyz/api-client`](https://www.npmjs.com/package/@blowfishxyz/api-client) to simulate transactions and pass the response as `scanResult` prop.

You can also use `SimulationWarning` to display Blowfish warnings.

**Note:** For more control over how you want to display state changes, you can use `SimulationResultEvm` to display each state change separately.

### Example

```tsx
import React from "react";
import useSWR from "swr";
import { createEvmClient, type EvmTxData } from "@blowfishxyz/api-client";
import {
  SimulationWarning,
  StateChangePreviewEvm,
  BlowfishUIProvider,
} from "@blowfishxyz/ui";

function EvmApp() {
  const userAccount = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const tx: EvmTxData = {
    data: "0xa9059cbb000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000002386f26fc10000",
    from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    to: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  };
  const origin = "https://unkown-domain.dev";

  const scanTransactions = () => {
    return createEvmClient({
      basePath: "https://api.blowfish.xyz",
      // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
      apiKey: "4daa1e3b-87e6-40b2-8883-758feb6a8e46",
      chainFamily: "ethereum",
      chainNetwork: "mainnet",
    }).scanTransactions([tx], userAccount, {
      origin,
    });
  };

  const { data } = useSWR(tx.data, scanTransactions);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <BlowfishUIProvider mode="auto">
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
    </BlowfishUIProvider>
  );
}
```

## Solana

Use `StateChangePreviewSolana` to display state changes for solana transactions.

**Note:** For more control over how you want to display state changes, you can use `SimulationResultSolana` to display each state change separately.

### Example

```tsx
import React from "react";
import useSWR from "swr";
import { Languages, createSolanaClient } from "@blowfishxyz/api-client";
import {
  BlowfishUIProvider,
  SimulationWarning,
  StateChangePreviewSolana,
} from "@blowfishxyz/ui";

function SolanaApp() {
  const userAccount = "FXxHSp14Yfmwn5c3ynpxx3AMHU3JVmdXJu1MgEwz3bAu";
  const tx =
    "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAED1/GM77uLGslrQf0lxej6sBRDW3dUMBw4Mxo1zRrpZGZafbJORJb+gzh+vcMdhnn8px1N+NcuQ1Lj1KvhFRwAywbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpBn9A83Xu7uaFQt8+0152j5cclxp+kZToz5JJnbLwpxQBAgIBACMGAgF0db0rJ/DnR+R6kWV6kj4FchRRhx9TXx7HEF7/uDTADQ==";
  const origin = "https://unkown-domain.dev";

  const scanTransactions = () => {
    return createSolanaClient({
      basePath: "https://api.blowfish.xyz",
      // Optional: It's highly encouraged to use a proxy server to not expose your API key on the client (see: https://docs.blowfish.xyz/docs/wallet-integration-guide#optional-proxy-server)
      apiKey: "4daa1e3b-87e6-40b2-8883-758feb6a8e46",
      chainNetwork: "mainnet",
      // Optional
      language: Languages.En,
    }).scanTransactions([tx], userAccount, {
      origin,
    });
  };

  const { data } = useSWR(tx, scanTransactions);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <BlowfishUIProvider mode="auto">
      <div>
        <StateChangePreviewSolana
          scanResult={data}
          userAccount={userAccount}
          chainNetwork="mainnet"
        />
        <div>
          {data.aggregated.warnings.map((warning) => (
            <SimulationWarning key={warning.message} warning={warning} />
          ))}
        </div>
      </div>
    </BlowfishUIProvider>
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
