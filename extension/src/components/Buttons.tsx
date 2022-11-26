import styled from "styled-components";
import { BaseButton } from "./BaseButton";

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
  font-family: "GT Planar";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;

  /* TODO(kimpers) REMOVE SOME OF THESE
  transition: all 0.15s ease-in;
  will-change: transform, background-color, box-shadow;
  cursor: pointer;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    box-shadow: inset 0px 4px 9px rgba(255, 255, 255, 0.25);
    cursor: not-allowed;
  }
  :hover:not(:disabled) {
    transform: scale(0.98), translateY(-2px);
  }
  */
`;

const SecondaryButton = styled(BaseButton)`
  width: 100%;
  height: 64px;
  box-sizing: border-box;
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
  font-family: "GT Planar";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #010101;
`;

const TextButton = styled(BaseButton)`
  cursor: pointer;
  /* Increase clickable area slightly for better UX */
  padding: 3px;
  margin: -3px;
`;

export { PrimaryButton, SecondaryButton, TextButton };
