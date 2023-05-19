import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { styled } from "styled-components";

import { EnrichedSimulationResult } from "~components/simulation-results/EnrichedSimulationResult";

import * as stateChangesMap from "../components/fixtures/state-changes";

export default {
  title: "EnrichedSimulationResult",
  component: EnrichedSimulationResult,
  args: {
    stateChange: stateChangesMap.receiveErc20,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof EnrichedSimulationResult>;

export const EnrichedSimulationResultComponent: ComponentStory<
  typeof EnrichedSimulationResult
> = (props) => {
  return (
    <Wrapper>
      <EnrichedSimulationResult {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 392px;
`;

export const ReceiveErc20 = EnrichedSimulationResultComponent.bind({});
ReceiveErc20.args = {
  stateChange: stateChangesMap.receiveErc20,
};

export const ApproveAllErc721 = EnrichedSimulationResultComponent.bind({});
ApproveAllErc721.args = {
  stateChange: stateChangesMap.approveAllErc721,
};

export const PermitErc20NoExpiration = EnrichedSimulationResultComponent.bind(
  {}
);
PermitErc20NoExpiration.args = {
  stateChange: stateChangesMap.permitErc20NoExpiration,
};

export const ReceiveErc721 = EnrichedSimulationResultComponent.bind({});
ReceiveErc721.args = {
  stateChange: stateChangesMap.receiveErc721,
};

export const SendErc20 = EnrichedSimulationResultComponent.bind({});
SendErc20.args = {
  stateChange: stateChangesMap.sendErc20,
};

export const SendErc721 = EnrichedSimulationResultComponent.bind({});
SendErc721.args = {
  stateChange: stateChangesMap.sendErc721,
};

export const Erc20UnverifedTransfer = EnrichedSimulationResultComponent.bind(
  {}
);
Erc20UnverifedTransfer.args = {
  stateChange: stateChangesMap.erc20UnverifedTransfer,
};
