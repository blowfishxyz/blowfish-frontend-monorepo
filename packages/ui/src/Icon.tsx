import { memo } from "react";

type IconVariant = "arrow" | "arrow-right" | "verified" | "blowfish-logo";

export const Icon = memo<{ variant: IconVariant } & IconProps>(function Icon({
  variant,
  color,
  size,
}) {
  switch (variant) {
    case "arrow":
      return <Arrow color={color} size={size} />;
    case "arrow-right":
      return <ArrowRight color={color} size={size} />;
    case "verified":
      return <Verified color={color} size={size} />;
    case "blowfish-logo":
      return <BlowfishLogo color={color} size={size} />;
  }

  return null;
});

type IconProps = {
  size: number;
  color?: string;
};

const Arrow: React.FC<IconProps> = memo<IconProps>(function Arrow({
  size,
  color = "black",
}) {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 11L11.5 1M11.5 1H3.1M11.5 1V9.4"
        stroke={color}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
    </svg>
  );
});

const ArrowRight: React.FC<IconProps> = memo<IconProps>(function ArrowRight({
  size,
  color = "black",
}) {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      viewBox="0 0 448 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
        fill={color}
      />
    </svg>
  );
});

const Verified: React.FC<IconProps> = memo(function Verified({
  size,
  color = "black",
}) {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5025 11.9858C15.9545 11.7468 16.3328 11.389 16.5967 10.951C16.8606 10.513 17 10.0113 17 9.5C17 8.98867 16.8606 8.48702 16.5967 8.04902C16.3328 7.61102 15.9545 7.25325 15.5025 7.01421C15.6532 6.52558 15.6677 6.00512 15.5447 5.50882C15.4216 5.01252 15.1655 4.55917 14.8039 4.19756C14.4424 3.83595 13.9891 3.57975 13.4928 3.45654C12.9965 3.33333 12.476 3.34777 11.9873 3.4983C11.7483 3.04605 11.3905 2.66754 10.9524 2.40353C10.5143 2.13952 10.0124 2 9.50091 2C8.98938 2 8.48754 2.13952 8.04941 2.40353C7.61129 2.66754 7.25348 3.04605 7.01451 3.4983C6.52585 3.34764 6.00535 3.33306 5.50903 3.45614C5.0127 3.57922 4.55933 3.83529 4.19769 4.19681C3.83605 4.55833 3.57984 5.0116 3.45663 5.50787C3.33341 6.00413 3.34785 6.5246 3.49839 7.01327C3.04611 7.25223 2.66758 7.61002 2.40355 8.04812C2.13952 8.48622 2 8.98803 2 9.49953C2 10.011 2.13952 10.5128 2.40355 10.9509C2.66758 11.389 3.04611 11.7468 3.49839 11.9858C3.34772 12.4744 3.33314 12.9949 3.45623 13.4912C3.57931 13.9875 3.8354 14.4408 4.19694 14.8024C4.55848 15.1641 5.01178 15.4202 5.50808 15.5435C6.00437 15.6667 6.52487 15.6522 7.01357 15.5017C7.25254 15.9539 7.61035 16.3325 8.04848 16.5965C8.4866 16.8605 8.98844 17 9.49997 17C10.0115 17 10.5134 16.8605 10.9515 16.5965C11.3896 16.3325 11.7474 15.9539 11.9864 15.5017C12.475 15.6524 12.9955 15.6669 13.4919 15.5439C13.9882 15.4208 14.4416 15.1647 14.8032 14.8032C15.1648 14.4417 15.421 13.9884 15.5443 13.4921C15.6675 12.9959 15.653 12.4745 15.5025 11.9858ZM13.1159 7.80531C13.1703 7.7306 13.2094 7.64591 13.231 7.55608C13.2526 7.46626 13.2563 7.37305 13.2419 7.28179C13.2275 7.19053 13.1953 7.103 13.147 7.0242C13.0988 6.9454 13.0355 6.87687 12.9608 6.82253C12.8861 6.76818 12.8014 6.72909 12.7115 6.70747C12.6217 6.68586 12.5285 6.68215 12.4372 6.69655C12.346 6.71096 12.2584 6.74319 12.1796 6.79143C12.1008 6.83966 12.0323 6.90294 11.9779 6.97766L8.71304 11.4675L6.95077 9.70527C6.88588 9.63816 6.80828 9.58464 6.72249 9.54784C6.6367 9.51104 6.54444 9.49169 6.45109 9.49092C6.35774 9.49016 6.26517 9.50799 6.17879 9.54337C6.09241 9.57876 6.01394 9.631 5.94796 9.69704C5.88198 9.76307 5.82981 9.84159 5.79451 9.928C5.7592 10.0144 5.74145 10.107 5.74231 10.2003C5.74316 10.2937 5.7626 10.3859 5.79948 10.4717C5.83637 10.5574 5.88996 10.635 5.95714 10.6998L8.3006 13.0431C8.37242 13.115 8.45898 13.1704 8.55429 13.2056C8.64961 13.2408 8.75142 13.2549 8.85272 13.247C8.95402 13.2391 9.0524 13.2093 9.14108 13.1597C9.22976 13.1101 9.30663 13.0418 9.3664 12.9597L13.1159 7.80531Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2526 11.2895C17.9271 11.8297 17.4605 12.271 16.9031 12.5658C17.0887 13.1686 17.1066 13.8116 16.9546 14.4236C16.8026 15.0357 16.4866 15.5948 16.0406 16.0406C15.5946 16.4865 15.0354 16.8023 14.4233 16.9541C13.8111 17.1058 13.1692 17.088 12.5665 16.9021C12.2718 17.4598 11.8305 17.9268 11.2901 18.2523C10.7498 18.5779 10.1309 18.75 9.49996 18.75C8.86908 18.75 8.25014 18.5779 7.70979 18.2523C7.16943 17.9268 6.72813 17.4598 6.4334 16.9021C5.83067 17.0877 5.18872 17.1056 4.57663 16.9536C3.96453 16.8016 3.40546 16.4857 2.95956 16.0396C2.51366 15.5937 2.19782 15.0346 2.04602 14.4225C1.89421 13.8104 1.91219 13.1684 2.09801 12.5658C1.5402 12.2711 1.07335 11.8298 0.747715 11.2895C0.422081 10.7492 0.25 10.1303 0.25 9.49942C0.25 8.86857 0.422081 8.24967 0.747715 7.70935C1.07335 7.16902 1.5402 6.72775 2.09801 6.43303C1.91235 5.83034 1.89454 5.18843 2.04651 4.57637C2.19847 3.96431 2.51446 3.40527 2.96048 2.9594C3.40651 2.51352 3.96566 2.1977 4.5778 2.04591C5.18993 1.89411 5.83188 1.91209 6.43456 2.0979C6.72929 1.54013 7.17059 1.0733 7.71094 0.747686C8.2513 0.422071 8.87023 0.25 9.50112 0.25C10.132 0.25 10.7509 0.422071 11.2913 0.747686C11.8317 1.0733 12.273 1.54013 12.5677 2.0979C13.1704 1.91225 13.8123 1.89444 14.4245 2.0464C15.0366 2.19836 15.5956 2.51434 16.0415 2.96032C16.4874 3.40631 16.8033 3.96544 16.9551 4.57754C17.1068 5.18965 17.0889 5.83155 16.9031 6.43419C17.4605 6.72901 17.9271 7.17026 18.2526 7.71046C18.5781 8.25066 18.75 8.86936 18.75 9.5C18.75 10.1306 18.5781 10.7493 18.2526 11.2895ZM16.5967 10.951C16.3328 11.389 15.9545 11.7467 15.5025 11.9858C15.653 12.4745 15.6675 12.9959 15.5443 13.4921C15.421 13.9884 15.1648 14.4417 14.8032 14.8032C14.4416 15.1647 13.9882 15.4208 13.4919 15.5439C12.9955 15.6669 12.475 15.6524 11.9864 15.5017C11.7474 15.9539 11.3896 16.3325 10.9515 16.5965C10.5134 16.8605 10.0115 17 9.49997 17C8.98844 17 8.4866 16.8605 8.04848 16.5965C7.61035 16.3325 7.25254 15.9539 7.01357 15.5017C6.52487 15.6522 6.00437 15.6667 5.50808 15.5435C5.01178 15.4202 4.55848 15.1641 4.19694 14.8024C3.8354 14.4408 3.57931 13.9875 3.45623 13.4912C3.33314 12.9949 3.34772 12.4744 3.49839 11.9858C3.04611 11.7468 2.66758 11.389 2.40355 10.9509C2.13952 10.5128 2 10.011 2 9.49953C2 8.98803 2.13952 8.48622 2.40355 8.04812C2.66758 7.61002 3.04611 7.25223 3.49839 7.01327C3.34785 6.5246 3.33341 6.00413 3.45663 5.50787C3.57984 5.0116 3.83605 4.55833 4.19769 4.19681C4.55933 3.83529 5.0127 3.57922 5.50903 3.45614C6.00535 3.33306 6.52585 3.34764 7.01451 3.4983C7.25348 3.04605 7.61129 2.66754 8.04941 2.40353C8.48754 2.13952 8.98938 2 9.50091 2C10.0124 2 10.5143 2.13952 10.9524 2.40353C11.3905 2.66754 11.7483 3.04605 11.9873 3.4983C12.476 3.34777 12.9965 3.33333 13.4928 3.45654C13.9891 3.57975 14.4424 3.83595 14.8039 4.19756C15.1655 4.55917 15.4216 5.01252 15.5447 5.50882C15.6677 6.00512 15.6532 6.52558 15.5025 7.01421C15.9545 7.25325 16.3328 7.61102 16.5967 8.04902C16.8606 8.48702 17 8.98867 17 9.5C17 10.0113 16.8606 10.513 16.5967 10.951ZM13.231 7.55608C13.2094 7.64591 13.1703 7.7306 13.1159 7.80531L9.3664 12.9597C9.30663 13.0418 9.22976 13.1101 9.14108 13.1597C9.0524 13.2093 8.95402 13.2391 8.85272 13.247C8.75142 13.2549 8.64961 13.2408 8.55429 13.2056C8.45898 13.1704 8.37242 13.115 8.3006 13.0431L5.95714 10.6998C5.88996 10.635 5.83637 10.5574 5.79948 10.4717C5.7626 10.3859 5.74316 10.2937 5.74231 10.2003C5.74145 10.107 5.7592 10.0144 5.79451 9.928C5.82981 9.84159 5.88198 9.76307 5.94796 9.69704C6.01394 9.631 6.09241 9.57876 6.17879 9.54337C6.26517 9.50799 6.35774 9.49016 6.45109 9.49092C6.54444 9.49169 6.6367 9.51104 6.72249 9.54784C6.80828 9.58464 6.88588 9.63816 6.95077 9.70527L8.71304 11.4675L11.9779 6.97766C12.0323 6.90294 12.1008 6.83966 12.1796 6.79143C12.2584 6.74319 12.346 6.71096 12.4372 6.69655C12.5285 6.68215 12.6217 6.68586 12.7115 6.70747C12.8014 6.72909 12.8861 6.76818 12.9608 6.82253C13.0355 6.87687 13.0988 6.9454 13.147 7.0242C13.1953 7.103 13.2275 7.19053 13.2419 7.28179C13.2563 7.37305 13.2526 7.46626 13.231 7.55608Z"
        fill="white"
      />
    </svg>
  );
});

