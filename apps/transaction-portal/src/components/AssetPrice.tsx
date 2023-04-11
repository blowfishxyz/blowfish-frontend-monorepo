import { EvmStateChange } from "@blowfish/utils/BlowfishApiClient";
import styled from "styled-components";
import { Text } from "~components/Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";
import Row from "~components/common/Row";
import { InfoIcon } from "~components/icons/InfoIcon";
import Decimal from "decimal.js";

const AssetPriceWrapper = styled(Row)`
  font-size: 14px;
  opacity: 0.4;
  word-break: break-word;
  display: block;
  position: relative;
`;

const StyledInfoIcon = styled(InfoIcon)`
  width: 14px;
  height: auto;
  fill: rgba(0, 0, 0, 0.4);
  margin-left: 8px;
  position: absolute;
  bottom: 0;
`;

const StyledRow = styled(Row)`
  max-width: 270px;
  text-align: center;
`;

interface AssetPriceProps {
  stateChange: EvmStateChange;
}

const AssetPrice = ({ stateChange }: AssetPriceProps) => {
  let totalValue;
  let withInfoTooltip = false;
  //TODO: refactor price once the API is transitioned away from assetPrice
  const pricePerToken =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (stateChange.data as any)?.asset?.price?.dollar_value_per_token ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((stateChange.data as any).assetPrice?.dollar_value_per_token || null);

  if (!pricePerToken) return <></>;

  if (
    stateChange.kind === "ERC20_TRANSFER" ||
    stateChange.kind === "ERC20_APPROVAL" ||
    stateChange.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    const { before, after } = stateChange.data.amount;

    const difference = new Decimal(before).sub(after).abs();
    totalValue = new Decimal(pricePerToken)
      .times(difference)
      .dividedBy(new Decimal(10).pow(stateChange.data.asset.decimals))
      .toNumber();
  }
  if (
    stateChange.kind === "ERC721_TRANSFER" ||
    stateChange.kind === "ERC1155_TRANSFER" ||
    stateChange.kind === "ERC721_APPROVAL"
  ) {
    totalValue = pricePerToken;
    withInfoTooltip = true;
  }

  return (
    <>
      {totalValue && (
        <AssetPriceWrapper>
          $
          {totalValue.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          {withInfoTooltip && (
            <Tooltip placement="bottom">
              <TooltipTrigger>
                <StyledInfoIcon />
              </TooltipTrigger>
              <TooltipContent>
                <StyledRow>
                  <Text>
                    This value represents the <b>floor price</b> of the entire
                    collection
                  </Text>
                </StyledRow>
              </TooltipContent>
            </Tooltip>
          )}
        </AssetPriceWrapper>
      )}
    </>
  );
};

export default AssetPrice;
