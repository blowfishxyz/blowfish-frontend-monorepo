import { Text } from "@blowfish/ui/core";
import { styled } from "styled-components";

interface TxnImageProps {
  $width?: string;
  $height?: string;
}

const TxnImage = styled.img<TxnImageProps>`
  width: ${({ $width }) => ($width ? $width : "38px")};
  height: ${({ $height }) => ($height ? $height : "38px")};
  object-fit: cover;
  border-radius: 6px;
`;

const SmallGrayText = styled(Text).attrs({ size: "sm", design: "secondary" })``;

export { TxnImage, SmallGrayText };
