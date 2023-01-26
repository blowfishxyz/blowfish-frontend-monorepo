import React from "react";
import styled from "styled-components";

import { BlowfishIcon } from "./icons/BlowfishIcon";
import { Text } from "./Typography";

const StyledBlowfishIcon = styled(BlowfishIcon)`
  height: 16px;
  width: auto;
`;

const HeaderText = styled(Text)`
  font-size: 18px;
  line-height: 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <StyledBlowfishIcon />
      <HeaderText>Blowfish</HeaderText>
    </HeaderContainer>
  );
};
