import React from "react";
import { styled } from "styled-components";
import { StyledBaseText } from "./StyledBase";

interface TypographyProps {
  className?: string;
  style?: React.CSSProperties;
  secondary?: boolean;
  danger?: boolean;
  semiBold?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const StyledText = styled(StyledBaseText)<TypographyProps>`
  font-family: "GT-Planar";
  font-style: normal;
  font-size: 16px;
  line-height: 18px;
  font-weight: ${(props) => (props.semiBold ? 500 : 400)};
  color: ${(props) =>
    props.danger
      ? props.theme.palette.warningText
      : props.secondary
      ? props.theme.colors.secondaryText
      : props.theme.colors.primaryText};
`;

export const Text = React.forwardRef<
  HTMLSpanElement,
  TypographyProps & React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  return <StyledText ref={ref} as={props.as} {...props} />;
});

export const TextXL = React.forwardRef<
  HTMLSpanElement,
  TypographyProps & React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => (
  <Text
    className={className}
    style={{
      ...style,
      fontSize: "26px",
      lineHeight: "23px",
    }}
    ref={ref}
    as={props.as}
    semiBold
    {...props}
  />
));

export const TextSmall = React.forwardRef<
  HTMLSpanElement,
  TypographyProps & React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => (
  <Text
    className={className}
    style={{ ...style, fontSize: "14px", lineHeight: "16px" }}
    ref={ref}
    {...props}
  />
));

export const GrayText = React.forwardRef<
  HTMLSpanElement,
  TypographyProps & React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => (
  <Text
    className={className}
    style={{ ...style }}
    ref={ref}
    {...props}
    secondary
  />
));

export const RedText = React.forwardRef<
  HTMLSpanElement,
  TypographyProps & React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => {
  return (
    <Text
      className={className}
      style={{ ...style }}
      ref={ref}
      {...props}
      danger
    />
  );
});
