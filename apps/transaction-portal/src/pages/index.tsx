import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("https://extension.blowfish.xyz");
  }, [router]);

  return <></>;
};

export default Home;
