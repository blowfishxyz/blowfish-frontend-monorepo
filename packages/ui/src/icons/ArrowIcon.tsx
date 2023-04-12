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


const ArrowRightIcon: React.FC<ArrowIconProps> = ({
  className,
  style,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={className}
    style={style}
  >
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

const ArrowRightIconMemo = React.memo(ArrowRightIcon);
const ArrowIconMemo = React.memo(ArrowIcon);
export { ArrowRightIconMemo as ArrowRightIcon };
export { ArrowIconMemo as ArrowIcon };
