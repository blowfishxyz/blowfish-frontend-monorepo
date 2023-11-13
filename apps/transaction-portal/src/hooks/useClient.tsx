import { createContext, memo, useContext, useEffect, useState } from "react";
import { createEvmClient, BlowfishEvmApiClient } from "@blowfishxyz/api-client";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";

export const BLOWFISH_API_BASE_URL = process.env
  .NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string;

const ApiClientContext = createContext<BlowfishEvmApiClient | null>(null);

export const ApiClientProvider = memo(function ApiClientProvider({
  chainFamily,
  chainNetwork,
  children,
}: React.PropsWithChildren<{
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}>) {
  const [value, setValue] = useState(() =>
    createEvmClient({
      basePath: BLOWFISH_API_BASE_URL,
      chainFamily,
      chainNetwork,
    })
  );
  useEffect(() => {
    setValue(
      createEvmClient({
        basePath: BLOWFISH_API_BASE_URL,
        chainFamily,
        chainNetwork,
      })
    );
  }, [chainFamily, chainNetwork]);
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
