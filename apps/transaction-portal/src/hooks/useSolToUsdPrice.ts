import useSWR from "swr";
import { Connection } from "@solana/web3.js";
import { ALCHEMY_API_KEY_SOLANA } from "~config";
import {
  PythHttpClient,
  getPythProgramKeyForCluster,
} from "@pythnetwork/client";

async function fetchSolToUsdPrice() {
  const connection = new Connection(
    `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY_SOLANA}`
  );
  const pythClient = new PythHttpClient(
    connection,
    getPythProgramKeyForCluster("mainnet-beta")
  );
  const data = await pythClient.getData();

  const solToUsd = data.productPrice.get("Crypto.SOL/USD");
  return solToUsd?.price;
}

export function useSolToUsdPrice() {
  const { data } = useSWR("solToUsdPrice", fetchSolToUsdPrice);
  return data;
}
