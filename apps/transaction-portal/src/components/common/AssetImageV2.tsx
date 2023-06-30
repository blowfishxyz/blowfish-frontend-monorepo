import { EvmExpectedStateChange } from "@blowfish/api-client";
import { ArrowRightIcon, VerifiedIcon } from "@blowfish/protect-ui/icons";
import styled, { css } from "styled-components";
import { ImageBase, PlaceholderImage } from "./ImageBase";
import {
  isCurrencyStateChange,
  isNftStateChangeWithMetadata,
} from "~utils/utils";
import { useMemo } from "react";

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
  display: flex;
  justify-content: center;
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  top: -4px;
  right: -4px;
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
          width: 9px;
        `;
      }
      return css`
        fill: ${theme.colors.danger};
        transform: rotate(-45deg);
        transform-origin: center;
        width: 9px;
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
  const content = useMemo(() => {
    if (isCurrencyStateChange(rawInfo)) {
      return (
        <>
          {rawInfo.data.asset.verified && <VerifiedBadge />}
          <ImageBase
            src={rawInfo.data.asset.imageUrl}
            alt={rawInfo.data.asset.name}
            width={38}
            height={38}
            borderRadius="100%"
          />
        </>
      );
    }

    if (isNftStateChangeWithMetadata(rawInfo)) {
      return (
        <ImageBase
          src={rawInfo.data.metadata.rawImageUrl}
          alt={rawInfo.data.tokenId || ""}
          width={38}
          height={38}
          borderRadius={6}
        />
      );
    }

    return <PlaceholderImage width={38} height={38} borderRadius={6} />;
  }, [rawInfo]);

  return (
    <SimulationResultImageWrapper>
      {content}

      <SimulationIconWrapper $isPositiveEffect={isPositiveEffect}>
        <ArrowRightIcon />
      </SimulationIconWrapper>
    </SimulationResultImageWrapper>
  );
};
