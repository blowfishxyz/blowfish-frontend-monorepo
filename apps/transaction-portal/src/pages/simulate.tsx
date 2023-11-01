import dynamic from "next/dynamic";
import React, { useLayoutEffect } from "react";
import { useLayoutConfig } from "~components/layout/Layout";
import { useQueryParams } from "~hooks/useQueryParams";
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

  useLayoutEffect(() => {
    setLayoutConfig((prev) => ({ ...prev, hasRequestParams: true }));
  }, [setLayoutConfig]);

  return <ScanPage data={data} />;
};

const Page: React.FC = () => {
  const queryParams = useQueryParams<{ id: string; active: boolean }>();
  const hasQueryParams = Object.keys(queryParams).length > 0;

  if (hasQueryParams) {
    return <ScanPageWrapper />;
  }

  return <HistoricalScanPage />;
};

export default Page;
