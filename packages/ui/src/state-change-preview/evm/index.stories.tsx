import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import {
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

export const BuyErc721: ComponentStory<typeof StateChangePreviewEvm> = (
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
  component: BuyErc721,
  args: {
    scanResult: buyErc721WithEth,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof StateChangePreviewEvm>;

export const BuyErc1155WithEth = BuyErc721.bind({});
BuyErc1155WithEth.args = {
  scanResult: buyErc1155WithEth,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const Erc20SwapWETHforUSDC = BuyErc721.bind({});
Erc20SwapWETHforUSDC.args = {
  scanResult: erc20SwapWethforUsdc,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveErc721 = BuyErc721.bind({});
ApproveErc721.args = {
  scanResult: approveErc721ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveErc20 = BuyErc721.bind({});
ApproveErc20.args = {
  scanResult: approveErc20ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveAllErc721 = BuyErc721.bind({});
ApproveAllErc721.args = {
  scanResult: approveAllErc721ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const ApproveAllErc1155 = BuyErc721.bind({});
ApproveAllErc1155.args = {
  scanResult: approveAllErc1155ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const NoStateChange = BuyErc721.bind({});
NoStateChange.args = {
  scanResult: exampleEthSignScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};
NoStateChange.storyName = "StateChangePreviewEvm/Warnings/NoStateChange";

export const SimulationError = BuyErc721.bind({});
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
