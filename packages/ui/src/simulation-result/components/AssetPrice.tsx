import { Text } from "~/common/text";
import { styled } from "styled-components";

const AssetPriceWrapper = styled(Text)`
  word-break: break-word;
`;

interface AssetPriceProps {
  totalValue: number | null;
}

export const AssetPrice = ({ totalValue }: AssetPriceProps) => {
  return totalValue ? (
    <AssetPriceWrapper size="sm">
      $
      {totalValue.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </AssetPriceWrapper>
  ) : null;
};
