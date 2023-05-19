import React from "react";
import styled from "styled-components";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { SmallGrayText } from "./common";
import { PreviewTokens } from "~components/cards/PreviewTokens";
import { TxnSimulationDataType } from "./mock-data";
import { AssetPriceV2 } from "~components/common/AssetPriceV2";
import { AssetImageV2 } from "~components/common/AssetImageV2";
import { checkIsApproval, getTxnSimulationData } from "~utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";

const TxnSimulationWrapper = styled(Row)`
  margin-bottom: 20px;
  position: relative;
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
  max-width: 180px;
  font-size: 13px;
  line-height: 21px;

  @media (${device.lg}) {
    font-size: 15px;
  }
`;

const TxnSimulationValue = styled(Column)`
  width: unset;
`;

const PreviewTokenTooltipContent = styled(TooltipContent)`
  background-color: white;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  top: 0;
  left: 55px;
  width: 237px;
  border-radius: 12px;

  ${SmallGrayText} {
    font-size: 12px;
  }
`;

interface TxnSimulationProps {
  txnData: TxnSimulationDataType;
}

export const TxnSimulation: React.FC<TxnSimulationProps> = ({ txnData }) => {
  const { rawInfo } = txnData;
  const { name, symbol, imageSrc, isNft, displayText } =
    getTxnSimulationData(rawInfo);
  const isApproval = checkIsApproval(rawInfo);

  return (
    <TxnSimulationWrapper
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <TxnSimulationImageMsgWrapper gap="lg" alignItems="flex-start">
        <Tooltip placement="top-start">
          <TooltipTrigger>
            <TxnSimulationImage>
              <AssetImageV2
                stateChange={txnData}
                isPositiveEffect={isApproval}
                chainFamily="ethereum"
                chainNetwork="mainnet"
              />
            </TxnSimulationImage>
            <PreviewTokenTooltipContent showArrow={false}>
              <PreviewTokens
                imageUrl={imageSrc}
                symbol={symbol}
                isNft={isNft}
                name={name}
              />
            </PreviewTokenTooltipContent>
          </TooltipTrigger>
        </Tooltip>

        <TxnSimulationText>
          {isApproval ? "Receive" : "Send"} {displayText}
        </TxnSimulationText>
      </TxnSimulationImageMsgWrapper>
      <TxnSimulationValue alignItems="flex-end">
        <TxnSimulationText weight="semi-bold" design="primary">
          <AssetPriceV2 stateChange={txnData} />
        </TxnSimulationText>
        <SmallGrayText>18.99 ETH</SmallGrayText>
      </TxnSimulationValue>
    </TxnSimulationWrapper>
  );
};
