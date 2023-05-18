import React from "react";
import styled, { css } from "styled-components";
import { ArrowRightIcon } from "@blowfish/ui/icons";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { SmallGrayText, TxnImage } from "./common";
import PreviewTokens from "~components/cards/PreviewTokens";
import { useHover } from "react-use";
import { TxnSimulationDataType } from "./mock-data";

const TxnSimulationWrapper = styled(Row)`
  margin-bottom: 20px;
`;

const TxnSimulationImageMsgWrapper = styled(Row)`
  width: unset;
  cursor: pointer;

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
  txnData: TxnSimulationDataType;
}

const TxnSimulation: React.FC<TxnSimulationProps> = ({ txnData }) => {
  const { rawInfo } = txnData;
  const { kind, data } = rawInfo;
  const { metadata, name, tokenId, asset } = data || {};
  const { rawImageUrl } = metadata || {};
  const { imageUrl, symbol } = asset || {};

  let isNft: boolean;
  const isApproval = kind?.includes("APPROVAL");
  let imageSrc: string | undefined;
  let displayText: string;

  if (
    rawInfo.kind === "ERC721_APPROVAL" ||
    rawInfo.kind === "ERC721_TRANSFER"
  ) {
    imageSrc = rawImageUrl;
    isNft = true;
    displayText = `${name} #${tokenId}`;
  } else if (
    rawInfo.kind === "ERC20_APPROVAL" ||
    rawInfo.kind === "ERC20_PERMIT" ||
    rawInfo.kind === "ERC20_TRANSFER"
  ) {
    imageSrc = imageUrl;
    isNft = false;
    displayText = `${name} (${symbol})`;
  }

  const TxnSimulationMessage = () => {
    const element = (hovered: boolean) => (
      <TxnSimulationImageMsgWrapper gap="md" align="flex-start">
        <TxnSimulationImage>
          <TxnImage src={imageSrc} alt={isNft ? "NFT" : "Token"} />
          {hovered && (
            <PreviewTokens
              imageUrl={imageSrc}
              symbol={asset?.symbol}
              isNft={isNft}
              name={isNft ? name : asset?.name}
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
    );

    const [hoverable] = useHover(element);

    return hoverable;
  };

  return (
    <TxnSimulationWrapper justify="space-between" align="flex-start">
      <TxnSimulationMessage />
      <TxnSimulationValue alignItems="flex-end">
        <TxnSimulationText weight="semi-bold">$25,200</TxnSimulationText>
        <SmallGrayText>18.99 ETH</SmallGrayText>
      </TxnSimulationValue>
    </TxnSimulationWrapper>
  );
};

export default TxnSimulation;
