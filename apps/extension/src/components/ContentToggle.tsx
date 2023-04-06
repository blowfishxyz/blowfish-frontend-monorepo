import { ExpandIcon } from "@blowfish/ui/icons";
import React, { useState } from "react";
import styled from "styled-components";

import { BaseButton } from "./BaseButton";
import { Text } from "./Typography";

const ToggleButton = styled(BaseButton)`
  /* Increase clickable area slightly without messing with alignment */
  padding: 3px;
  margin: -3px;
  cursor: pointer;

  svg {
    margin-left: 4px;
  }

  & + * {
    margin-top: 16px;
  }
  ${Text} {
    color: rgba(0, 0, 0, 0.5);
  }
`;

interface ContentToggleProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  message: string;
}
export const ContentToggle: React.FC<ContentToggleProps> = ({
  children,
  message,
  className,
  style,
}) => {
  // TODO(kimpers): Animation for toggling content
  const [showAdvancedDetails, setShowAdvancedDetails] =
    useState<boolean>(false);
  return (
    <>
      <ToggleButton
        onClick={() => setShowAdvancedDetails((prev) => !prev)}
        style={style}
        className={className}
      >
        <Text>{message}</Text>
        <ExpandIcon expanded={showAdvancedDetails} />
      </ToggleButton>
      {showAdvancedDetails && children}
    </>
  );
};
