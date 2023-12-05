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
  // console.log(BLOWFISH_API_BASE_URL)
  
  const [value, setValue] = useState(() =>
  createEvmClient({
    basePath: BLOWFISH_API_BASE_URL,
    chainFamily,
    chainNetwork,
  })
  );
  console.log('ui1', BLOWFISH_API_BASE_URL, value)
  useEffect(() => {
    setValue(
      createEvmClient({
        basePath: BLOWFISH_API_BASE_URL,
        chainFamily,
        chainNetwork,
      })
    );
  }, [chainFamily, chainNetwork]);
  console.log('ui', BLOWFISH_API_BASE_URL, value)
  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
});

export function useClient() {
  const client = useContext(ApiClientContext);
  console.log('ui', BLOWFISH_API_BASE_URL, client)
  if (!client) {
    throw new Error("useClient must be used within a ApiClientProvider");
  }
  return client;
}
