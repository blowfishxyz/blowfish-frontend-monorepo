import { EvmExpectedStateChange } from "@blowfish/api-client";
import { Icon } from "~/common/icon";
import { styled, css, useTheme } from "styled-components";
import {
  ImageBase,
  PlaceholderImage,
} from "~/simulation-result/components/ImageBase";
import {
  isCurrencyStateChange,
  isNftStateChangeWithMetadata,
} from "~/simulation-result/utils";
import { useMemo } from "react";
import { Row } from "~/common/layout";

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
  align-items: center;
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  top: -4px;
  right: -4px;
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

const VerifiedBadgeWrapper = styled(Row).attrs({
  alignItems: "center",
  justifyContent: "center",
})`
  position: absolute;
  right: -2px;
  bottom: -2px;
`;

export const AssetImage = ({
  stateChange,
  isPositiveEffect,
}: AssetImageProps) => {
  const theme = useTheme();
  const rawInfo = stateChange.rawInfo;
  const content = useMemo(() => {
    if (isCurrencyStateChange(rawInfo)) {
      return (
        <>
          {rawInfo.data.asset.verified && (
            <VerifiedBadgeWrapper>
              <Icon variant="verified" size={14} />
            </VerifiedBadgeWrapper>
          )}
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
        <Icon variant="arrow-right" size={10} color={theme.colors.danger} />
      </SimulationIconWrapper>
    </SimulationResultImageWrapper>
  );
};
