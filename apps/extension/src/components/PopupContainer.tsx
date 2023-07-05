import {
  EthereumIcon,
  PolygonIcon,
  WalletIcon,
} from "@blowfish/protect-ui/icons";
import type { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import { shortenHex } from "@blowfish/utils/hex";
import type { Severity } from "@blowfish/utils/types";
import { Text } from "@blowfishxyz/ui";
import React from "react";
import styled, { css } from "styled-components";

const SLIM_BOTTOM_MENU_HEIGHT = 96;
const REGULAR_BOTTOM_MENU_HEIGHT = 154;

const SLIM_BOTTOM_MENU_PADDING = SLIM_BOTTOM_MENU_HEIGHT + 12;
const REGULAR_BOTTOM_MENU_PADDING = REGULAR_BOTTOM_MENU_HEIGHT + 12;

const StyledWalletIcon = styled(WalletIcon)`
  width: 16px;
  height: auto;
  & > path {
    fill: rgba(0, 0, 0, 0.33);
  }
`;

const StyledEthereumIcon = styled(EthereumIcon)`
  height: 16px;
  width: auto;
`;

const StyledPolygonIcon = styled(PolygonIcon)`
  height: 14px;
  width: auto;
`;

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
    theme.severityColors[severity ?? "INFO"].background};
  min-height: 100vh;
  height: 100%;
  width: 100%;
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
          <Text style={{ marginLeft: "9px" }} design="secondary" size="sm">
            {shortenHex(userAccount)}
          </Text>
        </HeaderLeft>
      )}
      {chainFamily && chainNetwork && (
        <HeaderRight>
          {chainFamily === "polygon" ? (
            <StyledPolygonIcon />
          ) : (
            <StyledEthereumIcon />
          )}
          <span>
            {chainFamily} {chainNetwork}
          </span>
        </HeaderRight>
      )}
      {children}
    </Wrapper>
  );
};
