import React from "react";
import styled, { css } from "styled-components";
import {
  PrimaryButton,
  SecondaryButton,
  Text,
  device,
} from "@blowfish/ui/core";

export const SLIM_BOTTOM_MENU_HEIGHT = 96;
export const REGULAR_BOTTOM_MENU_HEIGHT = 154;

interface BottomMenuWrapperProps {
  $slim?: boolean;
}

export const BottomMenuWrapper = styled.div<BottomMenuWrapperProps>`
  position: absolute;
  max-width: calc(100% - 24px);
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 22px;
  background: ${({ theme, $slim }) =>
    $slim ? "transparent" : theme.colors.backgroundPrimary};
  display: flex;
  align-items: center;
  ${({ $slim }) =>
    $slim
      ? css`
          height: ${SLIM_BOTTOM_MENU_HEIGHT}px;
        `
      : css`
          flex-direction: column;
          height: ${REGULAR_BOTTOM_MENU_HEIGHT}px;
          padding: 24px 0;

          > * > * {
            margin-top: 24px;
          }
        `};

  @media only screen and (${device.md}) {
    max-width: 576px;
  }
`;

export interface SlimBottomMenuProps {
  buttonLabel: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
  marker?: string;
}

export const SlimBottomMenu: React.FC<SlimBottomMenuProps> = ({
  onClick,
  buttonLabel,
  style,
  className,
  marker,
}) => {
  return (
    <BottomMenuWrapper style={style} className={className} $slim>
      <PrimaryButton className={marker} data-testid={marker} onClick={onClick}>
        {buttonLabel}
      </PrimaryButton>
    </BottomMenuWrapper>
  );
};

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export interface ApproveBottomMenuProps {
  onContinue: () => void;
  onCancel: () => void;
  style?: React.CSSProperties;
  className?: string;
  isImpersonatingWallet: boolean;
}

export const ApproveBottomMenu: React.FC<ApproveBottomMenuProps> = ({
  onContinue,
  onCancel,
  style,
  className,
  isImpersonatingWallet,
}) => {
  return (
    <BottomMenuWrapper style={style} className={className}>
      {isImpersonatingWallet ? (
        <Text design="danger">Confirm disabled while impersonating</Text>
      ) : (
        <Text design="secondary">Confirm to continue to your wallet</Text>
      )}
      <Row>
        <SecondaryButton
          style={{ width: "172px" }}
          className="cancel-button"
          data-testid="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          style={{ width: "172px" }}
          onClick={onContinue}
          disabled={isImpersonatingWallet}
          className="approve-button"
          data-testid="approve-button"
        >
          Confirm
        </PrimaryButton>
      </Row>
    </BottomMenuWrapper>
  );
};
