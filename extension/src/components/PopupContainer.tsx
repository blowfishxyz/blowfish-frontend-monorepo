import React from "react";
import styled from "styled-components";

import { WalletIcon } from "./icons/WalletIcon";
import { EthereumIcon } from "./icons/ChainIcons";
import { shortenHex } from "../utils/hex";
import { TextSmall } from "./Typography";
import type { ChainNetwork, ChainFamily } from "../utils/BlowfishApiClient";
import type { InformationContext } from "../types";

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
  & > path {
    fill: rgba(0, 0, 0, 0.33);
  }
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
    font-family: "GT Planar";
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
  informationContext?: InformationContext;
}
const Wrapper = styled.div<{ informationContext?: InformationContext }>`
  display: flex;
  position: relative;
  background-color: ${({ informationContext, theme }) =>
    theme.contextBackgroundColors[informationContext ?? "INFO"]};
  padding: 48px 12px 12px 12px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const PopupContainer: React.FC<PopupContainerProps> = ({
  children,
  style,
  className,
  userAccount,
  chainFamily,
  chainNetwork,
  informationContext,
}) => {
  return (
    <Wrapper
      style={style}
      className={className}
      informationContext={informationContext}
    >
      {userAccount && (
        <HeaderLeft>
          <StyledWalletIcon />
          <TextSmall style={{ marginLeft: "9px" }} secondary>
            {shortenHex(userAccount)}
          </TextSmall>
        </HeaderLeft>
      )}
      {chainFamily && chainNetwork && (
        <HeaderRight>
          <StyledEthereumIcon />
          <span>
            {chainFamily} {chainNetwork}
          </span>
        </HeaderRight>
      )}
      {children}
    </Wrapper>
  );
};
