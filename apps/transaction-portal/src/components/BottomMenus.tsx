import React from "react";
import styled, { css } from "styled-components";

import { PrimaryButton, SecondaryButton } from "./Buttons";
import { Text } from "./Typography";

export const SLIM_BOTTOM_MENU_HEIGHT = 96;
export const REGULAR_BOTTOM_MENU_HEIGHT = 154;

interface BottomMenuWrapperProps {
  slim?: boolean;
}

export const BottomMenuWrapper = styled.div<BottomMenuWrapperProps>`
  position: absolute;
  max-width: 576px;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.palette.white};
  display: flex;
  align-items: center;
  ${({ slim }) =>
    slim
      ? css`
          height: ${SLIM_BOTTOM_MENU_HEIGHT}px;
          padding: 0 12px;
        `
      : css`
          flex-direction: column;
          height: ${REGULAR_BOTTOM_MENU_HEIGHT}px;
          padding: 24px 0;
          box-sizing: border-box;

          > * > * {
            margin-top: 24px;
          }
        `}
`;

export interface SlimBottomMenuProps {
  buttonLabel: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export const SlimBottomMenu: React.FC<SlimBottomMenuProps> = ({
  onClick,
  buttonLabel,
  style,
  className,
}) => {
  return (
    <BottomMenuWrapper style={style} className={className} slim>
      <PrimaryButton onClick={onClick}>{buttonLabel}</PrimaryButton>
    </BottomMenuWrapper>
  );
};

const GrayText = styled(Text)`
  color: rgba(0, 0, 0, 0.5);
`;

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
}

export const ApproveBottomMenu: React.FC<ApproveBottomMenuProps> = ({
  onContinue,
  onCancel,
  style,
  className,
}) => {
  return (
    <BottomMenuWrapper style={style} className={className}>
      <GrayText>Confirm to continue to your wallet</GrayText>
      <Row>
        <SecondaryButton style={{ width: "172px" }} onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton style={{ width: "172px" }} onClick={onContinue}>
          Confirm
        </PrimaryButton>
      </Row>
    </BottomMenuWrapper>
  );
};
