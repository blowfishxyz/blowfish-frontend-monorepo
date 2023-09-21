import dynamic from "next/dynamic";
import React from "react";
import { useScanParams } from "~hooks/useScanParams";

const ScanPage = dynamic(() => import("~components/ScanPageV2"), {
  ssr: false,
});

const Page: React.FC = () => {
  const data = useScanParams();

  return <ScanPage data={data} isRequestParam={false} />;
};

export default Page;
