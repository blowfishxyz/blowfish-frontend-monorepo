import React from "react";
import { styled } from "styled-components";
import { StyledBaseDiv } from "./StyledBase";
import { Flexbox, flexbox } from "./utils/flexbox";
import { Size, size } from "./utils/size";
import { Border, border } from "./utils/border";
import { Colors, colors } from "./utils/colors";
import { Position, position } from "./utils/position";

export const Column = styled(StyledBaseDiv)<
  React.ComponentProps<typeof StyledBaseDiv> &
    Flexbox &
    Size &
    Border &
    Colors &
    Position
>`
  min-width: 0;
  ${size}
  ${flexbox}
  ${border}
  ${colors}
  ${position}
`;

Column.defaultProps = {
  flexDirection: "column",
};
