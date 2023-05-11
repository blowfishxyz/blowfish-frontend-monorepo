import React from "react";
import { styled } from "styled-components";
import ProtectHeader from "./ProtectHeader";
import ProtectLoadingScreen from "./ProtectLoadingScreen";

const ProtectScreenWrapper = styled.div`
  padding: 40px;
  height: 100%;
  background: #efefef;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectHomeScreen = () => {
  return (
    <ProtectScreenWrapper>
      <ProtectHeader />
      <LoadingWrapper>
        <ProtectLoadingScreen />
      </LoadingWrapper>
    </ProtectScreenWrapper>
  );
};

export default ProtectHomeScreen;
