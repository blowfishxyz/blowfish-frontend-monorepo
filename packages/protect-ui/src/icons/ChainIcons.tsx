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
    <title>Ethereum</title>
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
    <title>Polygon</title>
    <path
      d="M12 5.72007V8.56453C11.999 8.74192 11.9543 8.91601 11.8701 9.06976C11.786 9.2235 11.6654 9.35167 11.52 9.44173L9.17625 10.861C9.03108 10.952 8.86524 11 8.69624 11C8.52726 11 8.3614 10.952 8.21625 10.861L5.87249 9.44173C5.72712 9.35167 5.60648 9.2235 5.52234 9.06976C5.43822 8.91601 5.39347 8.74192 5.3925 8.56453V7.76619L6.59249 7.03388V8.42163L8.6925 9.70291L10.7925 8.42163V5.86494L8.6925 4.58365L3.77251 7.57992C3.62599 7.6667 3.46067 7.71231 3.29249 7.71231C3.12434 7.71231 2.95902 7.6667 2.8125 7.57992L0.468746 6.15472C0.325619 6.06329 0.207298 5.93466 0.125177 5.78117C0.0430802 5.62771 -2.49199e-05 5.45459 1.08082e-08 5.27851V2.43403C0.000972307 2.25664 0.0457228 2.08258 0.129864 1.9288C0.21398 1.77506 0.334644 1.64689 0.47999 1.55683L2.82375 0.137551C2.96922 0.0474926 3.13493 0 3.30374 0C3.47257 0 3.63828 0.0474926 3.78375 0.137551L6.12751 1.55683C6.27285 1.64689 6.39352 1.77506 6.47763 1.9288C6.56178 2.08258 6.60653 2.25664 6.6075 2.43403V3.23236L5.40001 3.95975V2.57989L3.3 1.29861L1.19999 2.57989V5.13362L3.3 6.41493L8.21999 3.41867C8.36651 3.33186 8.53182 3.28628 8.7 3.28628C8.86816 3.28628 9.03348 3.33186 9.17999 3.41867L11.5238 4.84384C11.6683 4.93432 11.7881 5.06254 11.8715 5.21608C11.955 5.36962 11.9993 5.54323 12 5.72007Z"
      fill="#7B3FE4"
    />
  </svg>
);

const ArbitrumIcon: React.FC<ChainIconProps> = ({ className, style }) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="22 20 39.19 44"
    className={className}
    style={style}
  >
    <title>Arbitrum</title>
    <path
      d="M46.5536 40.1606L49.7849 34.6775L58.4947 48.2431L58.4988 50.8465L58.4704 32.9317C58.4498 32.4937 58.2172 32.093 57.8463 31.8566L42.1654 22.8371C41.7988 22.6568 41.3334 22.6589 40.9674 22.8428C40.9179 22.8677 40.8716 22.8945 40.8272 22.924L40.7725 22.9584L25.5516 31.7786L25.4926 31.8057C25.4165 31.8404 25.3399 31.8851 25.2676 31.9365C24.979 32.1433 24.7873 32.4495 24.7253 32.7926C24.7161 32.8446 24.709 32.8976 24.7061 32.9512L24.7299 47.55L32.8427 34.9759C33.8639 33.3086 36.0894 32.7712 38.1555 32.8007L40.58 32.8646L26.2937 55.7757L27.9777 56.7452L42.4351 32.8879L48.8254 32.8646L34.4054 57.324L40.4145 60.7806L41.1326 61.1932C41.4363 61.3167 41.7942 61.3229 42.1005 61.2122L58.0017 51.9972L54.9615 53.7589L46.5536 40.1606ZM47.7863 57.9172L41.7171 48.3912L45.4222 42.104L53.3931 54.6678L47.7863 57.9172Z"
      fill="#2D374B"
    ></path>
    <path
      d="M41.7153 48.3915L47.7848 57.9173L53.3914 54.6681L45.4204 42.1042L41.7153 48.3915Z"
      fill="#28A0F0"
    ></path>
    <path
      d="M58.4979 50.8467L58.4938 48.2433L49.784 34.6777L46.5527 40.1608L54.9609 53.7591L58.0011 51.9974C58.2992 51.7554 58.4798 51.3999 58.4987 51.0165L58.4979 50.8467Z"
      fill="#28A0F0"
    ></path>
    <path
      d="M22 53.3018L26.2932 55.7756L40.5794 32.8646L38.1549 32.8007C36.0892 32.7714 33.8637 33.3086 32.8421 34.9758L24.7294 47.5499L22 51.7434V53.3018Z"
      fill="white"
    ></path>
    <path
      d="M48.8248 32.8646L42.4344 32.8879L27.9771 56.7452L33.0305 59.6546L34.4045 57.324L48.8248 32.8646Z"
      fill="white"
    ></path>
    <path
      d="M61.191 32.8316C61.1377 31.4952 60.414 30.272 59.2807 29.5596L43.3943 20.4237C42.2732 19.8592 40.8726 19.8584 39.7493 20.4234C39.6167 20.4903 24.3002 29.3734 24.3002 29.3734C24.0882 29.4749 23.8841 29.5959 23.6921 29.7335C22.6804 30.4588 22.0636 31.5856 22 32.8235V51.7438L24.7294 47.5502L24.7055 32.9512C24.7088 32.8979 24.7155 32.8451 24.7248 32.7934C24.7865 32.4498 24.9784 32.1436 25.267 31.9365C25.3393 31.8851 40.917 22.8677 40.9666 22.8428C41.3329 22.659 41.798 22.6568 42.1646 22.8371L57.8455 31.8566C58.2164 32.093 58.449 32.4937 58.4695 32.9317V51.016C58.4506 51.3994 58.299 51.7549 58.0009 51.9969L54.9607 53.7586L53.392 54.6678L47.7855 57.917L42.0996 61.2119C41.7934 61.3226 41.4352 61.3164 41.1317 61.1929L34.4046 57.3238L33.0303 59.6543L39.076 63.135C39.2758 63.2487 39.4539 63.3494 39.6001 63.4317C39.8265 63.5587 39.9808 63.6434 40.0352 63.67C40.4649 63.8787 41.083 64 41.6402 64C42.1508 64 42.649 63.9063 43.1203 63.7217L59.6354 54.1577C60.5832 53.4232 61.141 52.3156 61.191 51.1159V32.8316Z"
      fill="#96BEDC"
    ></path>
  </svg>
);

