import { Decimal } from "decimal.js";
import { ethers } from "ethers";
import React from "react";
import styled from "styled-components";

import type { EvmStateChange } from "../utils/BlowfishApiClient";

const Wrapper = styled.div`
  padding-right: 5px;
`;

export interface AmountProps {
  style?: React.CSSProperties;
  className?: string;
  rawInfo: EvmStateChange;
}

export const Amount: React.FC<AmountProps> = ({
  style,
  className,
  rawInfo,
}) => {
  let human_readable_amount: string | undefined = undefined;
  let popover_info = "";
  switch (rawInfo.kind) {
    case "ERC20_TRANSFER":
    case "ERC721_TRANSFER":
    case "ERC721_APPROVAL":
    case "ERC721_APPROVAL_FOR_ALL":
    case "NATIVE_ASSET_TRANSFER":
    case "ERC1155_APPROVAL_FOR_ALL":
    case "ERC20_APPROVAL": {
      let difference = new Decimal(rawInfo.data.amount.after).sub(
        rawInfo.data.amount.before
      );
      // TODO(fabio): Don't hardcode decimals here
      human_readable_amount = to_unit(difference.toString(), 18, 2);

      let before_units = to_unit(rawInfo.data.amount.before, 18, 2);
      let after_units = to_unit(rawInfo.data.amount.after, 18, 2);
      // TODO(fabio): Don't hardcode symbol here
      popover_info = `Before: ${before_units} USDT and After: ${after_units} USDT`;
      break;
    }
    case "ERC20_PERMIT": {
      human_readable_amount = "TODO";
      break;
    }
    case "ERC1155_TRANSFER": {
      human_readable_amount = "TODO";
      break;
    }
  }
  return (
    <Wrapper style={style} className={className} title={popover_info}>
      {human_readable_amount}
    </Wrapper>
  );
};

function to_unit(amount: string, decimals: number, sigfigs: number): string {
  let unit_amount = new Decimal(ethers.utils.formatUnits(amount, decimals));
  let unit_amount_str = unit_amount.toFixed(sigfigs);
  return unit_amount_str;
}
