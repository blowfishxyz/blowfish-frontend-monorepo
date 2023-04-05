import styled from "styled-components";

import { TextButton } from "@blowfish/ui/core";
import { TextSmall } from "./Typography";
import { WalletIcon, FaLink, FaUnlink } from "@blowfish/ui/icons";
import { shortenHex } from "../utils/hex";

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
  fill: ${({ theme }) => theme.colors.secondaryText};
`;

const StyledUnlinkIcon = styled(FaUnlink)`
  height: 12px;
  margin-left: 3px;
  width: auto;
  fill: ${({ theme }) => theme.colors.secondaryText};
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
    <TextSmall style={{ marginLeft: "9px" }} secondary>
      {isConnecting
        ? "Connecting..."
        : ensName ?? (address ? shortenHex(address) : "Connect wallet")}
    </TextSmall>
    {isConnecting ? null : isConnected ? (
      <StyledUnlinkIcon />
    ) : (
      <StyledLinkIcon />
    )}
  </CustomConnectButton>
);
