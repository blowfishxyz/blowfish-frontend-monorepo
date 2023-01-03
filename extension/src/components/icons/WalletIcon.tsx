import React from "react"

interface WalletIconProps {
  className?: string
  style?: React.CSSProperties
}

const WalletIcon: React.FC<WalletIconProps> = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.3333 2.66667H2.66667H2C1.63267 2.66667 1.33333 2.36733 1.33333 2C1.33333 1.63267 1.63267 1.33333 2 1.33333H12V2H13.3333V0.666667C13.3333 0.298667 13.0347 0 12.6667 0H2C0.895333 0 0 0.895333 0 2V13.3333C0 14.806 1.194 16 2.66667 16H15.3333C15.7013 16 16 15.7013 16 15.3333V3.33333C16 2.96533 15.7013 2.66667 15.3333 2.66667ZM12 10.6667C11.2633 10.6667 10.6667 10.07 10.6667 9.33333C10.6667 8.59667 11.2633 8 12 8C12.7367 8 13.3333 8.59667 13.3333 9.33333C13.3333 10.07 12.7367 10.6667 12 10.6667Z"
      fill="#212121"
    />
  </svg>
)

const WalletIconMemo = React.memo(WalletIcon)
export { WalletIconMemo as WalletIcon }
