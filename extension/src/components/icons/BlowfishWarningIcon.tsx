import React from "react";
import { useTheme } from "styled-components";
import { WarningSeverity } from "../../types";

interface BlowfishWarningIconProps {
  className?: string;
  style?: React.CSSProperties;
  severity: WarningSeverity;
}

const BlowfishWarningIcon: React.FC<BlowfishWarningIconProps> = ({
  className,
  style,
  severity,
}) => {
  const theme = useTheme();
  const color =
    severity === "WARNING" ? theme.palette.yellow : theme.palette.red;
  return (
    <svg
      style={style}
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.537 17.1618H25.3537V26.5705H22.537V17.1618ZM22.4392 28.0767H25.4124V30.8543H22.4392V28.0767Z"
        fill={color}
      />
      <path
        d="M28.0337 9.40371L24.022 3.51213L20.1862 9.27714"
        stroke={color}
        strokeWidth="3.69777"
      />
      <path
        d="M28.0337 38.5963L24.022 44.4879L20.1862 38.7229"
        stroke={color}
        strokeWidth="3.69777"
      />
      <path
        d="M16.5589 37.1044L9.55627 38.4337L10.9204 31.6449"
        stroke={color}
        strokeWidth="3.69777"
      />
      <path
        d="M31.6651 37.1041L38.6678 38.4334L37.3037 31.6446"
        stroke={color}
        strokeWidth="3.69777"
      />
      <path
        d="M9.40369 27.9349L3.51212 23.9232L9.27713 20.0874"
        stroke={color}
        strokeWidth="3.69777"
      />
      <path
        d="M38.5963 27.9349L44.4879 23.9232L38.7229 20.0874"
        stroke={color}
        strokeWidth="3.69777"
      />
      <path
        d="M10.9491 16.3197L9.61981 9.317L16.4086 10.6812"
        stroke={color}
        strokeWidth="3.69777"
      />
      <path
        d="M37.2752 16.3197L38.6045 9.317L31.8157 10.6812"
        stroke={color}
        strokeWidth="3.69777"
      />
    </svg>
  );
};

const BlowfishWarningIconMemo = React.memo(BlowfishWarningIcon);
export { BlowfishWarningIconMemo as BlowfishWarningIcon };
