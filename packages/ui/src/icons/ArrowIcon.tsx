import React from "react";
import { css, styled } from "styled-components";

interface ArrowIconProps {
  className?: string;
  style?: React.CSSProperties;
  expanded?: boolean;
}

const StyledSvg = styled.svg<{ $expanded?: boolean }>`
  transition: all 0.2s linear;

  ${(props) =>
    props.$expanded &&
    css`
      transform: rotate(180deg);
    `}
`;

const ArrowIcon: React.FC<ArrowIconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 11L11.5 1M11.5 1H3.1M11.5 1V9.4"
      stroke="black"
      strokeOpacity="0.5"
      strokeWidth="1.5"
    />
  </svg>
);

const ArrowRightIcon: React.FC<ArrowIconProps> = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    style={style}
  >
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

const ArrowDownIcon: React.FC<ArrowIconProps> = ({
  className,
  style,
  expanded,
}) => (
  <StyledSvg
    $expanded={expanded}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      opacity="0.3"
      d="M12.6666 9.83333L7.99992 14.5M7.99992 14.5L3.33325 9.83333M7.99992 14.5L7.99992 2.5"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </StyledSvg>
);

const ArrowDownIconMemo = React.memo(ArrowDownIcon);
const ArrowRightIconMemo = React.memo(ArrowRightIcon);
const ArrowIconMemo = React.memo(ArrowIcon);
export { ArrowRightIconMemo as ArrowRightIcon };
export { ArrowDownIconMemo as ArrowDownIcon };
export { ArrowIconMemo as ArrowIcon };
