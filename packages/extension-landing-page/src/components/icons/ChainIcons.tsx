import React from "react";

interface ChainIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const EthereumIcon: React.FC<ChainIconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
    width="256px"
    height="417px"
    viewBox="0 0 256 417"
    version="1.1"
    preserveAspectRatio="xMidYMid"
  >
    <title>Ethereum blockchain</title>
    <g>
      <polygon
        fill="#343434"
        points="127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32"
      />
      <polygon
        fill="#8C8C8C"
        points="127.962 0 0 212.32 127.962 287.959 127.962 154.158"
      />
      <polygon
        fill="#3C3C3B"
        points="127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866"
      />
      <polygon
        fill="#8C8C8C"
        points="127.962 416.9052 127.962 312.1852 0 236.5852"
      />
      <polygon
        fill="#141414"
        points="127.9611 287.9577 255.9211 212.3207 127.9611 154.1587"
      />
      <polygon
        fill="#393939"
        points="0.0009 212.3208 127.9609 287.9578 127.9609 154.1588"
      />
    </g>
  </svg>
);

const PolygonIcon: React.FC<ChainIconProps> = ({ className, style }) => (
  <svg
    width="12"
    height="11"
    viewBox="0 0 12 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <title>Polygon blockchain</title>
    <path
      d="M12 5.72007V8.56453C11.999 8.74192 11.9543 8.91601 11.8701 9.06976C11.786 9.2235 11.6654 9.35167 11.52 9.44173L9.17625 10.861C9.03108 10.952 8.86524 11 8.69624 11C8.52726 11 8.3614 10.952 8.21625 10.861L5.87249 9.44173C5.72712 9.35167 5.60648 9.2235 5.52234 9.06976C5.43822 8.91601 5.39347 8.74192 5.3925 8.56453V7.76619L6.59249 7.03388V8.42163L8.6925 9.70291L10.7925 8.42163V5.86494L8.6925 4.58365L3.77251 7.57992C3.62599 7.6667 3.46067 7.71231 3.29249 7.71231C3.12434 7.71231 2.95902 7.6667 2.8125 7.57992L0.468746 6.15472C0.325619 6.06329 0.207298 5.93466 0.125177 5.78117C0.0430802 5.62771 -2.49199e-05 5.45459 1.08082e-08 5.27851V2.43403C0.000972307 2.25664 0.0457228 2.08258 0.129864 1.9288C0.21398 1.77506 0.334644 1.64689 0.47999 1.55683L2.82375 0.137551C2.96922 0.0474926 3.13493 0 3.30374 0C3.47257 0 3.63828 0.0474926 3.78375 0.137551L6.12751 1.55683C6.27285 1.64689 6.39352 1.77506 6.47763 1.9288C6.56178 2.08258 6.60653 2.25664 6.6075 2.43403V3.23236L5.40001 3.95975V2.57989L3.3 1.29861L1.19999 2.57989V5.13362L3.3 6.41493L8.21999 3.41867C8.36651 3.33186 8.53182 3.28628 8.7 3.28628C8.86816 3.28628 9.03348 3.33186 9.17999 3.41867L11.5238 4.84384C11.6683 4.93432 11.7881 5.06254 11.8715 5.21608C11.955 5.36962 11.9993 5.54323 12 5.72007Z"
      fill="#7B3FE4"
    />
  </svg>
);

const PolygonIconMemo = React.memo(PolygonIcon);
const EthereumIconMemo = React.memo(EthereumIcon);
export { EthereumIconMemo as EthereumIcon, PolygonIconMemo as PolygonIcon };
