![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# `@blowfish/ui` 🐡

This package offers a set of customizable React UI components designed to simplify the integration of the Blowfish API into your React applications.

### Key Features

- **Zero-overhead Integration:** You need to just pass the API response to the component.
- **TypeScript Support:** All components are using [`@blowfishxyz/api-client`](https://www.npmjs.com/package/@blowfishxyz/api-client) that relies on the latest Blowfish API version.
- **Customizable theme:** `ThemeProvider` comes with a `light` and `dark` theme built-in. You can still override the theme with a `themeOverride`, it will deeply merge it with the default theme.

### Components

- `StateChangePreview`: displays state changes simulated by the Blowfish API. You can use [`@blowfishxyz/api-client`](https://www.npmjs.com/package/@blowfishxyz/api-client) to simulate the transaction or message and pass the response as `scanResult` prop.
- `SimulationResult`: displays a single state change.
- `SimulationWarning`: displays a single warning.
