import { BlowfishIcon } from "~components/icons/BlowfishIcon";
import { ArrowRightIcon } from "~components/icons/ArrowRightIcon";
import { EvmStateChange } from "@blowfish/utils/BlowfishApiClient";
import styled, { css } from "styled-components";
import type { NftStateChangeWithTokenId } from "@blowfish/utils/types";
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

  img {
    border-radius: 6px;
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
  let imageSrc;
  let altText = "asset image";
  let showPlaceholderImage = false;

  if (
    stateChange.kind === "ERC721_TRANSFER" ||
    stateChange.kind === "ERC721_APPROVAL" ||
    stateChange.kind === "ERC1155_TRANSFER"
  ) {
    imageSrc = (stateChange.data as NftStateChangeWithTokenId)?.metadata
      ?.rawImageUrl;
    showPlaceholderImage = !imageSrc;

    if (stateChange.data.tokenId) {
      altText = stateChange.data.tokenId;
    }
  } else if (
    stateChange.kind === "ERC20_TRANSFER" ||
    stateChange.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    imageSrc = stateChange.data.asset?.imageUrl;
    showPlaceholderImage = !imageSrc;
    altText = stateChange.data.name;
  }

  return (
    <>
      {(imageSrc || showPlaceholderImage) && (
        <SimulationResultImageWrapper>
          {imageSrc && (
            <Image width={38} height={38} src={imageSrc} alt={altText} />
          )}
          {showPlaceholderImage && (
            <PlaceholderSimulationImage>
              <BlowfishIcon />
            </PlaceholderSimulationImage>
          )}
          <SimulationIcon isPositiveEffect={isPositiveEffect}>
            <ArrowRightIcon />
          </SimulationIcon>
        </SimulationResultImageWrapper>
      )}
    </>
  );
};

export default AssetImage;
