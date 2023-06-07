import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useV2Enabled } from "~hooks/useV2Enabled";

const Home = () => {
  const router = useRouter();
  const [v2Enabled, loading] = useV2Enabled();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (v2Enabled) {
      router.replace("/start");
    } else {
      router.replace("https://extension.blowfish.xyz");
    }
  }, [router, v2Enabled, loading]);

  return <></>;
};

export default Home;
