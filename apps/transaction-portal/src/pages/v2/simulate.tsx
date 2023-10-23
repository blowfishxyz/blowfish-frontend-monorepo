import dynamic from "next/dynamic";
import React, { useLayoutEffect } from "react";
import { useLayoutConfig } from "~components/layout/Layout";
import { useURLRequestParams } from "~hooks/useURLRequestParams";
import { MessageError } from "~utils/utils";

const HistoricalDataPage = dynamic(
  () => import("~components/HistoricalDataPage"),
  {
    ssr: false,
  }
);

const ScanPage = dynamic(() => import("~components/ScanPageV2"), {
  ssr: false,
});

const Page: React.FC = () => {
  const data = useURLRequestParams();
  const [, setLayoutConfig] = useLayoutConfig();

  useLayoutEffect(() => {
    setLayoutConfig((prev) => ({ ...prev, hasRequestParams: true }));
  }, [setLayoutConfig]);

  if (data) {
    if ("error" in data) {
      if (data.error === MessageError.PARAMS_NOT_OK) {
        return <HistoricalDataPage />;
      }
    }
  }
  return <ScanPage data={data} />;
};

export default Page;
