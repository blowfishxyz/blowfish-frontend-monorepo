import React from "react";
import styled, { css } from "styled-components";
import { ArrowRightIcon } from "@blowfish/ui/icons";
import { Column, Row, Text } from "@blowfish/ui/core";
import { SmallGrayText, TxnImage } from "./SimulationResultsCommonStyles";
import { RawInfo } from "./mock-data";

const TxnSimulationWrapper = styled(Row)`
  margin-bottom: 20px;
`;

const TxnSimulationImageMsgWrapper = styled(Row)`
  width: unset;
`;

const TxnSimulationImage = styled.div`
  position: relative;
  display: inline-block;
`;

const TxnSimulationText = styled(Text)`
  max-width: 150px;
  font-size: 15px;
  line-height: 21px;
`;

const TxnSimulationValue = styled(Column)`
  width: unset;
`;

const ArrowIconWrapper = styled.div<{ isReceived: boolean }>`
  position: absolute;
  height: 14px;
  width: 14px;
  padding: 6px;
  top: -10px;
  right: -10px;
  background: ${({ isReceived }) => (isReceived ? "#BEEDD2" : "#FFCCCC")};
  border-radius: 50%;
  padding: 5px;
  box-sizing: initial;

  svg {
    ${({ isReceived }) => css`
      fill: ${isReceived ? "#00bfa6" : "#ff4c4c"};
      transform: rotate(${isReceived ? 135 : -45}deg);
      transform-origin: center;
    `};
  }
`;

interface TxnSimulationProps {
  txnData: RawInfo;
}

const TxnSimulation: React.FC<TxnSimulationProps> = ({ txnData }) => {
  const { data, kind } = txnData;
  const { metadata, name, tokenId } = data || {};

  const imageUrl = metadata?.rawImageUrl;
  const isApproval = kind?.includes("APPROVAL");

  return (
    <TxnSimulationWrapper justify="space-between" align="flex-start">
      <TxnSimulationImageMsgWrapper gap="lg" align="flex-start">
        <TxnSimulationImage>
          <TxnImage src={imageUrl} alt="NFT" />
          <ArrowIconWrapper isReceived={!!isApproval}>
            <ArrowRightIcon />
          </ArrowIconWrapper>
        </TxnSimulationImage>
        <TxnSimulationText>
          {isApproval ? "Receive" : "Send"} {name} #{tokenId}
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
