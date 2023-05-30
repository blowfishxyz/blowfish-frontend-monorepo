import React, { useMemo } from "react";
import styled from "styled-components";
import Decimal from "decimal.js";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { SmallGrayText } from "./common";
import { PreviewTokens } from "~components/cards/PreviewTokens";
import { PreviewNfts } from "~components/cards/PreviewNfts";
import { AssetImageV2 } from "~components/common/AssetImageV2";
import { checkIsApproval, getTxnSimulationData } from "~utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";

const TxnSimulationWrapper = styled(Row)`
  margin-bottom: 20px;
`;

const TxnSimulationImageMsgWrapper = styled(Row)`
  width: unset;
  cursor: pointer;

  @media (${device.lg}) {
    gap: 16px;
  }
`;

const TxnSimulationImage = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const TxnSimulationText = styled(Text).attrs({ size: "sm" })`
  @media (${device.lg}) {
    font-size: 16px;
  }
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
  txnData: any;
}

export const TxnSimulation: React.FC<TxnSimulationProps> = ({ txnData }) => {
  const { rawInfo } = txnData;
  const { name, symbol, imageSrc, isNft } = getTxnSimulationData(rawInfo);
  const isApproval = checkIsApproval(rawInfo);
  const diff = useMemo(() => {
    const { amount } = rawInfo.data;

    if (typeof amount === "object") {
      return new Decimal(amount.before).sub(amount.after);
    }

    return new Decimal(amount);
  }, [rawInfo]);

  const isPositiveEffect =
    (isApproval && diff.gt(0)) || (!isApproval && diff.lt(0));

  const modifyText = (text: string) => {
    const splitText = text.split(" ");
    if (splitText.length < 2) {
      return text;
    }
    const centerText = splitText.slice(1, -1).join(" ");
    const lastWord = splitText[splitText.length - 1];

    return (
      <TxnSimulationText>
        {splitText[0]}{" "}
        <TxnSimulationText weight="semi-bold">{centerText}</TxnSimulationText>{" "}
        <TxnSimulationText design="secondary" weight="semi-bold">
          {lastWord}
        </TxnSimulationText>
      </TxnSimulationText>
    );
  };

  return (
    <TxnSimulationWrapper
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <TxnSimulationImageMsgWrapper gap="md" alignItems="flex-start">
        <Tooltip placement="top-start">
          <TooltipTrigger>
            <TxnSimulationImage>
              <AssetImageV2
                stateChange={txnData}
                isPositiveEffect={isPositiveEffect}
              />
            </TxnSimulationImage>
            <PreviewTokenTooltipContent showArrow={false}>
              {isNft ? (
                <PreviewNfts imageUrl={imageSrc} symbol={symbol} name={name} />
              ) : (
                <PreviewTokens
                  imageUrl={imageSrc}
                  symbol={symbol}
                  name={name}
                />
              )}
            </PreviewTokenTooltipContent>
          </TooltipTrigger>
        </Tooltip>
        <Column gap="xs">
          <TxnSimulationText weight="normal">
            {modifyText(txnData.humanReadableDiff)}
          </TxnSimulationText>
          {isNft ? (
            <Text size="sm" design="secondary">
              Type: ERC-721
            </Text>
          ) : (
            name && (
              <Text size="sm" design="secondary">
                Asset: {name}
              </Text>
            )
          )}
        </Column>
      </TxnSimulationImageMsgWrapper>
    </TxnSimulationWrapper>
  );
};
