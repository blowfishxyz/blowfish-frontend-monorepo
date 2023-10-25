import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import {
  transactionWarningScanResult,
  buyErc721WithEth,
  approveErc721ScanResult,
  approveAllErc721ScanResult,
  approveErc20ScanResult,
  erc20SwapWethforUsdc,
  exampleEthSignScanResult,
  buyErc1155WithEth,
  approveAllErc1155ScanResult,
} from "@blowfishxyz/api-client/fixtures";

import { StateChangePreviewEvm } from "~/state-change-preview/evm";

export const StateChangePreviewComponent: ComponentStory<
  typeof StateChangePreviewEvm
> = (props) => {
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
  component: StateChangePreviewComponent,
  args: {
    scanResult: transactionWarningScanResult,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof StateChangePreviewEvm>;

export const BuyErc721 = StateChangePreviewComponent.bind({});
BuyErc721.args = {
  scanResult: buyErc721WithEth,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const BuyErc1155WithEth = StateChangePreviewComponent.bind({});
BuyErc1155WithEth.args = {
  scanResult: buyErc1155WithEth,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const Erc20SwapWETHforUSDC = StateChangePreviewComponent.bind({});
BuyErc721.args = {
  scanResult: erc20SwapWethforUsdc,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveErc721 = StateChangePreviewComponent.bind({});
ApproveErc721.args = {
  scanResult: approveErc721ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveErc20 = StateChangePreviewComponent.bind({});
ApproveErc20.args = {
  scanResult: approveErc20ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveAllErc721 = StateChangePreviewComponent.bind({});
ApproveAllErc721.args = {
  scanResult: approveAllErc721ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveAllErc1155 = StateChangePreviewComponent.bind({});
ApproveAllErc1155.args = {
  scanResult: approveAllErc1155ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const NoStateChange = StateChangePreviewComponent.bind({});
NoStateChange.args = {
  scanResult: exampleEthSignScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const SimulationError = StateChangePreviewComponent.bind({});
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
