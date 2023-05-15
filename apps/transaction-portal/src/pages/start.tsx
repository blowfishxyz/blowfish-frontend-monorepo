import dynamic from "next/dynamic";
import React from "react";
import { BLOWFISH_V2_ENABLED } from "~config";

const StartPage = dynamic(() => import("../components/client/StartPage"), {
  ssr: false,
});

const Page: React.FC = () => <StartPage />;

export async function getStaticProps() {
  if (!BLOWFISH_V2_ENABLED) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
}

export default Page;
