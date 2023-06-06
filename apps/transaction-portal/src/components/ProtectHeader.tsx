import React from "react";
import { styled } from "styled-components";
import { Row } from "@blowfish/ui/core";
import { BlowfishIconFull } from "@blowfish/ui/icons";
import { Menu } from "./menu/Menu";
import { UserWalletConnectKitWrapper } from "./UserWalletConnectKitWrapper";
import { useLayoutConfig } from "./layout/Layout";

const ProtectScreenContent = styled(Row)`
  width: 100%;
`;

const StyledBlowfishIconFull = styled(BlowfishIconFull)<{ $contrast: boolean }>`
  width: 130px;
  flex-shrink: 0;

  path {
    fill: ${(p) =>
      p.$contrast ? p.theme.colors.backgroundPrimary : undefined};
  }
`;

const RightContentWrapper = styled(Row)`
  width: unset;
`;

export const ProtectHeader = () => {
  const [layoutConfig] = useLayoutConfig();
  return (
    <ProtectScreenContent justifyContent="space-between">
      <StyledBlowfishIconFull
        $contrast={layoutConfig.severity === "CRITICAL"}
      />
      <RightContentWrapper gap="md">
        <UserWalletConnectKitWrapper />
        <Menu />
      </RightContentWrapper>
    </ProtectScreenContent>
  );
};
