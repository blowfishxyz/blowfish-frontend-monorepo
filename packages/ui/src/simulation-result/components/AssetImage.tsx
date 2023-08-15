import { Icon } from "~/common/icon";
import { styled, css, useTheme } from "styled-components";
import {
  ImageBase,
  PlaceholderImage,
} from "~/simulation-result/components/ImageBase";
import { useMemo } from "react";
import { Row } from "~/common/layout";

type AssetImageProps = {
  isPositiveEffect: boolean;
  imageUrl: string | null;
  name: string;
  placeholder?: "solana-logo" | "missing-image";
} & (
  | {
      type: "currency";
      verified: boolean;
    }
  | {
      type: "nft";
    }
  | {
      type: "unknown";
    }
);

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

export const AssetImage = (props: AssetImageProps) => {
  const theme = useTheme();
  const placeholder = props.placeholder || "missing-image";
  const content = useMemo(() => {
    if (props.type === "currency") {
      return (
        <>
          {props.verified && (
            <VerifiedBadgeWrapper>
              <Icon variant="verified" size={14} />
            </VerifiedBadgeWrapper>
          )}
          <ImageBase
            src={props.imageUrl}
            alt={props.name}
            width={38}
            height={38}
            borderRadius="100%"
          />
        </>
      );
    }

    if (props.type === "nft") {
      return (
        <ImageBase
          src={props.imageUrl}
          alt={props.name || ""}
          width={38}
          height={38}
          borderRadius={6}
        />
      );
    }

    if (placeholder === "solana-logo") {
      return (
        <ImageBase
          isSolanaLogo
          alt="Solana logo"
          width={38}
          height={38}
          borderRadius="100%"
        />
      );
    }

    return <PlaceholderImage width={38} height={38} borderRadius={6} />;
  }, []);

  return (
    <SimulationResultImageWrapper>
      {content}

      <SimulationIconWrapper $isPositiveEffect={props.isPositiveEffect}>
        <Icon
          variant="arrow-right"
          size={10}
          color={
            props.isPositiveEffect ? theme.colors.success : theme.colors.danger
          }
        />
      </SimulationIconWrapper>
    </SimulationResultImageWrapper>
  );
};
