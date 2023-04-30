import React from "react";
import { useTheme } from "styled-components";

import type { WarningSeverity } from "@blowfish/utils/types";

interface BlowfishWarningIconProps {
  className?: string;
  style?: React.CSSProperties;
  severity?: WarningSeverity;
  color?: string;
}

const BlowfishWarningIcon: React.FC<BlowfishWarningIconProps> = ({
  className,
  style,
  severity,
  color: forcedColor,
}) => {
  const theme = useTheme();
  let color;

  if (theme) {
    color = severity === "WARNING" ? theme.palette.yellow : theme.palette.red;
  }

  if (forcedColor) {
    color = forcedColor;
  }
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

interface BlowfishInvertedWarningIconProps {
  className?: string;
  style?: React.CSSProperties;
}
const BlowfishInvertedWarningIcon: React.FC<
  BlowfishInvertedWarningIconProps
> = ({ className, style }) => {
  return (
    <svg
      className={className}
      style={style}
      width="104"
      height="104"
      viewBox="0 0 104 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <path
          d="M48.8031 36.0625L55.5059 36.0625L55.5059 58.452L48.8031 58.452L48.8031 36.0625ZM48.5703 62.0362L55.6456 62.0362L55.6456 68.646L48.5703 68.646L48.5703 62.0362Z"
          fill="black"
          fillOpacity="0.5"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M39.103 14.9246L43.8953 8L52.2333 13.7705L60.8366 8.26433L65.3761 15.3572L52.0509 23.8855L39.103 14.9246ZM25.1361 24.5478L26.9516 14.5716L35.2367 16.0793L32.4175 31.5712L16.9647 34.9632L15.1592 26.7378L25.1361 24.5478ZM69.378 16.0813L77.663 14.5736L79.4785 24.5498L89.4554 26.7398L87.6499 34.9651L72.1972 31.5731L69.378 16.0813ZM13.7705 51.9632L8 43.6252L14.9246 38.8329L23.8855 51.7808L15.3572 65.106L8.26433 60.5665L13.7705 51.9632ZM89.0754 38.8329L96 43.6252L90.2295 51.9632L95.7357 60.5665L88.6428 65.106L80.1145 51.7808L89.0754 38.8329ZM25.2114 79.0068L15.2352 77.1913L16.7429 68.9062L32.2348 71.7254L35.6267 87.1782L27.4014 88.9837L25.2114 79.0068ZM87.8756 68.9062L89.3834 77.1913L79.4071 79.0068L77.2171 88.9837L68.9918 87.1782L72.3838 71.7254L87.8756 68.9062ZM52.0509 80.1145L65.3761 88.6428L60.8367 95.7357L52.2333 90.2295L43.8953 96L39.103 89.0754L52.0509 80.1145Z"
          fill="black"
          fillOpacity="0.5"
        />
      </g>
    </svg>
  );
};

const BlowfishWarningIconMemo = React.memo(BlowfishWarningIcon);
const BlowfishInvertedWarningIconMemo = React.memo(BlowfishInvertedWarningIcon);
export {
  BlowfishWarningIconMemo as BlowfishWarningIcon,
  BlowfishInvertedWarningIconMemo as BlowfishInvertedWarningIcon,
};
