import { shortenEnsName } from "~utils/utils";
import { SwitchIcon } from "~components/icons/SwitchIcon";
import { Chain } from "wagmi";
import styled from "styled-components";
import { Column, Text } from "@blowfishxyz/ui";
import { ChainIcon } from "connectkit";
import { shortenHex } from "~utils/hex";
import { MaskIcon } from "./icons/MaskIcon";
import { useState } from "react";
import { ImmutableIcon } from "@blowfish/protect-ui/icons";

const StyledContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 58px;
  padding: 6px 9px;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  height: 45px;
  max-width: 216px;
`;

const Connected = styled.div`
  position: absolute;
  bottom: 0;
  left: 25px;
  border-radius: 50%;
  background: #00b94a;
  height: 8px;
  width: 8px;
  outline: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};
`;

const ChainContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;

  svg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

const AddressColumn = styled(Column)`
  text-align: left;
  line-height: 17px;

  span:nth-child(2) {
    opacity: 0.5;
    font-size: 11px;
    line-height: 13px;
  }
`;

const SwitchIconContainer = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type UserWalletProps = {
  show: (() => void) | undefined;
  truncatedAddress: string | undefined;
  ensName: string | undefined;
  isConnecting: boolean;
  isConnected: boolean;
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
};

export const UserWallet = ({
  show,
  truncatedAddress,
  ensName,
  isConnecting,
  isConnected,
  chain,
}: UserWalletProps) => {
  const isImx = chain?.id === 13371 || chain?.id === 13473;
  return (
    <StyledContainer onClick={show}>
      {!isConnected && isConnecting && <Text>Connecting...</Text>}
      {!isConnected && !isConnecting && <Text>Connect wallet</Text>}
      {isConnected && (
        <>
          <ChainContainer>
            {isImx ? (
              <ImmutableIcon />
            ) : (
              <ChainIcon
                id={chain?.id}
                unsupported={chain?.unsupported}
                size={30}
              />
            )}
            {!chain?.unsupported && <Connected />}
          </ChainContainer>
          <AddressColumn>
            {ensName && <Text>{shortenEnsName(ensName)}</Text>}
            <Text>{truncatedAddress}</Text>
          </AddressColumn>
          <SwitchIconContainer>
            <SwitchIcon />
          </SwitchIconContainer>
        </>
      )}
    </StyledContainer>
  );
};

type ImpersonatorWalletProps = {
  address: string;
  chainIcon: JSX.Element;
};

export const ImpersonatorWallet = ({
  address,
  chainIcon,
}: ImpersonatorWalletProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <StyledContainer>
      <ChainContainer>
        <MaskIcon />
      </ChainContainer>
      <AddressColumn>
        {copied ? (
          <Text>Copied!</Text>
        ) : (
          <Text onClick={copyToClipboard}>{shortenHex(address)}</Text>
        )}
      </AddressColumn>
      <ChainContainer>{chainIcon}</ChainContainer>
    </StyledContainer>
  );
};
