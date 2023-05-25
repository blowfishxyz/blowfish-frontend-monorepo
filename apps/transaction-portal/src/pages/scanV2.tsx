import dynamic from "next/dynamic";
import React from "react";

const ScanPageV2 = dynamic(() => import("../modules/scan/components/ScanPageV2").then((module) => module.ScanPageV2), {
  ssr: false,
});

const Page: React.FC = () => <ScanPageV2 />;

export default Page;