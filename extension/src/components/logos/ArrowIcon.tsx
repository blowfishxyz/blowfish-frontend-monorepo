import React from "react";

interface ArrowIconProps {
  className?: string;
  style?: React.CSSProperties;
}

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

const ArrowIconMemo = React.memo(ArrowIcon);
export { ArrowIconMemo as ArrowIcon };
