import React from "react";

interface SwitchIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const SwitchIcon: React.FC<SwitchIconProps> = ({ className, style }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7 0.740094C11.633 0.812317 11.5809 0.897027 11.5467 0.989387C11.5124 1.08175 11.4967 1.17995 11.5004 1.27838C11.5041 1.37681 11.5272 1.47355 11.5683 1.56307C11.6094 1.65258 11.6677 1.73312 11.74 1.80009L13.84 3.75009H5.24998C5.05106 3.75009 4.8603 3.82911 4.71965 3.96976C4.57899 4.11042 4.49998 4.30118 4.49998 4.50009C4.49998 4.69901 4.57899 4.88977 4.71965 5.03042C4.8603 5.17108 5.05106 5.25009 5.24998 5.25009H13.84L11.74 7.20009C11.6677 7.26707 11.6094 7.34761 11.5683 7.43713C11.5272 7.52665 11.5042 7.62338 11.5004 7.72181C11.4967 7.82024 11.5124 7.91844 11.5467 8.0108C11.5809 8.10316 11.633 8.18787 11.7 8.26009C11.7669 8.33232 11.8475 8.39065 11.937 8.43175C12.0265 8.47285 12.1233 8.49591 12.2217 8.49963C12.3201 8.50334 12.4183 8.48763 12.5107 8.4534C12.603 8.41916 12.6877 8.36707 12.76 8.30009L16.26 5.05009C16.3357 4.97989 16.3961 4.8948 16.4374 4.80016C16.4787 4.70551 16.5001 4.60336 16.5001 4.50009C16.5001 4.39683 16.4787 4.29467 16.4374 4.20003C16.3961 4.10539 16.3357 4.0203 16.26 3.95009L12.76 0.700094C12.6878 0.633112 12.603 0.581013 12.5107 0.546772C12.4183 0.512531 12.3201 0.496819 12.2217 0.500533C12.1233 0.504248 12.0265 0.527316 11.937 0.56842C11.8475 0.609524 11.7669 0.667859 11.7 0.740094ZM5.29998 8.74009C5.23301 8.66786 5.15246 8.60952 5.06295 8.56842C4.97343 8.52732 4.87669 8.50425 4.77826 8.50053C4.67983 8.49682 4.58163 8.51253 4.48927 8.54677C4.39691 8.58101 4.3122 8.63311 4.23998 8.70009L0.739976 11.9501C0.664247 12.0203 0.603833 12.1054 0.562518 12.2C0.521203 12.2947 0.499878 12.3968 0.499878 12.5001C0.499878 12.6034 0.521203 12.7055 0.562518 12.8002C0.603833 12.8948 0.664247 12.9799 0.739976 13.0501L4.23998 16.3001C4.3122 16.3671 4.39691 16.4192 4.48927 16.4534C4.58163 16.4876 4.67983 16.5033 4.77826 16.4996C4.87669 16.4959 4.97343 16.4728 5.06294 16.4317C5.15246 16.3906 5.233 16.3323 5.29998 16.2601C5.36695 16.1879 5.41904 16.1032 5.45328 16.0108C5.48751 15.9184 5.50322 15.8202 5.49951 15.7218C5.49579 15.6234 5.47273 15.5266 5.43163 15.4371C5.39053 15.3476 5.3322 15.2671 5.25998 15.2001L3.15998 13.2501H11.75C11.9489 13.2501 12.1397 13.1711 12.2803 13.0304C12.421 12.8898 12.5 12.699 12.5 12.5001C12.5 12.3012 12.421 12.1104 12.2803 11.9698C12.1397 11.8291 11.9489 11.7501 11.75 11.7501H3.15998L5.25998 9.80009C5.33221 9.73312 5.39055 9.65258 5.43165 9.56307C5.47275 9.47355 5.49582 9.37681 5.49954 9.27838C5.50325 9.17995 5.48754 9.08175 5.4533 8.98939C5.41906 8.89703 5.36696 8.81232 5.29998 8.74009Z"
      fill="black"
    />
  </svg>
);

const SwitchIconMemo = React.memo(SwitchIcon);
export { SwitchIconMemo as SwitchIcon };
