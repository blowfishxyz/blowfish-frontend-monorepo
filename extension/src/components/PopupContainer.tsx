import React from "react";
import styled from "styled-components";

import { BlowfishLogo } from "./logos/BlowfishLogo";
import { WalletLogo } from "./logos/WalletLogo";
import { EthereumLogo } from "./logos/ChainLogos";
import { shortenAddress } from "../utils/hex";
import type { ChainNetwork, ChainFamily } from "../utils/BlowfishApiClient";

const StyledBlowfishLogo = styled(BlowfishLogo)`
  width: 105px;
  height: auto;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 24px;
  text-align: center;
  & > path {
    fill: rgba(0, 0, 0, 0.5);
  }
`;

const StyledWalletLogo = styled(WalletLogo)`
  width: 16px;
  height: auto;
  & > path {
    fill: rgba(0, 0, 0, 0.33);
  }
`;

const StyledEthereumLogo = styled(EthereumLogo)`
  height: 16px;
  width: auto;
  & > path {
    fill: rgba(0, 0, 0, 0.33);
  }
`;

const HeaderUserAddress = styled.span`
  font-family: "GT Planar";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  color: rgba(0, 0, 0, 0.5);
  margin-left: 9px;
`;

const HeaderLeft = styled.div`
  position: absolute;
  top: 16px;
  width: 100%;
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

type InformationContext = "INFO" | "WARNING" | "CRITICAL";

interface PopupContainerProps extends React.PropsWithChildren {
  style?: React.CSSProperties;
  className?: string;
  userAddress?: string;
  chainNetwork?: ChainNetwork;
  chainFamily?: ChainFamily;
  informationContext?: InformationContext;
}
const Wrapper = styled.div<{ informationContext?: InformationContext }>`
  display: flex;
  position: relative;
  background-color: ${({ informationContext }) =>
    informationContext === "CRITICAL"
      ? "#FFC1AD"
      : informationContext === "WARNING"
      ? " #FFD567"
      : "#EFF2F0"};
  padding: 48px 12px 75px 12px;
  height: min-content;
  width: min-content;
`;
export const PopupContainer: React.FC<PopupContainerProps> = ({
  children,
  style,
  className,
  userAddress,
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
      {userAddress && (
        <HeaderLeft>
          <StyledWalletLogo />
          <HeaderUserAddress>{shortenAddress(userAddress)}</HeaderUserAddress>
        </HeaderLeft>
      )}
      {chainFamily && chainNetwork && (
        <HeaderRight>
          <StyledEthereumLogo />
          <span>
            {chainFamily} {chainNetwork}
          </span>
        </HeaderRight>
      )}
      {children}
      <StyledBlowfishLogo />
    </Wrapper>
  );
};
