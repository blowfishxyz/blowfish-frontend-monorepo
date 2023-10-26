import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import { exampleEthSignScanResult, permitErc20NoExpiration } from "@blowfishxyz/api-client/fixtures";

import { StateChangePreviewEvm } from "~/state-change-preview/evm";

const Wrapper = styled.div`
  max-width: 500px;
`;

export const NoStateChange: ComponentStory<typeof StateChangePreviewEvm> = (
  props
) => {
  return (
    <Wrapper>
      <StateChangePreviewEvm {...props} />
    </Wrapper>
  );
};

export default {
  title: "Messages (EVM)",
  component: NoStateChange,
  args: {
    scanResult: exampleEthSignScanResult,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof StateChangePreviewEvm>;
