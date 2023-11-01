import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import {
  solTransfer,
  solStakeAuthorityChange,
  splApproval,
  splTransfer,
  splTransferChange,
  solUserAccountOwnerChange,
} from "@blowfishxyz/api-client/fixtures";

import { SimulationResultSolana } from "~/simulation-result/solana";
import { Text } from "~/common/text";
import { SimulationWarning } from "~/warnings";

const Wrapper = styled.div`
  max-width: 380px;
`;

export const SOLTransfer: ComponentStory<typeof SimulationResultSolana> = (
  props
) => {
  return (
    <Wrapper>
      <SimulationResultSolana {...props} />
    </Wrapper>
  );
};

export default {
  title: "Transactions (Solana)",
  component: SOLTransfer,
  args: {
    stateChange: solTransfer,
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof SimulationResultSolana>;

export const SPLTransfer = SOLTransfer.bind({});
SPLTransfer.args = {
  stateChange: splTransfer,
};

export const SOLStakeAuthorityChange = SOLTransfer.bind({});
SOLStakeAuthorityChange.args = {
  stateChange: solStakeAuthorityChange,
};

export const SPLApproval = SOLTransfer.bind({});
SPLApproval.args = {
  stateChange: splApproval,
};

export const SOLUserAccountOwnerChange = SOLTransfer.bind({});
SOLUserAccountOwnerChange.args = {
  stateChange: solUserAccountOwnerChange,
};

export const SPLTransferChange = SOLTransfer.bind({});
SPLTransferChange.args = {
  stateChange: splTransferChange,
};
