import { GrayText } from "@blowfish/ui/core";
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

const SmallGrayText = styled(GrayText)`
  line-height: 16px;
  font-size: 13px;
`;

export { TxnImage, SmallGrayText };
