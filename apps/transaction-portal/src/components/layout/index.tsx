import { Column } from "@blowfish/ui/core";
import React from "react";
import { styled } from "styled-components";
import ProtectHeader from "~components/ProtectHeader";

const Wrapper = styled(Column)`
  height: 100%;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px;
`;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <ProtectHeader />
      <Column>{children}</Column>
    </Wrapper>
  );
};

export default Layout;
