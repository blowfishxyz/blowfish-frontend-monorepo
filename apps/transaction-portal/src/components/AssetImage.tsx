import { ArrowRightIcon, BlowfishIcon } from "@blowfish/ui/icons";
import { EvmStateChange } from "@blowfish/utils/BlowfishApiClient";
import { useCallback, useState } from "react";
import styled, { css } from "styled-components";
import Image from "next/image";

interface AssetImageProps {
  stateChange: EvmStateChange;
  isPositiveEffect: boolean;
}

const PlaceholderSimulationImage = styled.div`
  width: 38px;
  height: 38px;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;

  svg {
    height: 24px;
    width: 24px;

    path {
      fill: ${({ theme }) => theme.palette.border};
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

const SimulationIcon = styled.div<{ isPositiveEffect: boolean }>`
  position: absolute;
  height: 14px;
  width: 14px;
  padding: 6px;
  border-radius: 50%;
  top: -10px;
  right: -10px;
  background: ${({ isPositiveEffect }) =>
    isPositiveEffect ? "#BEEDD2" : "#FFCCCC"};

  svg {
    ${({ isPositiveEffect, theme }) => {
      if (isPositiveEffect) {
        return css`
          fill: #00bfa6;
          transform: rotate(135deg);
          transform-origin: center;
        `;
      }
      return css`
        fill: ${theme.palette.red};
        transform: rotate(-45deg);
        transform-origin: center;
      `;
    }};
  }
`;

const AssetImage = ({ stateChange, isPositiveEffect }: AssetImageProps) => {
  let altText = "Asset";
  let imageSrc;
  let showPlaceholderImage = false;

  if (
    stateChange.kind === "ERC721_TRANSFER" ||
    stateChange.kind === "ERC721_APPROVAL" ||
    stateChange.kind === "ERC1155_TRANSFER"
  ) {
    imageSrc = stateChange.data?.metadata?.rawImageUrl;
    showPlaceholderImage = !imageSrc;
    altText =
      stateChange.kind !== "ERC1155_TRANSFER"
        ? stateChange.data.name
        : `${altText} ${stateChange.data.tokenId}`;
  } else if (
    stateChange.kind === "ERC20_TRANSFER" ||
    stateChange.kind === "ERC20_APPROVAL" ||
    stateChange.kind === "ERC20_PERMIT" ||
    stateChange.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    imageSrc = stateChange.data.asset?.imageUrl;
    showPlaceholderImage = !imageSrc;
    altText = stateChange.data.name;
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

      <SimulationIcon isPositiveEffect={isPositiveEffect}>
        <ArrowRightIcon />
      </SimulationIcon>
    </SimulationResultImageWrapper>
  );
};

export default AssetImage;
