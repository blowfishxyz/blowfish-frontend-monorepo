import { Text } from "@blowfish/ui/core";
import styled from "styled-components";

const AssetPriceWrapper = styled(Text)`
  word-break: break-word;
`;

interface AssetPriceProps {
  totalValue: number | null;
}

export const AssetPriceV2 = ({ totalValue }: AssetPriceProps) => {
  return totalValue ? (
    <AssetPriceWrapper size="sm">
      $
      {totalValue.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </AssetPriceWrapper>
  ) : null;
};
