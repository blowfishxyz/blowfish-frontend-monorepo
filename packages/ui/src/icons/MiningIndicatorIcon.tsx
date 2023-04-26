import React from "react";

interface MiningIndicatorIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const MiningIndicatorIcon: React.FC<MiningIndicatorIconProps> = ({
  className,
  style,
}) => (
  <svg
    className={className}
    style={style}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="3" fill="#D6A243" />
    <circle
      cx="6"
      cy="6"
      r="4.5"
      stroke="#D6A243"
      stroke-opacity="0.3"
      stroke-width="3"
    />
  </svg>
);

const MiningIndicatorIconMemo = React.memo(MiningIndicatorIcon);
export { MiningIndicatorIconMemo as MiningIndicatorIcon };
