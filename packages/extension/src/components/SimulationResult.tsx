import { Decimal } from "decimal.js";
import React from "react";
import styled from "styled-components";

import type {
  ChainFamily,
  ChainNetwork,
  EvmExpectedStateChange,
  NftStateChangeWithTokenId,
} from "../utils/BlowfishApiClient";
import { Text } from ".//Typography";
import { Amount } from "./Amount";
import { Asset } from "./Asset";
import { LegacySimulationResult } from "./LegacySimulationResult";

const Wrapper = styled.div`
  padding-top: 5px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const StateChangeText = styled(Text)<{ isPositiveEffect?: boolean }>`
  color: ${({ isPositiveEffect, theme }) =>
    isPositiveEffect ? theme.palette.green : theme.palette.red};
  line-height: 16px;
  display: flex;
`;

export interface SimulationResultProps {
  stateChange: EvmExpectedStateChange;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  style?: React.CSSProperties;
  className?: string;
}

export const SimulationResult: React.FC<SimulationResultProps> = ({
  style,
  className,
  stateChange,
  chainFamily,
  chainNetwork,
}) => {
  // Parse templateDiff into parts
  if (!stateChange.templateDiff) {
    return (
      <LegacySimulationResult
        className={className}
        stateChange={stateChange}
        chainFamily={chainFamily}
        chainNetwork={chainNetwork}
      />
    );
  }

  // Replace what's in between {} with a pipe character "|"
  let modified = stateChange.templateDiff.replace("{", "|{").replace("}", "}|");
  let parts = modified.split("|").filter((part) => part !== "");

  let isPositive = isPositiveEffect(stateChange);

  let elements = parts.map((part) => {
    const pattern = /\{(.*?)\}/g;
    let matches = pattern.exec(part) || [];
    if (matches.length > 0 && matches[0] === "{asset}") {
      return (
        <Asset
          rawInfo={stateChange.rawInfo}
          chainFamily={chainFamily}
          chainNetwork={chainNetwork}
          isPositiveEffect={isPositive}
        />
      );
    } else if (matches.length > 0 && matches[0] === "{amount}") {
      return <Amount rawInfo={stateChange.rawInfo} />;
    } else {
      return <span style={{ paddingRight: 3 }}>{part}</span>;
    }
  });
  return (
    <Wrapper style={style} className={className}>
      <StateChangeText isPositiveEffect={isPositive}>
        {elements}
      </StateChangeText>
    </Wrapper>
  );
};

function isPositiveEffect(stateChange: EvmExpectedStateChange) {
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
  return isPositiveEffect;
}
