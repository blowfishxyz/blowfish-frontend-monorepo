import React from "react";
import { styled } from "styled-components";
import { StyledBaseDiv } from "./StyledBase";
import { Flexbox, flexbox } from "./utils/flexbox";
import { Size, size } from "./utils/size";

export const Column = styled(StyledBaseDiv)<
  React.ComponentProps<typeof StyledBaseDiv> & Flexbox & Size
>`
  min-width: 0;
  ${size}
  ${flexbox}
`;

Column.defaultProps = {
  flexDirection: "column",
};
