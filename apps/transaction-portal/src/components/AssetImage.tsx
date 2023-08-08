import { EvmExpectedStateChange } from "@blowfishxyz/api-client";
import { ArrowRightIcon, BlowfishIcon } from "@blowfish/protect-ui/icons";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import Image from "next/image";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";

import { VerifiedTokenTooltip } from "~components/simulation-results/VerifiedTokenTooltip";

interface AssetImageProps {
  stateChange: EvmExpectedStateChange;
  isPositiveEffect: boolean;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}

const PlaceholderSimulationImage = styled.div`
  width: 38px;
  height: 38px;
  background: ${({ theme }) => theme.colors.base10};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  svg {
    height: 24px;
    width: 24px;

    path {
      fill: ${({ theme }) => theme.colors.border};
    }
  }
`;

const SimulationResultImageWrapper = styled.div`
  position: relative;
  margin-right: 12px;
  width: 38px;
  height: 38px;

  img {
    border-radius: 6px;
    max-width: 38px;
    max-height: 38px;
    min-width: 38px;
    min-height: 38px;
  }
`;

const SimulationIconWrapper = styled.div<{
  $isPositiveEffect: boolean;
}>`
  position: absolute;
  height: 14px;
  width: 14px;
  padding: 6px;
  border-radius: 50%;
  top: -10px;
  right: -10px;
  box-sizing: initial;
  background: ${({ $isPositiveEffect }) =>
    $isPositiveEffect ? "#BEEDD2" : "#FFCCCC"};

  svg {
    ${({ $isPositiveEffect, theme }) => {
      if ($isPositiveEffect) {
        return css`
          fill: #00bfa6;
          transform: rotate(135deg);
          transform-origin: center;
        `;
      }
      return css`
        fill: ${theme.colors.danger};
        transform: rotate(-45deg);
        transform-origin: center;
      `;
    }};
  }
`;

const AssetImage = ({
  stateChange,
  isPositiveEffect,
  chainFamily,
  chainNetwork,
}: AssetImageProps) => {
  const rawInfo = stateChange.rawInfo;
  let altText = "Asset";
  let imageSrc;
  let showPlaceholderImage = false;

  if (
    rawInfo.kind === "ERC721_TRANSFER" ||
    rawInfo.kind === "ERC721_APPROVAL" ||
    rawInfo.kind === "ERC1155_TRANSFER"
  ) {
    imageSrc = rawInfo.data?.metadata?.rawImageUrl;
    showPlaceholderImage = !imageSrc;
    altText = `${altText} ${rawInfo.data.tokenId}`;
  } else if (
    rawInfo.kind === "ERC20_TRANSFER" ||
    rawInfo.kind === "ERC20_APPROVAL" ||
    rawInfo.kind === "ERC20_PERMIT" ||
    rawInfo.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    imageSrc = rawInfo.data.asset?.imageUrl;
    showPlaceholderImage = !imageSrc;
    altText = rawInfo.data.asset.name;
  }

  const [hasPlaceholder, setHasPlaceholder] = useState(showPlaceholderImage);
  const handleImageError = useCallback(() => {
    setHasPlaceholder(true);
  }, []);

  if (!hasPlaceholder && !imageSrc) {
    return null;
  }

  return (
    <SimulationResultImageWrapper>
      <VerifiedTokenTooltip
        stateChange={stateChange}
        chainFamily={chainFamily}
        chainNetwork={chainNetwork}
      >
        {hasPlaceholder ? (
          <PlaceholderSimulationImage>
            <BlowfishIcon />
          </PlaceholderSimulationImage>
        ) : imageSrc ? (
          <Image
            width={38}
            height={38}
            src={imageSrc}
            onError={handleImageError}
            alt={altText}
          />
        ) : null}

        <SimulationIconWrapper $isPositiveEffect={isPositiveEffect}>
          <ArrowRightIcon />
        </SimulationIconWrapper>
      </VerifiedTokenTooltip>
    </SimulationResultImageWrapper>
  );
};

export default AssetImage;
