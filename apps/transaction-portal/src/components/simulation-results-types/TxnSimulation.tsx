import React, { useState } from "react";
import styled, { css } from "styled-components";
import { ArrowRightIcon } from "@blowfish/ui/icons";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { SmallGrayText, TxnImage } from "./common";
import { RawInfo } from "./mock-data";
import PreviewTokens from "~components/cards/PreviewTokens";

const TxnSimulationWrapper = styled(Row)`
  margin-bottom: 20px;
`;

const TxnSimulationImageMsgWrapper = styled(Row)`
  width: unset;

  @media (${device.lg}) {
    gap: 24px;
  }
`;

const TxnSimulationImage = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const TxnSimulationText = styled(Text)`
  max-width: 150px;
  font-size: 13px;
  line-height: 21px;

  @media (${device.lg}) {
    font-size: 15px;
  }
`;

const TxnSimulationValue = styled(Column)`
  width: unset;
`;

const ArrowIconWrapper = styled.div<{ $isReceived: boolean }>`
  position: absolute;
  height: 14px;
  width: 14px;
  padding: 6px;
  top: -10px;
  right: -10px;
  background: ${({ $isReceived }) => ($isReceived ? "#BEEDD2" : "#FFCCCC")};
  border-radius: 50%;
  padding: 5px;
  box-sizing: initial;

  svg {
    ${({ $isReceived }) => css`
      fill: ${$isReceived ? "#00bfa6" : "#ff4c4c"};
      transform: rotate(${$isReceived ? 135 : -45}deg);
      transform-origin: center;
    `};
  }
`;

interface TxnSimulationProps {
  txnData: RawInfo;
}

const TxnSimulation: React.FC<TxnSimulationProps> = ({ txnData }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { kind } = txnData;
  const { metadata, name, tokenId, asset } = txnData.data || {};

  const { rawImageUrl } = metadata || {};
  const { imageUrl, symbol } = asset || {};

  const isApproval = kind?.includes("APPROVAL");
  const isERC721 = kind.includes("ERC721");
  const isERC20 = kind.includes("ERC20");
  const displayText = isERC20
    ? `$${name} (${symbol})`
    : `${name} #${tokenId}`;

  const imageSrc = isERC721 ? rawImageUrl : imageUrl;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <TxnSimulationWrapper justify="space-between" align="flex-start">
      <TxnSimulationImageMsgWrapper gap="md" align="flex-start">
        <TxnSimulationImage
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <TxnImage src={imageSrc} alt={isERC721 ? "NFT" : "Token"} />
          {isHovering && (
            <PreviewTokens
              imageUrl={imageSrc}
              symbol={asset?.symbol}
              isERC20={isERC20}
              name={isERC20 ? asset?.name : name}
            />
          )}
          <ArrowIconWrapper $isReceived={!!isApproval}>
            <ArrowRightIcon />
          </ArrowIconWrapper>
        </TxnSimulationImage>
        <TxnSimulationText>
          {isApproval ? "Receive" : "Send"} {displayText}
        </TxnSimulationText>
      </TxnSimulationImageMsgWrapper>
      <TxnSimulationValue alignItems="flex-end">
        <TxnSimulationText semiBold>$25,200</TxnSimulationText>
        <SmallGrayText>18.99 ETH</SmallGrayText>
      </TxnSimulationValue>
    </TxnSimulationWrapper>
  );
};

export default TxnSimulation;
