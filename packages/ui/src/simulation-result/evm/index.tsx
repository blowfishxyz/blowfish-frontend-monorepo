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
  hasCounterparty,
  shortenHex,
} from "~/simulation-result/evm/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/common/tooltip";
import {
  EvmChainFamily,
  EvmChainNetwork,
  EvmExpectedStateChange,
} from "@blowfishxyz/api-client";
import { AssetPrice } from "~/simulation-result/components/AssetPrice";
import { device } from "~/utils/breakpoints";
import { Text } from "~/common/text";
import { Column, Row } from "~/common/layout";
import { Icon } from "~/common/icon";

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

const TokenFooterText = styled(Text).attrs({ size: "sm", design: "secondary" })`
  white-space: nowrap;
`;

export interface SimulationResultEvmProps {
  stateChange: EvmExpectedStateChange;
  chainFamily: EvmChainFamily | undefined;
  chainNetwork: EvmChainNetwork | undefined;
}

export const SimulationResultEvm: React.FC<SimulationResultEvmProps> = ({
  stateChange,
  chainFamily,
  chainNetwork,
}) => {
  const { rawInfo } = stateChange;
  const assetLink = useAssetLinkFromRawInfo(rawInfo, {
    chainFamily,
    chainNetwork,
  });
  const counterpartyLink = generateCounterpartyBlockExplorerUrl(rawInfo, {
    chainFamily,
    chainNetwork,
  });

  return (
    <TxnSimulationWrapper
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <TxnSimulationImageMsgWrapper gap="md" alignItems="flex-start">
        <LinkWrapper href={assetLink} target="_blank" rel="noopener noreferrer">
          {hasStateChangeImage(rawInfo) ? (
            <Tooltip placement="bottom-start">
              <TooltipTrigger>
                <TxnSimulationImage>
                  <SimulationImage rawInfo={stateChange.rawInfo} />
                </TxnSimulationImage>
                <TooltipContent showArrow={false}>
                  <TokenTooltipContent rawInfo={rawInfo} />
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          ) : (
            <TxnSimulationImage>
              <SimulationImage rawInfo={stateChange.rawInfo} />
            </TxnSimulationImage>
          )}
        </LinkWrapper>

        <Column gap="xs">
          <LinkWrapper
            href={assetLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TxnSimulationText weight="normal">
              {stateChange.humanReadableDiff}
            </TxnSimulationText>
          </LinkWrapper>
          <TokenFooter
            rawInfo={stateChange.rawInfo}
            counterpartyLink={counterpartyLink}
            isPositiveEffect={isPositiveStateChange(rawInfo)}
          />
        </Column>
      </TxnSimulationImageMsgWrapper>
    </TxnSimulationWrapper>
  );
};

const SimulationImage: React.FC<{
  rawInfo: EvmExpectedStateChange["rawInfo"];
}> = ({ rawInfo }) => {
  const isPositive = isPositiveStateChange(rawInfo);
  if (isCurrencyStateChange(rawInfo)) {
    return (
      <AssetImage
        type="currency"
        imageUrl={rawInfo.data.asset.imageUrl}
        name={rawInfo.data.asset.name}
        verified={rawInfo.data.asset.verified}
        isPositiveEffect={isPositive}
      />
    );
  }
  if (isNftStateChangeWithMetadata(rawInfo)) {
    const { metadata, asset } = rawInfo.data;
    const imageUrl = metadata.previews?.small || metadata.rawImageUrl;

    return (
      <AssetImage
        type="nft"
        imageUrl={imageUrl}
        name={asset.name}
        isPositiveEffect={isPositive}
      />
    );
  }

  if (rawInfo.kind === "ANY_NFT_FROM_COLLECTION_TRANSFER") {
    return (
      <AssetImage
        type="nft"
        imageUrl={rawInfo.data.asset.imageUrl}
        name={rawInfo.data.asset.name}
        isPositiveEffect={isPositive}
      />
    );
  }

  return (
    <AssetImage
      type="unknown"
      imageUrl={null}
      name="Unkonwn"
      isPositiveEffect={isPositive}
    />
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
    const { metadata } = rawInfo.data;
    const imageUrl = metadata.previews.large || metadata.rawImageUrl;

    if (rawInfo.kind === "ERC1155_TRANSFER") {
      return (
        <PreviewNfts
          imageUrl={imageUrl}
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
  counterpartyLink: string | undefined;
  isPositiveEffect: boolean;
}> = ({ rawInfo, counterpartyLink, isPositiveEffect }) => {
  if (isCurrencyStateChange(rawInfo)) {
    return (
      <Row gap="md">
        <Text size="sm" design="secondary">
          Asset:{" "}
          <Text size="sm" design="primary">
            {rawInfo.data.asset.name}
          </Text>
        </Text>
        {hasCounterparty(rawInfo) && rawInfo.data.counterparty ? (
          <LinkWrapper
            href={counterpartyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Row gap="xs" alignItems="center">
              <Text size="sm" design="secondary">
                {isPositiveEffect ? "From" : "To"}:
                <Text size="sm" design="primary">
                  {` ${shortenHex(rawInfo.data.counterparty.address || "", 4)}`}
                </Text>
              </Text>
              <Icon variant="arrow" size={10} />
            </Row>
          </LinkWrapper>
        ) : null}
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
          <TokenFooterText>
            Type:{" "}
            <Text size="sm" design="primary">
              {typeStr}
            </Text>
          </TokenFooterText>
        ) : null}
        {price ? (
          <TokenFooterText>
            Floor price: <AssetPrice totalValue={price} />
          </TokenFooterText>
        ) : null}
        {hasCounterparty(rawInfo) && rawInfo.data.counterparty ? (
          <LinkWrapper
            href={counterpartyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Row gap="xs" alignItems="center">
              <TokenFooterText>
                {isPositiveEffect ? "From" : "To"}:
                <Text size="sm" design="primary">
                  {` ${shortenHex(rawInfo.data.counterparty.address || "", 4)}`}
                </Text>
              </TokenFooterText>
              <Icon variant="arrow" size={10} />
            </Row>
          </LinkWrapper>
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
    chainFamily: EvmChainFamily | undefined;
    chainNetwork: EvmChainNetwork | undefined;
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

function generateCounterpartyBlockExplorerUrl(
  rawInfo: EvmExpectedStateChange["rawInfo"],
  {
    chainFamily,
    chainNetwork,
  }: {
    chainFamily: EvmChainFamily | undefined;
    chainNetwork: EvmChainNetwork | undefined;
  }
): string | undefined {
  if (!chainFamily || !chainNetwork) {
    return undefined;
  }

  if (hasCounterparty(rawInfo) && rawInfo.data.counterparty) {
    return chainToBlockExplorerUrl({
      chainFamily,
      chainNetwork,
      address: rawInfo.data.counterparty.address,
    });
  }
  return undefined;
}
