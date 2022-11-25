import React from "react";
import styled from "styled-components";

import { PrimaryButton } from "./Buttons";

export const SLIM_BOTTOM_MENU_HEIGHT = 96;
const SlimBottomMenuWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${SLIM_BOTTOM_MENU_HEIGHT}px;
  width: 100%;
  background: ${({ theme }) => theme.palette.white};
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
`;
export interface SlimBottomMenuProps {
  buttonLabel: string;
  onClick: () => void;
}
export const SlimBottomMenu: React.FC<SlimBottomMenuProps> = ({
  onClick,
  buttonLabel,
}) => {
  return (
    <SlimBottomMenuWrapper>
      <PrimaryButton onClick={onClick}>{buttonLabel}</PrimaryButton>
    </SlimBottomMenuWrapper>
  );
};
