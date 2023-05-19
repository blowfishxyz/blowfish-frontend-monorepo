import { Text } from "@blowfish/ui/core";
import { styled } from "styled-components";

const TxnImage = styled.img`
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 6px;
`;

const SmallGrayText = styled(Text).attrs({ size: "sm", design: "secondary" })``;

export { TxnImage, SmallGrayText };
