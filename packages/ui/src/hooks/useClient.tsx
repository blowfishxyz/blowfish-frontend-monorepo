import { createContext, memo, useContext, useEffect, useState } from "react";
import {
  createMultiChainClient,
  BlowfishMultiChainApiClient,
} from "@blowfishxyz/api-client";

const ApiClientContext = createContext<BlowfishMultiChainApiClient | null>(
  null
);

export const ApiClientProvider = memo(function ApiClientProvider({
  basePath,
  children,
}: React.PropsWithChildren<{ basePath: string }>) {
  const [value, setValue] = useState(() =>
    createMultiChainClient({
      basePath,
    })
  );

  useEffect(() => {
    setValue(
      createMultiChainClient({
        basePath,
      })
    );
  }, []);
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