const BlowfishLogo: React.FC<IconProps> = memo(function BlowfishLogo({
  size,
  color = "black",
}) {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      viewBox="0 0 48 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.8203 0L29.3415 7.43694L26.5161 9.53449L23.8503 5.94366L21.3445 9.39104L18.4981 7.32209L23.8203 0ZM40.4377 6.8876L39.0236 15.8285L35.5479 15.2787L36.2137 11.0692L31.7896 11.7233L31.275 8.24226L40.4377 6.8876ZM7.30073 6.92154L16.4635 8.27619L15.9488 11.7572L11.5247 11.1031L12.1905 15.3127L8.71487 15.8624L7.30073 6.92154ZM6.41192 23.4199L10.0027 20.7541L7.9052 17.9287L0.468262 23.4499L7.79035 28.7721L9.8593 25.9257L6.41192 23.4199ZM39.7993 17.9287L47.2363 23.4499L39.9142 28.7721L37.8452 25.9257L41.2926 23.4199L37.7018 20.7541L39.7993 17.9287ZM11.5544 35.7455L12.2085 31.3214L8.72749 30.8067L7.37283 39.9695L16.3137 38.5553L15.764 35.0797L11.5544 35.7455ZM39.0279 30.8237L40.3826 39.9864L31.4417 38.5723L31.9915 35.0966L36.201 35.7624L35.5469 31.3383L39.0279 30.8237ZM29.3415 39.3311L23.8203 46.768L18.4981 39.4459L21.3445 37.377L23.8503 40.8243L26.5161 37.2335L29.3415 39.3311Z"
        fill={color}
      />
    </svg>
  );
});
