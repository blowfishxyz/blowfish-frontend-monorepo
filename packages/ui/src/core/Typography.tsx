import React from "react";
import { styled } from "styled-components";
import { StyledSpan } from "./StyledBase";

interface TypographyProps {
  className?: string;
  style?: React.CSSProperties;
  secondary?: boolean;
  danger?: boolean;
  semiBold?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const TextXLComponent = React.forwardRef<
  HTMLSpanElement,
  TypographyProps & React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => (
  <span
    className={className}
    style={style}
    ref={ref}
    as={props.as}
    {...props}
  />
));

export const TextXL = styled(TextXLComponent)`
  font-weight: 500;
  font-size: 26px;
  line-height: 23px;
`;

const StyledText = styled(StyledSpan)<TypographyProps>`
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

const TextSmallComponent = React.forwardRef<
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

export const TextSmall = styled(TextSmallComponent)``;

const GrayTextComponent = React.forwardRef<
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

export const GrayText = styled(GrayTextComponent)``;

const RedTextComponent = React.forwardRef<
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

export const RedText = styled(RedTextComponent)``;
