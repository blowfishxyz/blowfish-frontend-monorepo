import React, { useMemo } from "react";
import styled from "styled-components";

import { TextLarge, Text, TextSmall } from "./Typography";
import { PrimaryButton, SecondaryButton, TextButton } from "./Buttons";
import { shortenAddress } from "../utils/hex";

import type { EvmTransactionScanResult } from "../utils/BlowfishApiClient";
import type { TransactionPayload } from "../types";

const Wrapper = styled.div`
  min-height: 625px;
  width: 100%;
  background-color: ${(props) => props.theme.palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
`;

const SimulationResults = styled.div`
  padding: 0 25px;
`;

const Section = styled.div<{ borderBottom?: boolean; borderTop?: boolean }>`
  padding: 25px 0 25px 0;
  border-bottom: ${(props) => props.borderBottom && "1px solid #0000001a"};
  border-top: ${(props) => props.borderTop && "1px solid #0000001a"};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled(Section)`
  height: 56px;
  /* Overwrite section styles */
  justify-content: unset;
  padding: 0 25px;
  flex-direction: row;
  align-items: center;
  justify-content: unset;

  & > h1 {
    margin: 0;
  }
`;

const StateChangeText = styled(Text)`
  color: #00bf36;

  & + & {
    margin-top: 11px;
  }
`;

const ReportRow = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonRow = styled.div`
  padding: 25px 16px 16px 16px;
  display: flex;
  justify-content: space-between;
  button {
    width: 160px;
  }
`;

interface ScanResultsProps {
  transaction: TransactionPayload;
  scanResults: EvmTransactionScanResult;
  dappUrl: string;
  onContinue: () => void;
  onCancel: () => void;
}
export const ScanResults: React.FC<ScanResultsProps> = ({
  transaction,
  scanResults,
  dappUrl,
  onContinue,
  onCancel,
}) => {
  const host = useMemo(() => new URL(dappUrl).host, [dappUrl]);
  return (
    <Wrapper>
      <Header borderBottom>
        <TextLarge as="h1">Transaction Details</TextLarge>
      </Header>
      <SimulationResults>
        <Section borderBottom>
          <TextSmall secondary>To Address</TextSmall>
          <Text style={{ marginTop: "8px" }}>
            {shortenAddress(transaction.to)}
          </Text>
        </Section>
        <Section borderBottom>
          <TextSmall secondary style={{ marginBottom: "8px" }}>
            Simulation Results
          </TextSmall>
          {scanResults.simulationResults &&
            scanResults.simulationResults.expectedStateChanges.map(
              (result, i) => (
                <StateChangeText key={`state-change-${i}`}>
                  {result.humanReadableDiff}
                </StateChangeText>
              )
            )}
        </Section>
        <Section>
          <TextSmall secondary>Request by</TextSmall>
          <Text style={{ marginTop: "8px" }}>{host}</Text>
        </Section>
      </SimulationResults>
      <Section
        borderTop
        style={{ padding: "25px", flex: 1, justifyContent: "unset" }}
      >
        <TextLarge>Advanced Details</TextLarge>
      </Section>
      <ReportRow>
        <TextButton>
          <TextLarge secondary style={{ fontWeight: 400 }}>
            Report this transaction
          </TextLarge>
        </TextButton>
      </ReportRow>
      <ButtonRow>
        <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
        <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
      </ButtonRow>
    </Wrapper>
  );
};
