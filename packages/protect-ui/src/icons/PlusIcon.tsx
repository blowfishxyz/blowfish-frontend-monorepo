import React from "react";

interface PlusIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const PlusIcon: React.FC<PlusIconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.99999 0.900024C6.44182 0.900024 6.79999 1.2582 6.79999 1.70002V5.70002H10.8C11.2418 5.70002 11.6 6.0582 11.6 6.50002C11.6 6.94185 11.2418 7.30002 10.8 7.30002H6.79999V11.3C6.79999 11.7419 6.44182 12.1 5.99999 12.1C5.55817 12.1 5.19999 11.7419 5.19999 11.3V7.30002H1.19999C0.758166 7.30002 0.399994 6.94185 0.399994 6.50002C0.399994 6.0582 0.758166 5.70002 1.19999 5.70002H5.19999V1.70002C5.19999 1.2582 5.55817 0.900024 5.99999 0.900024Z"
      fill="black"
    />
  </svg>
);

const PlusIconMemo = React.memo(PlusIcon);
export { PlusIconMemo as PlusIcon };
