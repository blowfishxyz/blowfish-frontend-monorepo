import dynamic from "next/dynamic";
import React from "react";
import { useURLRequestParams } from "~hooks/useURLRequestParams";
import { normalizeData } from "~utils/utils";

const ScanPage = dynamic(() => import("~components/ScanPageV2"), {
  ssr: false,
});

const Page: React.FC = () => {
  const data = useURLRequestParams();
  const normalizedData = normalizeData(data);

  return <ScanPage data={normalizedData} isRequestParams />;
};

export default Page;
