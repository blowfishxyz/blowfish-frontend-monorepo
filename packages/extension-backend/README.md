# Blowfish extension-backend

This is a very lightweight Node proxy that sits in between the Blowfish Protect extension users and our API. Currently it only does 2 things: appends the `X-Api-Key` request header with the dedicated Blowfish Protect API key, adds super basic in-memory rate limiting to keep people from spamming the API.

**NOTE:** This server is **not needed for local development** as the Blowfish Protect extension will use the production backend.

## 📚 Getting started

1. Set up .env
   1. Copy `default.env` to `.env`
   1. Set `BLOWFISH_API_KEY` to the `Blowfish team testing` key that you can find in the `API Keys` Notion doc.
   1. Choose you which Blowfish API you want to proxy to.
1. Install dependencies with `pnpm install`
1. Run local development with `pnpm dev`
1. Update you browser-extension `env.development` to `PLASMO_PUBLIC_BLOWFISH_API_BASE_URL=http://localhost:3000/proxy/api`
1. Restart the extension development environment and you can now use an alternative Blowfish API instance
