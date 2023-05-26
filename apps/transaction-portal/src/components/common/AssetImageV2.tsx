import { EvmExpectedStateChange } from "@blowfish/api-client";
import { ArrowRightIcon, BlowfishIcon, VerifiedIcon } from "@blowfish/ui/icons";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import {
  PlaceholderSimulationImage,
  SimulationImage,
} from "~components/cards/common";

import { getImageInfo } from "~utils/utils";

interface AssetImageProps {
  stateChange: EvmExpectedStateChange;
  isPositiveEffect: boolean;
}

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

const VerifiedBadge = styled(VerifiedIcon)`
  width: 14px;
  height: 14px;
  position: absolute;
  right: -2px;
  bottom: -2px;
`;

export const AssetImageV2 = ({
  stateChange,
  isPositiveEffect,
}: AssetImageProps) => {
  const rawInfo = stateChange.rawInfo;
  const { altText, imageSrc, verified } = getImageInfo(rawInfo);
  const [hasPlaceholder, setHasPlaceholder] = useState(!imageSrc);
  const handleImageError = useCallback(() => {
    setHasPlaceholder(true);
  }, []);

  if (!hasPlaceholder && !imageSrc) {
    return null;
  }

  return (
    <SimulationResultImageWrapper>
      <div>
        <div>
          {verified && <VerifiedBadge />}
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
        </div>
        <SimulationIconWrapper $isPositiveEffect={isPositiveEffect}>
          <ArrowRightIcon />
        </SimulationIconWrapper>
      </div>
    </SimulationResultImageWrapper>
  );
};
