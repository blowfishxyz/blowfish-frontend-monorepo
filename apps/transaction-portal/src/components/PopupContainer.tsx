import React from "react";
import styled, { css } from "styled-components";
import { ConnectKitButton } from "connectkit";

import type { Severity } from "@blowfish/utils/types";
import type {
  ChainFamily,
  ChainNetwork,
} from "@blowfish/utils/BlowfishApiClient";
import { shortenHex } from "../utils/hex";
import {
  REGULAR_BOTTOM_MENU_HEIGHT,
  SLIM_BOTTOM_MENU_HEIGHT,
} from "./BottomMenus";
import { TextSmall } from "./Typography";
import {
  EthereumIcon,
  PolygonIcon,
  ArbitrumIcon,
  BnbChainIcon,
} from "./icons/ChainIcons";
import { WalletIcon } from "./icons/WalletIcon";

const SLIM_BOTTOM_MENU_PADDING = SLIM_BOTTOM_MENU_HEIGHT + 12;
const REGULAR_BOTTOM_MENU_PADDING = REGULAR_BOTTOM_MENU_HEIGHT + 12;

const StyledWalletIcon = styled(WalletIcon)`
  width: 16px;
  height: auto;
  & > path {
    fill: rgba(0, 0, 0, 0.33);
  }
`;

const IconForChain: React.FC<{ chainFamily: ChainFamily }> = ({
  chainFamily,
}) => {
  switch (chainFamily) {
    case "ethereum":
      return <EthereumIcon style={{ height: "16px", width: "auto" }} />;
    case "polygon":
      return <PolygonIcon style={{ height: "14px", width: "auto" }} />;
    case "arbitrum":
      return <ArbitrumIcon style={{ height: "16px", width: "auto" }} />;
    case "bnb":
      return <BnbChainIcon style={{ height: "16px", width: "auto" }} />;
  }
};
const IconForChainMemo = React.memo(IconForChain);

const HeaderLeft = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;

  & > span {
    font-family: "GT-Planar";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    margin-left: 9px;
    color: rgba(0, 0, 0, 0.5);
    text-transform: capitalize;
  }
`;

export interface PopupContainerProps extends React.PropsWithChildren {
  style?: React.CSSProperties;
  className?: string;
  userAccount?: string;
  chainNetwork?: ChainNetwork;
  chainFamily?: ChainFamily;
  severity?: Severity;
  bottomMenuType?: MenuType;
}
type MenuType = "NONE" | "SLIM" | "FULL";
const Wrapper = styled.div<{ severity?: Severity; bottomMenuType?: MenuType }>`
  display: flex;
  position: relative;
  background-color: ${({ severity, theme }) =>
    theme.contextBackgroundColors[severity ?? "INFO"]};
  padding: 48px 12px 12px 12px;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 600px;
  margin: auto;
  box-sizing: border-box;
  ${({ bottomMenuType }) =>
    bottomMenuType === "SLIM"
      ? css`
          padding-bottom: ${SLIM_BOTTOM_MENU_PADDING}px;
        `
      : bottomMenuType === "FULL" &&
        css`
          padding-bottom: ${REGULAR_BOTTOM_MENU_PADDING}px;
        `}
`;

export const PopupContainer: React.FC<PopupContainerProps> = ({
  children,
  style,
  className,
  userAccount,
  chainFamily,
  chainNetwork,
  severity,
  bottomMenuType,
}) => {
  return (
    <Wrapper
      style={style}
      className={className}
      severity={severity}
      bottomMenuType={bottomMenuType}
    >
      {userAccount && (
        <HeaderLeft>
          <StyledWalletIcon />
          <ConnectKitButton />
          <TextSmall style={{ marginLeft: "9px" }} secondary>
            {shortenHex(userAccount)}
          </TextSmall>
        </HeaderLeft>
      )}
      {chainFamily && chainNetwork && (
        <HeaderRight>
          <IconForChainMemo chainFamily={chainFamily} />
          <span>
            {chainFamily} {chainNetwork}
          </span>
        </HeaderRight>
      )}
      {children}
    </Wrapper>
  );
};
