import React from "react";

interface WarningIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const WarningIcon: React.FC<WarningIconProps> = ({ className, style }) => (
  <svg
    width="16"
    height="16"
    className={className}
    style={style}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_201_1892)">
      <path
        d="M15.8 12.526L9.48298 0.880001C9.32718 0.591065 9.08959 0.354523 8.79998 0.200001C8.4065 -0.010568 7.94579 -0.0572588 7.51807 0.0700845C7.09035 0.197428 6.7302 0.488504 6.51598 0.880001L0.199976 12.526C0.0618683 12.7823 -0.00718487 13.0701 -0.000398422 13.3611C0.00638803 13.6522 0.0887806 13.9365 0.238683 14.186C0.388586 14.4356 0.60084 14.6419 0.854589 14.7846C1.10834 14.9273 1.39485 15.0015 1.68598 15H14.314C14.593 15 14.8678 14.9313 15.114 14.8C15.309 14.6965 15.4817 14.5553 15.6219 14.3847C15.7622 14.2142 15.8673 14.0175 15.9311 13.8061C15.995 13.5947 16.0164 13.3727 15.994 13.153C15.9717 12.9333 15.9061 12.7202 15.801 12.526H15.8ZM7.99998 13C7.80219 13 7.60885 12.9414 7.44441 12.8315C7.27996 12.7216 7.15178 12.5654 7.0761 12.3827C7.00041 12.2 6.98061 11.9989 7.01919 11.8049C7.05778 11.6109 7.15302 11.4327 7.29287 11.2929C7.43272 11.153 7.6109 11.0578 7.80489 11.0192C7.99887 10.9806 8.19993 11.0004 8.38266 11.0761C8.56538 11.1518 8.72156 11.28 8.83144 11.4444C8.94133 11.6089 8.99998 11.8022 8.99998 12C8.99998 12.2652 8.89462 12.5196 8.70708 12.7071C8.51955 12.8946 8.26519 13 7.99998 13ZM8.99998 9.5C8.99998 9.63261 8.9473 9.75979 8.85353 9.85355C8.75976 9.94732 8.63258 10 8.49998 10H7.49998C7.36737 10 7.24019 9.94732 7.14642 9.85355C7.05265 9.75979 6.99998 9.63261 6.99998 9.5V5.5C6.99998 5.36739 7.05265 5.24022 7.14642 5.14645C7.24019 5.05268 7.36737 5 7.49998 5H8.49998C8.63258 5 8.75976 5.05268 8.85353 5.14645C8.9473 5.24022 8.99998 5.36739 8.99998 5.5V9.5Z"
        fill="#FFB800"
      />
    </g>
    <defs>
      <clipPath id="clip0_201_1892">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WarningIconMemo = React.memo(WarningIcon);
export { WarningIconMemo as WarningIcon };
