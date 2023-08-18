import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import {
  solanaSetOwnerAuthority,
  solanaNftTransfer,
  SOLANA_TEST_ACCOUNT,
} from "@blowfishxyz/api-client/fixtures";

import { StateChangePreviewSolana } from "~/state-change-preview/solana";

export const NftTransfer: ComponentStory<typeof StateChangePreviewSolana> = (
  props
) => {
  return (
    <Wrapper>
      <StateChangePreviewSolana {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 500px;
`;

export default {
  title: "StateChangePreviewSolana",
  component: NftTransfer,
  args: {
    scanResult: solanaNftTransfer,
    userAccount: SOLANA_TEST_ACCOUNT,
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof StateChangePreviewSolana>;

export const SetOwnerAuthority = NftTransfer.bind({});
SetOwnerAuthority.args = {
  scanResult: solanaSetOwnerAuthority,
  userAccount: SOLANA_TEST_ACCOUNT,
  chainNetwork: "mainnet",
};
