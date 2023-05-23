import dynamic from "next/dynamic";
import React from "react";
import { BLOWFISH_V2_ENABLED } from "~config";

const DashboardPage = dynamic(
  () => import("../components/client/DashboardPage"),
  {
    ssr: false,
  }
);

const Page: React.FC = () => <DashboardPage />;

export async function getStaticProps() {
  if (!BLOWFISH_V2_ENABLED) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
}

export default Page;
