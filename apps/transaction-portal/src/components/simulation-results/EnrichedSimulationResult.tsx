import { BlockExplorerLink, Column, Row, Text } from "@blowfish/ui/core";
import {
  ChainFamily,
  ChainNetwork,
  EvmExpectedStateChange,
} from "@blowfish/utils/BlowfishApiClient";
import { NftStateChangeWithTokenId } from "@blowfish/utils/types";
import { Decimal } from "decimal.js";
import React, { useMemo } from "react";
import styled from "styled-components";

import AssetImage from "~components/AssetImage";
import AssetPrice from "~components/AssetPrice";

export const EnrichedSimulationResult: React.FC<{
  stateChange: EvmExpectedStateChange;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}> = ({ stateChange, chainFamily, chainNetwork }) => {
  const address = stateChange.rawInfo.data.contract.address;
  const { kind } = stateChange.rawInfo;
  const isApproval = kind.includes("APPROVAL");
  const isNft = kind.includes("ERC721") || kind.includes("ERC1155");
  let nftTokenId: string | undefined;
  if (isNft) {
    const nftData = stateChange.rawInfo.data as NftStateChangeWithTokenId;
    nftTokenId = nftData.tokenId || undefined;
  }

  const diff = useMemo(() => {
    const { amount } = stateChange.rawInfo.data;

    if (typeof amount === "object") {
      return new Decimal(amount.before).sub(amount.after);
    }

    return new Decimal(amount);
  }, [stateChange]);

  // NOTE(kimpers): We define positive as decreased approval or increased balance
  const isPositiveEffect =
    (isApproval && diff.gt(0)) || (!isApproval && diff.lt(0));
  // TODO(kimpers): What to link to for native assets?
  return (
    <StateChangeRow>
      <AssetImage
        stateChange={stateChange.rawInfo}
        isPositiveEffect={isPositiveEffect}
        chainFamily={chainFamily}
        chainNetwork={chainNetwork}
      />
      <StateChangeTextBlock>
        <Column>
          <StateChangeText isPositiveEffect={isPositiveEffect}>
            {stateChange.humanReadableDiff}
          </StateChangeText>
          <AssetPrice stateChange={stateChange.rawInfo} />
        </Column>
        {isNft && (
          <BlockExplorerLink
            address={address}
            chainFamily={chainFamily}
            chainNetwork={chainNetwork}
            nftTokenId={nftTokenId}
          ></BlockExplorerLink>
        )}
      </StateChangeTextBlock>
    </StateChangeRow>
  );
};

const StateChangeRow = styled(Row)`
  gap: 12px;
`;

const StateChangeTextBlock = styled.div`
  display: flex;
`;

const StateChangeText = styled(Text).attrs({ weight: "semi-bold" })<{
  isPositiveEffect?: boolean;
}>`
  color: ${({ isPositiveEffect, theme }) =>
    isPositiveEffect ? theme.palette.green : theme.palette.red};
  line-height: 16px;
`;
