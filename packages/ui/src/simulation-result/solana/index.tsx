import React from "react";
import { styled } from "styled-components";
import {
  getAssetPriceInUsd,
  isCurrencyStateChange,
  isNftStateChange,
  chainToBlockExplorerUrl,
  formatMetaplexStandard,
  shortenAddress,
  isSplStateChange,
  isNftMetaplexStandard,
} from "~/simulation-result/solana/utils";
import {
  SolanaExpectedStateChange,
  SolanaChainNetwork,
} from "@blowfishxyz/api-client";
import { AssetPrice } from "~/simulation-result/components/AssetPrice";
import { device } from "~/utils/breakpoints";
import { Text } from "~/common/text";
import { Column, Row } from "~/common/layout";
import { AssetImage } from "~/simulation-result/components/AssetImage";

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

export interface SimulationResultSolanaProps {
  stateChange: SolanaExpectedStateChange;
  chainNetwork: SolanaChainNetwork | undefined;
}

export const SimulationResultSolana: React.FC<SimulationResultSolanaProps> = ({
  stateChange,
  chainNetwork,
}) => {
  const { rawInfo } = stateChange;
  const assetLink = useAssetLinkFromRawInfo(rawInfo, {
    chainNetwork,
  });

  return (
    <TxnSimulationWrapper
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <LinkWrapper href={assetLink} target="_blank" rel="noopener noreferrer">
        <LinkWrapper href={assetLink} target="_blank" rel="noopener noreferrer">
          <TxnSimulationImageMsgWrapper gap="md" alignItems="flex-start">
            <TxnSimulationImage>
              <SimulationImage stateChange={stateChange} />
            </TxnSimulationImage>

            <Column gap="xs">
              <TxnSimulationText weight="normal">
                {stateChange.humanReadableDiff}
              </TxnSimulationText>
              <TokenFooter
                rawInfo={stateChange.rawInfo}
                chainNetwork={chainNetwork}
              />
            </Column>
          </TxnSimulationImageMsgWrapper>
        </LinkWrapper>
      </LinkWrapper>
    </TxnSimulationWrapper>
  );
};

const SimulationImage: React.FC<{
  stateChange: SolanaExpectedStateChange;
}> = ({ stateChange: { rawInfo, suggestedColor } }) => {
  const isPositive = suggestedColor === "CREDIT";

  if (isSplStateChange(rawInfo)) {
    if (isNftMetaplexStandard(rawInfo.data.asset.metaplexTokenStandard)) {
      const { asset } = rawInfo.data;
      const imageUrl = asset.previews?.small || asset.imageUrl;

      return (
        <AssetImage
          type="nft"
          imageUrl={imageUrl}
          name={rawInfo.data.asset.name}
          isPositiveEffect={isPositive}
        />
      );
    }

    return (
      <AssetImage
        type="currency"
        imageUrl={rawInfo.data.asset.imageUrl}
        name={rawInfo.data.asset.name}
        verified={false}
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
      placeholder="solana-logo"
    />
  );
};

const TokenFooter: React.FC<{
  rawInfo: SolanaExpectedStateChange["rawInfo"];
  chainNetwork: SolanaChainNetwork | undefined;
}> = ({ rawInfo, chainNetwork }) => {
  if (isNftStateChange(rawInfo)) {
    const price = getAssetPriceInUsd(rawInfo);
    const typeStr: string = formatMetaplexStandard(
      rawInfo.data.asset.metaplexTokenStandard
    );

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
  } else if (isCurrencyStateChange(rawInfo)) {
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
  } else if (rawInfo.kind === "SOL_STAKE_AUTHORITY_CHANGE") {
    return (
      <Row gap="md">
        <Text size="sm" design="secondary">
          To:{" "}
          <FooterAddress
            address={rawInfo.data.futureAuthorities.withdrawer}
            chainNetwork={chainNetwork}
          />
        </Text>
      </Row>
    );
  } else if (rawInfo.kind === "USER_ACCOUNT_OWNER_CHANGE") {
    return (
      <Row gap="md">
        <Text size="sm" design="secondary">
          To:{" "}
          <FooterAddress
            address={rawInfo.data.futureOwner}
            chainNetwork={chainNetwork}
          />
        </Text>
      </Row>
    );
  }
  return null;
};

function FooterAddress({
  address,
  chainNetwork,
}: {
  address: string;
  chainNetwork: SolanaChainNetwork | undefined;
}) {
  return (
    <LinkWrapper
      href={chainToBlockExplorerUrl({ address, chainNetwork, type: "address" })}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Text size="sm" design="primary">
        {shortenAddress(address)}
      </Text>
    </LinkWrapper>
  );
}

function useAssetLinkFromRawInfo(
  rawInfo: SolanaExpectedStateChange["rawInfo"],
  {
    chainNetwork,
  }: {
    chainNetwork: SolanaChainNetwork | undefined;
  }
) {
  if (!chainNetwork) {
    return undefined;
  }
  if (rawInfo.kind === "SPL_TRANSFER" || rawInfo.kind === "SPL_APPROVAL") {
    return chainToBlockExplorerUrl({
      chainNetwork,
      address: rawInfo.data.asset.mint,
      type: "token",
    });
  }
  return undefined;
}
