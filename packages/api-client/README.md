# Blowfish API Client

```ts
import { BlowfishApiClient } from "@blowfishxyz/api";
```

## Generate clients

1. Make sure you have a Java Runtime installed (`brew install openjdk`)
1. Run `pnpm schema:convert`
1. Run `pnpm generate`
1. Due to a bug inside `openapitools` run `pnpm typecheck` and fix the errors

## How to update the client

1. Add the new schema to the `original-schemas` directory
1. Remove the oldest schema from `original-schemas` directory (it is important that api-client stays up-to-date)
1. Run `pnpm schema:convert`
1. Run `pnpm generate`
1. Due to a bug inside `openapitools` run `pnpm typecheck` and fix the errors
1. If there are some breaking changes make sure to deprecate old functionality, but maintain full backwards compatibility
