import dynamic from "next/dynamic";
import React from "react";

const DashboardPage = dynamic(
  () => import("../../components/client/DashboardPage"),
  {
    ssr: false,
  }
);

const Page: React.FC = () => <DashboardPage />;

export default Page;
