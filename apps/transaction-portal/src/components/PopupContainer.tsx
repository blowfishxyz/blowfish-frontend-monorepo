import {
  ArbitrumIcon,
  BnbChainIcon,
  EthereumIcon,
  PolygonIcon,
} from "@blowfish/ui/icons";
import type { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import type { Severity } from "@blowfish/utils/types";
import React from "react";
import styled, { css } from "styled-components";
import { Text } from "@blowfish/ui/core";
import { shortenHex } from "~utils/hex";

import {
  REGULAR_BOTTOM_MENU_HEIGHT,
  SLIM_BOTTOM_MENU_HEIGHT,
} from "./BottomMenus";
import { CustomConnectkitButton } from "./CustomConnectkitButton";
import { MaskIcon } from "./icons/MaskIcon";
import { OptimismIcon } from "@blowfish/ui/icons";

const SLIM_BOTTOM_MENU_PADDING = SLIM_BOTTOM_MENU_HEIGHT + 12;
const REGULAR_BOTTOM_MENU_PADDING = REGULAR_BOTTOM_MENU_HEIGHT + 12;

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
    case "optimism":
      return <OptimismIcon style={{ height: "16px", width: "auto" }} />;
  }
};
const IconForChainMemo = React.memo(IconForChain);

const HeaderLeft = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 24px;
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

const StyledMaskIcon = styled(MaskIcon)`
  width: 14px;
  height: auto;

  & > path {
    fill: rgba(0, 0, 0, 0.33);
  }
`;

export interface PopupContainerProps extends React.PropsWithChildren {
  impersonatingWallet?: string;
  style?: React.CSSProperties;
  className?: string;
  chainNetwork?: ChainNetwork;
  chainFamily?: ChainFamily;
  severity?: Severity;
  bottomMenuType?: MenuType;
}

type MenuType = "NONE" | "SLIM" | "FULL";
const Wrapper = styled.div<{
  $severity?: Severity;
  $bottomMenuType?: MenuType;
}>`
  display: flex;
  position: relative;
  background-color: ${({ $severity, theme }) =>
    theme.severityColors[$severity ?? "INFO"].background};
  padding: 48px 12px 12px 12px;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  max-width: 600px;
  margin: auto;
  ${({ $bottomMenuType }) =>
    $bottomMenuType === "SLIM"
      ? css`
          padding-bottom: ${SLIM_BOTTOM_MENU_PADDING}px;
        `
      : $bottomMenuType === "FULL" &&
        css`
          padding-bottom: ${REGULAR_BOTTOM_MENU_PADDING}px;
        `}
`;

const WalletAddress = styled(Text).attrs({ size: "sm" })`
  margin-left: 9px;
  color: rgba(0, 0, 0, 0.5);
`;

export const PopupContainer: React.FC<PopupContainerProps> = ({
  impersonatingWallet,
  children,
  style,
  className,
  chainFamily,
  chainNetwork,
  severity,
  bottomMenuType,
}) => {
  return (
    <Wrapper
      style={style}
      className={className}
      $severity={severity}
      $bottomMenuType={bottomMenuType}
    >
      <HeaderLeft>
        {impersonatingWallet && (
          <div>
            <StyledMaskIcon />
            <WalletAddress>{shortenHex(impersonatingWallet)}</WalletAddress>
          </div>
        )}
        <CustomConnectkitButton />
      </HeaderLeft>
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
