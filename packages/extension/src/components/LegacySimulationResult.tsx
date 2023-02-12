import { Decimal } from "decimal.js";
import React from "react";
import styled from "styled-components";

import type {
  ChainFamily,
  ChainNetwork,
  Erc721ApprovalData,
  Erc721TransferData,
  Erc1155TransferData,
  EvmExpectedStateChange,
} from "../utils/BlowfishApiClient";
import { isNativeAsset } from "../utils/hex";
import { Text } from ".//Typography";
import { BlockExplorerLink } from "./Links";

type NftStateChangeWithTokenId =
  | Erc721TransferData
  | Erc1155TransferData
  | Erc721ApprovalData;

const Wrapper = styled.div`
  padding-top: 10px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const StateChangeRow = styled(Row)`
  & + & {
    margin-top: 11px;
  }
`;
const StateChangeText = styled(Text)<{ isPositiveEffect?: boolean }>`
  color: ${({ isPositiveEffect, theme }) =>
    isPositiveEffect ? theme.palette.green : theme.palette.red};
  line-height: 16px;
`;

export interface LegacySimulationResultProps {
  stateChange: EvmExpectedStateChange;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  style?: React.CSSProperties;
  className?: string;
}

export const LegacySimulationResult: React.FC<LegacySimulationResultProps> = ({
  style,
  className,
  stateChange,
  chainFamily,
  chainNetwork,
}) => {
  const address = stateChange.rawInfo.data.contract.address;
  const { kind } = stateChange.rawInfo;
  const isApproval = kind.includes("APPROVAL");
  const isNft = kind.includes("ERC721") || kind.includes("ERC1155");
  let nftTokenId: string | undefined;
  if (isNft) {
    const nftData = stateChange.rawInfo.data as NftStateChangeWithTokenId;
    nftTokenId = nftData.tokenId || undefined;
  }

  // TODO(fabio): We should fix the API to be standardized
  const { amount } = stateChange.rawInfo.data;
  let diff;
  if (typeof amount === "object") {
    diff = new Decimal(amount.before).sub(amount.after);
  } else {
    diff = new Decimal(amount);
  }
  let standardizedStateChange = {
    ...stateChange,
    diff,
  };

  // NOTE(kimpers): We define positive as decreased approval or increased balance
  const isPositiveEffect =
    (isApproval && standardizedStateChange.diff.gt(0)) ||
    (!isApproval && standardizedStateChange.diff.lt(0));

  // TODO(kimpers): What to link to for native assets?
  return (
    <Wrapper style={style} className={className}>
      <StateChangeRow>
        {isNativeAsset(address) ? (
          <StateChangeText isPositiveEffect={isPositiveEffect}>
            {standardizedStateChange.humanReadableDiff}
          </StateChangeText>
        ) : (
          <BlockExplorerLink
            address={address}
            chainFamily={chainFamily}
            chainNetwork={chainNetwork}
            nftTokenId={nftTokenId}
          >
            <StateChangeText isPositiveEffect={isPositiveEffect}>
              {standardizedStateChange.humanReadableDiff}
            </StateChangeText>
          </BlockExplorerLink>
        )}
      </StateChangeRow>
    </Wrapper>
  );
};
