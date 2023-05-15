import { GrayText } from "@blowfish/ui/core";
import { styled } from "styled-components";

const TxnImage = styled.img`
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 6px;
`;

const SmallGrayText = styled(GrayText)`
  line-height: 16px;
  font-size: 13px;
`;

export { TxnImage, SmallGrayText };
