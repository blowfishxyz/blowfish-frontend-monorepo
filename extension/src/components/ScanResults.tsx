import React from "react";
import styled from "styled-components";

import { TransactionPayload } from "../types";
import { H1, Text, TextSmall } from "./Typography";
import { shortenAddress } from "../utils/hex";

const Wrapper = styled.div`
  min-height: 625px;
  width: 100%;
  background-color: ${(props) => props.theme.palette.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
  border-radius: 12px;
`;

const Header = styled.div`
  height: 56px;
  padding: 0 25px;
  border-bottom: 1px solid #0000001a;
  display: flex;
  align-items: center;

  & > h1 {
    margin: 0;
  }
`;

const SimulationResults = styled.div`
  padding: 0 25px;
`;

const Section = styled.div<{ border?: boolean }>`
  padding: 25px 0 25px 0;
  border-bottom: ${(props) => props.border && "1px solid #0000001a"};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface ScanResultsProps {
  transaction: TransactionPayload;
}
export const ScanResults: React.FC<ScanResultsProps> = ({ transaction }) => {
  return (
    <Wrapper>
      <Header>
        <H1>Transaction Details</H1>
      </Header>
      <SimulationResults>
        <Section border>
          <TextSmall secondary>To Address</TextSmall>
          <Text style={{ marginTop: "8px" }}>
            {shortenAddress(transaction.to)}
          </Text>
        </Section>
        <Section border>
          <TextSmall secondary>Simulation Results</TextSmall>
        </Section>
        <Section>
          <TextSmall secondary>Request by</TextSmall>
        </Section>
      </SimulationResults>
    </Wrapper>
  );
};
