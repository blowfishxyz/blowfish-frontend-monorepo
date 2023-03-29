import dynamic from "next/dynamic";
import React from "react";

const ScanPage = dynamic(() => import("../components/client/ScanPage"), {
  ssr: false,
});

const Page: React.FC = () => <ScanPage />;

export default Page;
