import { EvmExpectedStateChange } from "@blowfishxyz/api";
import { Row, Text } from "@blowfishxyz/ui";
import { InfoIcon } from "@blowfish/protect-ui/icons";
import Decimal from "decimal.js";
import styled from "styled-components";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";
import { U256_MAX_VALUE } from "~constants";

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

interface AssetPriceProps {
  stateChange: EvmExpectedStateChange;
}

const AssetPrice = ({ stateChange }: AssetPriceProps) => {
  const rawInfo = stateChange.rawInfo;
  let totalValue;
  let withInfoTooltip = false;
  //TODO: refactor price once the API is transitioned away from assetPrice
  const pricePerToken =
    "asset" in rawInfo.data
      ? rawInfo.data.asset.price?.dollarValuePerToken
      : null;

  if (!pricePerToken) return null;

  if (
    rawInfo.kind === "ERC20_TRANSFER" ||
    rawInfo.kind === "ERC20_APPROVAL" ||
    rawInfo.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    const { before, after } = rawInfo.data.amount;

    const difference = new Decimal(before).sub(after).abs();

    if (
      rawInfo.kind === "ERC20_APPROVAL" &&
      // U256_MAX_VALUE - unlimited approval
      difference.eq(U256_MAX_VALUE)
    ) {
      return null;
    }
    totalValue = new Decimal(pricePerToken)
      .times(difference)
      .dividedBy(new Decimal(10).pow(rawInfo.data.asset.decimals))
      .toNumber();
  }
  if (
    rawInfo.kind === "ERC721_TRANSFER" ||
    rawInfo.kind === "ERC1155_TRANSFER" ||
    rawInfo.kind === "ERC721_APPROVAL"
  ) {
    totalValue = pricePerToken;
    withInfoTooltip = true;
  }

  return (
    <>
      {totalValue ? (
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
              <TooltipContent maxWidth={270}>
                <Text>
                  This value represents the <b>floor price</b> of the entire
                  collection
                </Text>
              </TooltipContent>
            </Tooltip>
          )}
        </AssetPriceWrapper>
      ) : null}
    </>
  );
};

export default AssetPrice;
