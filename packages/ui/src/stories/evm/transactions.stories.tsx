import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import {
  buyErc721WithEth,
  approveErc721ScanResult,
  approveAllErc721ScanResult,
  approveErc20ScanResult,
  erc20SwapWethforUsdc,
  buyErc1155WithEth,
  approveAllErc1155ScanResult,
} from "@blowfishxyz/api-client/fixtures";

import { StateChangePreviewEvm } from "~/state-change-preview/evm";
import { SimulationWarning } from "~/warnings";
import { Text } from "~/common/text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
`;

const Half = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`;

export const BuyErc721: ComponentStory<typeof StateChangePreviewEvm> = (
  props
) => {
  const warnings = props.scanResult.warnings || [];
  return (
    <Wrapper
      style={{
        justifyContent: warnings.length > 0 ? "space-between" : undefined,
      }}
    >
      <Half>
        <StateChangePreviewEvm {...props} />
      </Half>
      {warnings.length > 0 && (
        <Half>
          <Text size="sm" color="foregroundSecondary">
            Warnings
          </Text>
          {warnings.map((warning) => (
            <SimulationWarning key={warning.kind} warning={warning} />
          ))}
        </Half>
      )}
    </Wrapper>
  );
};

export default {
  title: "Transactions (EVM)",
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

export const Erc20SwapWETHForUSDC = BuyErc721.bind({});
Erc20SwapWETHForUSDC.args = {
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
