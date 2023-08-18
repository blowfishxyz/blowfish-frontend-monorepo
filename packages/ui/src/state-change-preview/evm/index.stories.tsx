import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import {
  transactionWarningScanResult,
  transactionsNoActionScanResult,
  exampleEthSignScanResult,
} from "@blowfishxyz/api-client/fixtures";

import { StateChangePreviewEvm } from "~/state-change-preview/evm";

export const ApproveAllErc721: ComponentStory<typeof StateChangePreviewEvm> = (
  props
) => {
  return (
    <Wrapper>
      <StateChangePreviewEvm {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 500px;
`;

export default {
  title: "StateChangePreviewEvm",
  component: ApproveAllErc721,
  args: {
    scanResult: transactionWarningScanResult,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof StateChangePreviewEvm>;

export const BuyErc721 = ApproveAllErc721.bind({});
BuyErc721.args = {
  scanResult: transactionsNoActionScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const NoStateChange = ApproveAllErc721.bind({});
NoStateChange.args = {
  scanResult: exampleEthSignScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const SimulationError = ApproveAllErc721.bind({});
SimulationError.args = {
  scanResult: {
    action: "NONE",
    warnings: [],
    simulationResults: {
      expectedStateChanges: [],
      error: {
        humanReadableError:
          "Simulation failed due to an unsupported order type",
        kind: "UNSUPPORTED_ORDER_TYPE",
      },
      protocol: null,
    },
  },
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};
