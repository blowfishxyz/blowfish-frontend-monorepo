import { BlowfishMultiChainApiClient } from "./multi-chain-client";
import { BlowfishEvmApiClient } from "./evm-client";
import { BlowfishSolanaApiClient } from "./solana-client";
import {
  EvmClientConfig,
  MultiChainClientConfig,
  SolanaClientConfig,
} from "../../common/types";

export function createMultiChainClient({
  basePath,
  apiKey,
  language,
  fetchApi,
}: MultiChainClientConfig): BlowfishMultiChainApiClient {
  return new BlowfishMultiChainApiClient(basePath, apiKey, language, fetchApi);
}

export function createEvmClient({
  basePath,
  chainFamily,
  chainNetwork,
  apiKey,
  language,
  fetchApi,
}: EvmClientConfig): BlowfishEvmApiClient {
  return new BlowfishEvmApiClient(
    basePath,
    chainFamily,
    chainNetwork,
    apiKey,
    language,
    fetchApi
  );
}

export function createSolanaClient({
  basePath,
  apiKey,
  chainNetwork,
  language,
  fetchApi,
}: SolanaClientConfig): BlowfishSolanaApiClient {
  return new BlowfishSolanaApiClient(
    basePath,
    chainNetwork,
    apiKey,
    language,
    fetchApi
  );
}

export {
  BlowfishMultiChainApiClient,
  BlowfishEvmApiClient,
  BlowfishSolanaApiClient,
};
