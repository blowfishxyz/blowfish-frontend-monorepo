import { ComponentMeta, ComponentStory } from "@storybook/react";
import { styled } from "styled-components";
import {
  exampleEthSignScanResult,
  erc20PermitScanResult,
  openseaOrderScanResult,
  twoNftsForOneEthEachScanResult,
  anyNftForWethOfferScanResult,
  usdcForPepeScanResult,
  usdcForEthScanResult,
  transferNftFromTwoOutOfThreeGnosisSafeScanResult,
  unlimitedAmountPermit2ScanResult,
  unlimitedAmountPermitScanResult,
} from "@blowfishxyz/api-client/fixtures";

import { StateChangePreviewEvm } from "~/state-change-preview/evm";
import { Text } from "~/common/text";
import { SimulationWarning } from "~/warnings";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
`;

const Half = styled.div`
  max-width: 380px;
  display: flex;
  flex-direction: column;
`;
export const ETHSignTransactionHash: ComponentStory<
  typeof StateChangePreviewEvm
> = (props) => {
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
  title: "Messages (EVM)",
  component: ETHSignTransactionHash,
  args: {
    scanResult: exampleEthSignScanResult,
    chainFamily: "ethereum",
    chainNetwork: "mainnet",
  },
} as ComponentMeta<typeof StateChangePreviewEvm>;

export const ERC20Permit = ETHSignTransactionHash.bind({});
ERC20Permit.args = {
  scanResult: erc20PermitScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const OpenseaSeaportOrderSellingNFTForETH = ETHSignTransactionHash.bind(
  {}
);
OpenseaSeaportOrderSellingNFTForETH.args = {
  scanResult: openseaOrderScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const SellingTwoNftsForOneEthEach = ETHSignTransactionHash.bind({});
SellingTwoNftsForOneEthEach.args = {
  scanResult: twoNftsForOneEthEachScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const SubmittingWETHOfferForAnyNft = ETHSignTransactionHash.bind({});
SubmittingWETHOfferForAnyNft.args = {
  scanResult: anyNftForWethOfferScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const TradingUSDCForPEPE = ETHSignTransactionHash.bind({});
TradingUSDCForPEPE.args = {
  scanResult: usdcForPepeScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const TradingUSDCForETH = ETHSignTransactionHash.bind({});
TradingUSDCForETH.args = {
  scanResult: usdcForEthScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const TransferNFTFromGnosisSafe = ETHSignTransactionHash.bind({});
TransferNFTFromGnosisSafe.args = {
  scanResult: transferNftFromTwoOutOfThreeGnosisSafeScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const UnlimitedAmountPermit2 = ETHSignTransactionHash.bind({});
UnlimitedAmountPermit2.args = {
  scanResult: unlimitedAmountPermit2ScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};

export const UnlimitedAmountPermit = ETHSignTransactionHash.bind({});
UnlimitedAmountPermit.args = {
  scanResult: unlimitedAmountPermitScanResult,
  chainFamily: "ethereum",
  chainNetwork: "mainnet",
};
