import { Column } from "@blowfish/ui/core";
import { Severity } from "@blowfish/utils/types";
import React from "react";
import { createGlobalState } from "react-use";
import { styled } from "styled-components";
import { ProtectHeader } from "~components/ProtectHeader";

export const useLayoutConfig = createGlobalState<{ severity: Severity }>({
  severity: "INFO",
});

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [{ severity }] = useLayoutConfig();

  return (
    <Wrapper width="100%" height="100%" severity={severity}>
      <WrapperInner>
        <HeaderWrapper severity={severity} alignItems="center">
          <Column maxWidth={1072} width="100%" padding={24} paddingBottom={12}>
            <ProtectHeader />
          </Column>
        </HeaderWrapper>
        {children}
      </WrapperInner>
    </Wrapper>
  );
};

const Wrapper = styled(Column)<{ severity: Severity }>`
  background-color: ${({ theme, severity }) =>
    theme.severityColors[severity].backgroundV2};
`;

const WrapperInner = styled(Column)`
  height: calc(100% - 100px);
  width: 100%;
  max-width: 1072px;
  margin: 82px auto 18px;
  padding: 0 24px;
`;

const HeaderWrapper = styled(Column)<{ severity: Severity }>`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme, severity }) =>
    theme.severityColors[severity].backgroundV2};
`;
