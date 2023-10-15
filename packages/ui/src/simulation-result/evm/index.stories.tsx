import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import * as stateChangesMap from "@blowfishxyz/api-client/fixtures";

import { SimulationResultEvm } from "~/simulation-result/evm";

export default {
  title: "SimulationResultEvm",
  component: SimulationResultEvm,
  args: {
    stateChange: stateChangesMap.receiveNativeToken,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof SimulationResultEvm>;

export const SimulationResultEvmComponent: ComponentStory<
  typeof SimulationResultEvm
> = (props) => {
  return (
    <Wrapper>
      <SimulationResultEvm {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 392px;
`;

export const ApproveAllErc721 = SimulationResultEvmComponent.bind({});
ApproveAllErc721.args = {
  stateChange: stateChangesMap.approveAllErc721,
};

export const ApproveAllErc721Lock = SimulationResultEvmComponent.bind({});
ApproveAllErc721Lock.args = {
  stateChange: stateChangesMap.approveAllErc721Lock,
};

export const PermitErc20NoExpiration = SimulationResultEvmComponent.bind({});
PermitErc20NoExpiration.args = {
  stateChange: stateChangesMap.permitErc20NoExpiration,
};

export const ReceiveErc721 = SimulationResultEvmComponent.bind({});
ReceiveErc721.args = {
  stateChange: stateChangesMap.receiveErc721,
};

export const UnlockErc721 = SimulationResultEvmComponent.bind({});
UnlockErc721.args = {
  stateChange: stateChangesMap.unlockErc721,
};

export const SendNativeToken = SimulationResultEvmComponent.bind({});
SendNativeToken.args = {
  stateChange: stateChangesMap.sendNativeToken,
};

export const SendErc721 = SimulationResultEvmComponent.bind({});
SendErc721.args = {
  stateChange: stateChangesMap.sendErc721,
};

export const Erc20UnverifedTransfer = SimulationResultEvmComponent.bind({});
Erc20UnverifedTransfer.args = {
  stateChange: stateChangesMap.erc20UnverifedTransfer,
};
