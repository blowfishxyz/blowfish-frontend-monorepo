import dynamic from "next/dynamic";
import React from "react";
import { useURLRequestParams } from "~hooks/useURLRequestParams";

const ScanPage = dynamic(() => import("~components/ScanPageV2"), {
  ssr: false,
});

const Page: React.FC = () => {
  const data = useURLRequestParams();

  return <ScanPage data={data} />;
};

export default Page;
