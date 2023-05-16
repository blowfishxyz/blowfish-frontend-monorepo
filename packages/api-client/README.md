# Blowfish API Client

## Generate client

1. Make sure you have a Java Runtime installed (`brew install openjdk`)
1. Run `pnpm schema`
1. Update `ScanMessageApi` and `ScanTransactionApi` to use `chainFamily` and `chainNetwork` (this is a temporary hack until the schema doesn't support different chains)

## How to update the client

1. Update the `schema.yaml` file with the new schema from https://api.blowfish.xyz/openapi/
1. Run `pnpm schema`
1. Update `ScanMessageApi` and `ScanTransactionApi` to use `chainFamily` and `chainNetwork` (this is a temporary hack until the schema doesn't support different chains)
