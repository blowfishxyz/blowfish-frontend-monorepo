import React from "react";
import { styled } from "styled-components";
import { Row } from "@blowfish/ui/core";
import { UserWalletConnectKitWrapper } from "../__mocks__/UserWalletConnectKitWrapper";
import { BlowfishIconFull } from "@blowfish/ui/icons";
import Menu from "./menu/Menu";

const ProtectScreenContent = styled(Row)`
  width: 100%;
`;

const StyledBlowfishIconFull = styled(BlowfishIconFull)`
  width: 130px;
  height: 100%;
`;

const RightContentWrapper = styled(Row)`
  width: unset;
`;

const ProtectHeader = () => {
  return (
    <ProtectScreenContent justify="space-between">
      <StyledBlowfishIconFull />
      <RightContentWrapper gap="md">
        <div>
          <UserWalletConnectKitWrapper />
        </div>
        <Menu />
      </RightContentWrapper>
    </ProtectScreenContent>
  );
};

export default ProtectHeader;
