import React from "react";
import { styled } from "styled-components";
import ProtectHeader from "./ProtectHeader";

const ProtectScreenWrapper = styled.div`
  padding: 40px;
  height: 100%;
  background: #efefef;
`;

const ProtectHomeScreen = () => {
  return (
    <ProtectScreenWrapper>
      <ProtectHeader />
    </ProtectScreenWrapper>
  );
};

export default ProtectHomeScreen;
