import React from "react";
import styled from "styled-components";
import { Column, Row, Text, device } from "@blowfish/ui/core";
import { PreviewTokens } from "~components/cards/PreviewTokens";
import { PreviewNfts } from "~components/cards/PreviewNfts";
import { AssetImageV2 } from "~components/common/AssetImageV2";
import {
  getAssetPriceInUsd,
  getAssetPricePerToken,
  hasStateChangeImage,
  isCurrencyStateChange,
  isNftStateChange,
  isNftStateChangeWithMetadata,
  isPositiveStateChange,
  isApprovalForAllStateChange,
} from "~utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";
import { EvmExpectedStateChange } from "@blowfish/api-client";
import { AssetPriceV2 } from "~components/common/AssetPriceV2";
import { chainToBlockExplorerUrl } from "@blowfish/utils/chains";
import { useChainMetadata } from "~hooks/useChainMetadata";

const TxnSimulationWrapper = styled(Row)`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LinkWrapper = styled.a`
  text-decoration: none;
  color: inherit;
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

const TxnSimulationText = styled(Text).attrs({ size: "md" })``;

const PreviewTokenTooltipContent = styled(TooltipContent)`
  background-color: white;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 4;
  width: 200px;
  border-radius: 12px;
`;

interface TxnSimulationProps {
  txnData: EvmExpectedStateChange;
}

export const TxnSimulation: React.FC<TxnSimulationProps> = ({ txnData }) => {
  const { rawInfo } = txnData;
  const assetLink = useAssetLinkFromRawInfo(rawInfo);

  const isPositiveEffect = isPositiveStateChange(rawInfo);
  const tooltipContent = <TokenTooltipContent rawInfo={rawInfo} />;

  return (
    <TxnSimulationWrapper
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <LinkWrapper href={assetLink} target="_blank" rel="noopener noreferrer">
        <TxnSimulationImageMsgWrapper gap="md" alignItems="flex-start">
          {hasStateChangeImage(rawInfo) ? (
            <Tooltip placement="bottom-start">
              <TooltipTrigger>
                <TxnSimulationImage>
                  <AssetImageV2
                    stateChange={txnData}
                    isPositiveEffect={isPositiveEffect}
                  />
                </TxnSimulationImage>
                <PreviewTokenTooltipContent showArrow={false}>
                  {tooltipContent}
                </PreviewTokenTooltipContent>
              </TooltipTrigger>
            </Tooltip>
          ) : (
            <TxnSimulationImage>
              <AssetImageV2
                stateChange={txnData}
                isPositiveEffect={isPositiveEffect}
              />
            </TxnSimulationImage>
          )}

          <Column gap="xs">
            <TxnSimulationText weight="normal">
              {txnData.humanReadableDiff}
            </TxnSimulationText>
            <TokenFooter rawInfo={txnData.rawInfo} />
          </Column>
        </TxnSimulationImageMsgWrapper>
      </LinkWrapper>
    </TxnSimulationWrapper>
  );
};

const TokenTooltipContent: React.FC<{
  rawInfo: EvmExpectedStateChange["rawInfo"];
}> = ({ rawInfo }) => {
  if (isCurrencyStateChange(rawInfo)) {
    return (
      <PreviewTokens
        imageUrl={rawInfo.data.asset.imageUrl}
        symbol={rawInfo.data.asset.symbol}
        name={rawInfo.data.asset.name}
        price={getAssetPricePerToken(rawInfo)}
        tokenList={
          rawInfo.kind !== "NATIVE_ASSET_TRANSFER"
            ? rawInfo.data.asset.lists.length
            : null
        }
        verified={rawInfo.data.asset.verified}
      />
    );
  }
  if (isNftStateChangeWithMetadata(rawInfo)) {
    if (rawInfo.kind === "ERC1155_TRANSFER") {
      return (
        <PreviewNfts
          imageUrl={rawInfo.data.metadata.rawImageUrl}
          type="ERC-1155"
          name={undefined}
          tokenId={rawInfo.data.tokenId}
          price={getAssetPriceInUsd(rawInfo)}
        />
      );
    }

    return (
      <PreviewNfts
        name={rawInfo.data.name}
        type="ERC-721"
        imageUrl={rawInfo.data.metadata?.rawImageUrl}
        tokenId={rawInfo.data.tokenId}
        price={getAssetPriceInUsd(rawInfo)}
      />
    );
  }
  return null;
};

const TokenFooter: React.FC<{
  rawInfo: EvmExpectedStateChange["rawInfo"];
}> = ({ rawInfo }) => {
  if (isCurrencyStateChange(rawInfo)) {
    return (
      <Row gap="md">
        <Text size="sm" design="secondary">
          Asset:{" "}
          <Text size="sm" design="primary">
            {rawInfo.data.asset.name}
          </Text>
        </Text>
      </Row>
    );
  } else if (isNftStateChange(rawInfo)) {
    const price = getAssetPriceInUsd(rawInfo);
    let typeStr: string | undefined = undefined;

    if (rawInfo.kind.includes("ERC721")) {
      typeStr = "ERC-721";
    } else if (rawInfo.kind.includes("ERC1155")) {
      typeStr = "ERC-1155";
    }

    return (
      <Row gap="md">
        {typeStr ? (
          <Text size="sm" design="secondary">
            Type:{" "}
            <Text size="sm" design="primary">
              {typeStr}
            </Text>
          </Text>
        ) : null}
        {price ? (
          <Text size="sm" design="secondary">
            Floor price: <AssetPriceV2 totalValue={price} />
          </Text>
        ) : null}
      </Row>
    );
  }
  return null;
};

function useAssetLinkFromRawInfo(rawInfo: EvmExpectedStateChange["rawInfo"]) {
  const chain = useChainMetadata();
  if (!chain?.chainInfo) {
    return undefined;
  }
  const { chainFamily, chainNetwork } = chain.chainInfo;
  if (isCurrencyStateChange(rawInfo)) {
    return chainToBlockExplorerUrl({
      chainFamily,
      chainNetwork,
      address: rawInfo.data.contract.address,
    });
  } else if (isApprovalForAllStateChange(rawInfo)) {
    console.log({ rawInfo });
    return chainToBlockExplorerUrl({
      chainFamily,
      chainNetwork,
      address: rawInfo.data.contract.address,
      isApprovalForAllStateChange: rawInfo.data.contract.address,
    });
  } else if (isNftStateChange(rawInfo)) {
    return chainToBlockExplorerUrl({
      chainFamily,
      chainNetwork,
      address: rawInfo.data.contract.address,
      nftTokenId: rawInfo.data.tokenId,
    });
  }
}
