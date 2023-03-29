import { EvmStateChange } from "@blowfish/utils/BlowfishApiClient";
import styled from "styled-components";
import { Text } from "~components/Typography";

const AssetPriceWrapper = styled(Text)`
  font-size: 14px;
  opacity: 0.4;
`;

interface AssetPriceProps {
  stateChange: EvmStateChange;
}

const AssetPrice = ({ stateChange }: AssetPriceProps) => {
  let price;
  if (stateChange.kind === "ERC20_TRANSFER") {
    price =
      Number(stateChange.data?.asset?.price?.dollar_value_per_token) || null;
  }
  if (
    stateChange.kind === "ERC721_TRANSFER" ||
    stateChange.kind === "ERC20_APPROVAL"
  ) {
    price = Number(stateChange.data.assetPrice?.dollar_value_per_token) || null;
  }

  return (
    <>
      {price && (
        <AssetPriceWrapper>
          ${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </AssetPriceWrapper>
      )}
    </>
  );
};

export default AssetPrice;
