import { StyledBaseText, Text } from "@blowfishxyz/ui";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const StyledContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 58px;
  padding: 6px 9px;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  height: 45px;
`;

const Wrapper = styled.button<{ $isActive?: boolean }>`
  align-items: center;
  border-radius: 20px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.successLight : "transparent"};
  border: ${({ $isActive, theme }) =>
    $isActive ? `1px solid transparent` : `1px solid ${theme.colors.border}`};
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
  style?: React.CSSProperties;
}

export default function Toggle({
  id,
  isActive,
  toggle,
  initialState = false,
  style,
}: ToggleProps) {
  const [isInitialToggleLoad, setIsInitialToggleLoad] = useState(initialState);

  const switchToggle = () => {
    toggle();
    if (isInitialToggleLoad) {
      setIsInitialToggleLoad(false);
    }
  };

  return (
    <Wrapper id={id} $isActive={isActive} onClick={switchToggle} style={style}>
      <ToggleElement
        $isActive={isActive}
        $isInitialToggleLoad={isInitialToggleLoad}
      />
    </Wrapper>
  );
}

export function ToggleWithLabel({
  label,
  ...props
}: ToggleProps & { label: string }) {
  return (
    <StyledContainer>
      <Text>{label}</Text>
      <Toggle {...props} />
    </StyledContainer>
  );
}
