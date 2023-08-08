import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import * as stateChangesMap from "@blowfishxyz/api-client/fixtures";

import { SimulationResultSolana } from "~/simulation-result-solana";

export default {
  title: "SimulationResultSolana",
  component: SimulationResultSolana,
  args: {
    stateChange: stateChangesMap.solTransfer,
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof SimulationResultSolana>;

export const SimulationResultSolanaComponent: ComponentStory<
  typeof SimulationResultSolana
> = (props) => {
  console.log("@@ HER", props.stateChange);
  return (
    <Wrapper>
      <SimulationResultSolana {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 392px;
`;

export const SolStakeAuthorityChange = SimulationResultSolanaComponent.bind({});
SolStakeAuthorityChange.args = {
  stateChange: stateChangesMap.solStakeAuthorityChange,
};

export const SplApproval = SimulationResultSolanaComponent.bind({});
SplApproval.args = {
  stateChange: stateChangesMap.splApproval,
};

export const SplTransfer = SimulationResultSolanaComponent.bind({});
SplTransfer.args = {
  stateChange: stateChangesMap.splTransfer,
};

export const SolUserAccountOwnerChange = SimulationResultSolanaComponent.bind(
  {}
);
SolUserAccountOwnerChange.args = {
  stateChange: stateChangesMap.solUserAccountOwnerChange,
};
