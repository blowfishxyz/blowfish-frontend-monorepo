import React from "react";

interface BrowsersIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const ChromeIcon: React.FC<BrowsersIconProps> = ({ className, style }) => (
  <svg
    width="39"
    height="40"
    className={className}
    style={style}
    viewBox="0 0 39 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Chrome browser</title>
    <g clip-path="url(#clip0_98_935)">
      <path
        d="M19.2986 29.4445C24.6278 29.4445 28.9479 25.1244 28.9479 19.7952C28.9479 14.4661 24.6278 10.146 19.2986 10.146C13.9695 10.146 9.64941 14.4661 9.64941 19.7952C9.64941 25.1244 13.9695 29.4445 19.2986 29.4445Z"
        fill="white"
      />
      <path
        d="M19.2988 10.1507H36.009C34.3158 7.21687 31.8799 4.78053 28.9463 3.08669C26.0128 1.39286 22.685 0.501229 19.2976 0.501465C15.9101 0.501701 12.5824 1.39379 9.64913 3.08804C6.71582 4.78229 4.28028 7.21897 2.5874 10.1531L10.9425 24.6246L10.95 24.6227C10.1001 23.157 9.65153 21.4932 9.64962 19.7989C9.64772 18.1046 10.0925 16.4398 10.9391 14.9722C11.7858 13.5046 13.0044 12.2862 14.472 11.4397C15.9397 10.5932 17.6046 10.1486 19.2988 10.1507Z"
        fill="url(#paint0_linear_98_935)"
      />
      <path
        d="M19.2986 27.4386C23.5175 27.4386 26.9376 24.0185 26.9376 19.7996C26.9376 15.5807 23.5175 12.1606 19.2986 12.1606C15.0798 12.1606 11.6597 15.5807 11.6597 19.7996C11.6597 24.0185 15.0798 27.4386 19.2986 27.4386Z"
        fill="#1A73E8"
      />
      <path
        d="M27.6545 24.627L19.2994 39.0985C22.6868 39.099 26.0146 38.2076 28.9483 36.514C31.8819 34.8204 34.318 32.3842 36.0115 29.4505C37.705 26.5168 38.5962 23.1889 38.5956 19.8014C38.595 16.414 37.7026 13.0864 36.008 10.1533H19.2979L19.2959 10.1608C20.9902 10.1575 22.6554 10.601 24.1236 11.4465C25.5919 12.2919 26.8113 13.5096 27.6589 14.9766C28.5065 16.4436 28.9524 18.1081 28.9517 19.8024C28.9509 21.4967 28.5034 23.1608 27.6545 24.627Z"
        fill="url(#paint1_linear_98_935)"
      />
      <path
        d="M10.9428 24.6268L2.58772 10.1553C0.893571 13.0886 0.0015911 16.4163 0.00146486 19.8038C0.00133862 23.1912 0.893071 26.519 2.587 29.4525C4.28092 32.386 6.71733 34.8218 9.65124 36.515C12.5852 38.2082 15.9131 39.0991 19.3006 39.0981L27.6557 24.6266L27.6503 24.6212C26.806 26.0901 25.5893 27.3104 24.123 28.1592C22.6567 29.008 20.9925 29.4552 19.2982 29.4558C17.6039 29.4563 15.9394 29.0102 14.4725 28.1625C13.0056 27.3147 11.7881 26.0951 10.9428 24.6268Z"
        fill="url(#paint2_linear_98_935)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_98_935"
        x1="2.5874"
        y1="12.563"
        x2="36.009"
        y2="12.563"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D93025" />
        <stop offset="1" stop-color="#EA4335" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_98_935"
        x1="16.6629"
        y1="38.8405"
        x2="33.3737"
        y2="9.89649"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FCC934" />
        <stop offset="1" stop-color="#FBBC04" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_98_935"
        x1="21.3877"
        y1="37.8932"
        x2="4.67685"
        y2="8.94912"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#1E8E3E" />
        <stop offset="1" stop-color="#34A853" />
      </linearGradient>
      <clipPath id="clip0_98_935">
        <rect
          width="38.5969"
          height="38.5969"
          fill="white"
          transform="translate(0 0.501465)"
        />
      </clipPath>
    </defs>
  </svg>
);

