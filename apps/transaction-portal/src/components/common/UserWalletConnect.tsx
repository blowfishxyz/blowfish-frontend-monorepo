import React from "react";
import { styled } from "styled-components";
import { ChainIcon } from "connectkit";
import { Chain } from "wagmi";
import { Column, Text } from "@blowfish/ui/core";
import { PlusIcon } from "@blowfish/ui/icons";
import { SwitchIcon } from "~components/icons/SwitchIcon";
import { shortenEnsName } from "~utils/utils";

const UserWalletConnectContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 58px;
  padding: 5px 8px;
  gap: 10px;
  max-width: 185px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ChainContainer = styled.div`
  position: relative;
`;

const UserWalletConnectConnected = styled.div<{ $isActive: boolean }>`
  position: absolute;
  bottom: 0;
  left: 25px;
  border-radius: 50%;
  background: ${({ $isActive }) => ($isActive ? "#00b94a" : "#B9B9B9")};
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

export const UserWalletConnect: React.FC<UserWalletProps> = ({
  show,
  truncatedAddress,
  ensName,
  isConnected,
  chain,
}) => {
  const renderUserWalletMessage = () => {
    if (!isConnected) {
      return (
        <UserWalletAddress>
          <Text size="sm" design="primary">
            Connect
          </Text>
          <Text size="xs" design="secondary">
            No wallet linked
          </Text>
        </UserWalletAddress>
      );
    } else {
      return (
        <UserWalletAddress>
          {ensName && (
            <Text size="sm" design="primary">
              {shortenEnsName(ensName)}
            </Text>
          )}
          <Text size="xs" design="secondary">
            {truncatedAddress}
          </Text>
        </UserWalletAddress>
      );
    }
  };

  const isActive = isConnected && !chain?.unsupported;

  return (
    <UserWalletConnectContainer onClick={show}>
      <ChainContainer>
        <ChainIcon id={chain?.id} unsupported={chain?.unsupported} size={30} />
        <UserWalletConnectConnected $isActive={isActive} />
      </ChainContainer>
      {renderUserWalletMessage()}
      <ChangeAccountContainer>
        {!isConnected ? <PlusIcon /> : <SwitchIcon />}
      </ChangeAccountContainer>
    </UserWalletConnectContainer>
  );
};
