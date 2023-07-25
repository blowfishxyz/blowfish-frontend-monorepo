import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import * as stateChangesMap from "@blowfishxyz/api-client/fixtures";

import { SimulationResult } from "~/simulation-result";

export default {
  title: "SimulationResult",
  component: SimulationResult,
  args: {
    txnData: stateChangesMap.receiveNativeToken,
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
  txnData: stateChangesMap.approveAllErc721,
};

export const PermitErc20NoExpiration = SimulationResultComponent.bind({});
PermitErc20NoExpiration.args = {
  txnData: stateChangesMap.permitErc20NoExpiration,
};

export const ReceiveErc721 = SimulationResultComponent.bind({});
ReceiveErc721.args = {
  txnData: stateChangesMap.receiveErc721,
};

export const SendNativeToken = SimulationResultComponent.bind({});
SendNativeToken.args = {
  txnData: stateChangesMap.sendNativeToken,
};

export const SendErc721 = SimulationResultComponent.bind({});
SendErc721.args = {
  txnData: stateChangesMap.sendErc721,
};

export const Erc20UnverifedTransfer = SimulationResultComponent.bind({});
Erc20UnverifedTransfer.args = {
  txnData: stateChangesMap.erc20UnverifedTransfer,
};
