import { createContext, memo, useContext, useState } from "react";
import {
  createMultiChainClient,
  BlowfishMultiChainApiClient,
  MultiChainClientConfig,
} from "@blowfishxyz/api-client";

const ApiClientContext = createContext<BlowfishMultiChainApiClient | null>(
  null
);

export const ApiClientProvider = memo(function ApiClientProvider({
  config,
  children,
}: React.PropsWithChildren<{ config: MultiChainClientConfig }>) {
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
