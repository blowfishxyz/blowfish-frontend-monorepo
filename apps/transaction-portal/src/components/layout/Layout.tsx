import { Column } from "@blowfish/ui/core";
import React from "react";
import { styled } from "styled-components";
import { ProtectHeader } from "~components/ProtectHeader";

const Wrapper = styled(Column)`
  height: calc(100% - 100px);
  width: 100%;
  max-width: 1072px;
  margin: 82px auto 18px;
  padding: 0 24px;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  max-width: 1072px;
  padding: 24px 24px 12px;
  margin: 0 auto;
  background-color: #ffffff;
`;

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <ProtectHeader />
      </HeaderWrapper>
      {children}
    </Wrapper>
  );
};
