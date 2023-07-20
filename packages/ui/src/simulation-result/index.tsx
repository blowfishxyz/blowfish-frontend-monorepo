import React from "react";
import { styled } from "styled-components";
import { PreviewTokens } from "~/simulation-result/components/PreviewTokens";
import { PreviewNfts } from "~/simulation-result/components/PreviewNfts";
import { AssetImage } from "~/simulation-result/components/AssetImage";
import {
  getAssetPriceInUsd,
  getAssetPricePerToken,
  hasStateChangeImage,
  isCurrencyStateChange,
  isNftStateChange,
  isNftStateChangeWithMetadata,
  isPositiveStateChange,
  isApprovalForAllStateChange,
  chainToBlockExplorerUrl,
} from "~/simulation-result/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/common/tooltip";
import {
  ChainFamily,
  ChainNetwork,
  EvmExpectedStateChange,
} from "@blowfishxyz/api-client";
import { AssetPrice } from "~/simulation-result/components/AssetPrice";
import { device } from "~/utils/breakpoints";
import { Text } from "~/common/text";
import { Column, Row } from "~/common/layout";

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
  chainFamily: ChainFamily | undefined;
  chainNetwork: ChainNetwork | undefined;
}

export const SimulationResult: React.FC<TxnSimulationProps> = ({
  txnData,
  chainFamily,
  chainNetwork,
}) => {
  const { rawInfo } = txnData;
  const assetLink = useAssetLinkFromRawInfo(rawInfo, {
    chainFamily,
    chainNetwork,
  });

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
                  <AssetImage
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
              <AssetImage
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
        name={rawInfo.data.asset.name}
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
            Floor price: <AssetPrice totalValue={price} />
          </Text>
        ) : null}
      </Row>
    );
  }
  return null;
};

function useAssetLinkFromRawInfo(
  rawInfo: EvmExpectedStateChange["rawInfo"],
  {
    chainFamily,
    chainNetwork,
  }: {
    chainFamily: ChainFamily | undefined;
    chainNetwork: ChainNetwork | undefined;
  }
) {
  if (!chainFamily || !chainNetwork) {
    return undefined;
  }
  if (isCurrencyStateChange(rawInfo)) {
    return chainToBlockExplorerUrl({
      chainFamily,
      chainNetwork,
      address: rawInfo.data.asset.address,
    });
  } else if (isApprovalForAllStateChange(rawInfo)) {
    return chainToBlockExplorerUrl({
      chainFamily,
      chainNetwork,
      address: rawInfo.data.asset.address,
      isApprovalForAllStateChange: rawInfo.data.asset.address,
    });
  } else if (isNftStateChange(rawInfo)) {
    return chainToBlockExplorerUrl({
      chainFamily,
      chainNetwork,
      address: rawInfo.data.asset.address,
      nftTokenId: rawInfo.data.tokenId,
    });
  }
}
