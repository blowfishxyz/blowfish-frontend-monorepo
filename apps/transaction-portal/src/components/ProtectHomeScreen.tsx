import React from "react";
import { styled } from "styled-components";
import { ProtectLoadingScreen } from "./ProtectLoadingScreen";
import { Layout } from "./layout/Layout";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectHomeScreen = () => {
  return (
    <Layout>
      <LoadingWrapper>
        <ProtectLoadingScreen />
      </LoadingWrapper>
    </Layout>
  );
};

export default ProtectHomeScreen;
