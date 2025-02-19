import {
  EvmErc20Asset,
  EvmExpectedStateChange,
  EvmNativeAsset,
} from "@blowfishxyz/api-client";
import { Text, Tooltip, TooltipContent, TooltipTrigger } from "@blowfishxyz/ui";
import { BlockExplorerLink } from "@blowfish/protect-ui/core";
import { VerifiedIcon } from "@blowfish/protect-ui/icons";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import React, { memo } from "react";
import styled from "styled-components";

export const VerifiedTokenTooltip: React.FC<
  React.PropsWithChildren<{
    stateChange: EvmExpectedStateChange;
    chainFamily: ChainFamily;
    chainNetwork: ChainNetwork;
  }>
> = ({ stateChange, chainFamily, chainNetwork, children }) => {
  const asset = getErc20Asset(stateChange);
  if (!asset) {
    return <>{children}</>;
  }
  const { address, verified } = asset;

  return (
    <Tooltip placement="bottom">
      <TooltipTrigger>
        <BlockExplorerLink
          chainFamily={chainFamily}
          chainNetwork={chainNetwork}
          address={address}
          style={{ position: "relative" }}
          hideArrow
        >
          {children}
          {verified && <VerifiedBadge />}
        </BlockExplorerLink>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipText asset={asset} />
      </TooltipContent>
    </Tooltip>
  );
};

const TooltipText: React.FC<{ asset: EvmErc20Asset | EvmNativeAsset }> = memo(
  function TooltipTextInner({ asset }) {
    const { symbol, verified } = asset;

    const lists = "lists" in asset ? asset.lists : [];

    if (!verified) {
      return (
        <>
          {symbol} is <b>not</b> verifed
        </>
      );
    }
    const sources = lists.map(nameToText);
    if (sources.length === 0) {
      return <>{symbol} is a verified token</>;
    }

    if (sources.length === 1) {
      return (
        <>
          {symbol} is verified on ${sources[0]}`
        </>
      );
    }

    if (sources.length === 2) {
      return (
        <>
          {symbol} is verified on {sources[0]} and {sources[1]}
        </>
      );
    }
    const others = lists.length - 2;
    return (
      <>
        {symbol} is verified on {sources[0]}, {sources[1]}, and{" "}
        <Text weight="semi-bold">{others}</Text> other
        {others ? "s" : ""}
      </>
    );
  }
);

function getErc20Asset(
  stateChange: EvmExpectedStateChange
): EvmErc20Asset | EvmNativeAsset | undefined {
  const rawInfo = stateChange.rawInfo;
  if (
    rawInfo.kind === "ERC20_APPROVAL" ||
    rawInfo.kind === "ERC20_PERMIT" ||
    rawInfo.kind === "ERC20_TRANSFER" ||
    rawInfo.kind === "NATIVE_ASSET_TRANSFER"
  ) {
    return rawInfo.data.asset;
  }
  return undefined;
}

function nameToText(name: string) {
  return (
    <Text weight="semi-bold">{name.toLowerCase().replaceAll(/_/g, " ")}</Text>
  );
}

const VerifiedBadge = styled(VerifiedIcon)`
  width: 14px;
  height: 14px;
  position: absolute;
  right: -2px;
  bottom: -2px;
`;
