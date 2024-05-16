import type { EvmExpectedStateChange } from "@blowfishxyz/api-client";
import { Column, Row, Text } from "@blowfishxyz/ui";
import { BlockExplorerLink } from "@blowfish/protect-ui/core";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import { NftStateChangeWithTokenId } from "@blowfish/utils/types";
import { Decimal } from "decimal.js";
import React, { useMemo } from "react";
import styled from "styled-components";

import AssetImage from "~components/AssetImage";
import AssetPrice from "~components/AssetPrice";

function getAddress(stateChange: EvmExpectedStateChange) {
  if ("asset" in stateChange.rawInfo.data) {
    return stateChange.rawInfo.data.asset.address;
  } else if ("contract" in stateChange.rawInfo.data) {
    return stateChange.rawInfo.data.contract.address;
  }
}

export const EnrichedSimulationResult: React.FC<{
  stateChange: EvmExpectedStateChange;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}> = ({ stateChange, chainFamily, chainNetwork }) => {
  const address = getAddress(stateChange);
  const { kind } = stateChange.rawInfo;
  const isApproval = kind.includes("APPROVAL");
  const isNft = kind.includes("ERC721") || kind.includes("ERC1155");
  let nftTokenId: string | undefined;
  if (isNft) {
    const nftData = stateChange.rawInfo.data as NftStateChangeWithTokenId;
    nftTokenId = nftData.tokenId || undefined;
  }

  const diff = useMemo(() => {
    if (!("amount" in stateChange.rawInfo.data)) {
      return new Decimal(0);
    }
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
        stateChange={stateChange}
        isPositiveEffect={isPositiveEffect}
        chainFamily={chainFamily}
        chainNetwork={chainNetwork}
      />
      <StateChangeTextBlock>
        <Column justifyContent="space-around">
          <StateChangeText isPositiveEffect={isPositiveEffect}>
            {stateChange.humanReadableDiff}
          </StateChangeText>
          <AssetPrice stateChange={stateChange} />
        </Column>
        {isNft && address && (
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
    isPositiveEffect ? theme.colors.success : theme.colors.danger};
  line-height: 16px;
`;
