import React from "react";
import { styled } from "styled-components";
import { ChainIcon } from "connectkit";
import { Chain } from "wagmi";
import { Column, Text } from "@blowfish/ui/core";
import { shortenEnsName } from "~utils/utils";
import { SwitchIcon } from "~components/icons/SwitchIcon";

const UserWalletConnectContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 58px;
  padding: 10px;
  gap: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const UserWalletConnectConnected = styled.div`
  position: absolute;
  bottom: 0;
  left: 25px;
  border-radius: 50%;
  background: #00b94a;
  height: 8px;
  width: 8px;
  outline: 2px solid white;
`;

const UserWalletAddress = styled(Column)`
  text-align: left;
  line-height: 17px;

  span:nth-child(2) {
    opacity: 0.5;
    font-size: 11px;
    line-height: 13px;
  }
`;

const ChangeAccountContainer = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export type UserWalletProps = {
  show: (() => void) | undefined;
  truncatedAddress: string | undefined;
  ensName: string | undefined;
  isConnecting: boolean;
  isConnected: boolean;
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
};

const UserWalletConnect = ({
  show,
  truncatedAddress,
  ensName,
  isConnecting,
  isConnected,
  chain,
}: UserWalletProps) => {
  const getUserWalletMessage = (
    isConnected: boolean,
    isConnecting: boolean
  ) => {
    if (!isConnected && isConnecting) {
      return "Connecting...";
    } else if (!isConnected && !isConnecting) {
      return "Connect wallet";
    } else {
      return (
        <UserWalletAddress>
          {ensName && <Text>{shortenEnsName(ensName)}</Text>}
          <Text>{truncatedAddress}</Text>
        </UserWalletAddress>
      );
    }
  };

  const userWalletMessage = getUserWalletMessage(isConnected, isConnecting);

  return (
    <UserWalletConnectContainer onClick={show}>
      <div>
        <ChainIcon id={chain?.id} unsupported={chain?.unsupported} size={30} />
        {!chain?.unsupported && <UserWalletConnectConnected />}
      </div>
      {userWalletMessage}
      <ChangeAccountContainer>
        <SwitchIcon />
      </ChangeAccountContainer>
    </UserWalletConnectContainer>
  );
};

export default UserWalletConnect;