const OptimismIcon: React.FC<ChainIconProps> = ({ className, style }) => (
  <svg
    width="84"
    height="84"
    viewBox="0 0 84 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <title>Optimism</title>
    <g clipPath="url(#clip0_1139_294)">
      <path
        d="M42 84C65.196 84 84 65.196 84 42C84 18.804 65.196 0 42 0C18.804 0 0 18.804 0 42C0 65.196 18.804 84 42 84Z"
        fill="#FF0420"
      />
      <path
        d="M30.4614 53.7602C27.9282 53.7602 25.8527 53.1504 24.2347 51.9309C22.6382 50.6895 21.8398 48.9255 21.8398 46.6389C21.8398 46.1597 21.8931 45.5717 21.9994 44.8749C22.2763 43.3069 22.6701 41.4232 23.181 39.2235C24.6285 33.2347 28.3646 30.2402 34.3891 30.2402C36.0283 30.2402 37.4971 30.5233 38.7956 31.0896C40.0942 31.634 41.116 32.4615 41.8611 33.5722C42.6062 34.6612 42.9788 35.9679 42.9788 37.4923C42.9788 37.9496 42.9255 38.5267 42.819 39.2235C42.4998 41.1617 42.1166 43.0455 41.6696 44.8749C40.9245 47.8584 39.6366 50.0906 37.8057 51.5715C35.975 53.0306 33.5269 53.7602 30.4614 53.7602ZM30.9085 49.0562C32.1006 49.0562 33.1118 48.6969 33.9421 47.9782C34.7935 47.2596 35.4003 46.1597 35.7622 44.6788C36.2517 42.6317 36.6243 40.8461 36.8797 39.3216C36.9649 38.8642 37.0074 38.396 37.0074 37.9168C37.0074 35.9351 35.9964 34.9442 33.974 34.9442C32.7819 34.9442 31.7601 35.3036 30.9085 36.0223C30.0782 36.7408 29.4822 37.8407 29.1203 39.3216C28.7371 40.7807 28.3539 42.5664 27.9708 44.6788C27.8857 45.1144 27.843 45.5717 27.843 46.0509C27.843 48.0544 28.8648 49.0562 30.9085 49.0562Z"
        fill="white"
      />
      <path
        d="M44.445 53.4332C44.2108 53.4332 44.0299 53.3569 43.9021 53.2044C43.7957 53.0302 43.7638 52.8343 43.8063 52.6164L48.2129 31.3832C48.2554 31.1437 48.3725 30.9476 48.5642 30.7952C48.7557 30.6427 48.958 30.5664 49.1709 30.5664H57.6648C60.0277 30.5664 61.9222 31.0674 63.3486 32.0692C64.7962 33.0709 65.52 34.5191 65.52 36.4138C65.52 36.9583 65.4561 37.5245 65.3284 38.1125C64.7962 40.617 63.7212 42.468 62.1032 43.6659C60.5067 44.8635 58.3139 45.4625 55.5253 45.4625H51.2144L49.7456 52.6164C49.7031 52.856 49.586 53.052 49.3943 53.2044C49.2028 53.3569 49.0005 53.4332 48.7877 53.4332H44.445ZM55.7487 40.9545C56.6428 40.9545 57.4198 40.704 58.0799 40.2032C58.761 39.7022 59.208 38.9835 59.4211 38.0471C59.4849 37.677 59.5168 37.3502 59.5168 37.0672C59.5168 36.4357 59.3359 35.9565 58.974 35.6298C58.612 35.2813 57.9947 35.1071 57.1218 35.1071H53.2901L52.0766 40.9545H55.7487Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_1139_294">
        <rect width="84" height="84" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const BnbChainIcon: React.FC<ChainIconProps> = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <title>BNB Chain</title>
    <path
      d="M6.47406 4.68961L12 1.5L17.5259 4.68961L15.4943 5.86794L12 3.85666L8.50566 5.86794L6.47406 4.68961ZM17.5259 8.71218L15.4943 7.53385L12 9.54514L8.50566 7.53385L6.47406 8.71218V11.0688L9.9684 13.0801V17.1027L12 18.281L14.0316 17.1027V13.0801L17.5259 11.0688V8.71218ZM17.5259 15.0914V12.7348L15.4943 13.9131V16.2697L17.5259 15.0914ZM18.9684 15.9244L15.4741 17.9356V20.2923L21 17.1027V10.7235L18.9684 11.9018V15.9244ZM16.9368 6.7009L18.9684 7.87922V10.2359L21 9.05755V6.7009L18.9684 5.52257L16.9368 6.7009ZM9.9684 18.7889V21.1456L12 22.3239L14.0316 21.1456V18.7889L12 19.9672L9.9684 18.7889ZM6.47406 15.0914L8.50566 16.2697V13.9131L6.47406 12.7348V15.0914ZM9.9684 6.7009L12 7.87922L14.0316 6.7009L12 5.52257L9.9684 6.7009ZM5.0316 7.87922L7.0632 6.7009L5.0316 5.52257L3 6.7009V9.05755L5.0316 10.2359V7.87922ZM5.0316 11.9018L3 10.7235V17.1027L8.52594 20.2923V17.9356L5.0316 15.9244V11.9018Z"
      fill="#F0B90B"
    ></path>
  </svg>
);

