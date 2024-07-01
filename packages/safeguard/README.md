![](https://framerusercontent.com/images/LMkkyrT6aZKMqZNobSZKDY8lnM.jpg)

# Blowfish Safeguard Transaction Verification

This package provides functionality to verify Solana transactions against Blowfish Safeguard generated transactions. 
It is used to ensure that the original transaction is not tampered with and that the safeguard transaction meets the criteria defined in the configuration.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API](#api)
    - [verifyTransaction](#verifytransaction)
- [Errors](#errors)
- [Contributing](#contributing)

## Installation

To install this package run one of the following commands:

```bash
npm install @blowfishxyz/safeguard
# or
yarn add @blowfishxyz/safeguard
# or
pnpm add @blowfishxyz/safeguard
```

## Usage

```javascript
import { verifyTransaction } from '@blowfishxyz/safeguard';

const originalTx = '...';  // Base58 or Base64 encoded original transaction
const safeGuardTx = '...'; // Base58 or Base64 encoded safeguard transaction
const solUsdRate = 137.5;   // Current SOL to USD rate

const options = {
  solUsdRate,
  // Other optional configuration overrides can be specified here
};

try {
  verifyTransaction(originalTx, safeGuardTx, options);
  console.log('Transaction verification succeeded.');
} catch (error) {
  console.error('Transaction verification failed:', error.message);
}
```

## Configuration

The `VerifyConfig` type defines the configuration used to verify safeguard transaction against the original one.

```typescript
export type VerifyConfig = {
  lightHouseId: string; // ID of the Lighthouse program
  blowfishServiceFeeAccount: string; // Blowfish service fee account
  blowfishFeeInUsd: number; // Expected Blowfish service fee in USD
  solUsdRate: number; // Current SOL/USD rate
  feeSlippage: number; // Fee slippage in percentage
};
```

### Default Configuration

The default configuration values are:

```javascript
const DEFAULT_CONFIG = {
  blowfishFeeInUsd: 0.01, // 1 cent
  blowfishServiceFeeAccount: "EPr6e66NYBKrP3u688U2VHmxdviUAV7FeRFWqfqZD9So",
  feeSlippage: 0.1, // 10%
  lightHouseId: "L1TEVtgA75k273wWz1s6XMmDhQY5i3MwcvKb4VbZzfK",
};
```

## API

### verifyTransaction

Verifies that a transaction meets the criteria defined in the configuration.

```typescript
function verifyTransaction(
  originalTxB58orB64: string,
  safeGuardTxB58orB64: string,
  options: VerifyTransactionOptions
): void;
```

- `originalTxB58orB64`: The original transaction in Base58 or Base64 encoding.
- `safeGuardTxB58orB64`: The safeguard transaction in Base58 or Base64 encoding.
- `options`: Optional configuration overrides.

### Errors

The function throws specific errors to indicate different types of verification failures:

- `RECENT_BLOCKHASH_MISSMATCH`: Recent blockhash does not match the initial transaction.
- `INSTRUCTION_MISSMATCH`: Instructions do not match the initial transaction.
- `UNKNOWN_PROGRAM_INTERACTION`: Instruction is attempting to interact with an unknown program.
- `MISSING_BLOWFISH_FEE`: Instructions are missing Blowfish service fee.
- `MISSING_LIGHTHOUSE_PROGRAM_CALL`: Instructions are missing Lighthouse program call.
- `FEE_MISMATCH`: Fee does not match the expected Blowfish service fee.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.
