import { BlowfishIconFull } from "@blowfish/ui/icons";
import React from "react";
import { styled } from "styled-components";
import { UserWalletConnectKitWrapper } from "~__mocks__/UserWalletConnectKitWrapper";
import Menu from "./menu/Menu";
import { Row } from "@blowfish/ui/core";

const ProtectScreenWrapper = styled.div`
  padding: 40px;
  height: 100%;
`;

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

const ProtectHomeScreen = () => {
  return (
    <ProtectScreenWrapper>
      <ProtectScreenContent justify="space-between">
        <StyledBlowfishIconFull />
        <RightContentWrapper gap="md">
          <div>
            <UserWalletConnectKitWrapper />
          </div>
          <Menu />
        </RightContentWrapper>
      </ProtectScreenContent>
    </ProtectScreenWrapper>
  );
};

export default ProtectHomeScreen;
