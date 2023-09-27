import dynamic from "next/dynamic";
import React, { useLayoutEffect } from "react";
import { useLayoutConfig } from "~components/layout/Layout";
import { useURLRequestParams } from "~hooks/useURLRequestParams";

const ScanPage = dynamic(() => import("~components/ScanPageV2"), {
  ssr: false,
});

const Page: React.FC = () => {
  const data = useURLRequestParams();
  const [, setLayoutConfig] = useLayoutConfig();

  useLayoutEffect(() => {
    setLayoutConfig((prev) => ({ ...prev, hasRequestParams: true }));
  }, [setLayoutConfig]);

  return <ScanPage data={data} />;
};

export default Page;
