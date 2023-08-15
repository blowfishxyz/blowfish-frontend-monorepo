import { Column } from "~/common/layout";
import { Icon, IconVariant } from "~/common/icon";
import React, {
  CSSProperties,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { styled } from "styled-components";

export const ImageBase: React.FC<{
  src?: string | null | undefined;
  isSolanaLogo?: boolean;
  width: number;
  height: number;
  borderRadius?: CSSProperties["borderRadius"];
  alt: string;
}> = memo(function ImageBase({
  src,
  width,
  height,
  borderRadius,
  isSolanaLogo,
  alt,
}) {
  const [hasPlaceholder, setHasPlaceholder] = useState(!src);
  const handleImageError = useCallback(() => {
    setHasPlaceholder(true);
  }, []);
  const content = useMemo(() => {
    if (isSolanaLogo) {
      return (
        <SolanaLogoImage
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      );
    } else if (hasPlaceholder || !src) {
      return (
        <PlaceholderImage
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      );
    } else {
      return (
        <SimulationImage
          width={width}
          height={height}
          src={src}
          onError={handleImageError}
          alt={alt}
        />
      );
    }
  }, [isSolanaLogo, src, hasPlaceholder]);
  return <Column>{content}</Column>;
});

const SimulationImage = styled.img`
  object-fit: cover;
  border-radius: 6px;
`;

const PlaceholderSimulationImage = styled(Column)<{
  width: number;
  height: number;
}>`
  background: ${({ theme }) => theme.colors.base10};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${(p) => p.width / 2}px;
    width: ${(p) => p.width / 2}px;

    path {
      fill: ${({ theme }) => theme.colors.base30};
    }
  }
`;

export const PlaceholderImage: React.FC<{
  width: number;
  height: number;
  borderRadius?: CSSProperties["borderRadius"];
}> = ({ width, height, borderRadius }) => {
  return (
    <PlaceholderSimulationImage
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      <Icon variant="blowfish-logo" size={Math.floor(width / 1.5)} />
    </PlaceholderSimulationImage>
  );
};

const SolanaSimulationImage = styled(Column)<{
  width: number;
  height: number;
}>`
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${(p) => p.width / 2}px;
    width: ${(p) => p.width / 2}px;
  }
`;

export const SolanaLogoImage: React.FC<{
  width: number;
  height: number;
  borderRadius?: CSSProperties["borderRadius"];
  iconVariant?: IconVariant;
}> = ({ width, height, borderRadius, iconVariant }) => {
  return (
    <SolanaSimulationImage
      width={width}
      height={height}
      borderRadius={borderRadius}
      withBorder
    >
      <Icon variant="solana" size={Math.floor(width / 1.5)} />
    </SolanaSimulationImage>
  );
};
