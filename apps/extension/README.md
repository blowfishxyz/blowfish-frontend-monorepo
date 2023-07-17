# 🐡 Blowfish Protect 🛡

Blowfish Protect is a browser extension that wraps your Browser wallet's injected provider, intercepting any requests for the user to sign transactions or messages and scans them with Blowfish's security API. The user is then shown the scan and simulation results, allowing them to make an informed decision on whether they want to proceed with it to their wallet or not.

⚠ This documentation is all very much WIP. Please improve it as you go wherever it is lacking

## 📚 Getting Started

### 🌐 Browser Extension development

1. Copy `default.env` to `.env.development` and `.env.production`
   1. `PLASMO_PUBLIC_BLOWFISH_API_BASE_URL` Blowfish API URL
   1. `PLASMO_PUBLIC_BLOWFISH_WALLET_IMPERSONATION_AVAILABLE` can be used to impersonate an account in development
   1. `PLASMO_PUBLIC_BLOWFISH_WALLET_PORTAL_URL_OVERRIDE_ENABLED` can be used to override the portal URL (`PLASMO_PUBLIC_BLOWFISH_TRANSACTION_PORTAL_URL`) in development
1. Install dependencies with `pnpm install`
1. Run the local development environment with `pnpm dev`
1. Install `Metamask` into your Chrome browser. You can import our testing wallet seed phrase which is available in 1Password under `Seedphrase Development & Scam evaluation EVM`
1. Open `chrome://extensions`
1. Enable `Development Mode`
1. Click `Load unpacked`
1. Navigate into `build/chrome-mv3-dev` and click `Select`
1. Navigate to [https://app.uniswap.org/](https://app.uniswap.org/)
1. Connect your wallet and initiate a swap, Blowfish Protect should pop up showing you the transaction scan results, **don't confirm the tx in Metamask**
   - If something goes wrong right-click on the Blowfish Protect icon in Chrome, select `Inspect Popup` and look out for any error messages in the console.
1. Make changes to the codebase and the extension should reload automatically
   - At times the auto-reload can break and you will need to manually reload the Extension in `chrome://extensions`
1. For more information refer to the [Plasmo docs](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.
