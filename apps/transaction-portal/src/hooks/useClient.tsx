import { createContext, memo, useContext, useState } from "react";
import {
  BlowfishMultiChainApiClient,
  createMultiChainClient,
  MultiChainClientConfig,
} from "@blowfishxyz/api-client";

export const BLOWFISH_API_BASE_URL = process.env
  .NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string;

const ApiClientContext = createContext<BlowfishMultiChainApiClient | null>(
  null
);

export const ApiClientProvider = memo(function ApiClientProvider({
  config,
  children,
}: React.PropsWithChildren<{
  config: MultiChainClientConfig;
}>) {
  const [value] = useState(() => createMultiChainClient(config));

  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
});

export function useClient() {
  const client = useContext(ApiClientContext);
  if (!client) {
    throw new Error("useClient must be used within a ApiClientProvider");
  }
  return client;
}
