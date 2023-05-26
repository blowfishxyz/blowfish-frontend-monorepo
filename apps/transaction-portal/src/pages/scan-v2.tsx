import dynamic from "next/dynamic";
import React from "react";
import { BLOWFISH_V2_ENABLED } from "~config";

const ScanPage = dynamic(
  () => import("../modules/scan/components/ScanPageV2"),
  {
    ssr: false,
  }
);

const Page: React.FC = () => <ScanPage />;

export async function getStaticProps() {
  if (!BLOWFISH_V2_ENABLED) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
}

export default Page;
