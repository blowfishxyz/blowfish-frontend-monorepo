import { ApiClientProvider } from "@blowfishxyz/ui";
import dynamic from "next/dynamic";
import React, { useLayoutEffect, useState } from "react";
import ScanPageSolana from "~components/ScanPageSolana";
import { useLayoutConfig } from "~components/layout/Layout";
import { useQueryParams } from "~hooks/useQueryParams";
import { ScanParamsSuccess } from "~hooks/useScanParams";
import { useURLRequestParams } from "~hooks/useURLRequestParams";
const HistoricalScanPage = dynamic(
  () => import("~components/HistoricalScanPage"),
  {
    ssr: false,
  }
);

const ScanPage = dynamic(() => import("~components/ScanPageV2"), {
  ssr: false,
});

const ScanPageWrapper: React.FC = () => {
  const data = useURLRequestParams();
  const [, setLayoutConfig] = useLayoutConfig();
  const [isMounted, setIsMounted] = useState(false);

  const canConfirmTxn = Boolean(
    data && "isSolana" in data && data.isSolana && data.messageId
  );
  const forceSafeguard = Boolean(
    data && "forceSafeguard" in data && data.forceSafeguard
  );

  useLayoutEffect(() => {
    setLayoutConfig((prev) => ({
      ...prev,
      hasRequestParams: true,
      canConfirmTxn,
      forceSafeguard,
    }));

    // NOTE (Lolu): Added client-side mounting logic to address the hydration error.
    // This ensures consistent markup between server-side and client-side rendering.
    // The component initially renders as null during SSR and initial client render.
    // Once mounted on the client, it re-renders with the appropriate data-loaded component.

    setIsMounted(true);
  }, [setLayoutConfig]);

  if (!isMounted) {
    return null;
  }

  if (data && "isSolana" in data && data.isSolana) {
    return <ScanPageSolana data={data} />;
  } else {
    return <ScanPage data={data as ScanParamsSuccess} />;
  }
};

const Page: React.FC = () => {
  const queryParams = useQueryParams<{ id: string; active: boolean }>();
  const hasQueryParams = Object.keys(queryParams).length > 0;

  if (hasQueryParams) {
    return (
      <ApiClientProvider
        config={{
          basePath: process.env.NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string,
        }}
      >
        <ScanPageWrapper />
      </ApiClientProvider>
    );
  }

  return <HistoricalScanPage />;
};

export default Page;
