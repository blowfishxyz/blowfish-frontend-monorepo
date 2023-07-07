import React from "react";
import { styled } from "styled-components";
import { StyledBaseDiv } from "~/common/base";
import { Border, border } from "~/utils/border";
import { Colors, colors } from "~/utils/colors";
import { Flexbox, flexbox } from "~/utils/flexbox";
import { Position, position } from "~/utils/position";
import { Size, size } from "~/utils/size";

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

export const Row = styled(StyledBaseDiv)<
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

Row.defaultProps = {
  flexDirection: "row",
};
