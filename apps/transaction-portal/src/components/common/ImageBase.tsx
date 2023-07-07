import { Column } from "@blowfishxyz/ui";
import { BlowfishIcon } from "@blowfish/protect-ui/icons";
import Image from "next/image";
import React, { CSSProperties, memo, useCallback, useState } from "react";
import styled from "styled-components";

export const ImageBase: React.FC<{
  src?: string | null | undefined;
  width: number;
  height: number;
  borderRadius?: CSSProperties["borderRadius"];
  alt: string;
}> = memo(function ImageBase({ src, width, height, borderRadius, alt }) {
  const [hasPlaceholder, setHasPlaceholder] = useState(!src);
  const handleImageError = useCallback(() => {
    setHasPlaceholder(true);
  }, []);
  return (
    <Column>
      {hasPlaceholder || !src ? (
        <PlaceholderImage
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      ) : (
        <SimulationImage
          width={width}
          height={height}
          src={src}
          onError={handleImageError}
          alt={alt}
        />
      )}
    </Column>
  );
});

const SimulationImage = styled(Image)`
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
      fill: ${({ theme }) => theme.colors.border};
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
      <BlowfishIcon />
    </PlaceholderSimulationImage>
  );
};
