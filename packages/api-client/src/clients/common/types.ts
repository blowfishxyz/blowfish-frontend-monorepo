import type { FetchAPI } from "../../generated/v20230605";
import type {
  EvmChainFamily,
  EvmChainNetwork,
  Languages,
  SolanaChainNetwork,
} from "../v20230605";

export type MultiChainClientConfig = {
  basePath: string;
  apiKey?: string;
  language?: Languages;
  fetchApi?: FetchAPI;
};

export type SolanaClientConfig = {
  basePath: string;
  apiKey?: string;
  chainNetwork: SolanaChainNetwork;
  language?: Languages;
  fetchApi?: FetchAPI;
};

export type EvmClientConfig = {
  basePath: string;
  chainFamily: EvmChainFamily;
  chainNetwork: EvmChainNetwork;
  apiKey?: string;
  language?: Languages;
  fetchApi?: FetchAPI;
};
