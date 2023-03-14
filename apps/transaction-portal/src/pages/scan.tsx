import dynamic from "next/dynamic";
import React from "react";
import { Providers } from "~components/Providers";

const ScanResult = dynamic(() => import("../components/ScanResult"), {
  ssr: false,
});

const Page: React.FC = () => (
  <Providers>
    <ScanResult />
  </Providers>
);

export default Page;
