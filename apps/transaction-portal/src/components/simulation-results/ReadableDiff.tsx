import { BlockExplorerLink, Text } from "@blowfish/ui/core";
import { VerifiedIcon } from "@blowfish/ui/icons";
import {
  AssetData,
  ChainFamily,
  ChainNetwork,
  EvmExpectedStateChange,
  EvmStateChange,
} from "@blowfish/utils/BlowfishApiClient";
import { memo, useMemo } from "react";
import styled from "styled-components";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";

export const ReadableDiff: React.FC<{
  stateChange: EvmExpectedStateChange;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}> = memo(function EnhancedReadableDiffComponent({
  stateChange,
  chainFamily,
  chainNetwork,
}) {
  const asset = getAsset(stateChange.rawInfo);
  if (!asset) {
    return <>{stateChange.humanReadableDiff}</>;
  }

  const { symbol } = asset;
  const diffWords = stateChange.humanReadableDiff.split(" ");
  const symbolIndex = diffWords.indexOf(symbol);

  if (symbolIndex < 0) {
    return <>{stateChange.humanReadableDiff}</>;
  }

  return (
    <>
      {diffWords.slice(0, symbolIndex).join(" ")}{" "}
      <EnhancedCurrencySymbol
        asset={asset}
        chainFamily={chainFamily}
        chainNetwork={chainNetwork}
      />{" "}
      {diffWords.slice(symbolIndex + 1).join(" ")}
    </>
  );
});

function getAsset(rawInfo: EvmStateChange): AssetData | undefined {
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

const EnhancedCurrencySymbol: React.FC<{
  asset: AssetData;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
}> = ({ asset, chainFamily, chainNetwork }) => {
  const { symbol, verified, address, lists = [] } = asset;

  const tooltipText = useMemo(() => {
    if (!verified) {
      return `We couldn't verify ${symbol}`;
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
        <Text semiBold>{others}</Text> other
        {others ? "s" : ""}
      </>
    );
  }, [symbol, verified, lists]);

  return (
    <Tooltip>
      <TooltipTrigger>
        <CurrencySymbol
          chainFamily={chainFamily}
          chainNetwork={chainNetwork}
          address={address}
          hideArrow
        >
          {symbol}
          {verified && <Icon />}
        </CurrencySymbol>
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

function nameToText(name: string) {
  return <Text semiBold>{name.toLowerCase().replaceAll(/_/g, " ")}</Text>;
}

const CurrencySymbol = styled(BlockExplorerLink)`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  text-decoration: underline;
  color: inherit;
`;

const Icon = styled(VerifiedIcon)`
  width: 12px;
  height: 12px;
  margin-left: 2px;
`;
