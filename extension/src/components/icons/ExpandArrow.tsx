import React from "react";
import styled, { css } from "styled-components";

interface ExpandIconProps {
  className?: string;
  style?: React.CSSProperties;
  expanded?: boolean;
}

const StyledSvg = styled.svg<{ expanded?: boolean }>`
  transition: all 0.2s linear;

  ${(props) =>
    props.expanded &&
    css`
      transform: rotate(90deg);
    `}
`;

const ExpandIcon: React.FC<ExpandIconProps> = ({
  className,
  style,
  expanded,
}) => (
  <StyledSvg
    expanded={expanded}
    className={className}
    style={style}
    width="8"
    height="10"
    viewBox="0 0 8 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 4.13481C8.16667 4.51971 8.16667 5.48197 7.5 5.86687L1.5 9.33097C0.833334 9.71587 -4.12201e-07 9.23474 -3.78552e-07 8.46494L-7.57103e-08 1.53674C-4.20613e-08 0.766938 0.833333 0.285812 1.5 0.670713L7.5 4.13481Z"
      fill="black"
    />
  </StyledSvg>
);

const ExpandIconMemo = React.memo(ExpandIcon);
export { ExpandIconMemo as ExpandIcon };
