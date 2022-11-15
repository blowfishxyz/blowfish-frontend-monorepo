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
    height="10"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0.53 8 8.93"
  >
    <path
      d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
      fill="black"
    ></path>
  </StyledSvg>
);

const ExpandIconMemo = React.memo(ExpandIcon);
export { ExpandIconMemo as ExpandIcon };
