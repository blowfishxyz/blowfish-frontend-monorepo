import { StyledBaseText } from "@blowfish/ui/core";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.button<{ $isActive?: boolean }>`
  align-items: center;
  border-radius: 20px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.successLight : "transparent"};
  border: ${({ $isActive, theme }) =>
    $isActive ? "none" : `1px solid ${theme.colors.border}`};
  cursor: pointer;
  display: flex;
  outline: none;
  padding: 4px;
  width: fit-content;
`;

const turnOnToggle = keyframes`
  from {
    margin-left: 0em;
    margin-right: 2.2em;
  }
  to {
    margin-left: 2.2em;
    margin-right: 0em;
  }
`;

const turnOffToggle = keyframes`
  from {
    margin-left: 2.2em;
    margin-right: 0em;
  }
  to {
    margin-left: 0em;
    margin-right: 2.2em;
  }
`;

const ToggleElement = styled(StyledBaseText)<{
  $isActive?: boolean;
  $isInitialToggleLoad?: boolean;
}>`
  animation: 0.1s
    ${({ $isActive, $isInitialToggleLoad }) =>
      $isInitialToggleLoad ? "none" : $isActive ? turnOnToggle : turnOffToggle}
    ease-in;
  background: ${({ theme, $isActive }) =>
    $isActive ? `${theme.colors.success}` : `${theme.colors.border}`};
  :hover {
    ${({ theme, $isActive }) =>
      $isActive ? "none" : `1px solid ${theme.colors.border}`};
  }

  border-radius: 50%;
  height: 24px;
  margin-left: ${({ $isActive }) => $isActive && "2.2em"};
  margin-right: ${({ $isActive }) => !$isActive && "2.2em"};
  width: 24px;
`;

interface ToggleProps {
  id?: string;
  isActive: boolean;
  toggle: () => void;
  initialState: boolean;
}

export default function Toggle({
  id,
  isActive,
  toggle,
  initialState = false,
}: ToggleProps) {
  const [isInitialToggleLoad, setIsInitialToggleLoad] = useState(initialState);

  const switchToggle = () => {
    toggle();
    if (isInitialToggleLoad) {
      setIsInitialToggleLoad(false);
    }
  };

  return (
    <Wrapper id={id} $isActive={isActive} onClick={switchToggle}>
      <ToggleElement
        $isActive={isActive}
        $isInitialToggleLoad={isInitialToggleLoad}
      />
    </Wrapper>
  );
}
