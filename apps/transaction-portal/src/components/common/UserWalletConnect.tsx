import React, { useState } from "react";
import { styled } from "styled-components";
import { ChainIcon } from "connectkit";
import { Chain } from "wagmi";
import { Column, Row, Text } from "@blowfish/ui/core";
import { PlusIcon } from "@blowfish/ui/icons";
import { SwitchIcon } from "~components/icons/SwitchIcon";
import { copyToClipboard, shortenEnsName } from "~utils/utils";
import { shortenHex } from "@blowfish/utils/hex";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

const UserWalletConnectContainer = styled(Row)`
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 58px;
  padding: 5px 8px;
  gap: 10px;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
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
  cursor: pointer;
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
  cursor: pointer;
`;

export type UserWalletProps = {
  show: (() => void) | undefined;
  address: string | undefined;
  ensName: string | undefined;
  isConnecting: boolean;
  isConnected: boolean;
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
};

export const UserWalletConnect: React.FC<UserWalletProps> = ({
  show,
  address,
  ensName,
  isConnected,
  isConnecting,
  chain,
}) => {
  const [open, setOpen] = useState(false);

  const handleTooltipTriggerClick = () => {
    copyToClipboard(address);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const renderUserWalletMessage = () => {
    if (!isConnected && isConnecting) {
      return (
        <UserWalletAddress>
          <Text size="sm" design="primary">
            Connecting...
          </Text>
        </UserWalletAddress>
      );
    }

    if (!isConnected && !isConnecting) {
      return (
        <UserWalletAddress>
          <Text size="sm" design="primary">
            Connect
          </Text>
          <Text size="xxs" opacity="0.5" design="secondary">
            No wallet linked
          </Text>
        </UserWalletAddress>
      );
    }

    return (
      <UserWalletAddress>
        <Text size="sm" design="primary">
          {ensName
            ? shortenEnsName(ensName, true)
            : address && shortenHex(address)}
        </Text>
        <Tooltip open={open}>
          <TooltipTrigger onClick={handleTooltipTriggerClick}>
            <Text size="xxs" opacity="0.5" design="secondary">
              {address && shortenHex(address)}
            </Text>
          </TooltipTrigger>
          <TooltipContent>Address copied to clipboard</TooltipContent>
        </Tooltip>
      </UserWalletAddress>
    );
  };

  const isActive = isConnected && !chain?.unsupported;

  return (
    <UserWalletConnectContainer justifyContent="center" alignItems="center">
      <ChainContainer>
        <ChainIcon id={chain?.id} unsupported={chain?.unsupported} size={30} />
        <UserWalletConnectConnected $isActive={isActive} />
      </ChainContainer>
      {renderUserWalletMessage()}
      <ChangeAccountContainer onClick={show}>
        {!isConnected ? <PlusIcon /> : <SwitchIcon />}
      </ChangeAccountContainer>
    </UserWalletConnectContainer>
  );
};
