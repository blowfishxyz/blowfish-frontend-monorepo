import React, { useMemo } from "react";
import styled from "styled-components";

import { TextLarge, Text, TextSmall } from "./Typography";
import { PrimaryButton, SecondaryButton, TextButton } from "./Buttons";
import { BlockExplorerLink, LinkWithArrow } from "./Links";
import { shortenAddress, isNativeAsset } from "../utils/hex";

import type {
  EvmTransactionScanResult,
  ChainFamily,
  ChainNetwork,
} from "../utils/BlowfishApiClient";
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
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  dappUrl: string;
  onContinue: () => Promise<void>;
  onCancel: () => Promise<void>;
}
export const ScanResults: React.FC<ScanResultsProps> = ({
  transaction,
  scanResults,
  onContinue,
  onCancel,
  chainNetwork,
  chainFamily,
  ...props
}) => {
  const dappUrl = useMemo(() => new URL(props.dappUrl), [props.dappUrl]);
  return (
    <Wrapper>
      <Header borderBottom>
        <TextLarge as="h1">Transaction Details</TextLarge>
      </Header>
      <SimulationResults>
        <Section borderBottom>
          <TextSmall secondary>To Address</TextSmall>
          <Text style={{ marginTop: "8px" }}>
            <BlockExplorerLink
              address={transaction.to}
              chainFamily={chainFamily}
              chainNetwork={chainNetwork}
            >
              {shortenAddress(transaction.to)}
            </BlockExplorerLink>
          </Text>
        </Section>
        <Section borderBottom>
          <TextSmall secondary style={{ marginBottom: "8px" }}>
            Simulation Results
          </TextSmall>
          {scanResults.simulationResults &&
            scanResults.simulationResults.expectedStateChanges.map(
              (result, i) => {
                const address = result.rawInfo.data.contract.address;
                // TODO(kimpers): What to link to for native assets?
                return (
                  <StateChangeText key={`state-change-${i}`}>
                    {isNativeAsset(address) ? (
                      result.humanReadableDiff
                    ) : (
                      <BlockExplorerLink
                        address={address}
                        chainFamily={chainFamily}
                        chainNetwork={chainNetwork}
                      >
                        <StateChangeText>
                          {result.humanReadableDiff}
                        </StateChangeText>
                      </BlockExplorerLink>
                    )}
                  </StateChangeText>
                );
              }
            )}
        </Section>
        <Section>
          <TextSmall secondary>Request by</TextSmall>
          <LinkWithArrow href={dappUrl.origin}>
            <Text style={{ marginTop: "8px" }}>{dappUrl.host}</Text>
          </LinkWithArrow>
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
