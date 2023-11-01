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
    <AssetPriceWrapper size="sm">{formatPrice(totalValue)}</AssetPriceWrapper>
  ) : null;
};

function formatPrice(price: number | null) {
  if (price === null) {
    return null;
  }
  if (price < 0.01) {
    return "< $0.01";
  }
  return (
    "$" +
    price.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })
  );
}
