import React, { useMemo } from "react";
import styled from "styled-components";
import Decimal from "decimal.js";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { PreviewTokens } from "~components/cards/PreviewTokens";
import { PreviewNfts } from "~components/cards/PreviewNfts";
import { AssetImageV2 } from "~components/common/AssetImageV2";
import { checkIsApproval, getTxnSimulationData } from "~utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";
import {
  EvmExpectedStateChangesInner,
  ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner,
} from "@blowfish/api-client";
import { AssetPriceV2 } from "~components/common/AssetPriceV2";

const TxnSimulationWrapper = styled(Row)`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
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
  z-index: 4;
  top: 0;
  left: 55px;
  width: 237px;
  border-radius: 12px;
`;

interface TxnSimulationProps {
  txnData:
    | EvmExpectedStateChangesInner
    | ScanMessageEvm200ResponseSimulationResultsExpectedStateChangesInner;
}

export const TxnSimulation: React.FC<TxnSimulationProps> = ({ txnData }) => {
  const { rawInfo } = txnData;
  const { name, symbol, imageSrc, isNft, tokenId, tokenList } =
    getTxnSimulationData(rawInfo);
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
                <PreviewNfts
                  imageUrl={imageSrc}
                  symbol={symbol}
                  name={name}
                  tokenId={tokenId}
                  price={<AssetPriceV2 stateChange={txnData} />}
                />
              ) : (
                <PreviewTokens
                  imageUrl={imageSrc}
                  symbol={symbol}
                  name={name}
                  price={<AssetPriceV2 stateChange={txnData} />}
                  tokenList={tokenList}
                />
              )}
            </PreviewTokenTooltipContent>
          </TooltipTrigger>
        </Tooltip>
        <Column gap="xs">
          <TxnSimulationText weight="normal">
            {txnData.humanReadableDiff}
          </TxnSimulationText>
          {isNft ? (
            <Text size="sm" design="secondary">
              Type:{" "}
              <Text size="sm" design="primary">
                ERC-721
              </Text>
            </Text>
          ) : (
            name && (
              <Text size="sm" design="secondary">
                Asset:{" "}
                <Text size="sm" design="primary">
                  {name}
                </Text>
              </Text>
            )
          )}
        </Column>
      </TxnSimulationImageMsgWrapper>
    </TxnSimulationWrapper>
  );
};
