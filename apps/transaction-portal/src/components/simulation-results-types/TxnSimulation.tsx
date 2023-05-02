import React from "react";
import styled, { css } from "styled-components";
import { ArrowRightIcon } from "@blowfish/ui/icons";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { SmallGrayText, TxnImage } from "./common";
import { RawInfo } from "./mock-data";

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

const ArrowIconWrapper = styled.div.attrs<{ isreceived: boolean }>((props) => ({
  isreceived: props.isreceived,
}))<{ isreceived: boolean }>`
  position: absolute;
  height: 14px;
  width: 14px;
  padding: 6px;
  top: -10px;
  right: -10px;
  background: ${({ isreceived }) => (isreceived ? "#BEEDD2" : "#FFCCCC")};
  border-radius: 50%;
  padding: 5px;
  box-sizing: initial;

  svg {
    ${({ isreceived }) => css`
      fill: ${isreceived ? "#00bfa6" : "#ff4c4c"};
      transform: rotate(${isreceived ? 135 : -45}deg);
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
      <TxnSimulationImageMsgWrapper gap="md" align="flex-start">
        <TxnSimulationImage>
          <TxnImage src={imageUrl} alt="NFT" />
          <ArrowIconWrapper isreceived={!!isApproval}>
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
