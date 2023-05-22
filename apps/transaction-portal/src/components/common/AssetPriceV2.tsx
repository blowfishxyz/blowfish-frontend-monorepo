import { EvmExpectedStateChangesInner } from "@blowfish/api-client";
import { Row } from "@blowfish/ui/core";
import styled from "styled-components";
import { calculateTotalValue, getAssetPricePerToken } from "~utils/utils";

const AssetPriceWrapper = styled(Row)`
  font-size: 14px;
  word-break: break-word;
  display: block;
  position: relative;
`;

interface AssetPriceProps {
  stateChange: EvmExpectedStateChangesInner;
}

export const AssetPriceV2 = ({ stateChange }: AssetPriceProps) => {
  const rawInfo = stateChange.rawInfo;
  const pricePerToken = getAssetPricePerToken(rawInfo);

  if (!pricePerToken) return null;

  const totalValue = calculateTotalValue(
    rawInfo.kind,
    rawInfo.data,
    pricePerToken
  );

  return (
    <>
      {totalValue ? (
        <AssetPriceWrapper>
          $
          {totalValue.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </AssetPriceWrapper>
      ) : null}
    </>
  );
};
