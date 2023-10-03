import {
  Languages,
  EvmChainFamily,
  EvmChainNetwork,
  SolanaChainNetwork,
} from "../types";
import { BlowfishMultiChainApiClient } from "./multi-chain-client";
import { BlowfishEvmApiClient } from "./evm-client";
import { BlowfishSolanaApiClient } from "./solana-client";

export function createMultiChainClient({
  basePath,
  apiKey,
  language,
}: {
  basePath: string;
  apiKey?: string;
  language?: Languages;
}): BlowfishMultiChainApiClient {
  return new BlowfishMultiChainApiClient(basePath, apiKey, language);
}

export function createEvmClient({
  basePath,
  chainFamily,
  chainNetwork,
  apiKey,
}: {
  basePath: string;
  chainFamily: EvmChainFamily;
  chainNetwork: EvmChainNetwork;
  apiKey?: string;
}): BlowfishEvmApiClient {
  return new BlowfishEvmApiClient(basePath, chainFamily, chainNetwork, apiKey);
}

export function createSolanaClient({
  basePath,
  apiKey,
  chainNetwork,
}: {
  basePath: string;
  apiKey?: string;
  chainNetwork: SolanaChainNetwork;
}): BlowfishSolanaApiClient {
  return new BlowfishSolanaApiClient(basePath, chainNetwork, apiKey);
}

export {
  BlowfishMultiChainApiClient,
  BlowfishEvmApiClient,
  BlowfishSolanaApiClient,
};
