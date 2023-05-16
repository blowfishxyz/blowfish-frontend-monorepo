import React from "react";
import { styled } from "styled-components";
import { StyledBaseDiv } from "./StyledBase";
import { Flexbox, flexbox } from "./utils/flexbox";

export const Row = styled(StyledBaseDiv)<
  React.ComponentProps<typeof StyledBaseDiv> & Flexbox
>`
  min-width: 0;
  ${flexbox}
`;

Row.defaultProps = {
  flexDirection: "row",
};
