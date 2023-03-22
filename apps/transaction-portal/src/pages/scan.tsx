import dynamic from "next/dynamic";
import React from "react";
import { Providers } from "~components/Providers";

const ScanPage = dynamic(() => import("../components/client/ScanPage"), {
  ssr: false,
});

const Page: React.FC = () => (
  <Providers>
    <ScanPage />
  </Providers>
);

export async function getServerSideProps({ query }: { query: { id: string } }) {
  if (!query.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

export default Page;
