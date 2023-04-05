import { EvmStateChange } from "@blowfish/utils/BlowfishApiClient";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils.js";
import styled from "styled-components";
import { Text } from "~components/Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";
import Row from "~components/common/Row";
import { InfoIcon } from "~components/icons/InfoIcon";

const AssetPriceWrapper = styled(Row)`
  font-size: 14px;
  opacity: 0.4;
`;

const StyledInfoIcon = styled(InfoIcon)`
  width: 14px;
  height: auto;
  fill: rgba(0, 0, 0, 0.4);
  margin-left: 8px;
`;

interface AssetPriceProps {
  stateChange: EvmStateChange;
}

const AssetPrice = ({ stateChange }: AssetPriceProps) => {
  let finalPrice;
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

    const difference = BigNumber.from(before).sub(BigNumber.from(after));
    finalPrice = Math.abs(
      pricePerToken *
        parseFloat(formatUnits(difference, stateChange.data.asset.decimals))
    );
  }
  if (
    stateChange.kind === "ERC721_TRANSFER" ||
    stateChange.kind === "ERC1155_TRANSFER" ||
    stateChange.kind === "ERC721_APPROVAL"
  ) {
    finalPrice = pricePerToken;
    withInfoTooltip = true;
  }

  return (
    <>
      {finalPrice && (
        <AssetPriceWrapper>
          $
          {finalPrice.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          {withInfoTooltip && (
            <Tooltip placement="bottom">
              <TooltipTrigger>
                <StyledInfoIcon />
              </TooltipTrigger>
              <TooltipContent>
                <Text>Floor Price</Text>
              </TooltipContent>
            </Tooltip>
          )}
        </AssetPriceWrapper>
      )}
    </>
  );
};

export default AssetPrice;
