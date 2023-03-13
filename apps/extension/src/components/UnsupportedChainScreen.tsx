import React, { useState } from "react";
import styled from "styled-components";

import { logger } from "../utils/logger";
import { TextButton } from "./Buttons";
import { Text, TextXL } from "./Typography";
import { BlowfishInvertedWarningIcon } from "./icons/BlowfishWarningIcons";

interface SharedProps {
  darkMode?: boolean;
}
const StyledTextXL = styled(TextXL)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  color: ${({ darkMode, theme }) =>
    darkMode ? theme.palette.warningText : theme.palette.black};
`;
const StyledText = styled(Text)<SharedProps>`
  text-align: center;
  margin-bottom: 32px;
  line-height: 22px;
  color: ${({ darkMode, theme }) =>
    darkMode ? theme.palette.warningText : theme.palette.black};
`;

const StyledBlowfishInvertedWarningIcon = styled(BlowfishInvertedWarningIcon)`
  margin-bottom: 48px;
`;

const Wrapper = styled.div<SharedProps>`
  width: 100%;
  background-color: ${({ darkMode, theme }) =>
    darkMode ? "#340000" : theme.palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
  padding: 120px 32px 32px 32px;
  align-items: center;
  box-sizing: border-box;
`;

// TODO(kimpers): Checkbox styling
const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 13px;
`;

const StyledTextButton = styled(TextButton)`
  display: flex;
  align-items: center;
`;

export interface UnsupportedChainScreenProps {
  style?: React.CSSProperties;
  className?: string;
  onDismissUnsupportedChain: (isDismissed: boolean) => Promise<void>;
}

export const UnsupportedChainScreen: React.FC<UnsupportedChainScreenProps> = ({
  style,
  className,
  onDismissUnsupportedChain,
}) => {
  const [shouldShowScreen, setShouldShowScreen] = useState<boolean>(true);
  // TODO(kimpers): Actual copy
  return (
    <Wrapper style={style} className={className}>
      <StyledBlowfishInvertedWarningIcon />
      <StyledTextXL>Unsupported Chain</StyledTextXL>
      <StyledText>
        This chain is currently not supported. More chains coming soon!
      </StyledText>
      <StyledTextButton
        onClick={() => {
          setShouldShowScreen(!shouldShowScreen);
          // NOTE: we invert the boolean because we store whether it's been dismissed
          onDismissUnsupportedChain(shouldShowScreen).catch((err) =>
            logger.error(err)
          );
        }}
      >
        <StyledCheckbox checked={!shouldShowScreen} />
        <StyledText style={{ marginBottom: "unset" }}>
          Don&apos;t show this again
        </StyledText>
      </StyledTextButton>
    </Wrapper>
  );
};
