import { ApiClientProvider } from "@blowfishxyz/ui";
import dynamic from "next/dynamic";
import React from "react";
import { useScanParams } from "~hooks/useScanParams";

const ScanPage = dynamic(() => import("~components/ScanPageV2"), {
  ssr: false,
});

const Page: React.FC = () => {
  const data = useScanParams();

  return (
    <ApiClientProvider
      config={{
        basePath: process.env.NEXT_PUBLIC_BLOWFISH_API_BASE_URL as string,
      }}
    >
      <ScanPage data={data} />
    </ApiClientProvider>
  );
};

export default Page;