const ImmutableIcon: React.FC<ChainIconProps> = ({ className, style }) => (
  <svg
    width="170"
    height="170"
    viewBox="0 0 170 170"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_643_18719)">
      <path
        d="M85 0C38.0559 0 0 38.0559 0 85C0 131.944 38.0559 170 85 170C131.944 170 170 131.944 170 85C170 38.0559 131.944 0 85 0ZM81.7125 32.4632C84.0732 31.3066 86.5606 31.3858 88.85 32.685C96.7875 37.2083 104.701 41.7712 112.575 46.3816C115.11 47.8709 116.41 50.2554 116.418 53.1864C116.465 63.4609 116.449 73.7274 116.418 84.0019C116.418 84.3821 116.172 84.9366 115.863 85.1188C112.813 86.9408 109.724 88.6915 106.373 90.6244V89.0084C106.373 78.4408 106.341 67.8812 106.397 57.3136C106.404 55.2856 105.707 53.9786 103.909 52.9567C94.6962 47.7204 85.5308 42.3891 76.3495 37.0895C75.9534 36.8597 75.5652 36.6142 74.9632 36.2498C77.3239 34.911 79.4469 33.5643 81.6966 32.4632H81.7125ZM80.0252 137.576C79.5102 137.315 79.13 137.133 78.7577 136.919C66.5979 129.908 54.4539 122.85 42.2544 115.895C38.8322 113.946 37.2717 111.165 37.3113 107.26C37.3826 98.9581 37.3588 90.6561 37.3192 82.3462C37.3034 78.5993 38.8243 75.8821 42.1198 74.0126C50.6831 69.1407 59.199 64.1976 67.7148 59.2465C68.4515 58.8187 68.9902 58.7474 69.7586 59.2069C72.6976 60.9734 75.692 62.6608 78.8211 64.4669C78.2269 64.8234 77.7754 65.0927 77.3159 65.3621C68.0951 70.6855 58.89 76.0247 49.6454 81.3164C48.1323 82.1799 47.4273 83.3047 47.4431 85.0634C47.4907 91.6067 47.4986 98.15 47.4431 104.693C47.4273 106.5 48.1482 107.648 49.7008 108.535C59.4525 114.112 69.1645 119.753 78.9082 125.345C79.7321 125.821 80.0806 126.312 80.0648 127.294C79.9935 130.645 80.041 134.004 80.041 137.584L80.0252 137.576ZM80.0252 118.834C79.1775 118.35 78.5676 118.01 77.9576 117.653C70.226 113.193 62.5023 108.718 54.7549 104.289C53.9152 103.814 53.6062 103.299 53.6142 102.325C53.6696 97.2945 53.6459 92.2642 53.63 87.2339C53.63 86.5527 53.733 86.0853 54.4063 85.705C57.2582 84.1128 60.0783 82.4492 62.9063 80.8253C63.1123 80.7064 63.3341 80.6193 63.7064 80.4371V86.0853C63.7064 89.1431 63.754 92.2088 63.6906 95.2665C63.651 97.0093 64.3243 98.1897 65.8453 99.0452C70.226 101.517 74.5513 104.083 78.932 106.547C79.7954 107.03 80.0568 107.569 80.041 108.52C79.9856 111.863 80.0172 115.213 80.0172 118.826L80.0252 118.834ZM71.0974 52.8062C69.4576 51.8397 68.0555 51.8476 66.4157 52.8062C57.2265 58.1771 47.9977 63.4767 38.7768 68.8001C38.3886 69.0298 37.9846 69.2358 37.2954 69.6081C37.541 66.1067 36.7884 62.8034 37.9846 59.603C38.6342 57.8523 39.8541 56.5373 41.4702 55.6025C49.1622 51.1584 56.8462 46.7064 64.5541 42.2861C67.3663 40.6701 70.2339 40.7097 73.0461 42.3336C81.7996 47.3719 90.5452 52.4259 99.2749 57.4958C99.6472 57.7097 100.115 58.1929 100.115 58.5573C100.178 62.1538 100.154 65.7582 100.154 69.616C96.9776 67.7861 94.0466 66.0909 91.1156 64.3956C84.4376 60.5377 77.7437 56.7195 71.0974 52.8062ZM132.609 109.359C132.38 112.187 130.724 114.192 128.276 115.602C118.905 120.988 109.541 126.407 100.178 131.809C97.2391 133.505 94.3001 135.2 91.3532 136.895C90.9967 137.101 90.6323 137.275 90.1491 137.529C90.1174 137.038 90.0778 136.681 90.0778 136.325C90.0778 133.219 90.0937 130.122 90.062 127.017C90.062 126.312 90.2283 125.884 90.8779 125.512C104.535 117.653 118.184 109.771 131.825 101.897C132.031 101.778 132.261 101.683 132.649 101.501C132.649 104.258 132.808 106.824 132.609 109.359ZM132.681 89.8085C132.657 93.0247 130.922 95.2824 128.173 96.8667C117.495 103.006 106.824 109.177 96.1538 115.34C94.205 116.465 92.2484 117.582 90.157 118.786C90.1254 118.255 90.0857 117.907 90.0857 117.55C90.0857 114.493 90.1174 111.427 90.062 108.369C90.0461 107.498 90.3392 107.038 91.0918 106.603C100.796 101.034 110.468 95.4012 120.188 89.8639C121.915 88.8816 122.676 87.6696 122.66 85.6417C122.589 75.0741 122.628 64.5065 122.628 53.939V52.0932C125.163 53.6221 127.54 54.8816 129.71 56.4185C131.691 57.8206 132.689 59.9436 132.697 62.3914C132.728 71.5331 132.752 80.6747 132.689 89.8164L132.681 89.8085Z"
        fill="#000000"
      />
    </g>
    <defs>
      <clipPath id="clip0_643_18719">
        <rect width="170" height="170" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const PolygonIconMemo = React.memo(PolygonIcon);
const EthereumIconMemo = React.memo(EthereumIcon);
const ArbitrumIconMemo = React.memo(ArbitrumIcon);
const OptimismIconMemo = React.memo(OptimismIcon);
const BnbChainIconMemo = React.memo(BnbChainIcon);
const ImmutableIconMemo = React.memo(ImmutableIcon);

export {
  EthereumIconMemo as EthereumIcon,
  PolygonIconMemo as PolygonIcon,
  ArbitrumIconMemo as ArbitrumIcon,
  OptimismIconMemo as OptimismIcon,
  BnbChainIconMemo as BnbChainIcon,
  ImmutableIconMemo as ImmutableIcon,
};
