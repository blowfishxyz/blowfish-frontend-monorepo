import React from "react";

interface ContinueIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const ContinueIcon: React.FC<ContinueIconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="17"
    height="14"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 0C0.947715 0 0.5 0.447716 0.5 1V13C0.5 13.5523 0.947715 14 1.5 14C2.05228 14 2.5 13.5523 2.5 13V1C2.5 0.447715 2.05228 0 1.5 0Z"
      fill="white"
    />
    <path
      d="M11.7929 9.29289C11.4024 9.68342 11.4024 10.3166 11.7929 10.7071C12.1834 11.0976 12.8166 11.0976 13.2071 10.7071L16.2071 7.70711C16.3946 7.51957 16.5 7.26522 16.5 7C16.5 6.73478 16.3946 6.48043 16.2071 6.29289L13.2071 3.29289C12.8166 2.90237 12.1834 2.90237 11.7929 3.29289C11.4024 3.68342 11.4024 4.31658 11.7929 4.70711L13.0858 6L5.5 6C4.94771 6 4.5 6.44772 4.5 7C4.5 7.55229 4.94772 8 5.5 8H13.0858L11.7929 9.29289Z"
      fill="white"
    />
  </svg>
);

const ContinueIconMemo = React.memo(ContinueIcon);
export { ContinueIconMemo as ContinueIcon };
