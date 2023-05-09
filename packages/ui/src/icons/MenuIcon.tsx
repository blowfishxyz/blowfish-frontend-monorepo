import React from "react";

interface MenuIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const MenuIcon: React.FC<MenuIconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.79999 6.00002C3.79999 5.39251 4.29247 4.90002 4.89999 4.90002H18.1C18.7075 4.90002 19.2 5.39251 19.2 6.00002C19.2 6.60754 18.7075 7.10002 18.1 7.10002H4.89999C4.29247 7.10002 3.79999 6.60754 3.79999 6.00002Z"
      fill="black"
      fill-opacity="0.5"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.79999 11.5C3.79999 10.8925 4.29247 10.4 4.89999 10.4H18.1C18.7075 10.4 19.2 10.8925 19.2 11.5C19.2 12.1075 18.7075 12.6 18.1 12.6H4.89999C4.29247 12.6 3.79999 12.1075 3.79999 11.5Z"
      fill="black"
      fill-opacity="0.5"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.79999 17C3.79999 16.3925 4.29247 15.9 4.89999 15.9H18.1C18.7075 15.9 19.2 16.3925 19.2 17C19.2 17.6075 18.7075 18.1 18.1 18.1H4.89999C4.29247 18.1 3.79999 17.6075 3.79999 17Z"
      fill="black"
      fill-opacity="0.5"
    />
  </svg>
);

const MenuIconMemo = React.memo(MenuIcon);
export { MenuIconMemo as MenuIcon };
