import dynamic from "next/dynamic";
import React from "react";

const StartPage = dynamic(() => import("../components/client/StartPage"), {
  ssr: false,
});

const Page: React.FC = () => <StartPage />;

export default Page;
