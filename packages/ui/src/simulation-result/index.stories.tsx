import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import * as stateChangesMap from "@blowfishxyz/api-client/fixtures";

import { SimulationResult } from "~/simulation-result";

export default {
  title: "SimulationResult",
  component: SimulationResult,
  args: {
    stateChange: stateChangesMap.receiveNativeToken,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof SimulationResult>;

export const SimulationResultComponent: ComponentStory<
  typeof SimulationResult
> = (props) => {
  return (
    <Wrapper>
      <SimulationResult {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 392px;
`;

export const ApproveAllErc721 = SimulationResultComponent.bind({});
ApproveAllErc721.args = {
  stateChange: stateChangesMap.approveAllErc721,
};

export const PermitErc20NoExpiration = SimulationResultComponent.bind({});
PermitErc20NoExpiration.args = {
  stateChange: stateChangesMap.permitErc20NoExpiration,
};

export const ReceiveErc721 = SimulationResultComponent.bind({});
ReceiveErc721.args = {
  stateChange: stateChangesMap.receiveErc721,
};

export const SendNativeToken = SimulationResultComponent.bind({});
SendNativeToken.args = {
  stateChange: stateChangesMap.sendNativeToken,
};

export const SendErc721 = SimulationResultComponent.bind({});
SendErc721.args = {
  stateChange: stateChangesMap.sendErc721,
};

export const Erc20UnverifedTransfer = SimulationResultComponent.bind({});
Erc20UnverifedTransfer.args = {
  stateChange: stateChangesMap.erc20UnverifedTransfer,
};
