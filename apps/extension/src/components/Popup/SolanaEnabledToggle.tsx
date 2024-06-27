import { Row, Text } from "@blowfishxyz/ui";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import Toggle from "~components/Toggle";
import {
  getBlowfishSolanaEnabled,
  setBlowfishSolanaEnabled,
} from "~utils/storage";

export const SolanaEnabledToggle = () => {
  const { data: initialSolanaEnabled } = useSWR(
    "solanaEnabled",
    getBlowfishSolanaEnabled
  );
  if (initialSolanaEnabled === undefined) {
    return null;
  }
  return (
    <SolanaEnabledToggleInner initialSolanaEnabled={initialSolanaEnabled} />
  );
};

export const SolanaEnabledToggleInner: React.FC<{
  initialSolanaEnabled: boolean;
}> = ({ initialSolanaEnabled }) => {
  const [solanaEnabled, setSolanaEnabled] = useState(initialSolanaEnabled);

  const handleToggle = () => {
    setSolanaEnabled((prev) => {
      const enabled = !prev;
      setBlowfishSolanaEnabled(enabled);
      return enabled;
    });
  };

  return (
    <Wrapper>
      <Row gap="sm">
        <Text weight="semi-bold">Enable Solana Safeguard</Text>
        <Toggle isActive={!!solanaEnabled} toggle={handleToggle} />
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  margin: 8px 0;
`;