const BraveIcon: React.FC<BrowsersIconProps> = ({ className, style }) => (
  <svg
    width="35"
    height="41"
    className={className}
    style={style}
    viewBox="0 0 35 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Brave browser</title>
    <g clip-path="url(#clip0_98_955)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.341 10.3075L34.2851 7.99502C34.2851 7.99502 33.0833 6.71017 31.6243 5.25371C30.1659 3.79725 27.0763 4.65381 27.0763 4.65381L23.5574 0.669434H11.2002L7.68082 4.65381C7.68082 4.65381 4.59226 3.79725 3.13329 5.25421C2.23255 6.15431 1.34569 7.06819 0.473006 7.99552L1.41663 10.308L0.215332 13.7343C0.215332 13.7343 3.74878 27.0936 4.16297 28.7252C4.97827 31.9375 5.53589 33.1796 7.85294 34.8072C10.17 36.4347 14.3753 39.2616 15.0618 39.6904C15.7482 40.1182 16.6068 40.8479 17.3788 40.8479C18.1513 40.8479 19.0094 40.1182 19.6959 39.6904C20.3823 39.2616 24.5876 36.4347 26.9047 34.8072C29.2217 33.1796 29.7794 31.9375 30.5947 28.7252C31.0088 27.0936 34.5423 13.7343 34.5423 13.7343L33.341 10.3075V10.3075Z"
        fill="url(#paint0_linear_98_955)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.0889 7.18148C26.0889 7.18148 30.6148 12.6419 30.6148 13.8095C30.6148 14.9771 30.0456 15.2846 29.4729 15.8916L26.0798 19.4884C25.7587 19.8286 25.0904 20.3445 25.4835 21.2735C25.8765 22.202 26.4563 23.3837 25.8116 24.5825C25.1664 25.7808 24.0617 26.5805 23.3536 26.4486C22.6455 26.3163 20.9832 25.4491 20.3718 25.0526C19.7603 24.6565 17.8222 23.0611 17.8222 22.4507C17.8222 21.8402 19.8252 20.7446 20.1956 20.4955C20.5655 20.2463 22.254 19.2826 22.2882 18.9046C22.3229 18.5262 22.3098 18.4149 21.8116 17.4804C21.3134 16.5453 20.416 15.2982 20.5655 14.4683C20.715 13.6379 22.1619 13.2066 23.1941 12.8176C24.2268 12.4281 26.2147 11.6933 26.4628 11.579C26.7114 11.4643 26.647 11.3556 25.8946 11.2846C25.1427 11.2132 23.0079 10.9303 22.0451 11.1981C21.0829 11.4658 19.4382 11.8735 19.3053 12.0894C19.172 12.3058 19.0547 12.3128 19.1916 13.0581C19.3285 13.803 20.032 17.3792 20.1005 18.0143C20.1689 18.65 20.3028 19.0697 19.6168 19.2262C18.9304 19.3827 17.7754 19.6545 17.3788 19.6545C16.9817 19.6545 15.8267 19.3827 15.1403 19.2262C14.4543 19.0697 14.5882 18.65 14.6566 18.0143C14.7246 17.3792 15.4291 13.8035 15.5655 13.0581C15.7024 12.3128 15.5852 12.3053 15.4518 12.0894C15.3189 11.873 13.6742 11.4658 12.712 11.1986C11.7492 10.9303 9.61488 11.2137 8.86199 11.2841C8.11011 11.3556 8.04619 11.4643 8.2943 11.579C8.54292 11.6933 10.5308 12.4281 11.563 12.8171C12.5957 13.2066 14.0426 13.6379 14.1916 14.4678C14.3411 15.2982 13.4438 16.5453 12.946 17.4804C12.4478 18.4149 12.4342 18.5262 12.4689 18.9046C12.5036 19.2826 14.1916 20.2463 14.562 20.495C14.9319 20.7446 16.9349 21.8402 16.9349 22.4507C16.9349 23.0611 14.9973 24.6565 14.3859 25.0526C13.7744 25.4491 12.1116 26.3163 11.4035 26.4486C10.6954 26.581 9.59072 25.7808 8.94553 24.5825C8.30084 23.3837 8.88061 22.202 9.27366 21.2735C9.66672 20.3445 8.99888 19.8291 8.67779 19.4884L5.28425 15.8916C4.71153 15.2846 4.14233 14.9766 4.14233 13.8095C4.14233 12.6419 8.66823 7.18148 8.66823 7.18148C8.66823 7.18148 12.487 7.90971 13.0019 7.90971C13.5167 7.90971 14.6325 7.48143 15.6622 7.1387C16.6924 6.79597 17.3783 6.79346 17.3783 6.79346C17.3783 6.79346 18.0653 6.79597 19.095 7.1387C20.1246 7.48092 21.2404 7.90971 21.7552 7.90971C22.2701 7.90971 26.0889 7.18148 26.0889 7.18148V7.18148ZM22.6969 28.0707C22.9767 28.2458 22.8056 28.5759 22.5509 28.7561C22.2952 28.9363 18.866 31.587 18.5333 31.8799C18.2001 32.1728 17.711 32.657 17.3788 32.657C17.0461 32.657 16.557 32.1728 16.2243 31.8799C15.8911 31.587 12.4619 28.9358 12.2067 28.7561C11.9516 28.5759 11.7809 28.2458 12.0608 28.0707C12.3411 27.896 13.2178 27.4542 14.4271 26.8291C15.636 26.205 17.1433 25.6736 17.3788 25.6736C17.6138 25.6736 19.1211 26.2045 20.3305 26.8291C21.5398 27.4542 22.416 27.896 22.6964 28.0707H22.6969Z"
        fill="white"
      />
      <mask
        id="mask0_98_955"
        maskUnits="userSpaceOnUse"
        x="3"
        y="0"
        width="29"
        height="8"
      >
        <path
          d="M27.0756 4.65381L23.5577 0.669434H11.199L7.68061 4.65381C7.68061 4.65381 4.59154 3.79725 3.13257 5.25421C3.13257 5.25421 7.25182 4.8828 8.66802 7.18173C8.66802 7.18173 12.4868 7.90996 13.0017 7.90996C13.5165 7.90996 14.6323 7.48168 15.662 7.13896C16.6921 6.79623 17.3781 6.79371 17.3781 6.79371C17.3781 6.79371 18.0651 6.79623 19.0947 7.13896C20.1244 7.48118 21.2402 7.90996 21.755 7.90996C22.2699 7.90996 26.0892 7.18173 26.0892 7.18173C27.5049 4.8828 31.6241 5.25421 31.6241 5.25421C30.1652 3.79775 27.0756 4.65432 27.0756 4.65432V4.65381Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_98_955)">
        <path
          d="M27.0756 4.65381L23.5577 0.669434H11.199L7.68061 4.65381C7.68061 4.65381 4.59154 3.79725 3.13257 5.25421C3.13257 5.25421 7.25182 4.8828 8.66802 7.18173C8.66802 7.18173 12.4868 7.90996 13.0017 7.90996C13.5165 7.90996 14.6323 7.48168 15.662 7.13896C16.6921 6.79623 17.3781 6.79371 17.3781 6.79371C17.3781 6.79371 18.0651 6.79623 19.0947 7.13896C20.1244 7.48118 21.2402 7.90996 21.755 7.90996C22.2699 7.90996 26.0892 7.18173 26.0892 7.18173C27.5049 4.8828 31.6241 5.25421 31.6241 5.25421C30.1652 3.79775 27.0756 4.65432 27.0756 4.65432V4.65381Z"
          fill="url(#paint1_linear_98_955)"
        />
      </g>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_98_955"
        x1="0.215399"
        y1="21.0422"
        x2="34.5423"
        y2="21.0422"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF5500" />
        <stop offset="0.409877" stop-color="#FF5500" />
        <stop offset="0.581981" stop-color="#FF2000" />
        <stop offset="1" stop-color="#FF2000" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_98_955"
        x1="3.74494"
        y1="4.34041"
        x2="31.6242"
        y2="4.34041"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF452A" />
        <stop offset="1" stop-color="#FF2000" />
      </linearGradient>
      <clipPath id="clip0_98_955">
        <rect
          width="34.7256"
          height="40.2615"
          fill="white"
          transform="translate(0.197266 0.669434)"
        />
      </clipPath>
    </defs>
  </svg>
);

const ChromeIconMemo = React.memo(ChromeIcon);
const BraveIconMemo = React.memo(BraveIcon);
export { ChromeIconMemo as ChromeIcon, BraveIconMemo as BraveIcon };
