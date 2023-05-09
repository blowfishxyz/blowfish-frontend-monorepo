import React from "react";
import { css, styled } from "styled-components";

interface TextProps {
  className?: string;
  style?: React.CSSProperties;
  design?: "primary" | "secondary" | "danger" | "success";
  weight?: "semi-bold" | "bold" | "normal";
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const StyledText = styled.span<TextProps>`
  font-family: "GT-Planar";
  ${getDesignStyles};
  ${getSizeStyles};
  ${getWeightStyles};
`;

export const Text = React.memo(
  React.forwardRef<
    HTMLSpanElement,
    TextProps &
      React.HTMLAttributes<HTMLSpanElement> & {
        as?: keyof JSX.IntrinsicElements;
      }
  >((props, ref) => {
    return <StyledText ref={ref} as={props.as} {...props} />;
  })
);

function getSizeStyles({ size }: TextProps) {
  if (size === "xxl") {
    return css`
      font-size: 28px;
      line-height: 36.4px;
    `;
  }
  if (size === "xl") {
    return css`
      font-size: 24px;
      line-height: 31.2px;
    `;
  }
  if (size === "lg") {
    return css`
      font-size: 18px;
      line-height: 23.4px;
    `;
  }
  if (size === "md") {
    return css`
      font-size: 15px;
      line-height: 21px;
    `;
  }
  if (size === "sm") {
    return css`
      font-size: 13.5px;
      line-height: 19px;
    `;
  }
  if (size === "xs") {
    return css`
      font-size: 12px;
      line-height: 15.6px;
    `;
  }
  if (size === "xxs") {
    return css`
      font-size: 10px;
      line-height: 13px;
    `;
  }
  return css`
    font-size: 15px;
    line-height: 21px;
  `;
}

function getWeightStyles({ weight }: TextProps) {
  if (weight === "bold") {
    return css`
      font-weight: 700;
    `;
  }
  if (weight === "semi-bold") {
    return css`
      font-weight: 500;
    `;
  }
  if (weight === "normal") {
    return css`
      font-weight: 400;
    `;
  }
  return css`
    font-weight: 400;
  `;
}

function getDesignStyles({ design }: TextProps) {
  if (design === "danger") {
    return css`
      color: ${(p) => p.theme.palette.warningText};
    `;
  }
  if (design === "success") {
    return css`
      color: ${(p) => p.theme.palette.green};
    `;
  }
  if (design === "secondary") {
    return css`
      color: ${(p) => p.theme.colors.secondaryText};
    `;
  }
  if (design === "primary") {
    return css`
      color: ${(p) => p.theme.colors.primaryText};
    `;
  }
  return css`
    color: ${(p) => p.theme.colors.primaryText};
  `;
}

// const StyledText = styled.span<TypographyProps>`
//   font-family: "GT-Planar";
//   font-style: normal;
//   font-size: 16px;
//   line-height: 18px;
//   font-weight: ${(props) => (props.semiBold ? 500 : 400)};
//   color: ${(props) =>
//     props.danger
//       ? props.theme.palette.warningText
//       : props.secondary
//       ? props.theme.colors.secondaryText
//       : props.theme.colors.primaryText};
// `;

// const TextXLComponent = React.forwardRef<
//   HTMLSpanElement,
//   TypographyProps & React.HTMLAttributes<HTMLSpanElement>
// >(({ className, style, ...props }, ref) => (
//   <span
//     className={className}
//     style={style}
//     ref={ref}
//     as={props.as}
//     {...props}
//   />
// ));

// export const TextXL = styled(TextXLComponent)`
//   font-weight: 500;
//   font-size: 26px;
//   line-height: 23px;
// `;

// const TextSmallComponent = React.forwardRef<
//   HTMLSpanElement,
//   TypographyProps & React.HTMLAttributes<HTMLSpanElement>
// >(({ className, style, ...props }, ref) => (
//   <Text
//     className={className}
//     style={{ ...style, fontSize: "14px", lineHeight: "16px" }}
//     ref={ref}
//     {...props}
//   />
// ));

// export const TextSmall = styled(TextSmallComponent)``;

// const GrayTextComponent = React.forwardRef<
//   HTMLSpanElement,
//   TypographyProps & React.HTMLAttributes<HTMLSpanElement>
// >(({ className, style, ...props }, ref) => (
//   <Text
//     className={className}
//     style={{ ...style }}
//     ref={ref}
//     {...props}
//     secondary
//   />
// ));

// export const GrayText = styled(GrayTextComponent)``;

// const RedTextComponent = React.forwardRef<
//   HTMLSpanElement,
//   TypographyProps & React.HTMLAttributes<HTMLSpanElement>
// >(({ className, style, ...props }, ref) => {
//   return (
//     <Text
//       className={className}
//       style={{ ...style }}
//       ref={ref}
//       {...props}
//       danger
//     />
//   );
// });

// export const RedText = styled(RedTextComponent)``;
