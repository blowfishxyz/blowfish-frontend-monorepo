# Blowfish API Client

## How to generate the client

1. Make sure you have a Java Runtime installed (`brew install openjdk`)
1. Run `pnpm generate`. It consists of 5 steps
   - `pnpm schema:download` – download all the schemas from `https://api.blowfish.xyz/openapi/`.
   - `pnpm schema:convert` – adapt the schemas to a generator-friendly format.
   - `pnpm schema:generate` – generate the API clients for last 2 versions.
   - `pnpm clients:fix` – fix any **longterm** issues with the generated clients.
   - `pnpm clients:format` – format the generated clients using prettier.
