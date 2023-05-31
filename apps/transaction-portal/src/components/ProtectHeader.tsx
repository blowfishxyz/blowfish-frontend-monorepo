import React from "react";
import { styled } from "styled-components";
import { Row } from "@blowfish/ui/core";
import { BlowfishIconFull } from "@blowfish/ui/icons";
import { Menu } from "./menu/Menu";
import { UserWalletConnectKitWrapper } from "./UserWalletConnectKitWrapper";

const ProtectScreenContent = styled(Row)`
  width: 100%;
`;

const StyledBlowfishIconFull = styled(BlowfishIconFull)`
  width: 130px;
  flex-shrink: 0;
`;

const RightContentWrapper = styled(Row)`
  width: unset;
`;

export const ProtectHeader = () => {
  return (
    <ProtectScreenContent justifyContent="space-between">
      <StyledBlowfishIconFull />
      <RightContentWrapper gap="md">
        <UserWalletConnectKitWrapper hideConnect />
        <Menu />
      </RightContentWrapper>
    </ProtectScreenContent>
  );
};
