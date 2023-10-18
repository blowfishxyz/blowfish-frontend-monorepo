import React from "react";
import dynamic from "next/dynamic";

const HistoricalDataPage = dynamic(
  () => import("~components/HistoricalDataPage"),
  {
    ssr: false,
  }
);

const Page: React.FC = () => {
  return <HistoricalDataPage />;
};

export default Page;
