import { EvmExpectedStateChange } from "@blowfish/api-client";
import { ArrowRightIcon, BlowfishIcon } from "@blowfish/ui/icons";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";

import { VerifiedTokenTooltip } from "~components/simulation-results/VerifiedTokenTooltip";
import { getImageInfo } from "~utils/utils";

interface AssetImageProps {
  stateChange: EvmExpectedStateChange;
  isPositiveEffect: boolean;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}

interface SimulationImageProps {
  $width?: string;
  $height?: string;
}

const SimulationImage = styled.img<SimulationImageProps>`
  width: ${({ $width }) => ($width ? $width : "38px")};
  height: ${({ $height }) => ($height ? $height : "38px")};
  object-fit: cover;
  border-radius: 6px;
`;

const PlaceholderSimulationImage = styled.div<SimulationImageProps>`
  width: ${({ $width }) => ($width ? $width : "38px")};
  height: ${({ $height }) => ($height ? $height : "38px")};
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

export const AssetImageV2 = ({
  stateChange,
  isPositiveEffect,
  chainFamily,
  chainNetwork,
}: AssetImageProps) => {
  const rawInfo = stateChange.rawInfo;
  const { altText, imageSrc } = getImageInfo(rawInfo);
  const [hasPlaceholder, setHasPlaceholder] = useState(!imageSrc);
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
        ) : (
          <SimulationImage
            src={imageSrc}
            onError={handleImageError}
            alt={altText}
          />
        )}
        <SimulationIconWrapper $isPositiveEffect={isPositiveEffect}>
          <ArrowRightIcon />
        </SimulationIconWrapper>
      </VerifiedTokenTooltip>
    </SimulationResultImageWrapper>
  );
};
