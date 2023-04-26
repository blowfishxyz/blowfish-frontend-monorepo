import { css, styled } from "styled-components";

import { BaseButton } from "./BaseButton";

const interactiveStyles = css`
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

const PrimaryButton = styled(BaseButton)`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 22px 0px;
  gap: 8px;
  background: #000000;
  box-shadow: 0px 9.94853px 24.1177px rgba(0, 0, 0, 0.136834),
    0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
    0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
  cursor: pointer;
  /* Button text */
  font-family: "GT-Planar";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;

  &:disabled {
    background: rgba(0, 0, 0, 0.3);
  }

  ${interactiveStyles}
`;

const SecondaryButton = styled(BaseButton)`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 22px 0px;
  gap: 8px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
    0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
  /* Button text */
  font-family: "GT-Planar";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #010101;

  ${interactiveStyles}
`;

const TertiaryButton = styled(BaseButton)`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
  gap: 4px;
  cursor: pointer;
  /* Button text */
  font-family: "GT-Planar";
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  opacity: 0.56;

  ${interactiveStyles}
`;

const TextButton = styled(BaseButton)`
  cursor: pointer;
  /* Increase clickable area slightly for better UX */
  padding: 3px;
  margin: -3px;
`;

const SmallButtonPrimary = styled(PrimaryButton)`
  height: 32px;
  font-size: 14px;
  padding: 8px;
`;

export {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  TextButton,
  SmallButtonPrimary,
};
