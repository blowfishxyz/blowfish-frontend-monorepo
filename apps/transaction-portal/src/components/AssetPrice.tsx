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
  //TODO: remove "any" once the API is transitioned away from assetPrice
  const price =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (stateChange.data as any)?.asset?.price?.dollar_value_per_token ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((stateChange.data as any).assetPrice?.dollar_value_per_token || null);

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
