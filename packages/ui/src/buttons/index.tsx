import React from "react";
import { css, styled } from "styled-components";
import { Spinner } from "~/common/spinner";
import { Column } from "~/common/layout";
import { StyledBaseButton } from "~/common/base";

const resetStyles = css`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

const interactiveStyles = css`
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease-in;

  &:not(:disabled):hover {
    transform: scale(1.02);
  }

  &:not(:disabled):active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const baseStyles = css`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 20px;
  gap: 14px;
  border-radius: 10px;
  white-space: nowrap;

  font-family: ${({ theme }) => theme.typography.fontFamily}, -apple-system,
    BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
`;

const secondaryDesign = css`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.3);
  /* box-shadow: 0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
    0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663); */
  border-radius: 12px;
  color: #010101;

  &:disabled {
    opacity: 0.3;
  }
`;

const primaryDesign = css`
  background: #000000;
  /* box-shadow: 0px 9.94853px 24.1177px rgba(0, 0, 0, 0.136834),
    0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
    0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663); */
  color: #ffffff;

  &:disabled {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const tertiaryDesign = css`
  background: transparent;
  color: ${(p) => p.theme.colors.foregroundSecondary};
  border: none;
  padding: 9px 12px;
  border-radius: 56px;
  font-weight: 400;
  font-size: 15px;
  line-height: 17px;
  gap: 6px;

  svg {
    fill: ${(p) => p.theme.colors.base30};
  }
`;

const dangerDesign = css`
  background: ${(p) => p.theme.severityColors.CRITICAL.backgroundLight};
  color: ${(p) => p.theme.colors.danger};
  border: 1px solid ${(p) => p.theme.colors.danger};

  &:disabled {
    opacity: 0.3;
  }
`;

function getDesignStyles({ design }: ButtonProps) {
  if (design === "secondary") {
    return secondaryDesign;
  }
  if (design === "primary") {
    return primaryDesign;
  }
  if (design === "tertiary") {
    return tertiaryDesign;
  }
  if (design === "danger") {
    return dangerDesign;
  }

  return primaryDesign;
}

const smallSize = css`
  font-weight: 500;
  font-size: 15px;
  line-height: 21px;
  height: 40px;
  max-height: 40px;
`;

const mediumSize = css`
  font-weight: 500;
  font-size: 18px;
  line-height: 23.4px;
  height: 48px;
  max-height: 48px;
`;

function getSizeStyles({ size }: ButtonProps) {
  if (size === "sm") {
    return smallSize;
  }
  if (size === "md") {
    return mediumSize;
  }

  return mediumSize;
}

function getLoadingStyles({ $loading }: { $loading?: boolean }) {
  if ($loading) {
    return css`
      color: transparent;
    `;
  }
}

function getPositioningStyles({ $stretch }: { $stretch?: boolean }) {
  if ($stretch) {
    return css`
      flex: 1;
      align-items: center;
      justify-content: center;
    `;
  }
}

type ButtonProps = {
  design?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md";
  stretch?: boolean;
  loading?: boolean;
};

const ButtonComponent = styled(StyledBaseButton)<
  Omit<ButtonProps, "loading" | "stretch"> & {
    $loading?: boolean;
    $stretch?: boolean;
  }
>`
  ${resetStyles}
  ${baseStyles}
  ${getDesignStyles}
  ${getSizeStyles}
  ${interactiveStyles}
  ${getLoadingStyles}
  ${getPositioningStyles}
`;

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>(({ loading, stretch, ...props }, ref) => {
  return (
    <ButtonComponent ref={ref} {...props} $loading={loading} $stretch={stretch}>
      {loading ? (
        <Column position="absolute" absoluteCentered="both">
          <Spinner
            design={
              props.design === "primary" || props.design === undefined
                ? "contrast"
                : props.design === "danger"
                ? "danger"
                : undefined
            }
          />
        </Column>
      ) : null}
      {props.children}
    </ButtonComponent>
  );
});
