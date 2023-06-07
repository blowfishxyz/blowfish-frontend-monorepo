import styled from "styled-components";

interface TxnImageProps {
  $width?: string;
  $height?: string;
}

export const TxnImage = styled.img<TxnImageProps>`
  width: ${({ $width }) => ($width ? $width : "38px")};
  height: ${({ $height }) => ($height ? $height : "38px")};
  object-fit: cover;
  border-radius: 6px;
`;
