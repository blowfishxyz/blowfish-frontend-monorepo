import styled from "styled-components";

import { TextButton, Text } from "@blowfish/ui/core";
import { WalletIcon, FaLink, FaUnlink } from "@blowfish/ui/icons";
import { shortenHex } from "@blowfish/utils/hex";

const StyledWalletIcon = styled(WalletIcon)`
  width: 16px;
  height: auto;

  & > path {
    fill: rgba(0, 0, 0, 0.33);
  }
`;

const CustomConnectButton = styled(TextButton)`
  display: flex;
  align-items: center;

  :hover {
    opacity: 0.7;
  }
`;

const StyledLinkIcon = styled(FaLink)`
  height: 12px;
  margin-left: 3px;
  width: auto;
  fill: rgba(0, 0, 0, 0.4);
`;

const StyledUnlinkIcon = styled(FaUnlink)`
  height: 12px;
  margin-left: 3px;
  width: auto;
  fill: rgba(0, 0, 0, 0.5);
`;
const StyledText = styled(Text).attrs({ size: "sm", design: "secondary" })`
  margin-left: 9px;
`;

// NOTE(kimpers): Lifted from ConnectKitButton
interface ConnectButton {
  show?: () => void;
  isConnected: boolean;
  isConnecting: boolean;
  address?: `0x${string}`;
  ensName?: string;
}

// NOTE: The display component is separated from the connect logic
// so that we can use it directly in the storybook
export const ConnectButton: React.FC<ConnectButton> = ({
  show,
  address,
  ensName,
  isConnecting,
  isConnected,
}) => (
  <CustomConnectButton onClick={show}>
    <StyledWalletIcon />
    <StyledText>
      {isConnecting
        ? "Connecting..."
        : ensName ?? (address ? shortenHex(address) : "Connect wallet")}
    </StyledText>
    {isConnecting ? null : isConnected ? (
      <StyledUnlinkIcon />
    ) : (
      <StyledLinkIcon />
    )}
  </CustomConnectButton>
);
