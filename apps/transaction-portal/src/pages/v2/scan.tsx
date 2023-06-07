import dynamic from "next/dynamic";
import React from "react";

const ScanPage = dynamic(
  () => import("../../modules/scan/components/ScanPageV2"),
  {
    ssr: false,
  }
);

const Page: React.FC = () => <ScanPage />;

export default Page;
