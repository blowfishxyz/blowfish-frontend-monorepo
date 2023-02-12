import React from "react";
import styled from "styled-components";

import type {
  ChainFamily,
  ChainNetwork,
  Erc1155TransferData,
  EvmAsset,
  EvmStateChange,
  NftStateChangeWithTokenId,
} from "../utils/BlowfishApiClient";
import { isNativeAsset, shortenHex } from "../utils/hex";
import { compute_explorer_url } from "../utils/utils";
import { UnstyledA } from "./Links";
import { WarningIcon } from "./icons/WarningIcon";

const Wrapper = styled.div``;
const Row = styled.div`
  display: flex;
  align-items: center;
`;
const StateChangeRow = styled(Row)`
  & + & {
    margin-top: 11px;
  }
`;
const AssetLink = styled(UnstyledA)<{ isPositiveEffect?: boolean }>`
  color: ${({ isPositiveEffect, theme }) =>
    isPositiveEffect ? theme.palette.green : theme.palette.red};
`;

export interface AssetProps {
  rawInfo: EvmStateChange;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  isPositiveEffect: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const Asset: React.FC<AssetProps> = ({
  style,
  className,
  rawInfo,
  chainFamily,
  chainNetwork,
  isPositiveEffect,
}) => {
  const address = rawInfo.data.contract.address;
  const { kind } = rawInfo;
  const isNft = kind.includes("ERC721") || kind.includes("ERC1155");
  let nftTokenId: string | undefined;
  if (isNft) {
    const nftData = rawInfo.data as NftStateChangeWithTokenId;
    nftTokenId = nftData.tokenId || undefined;
  }
  let explorer_url = compute_explorer_url(
    chainNetwork,
    chainFamily,
    address,
    nftTokenId
  );

  let asset: EvmAsset | undefined = undefined;
  switch (rawInfo.kind) {
    case "ERC20_TRANSFER":
    case "ERC20_APPROVAL": {
      asset = rawInfo.data.asset;
      break;
    }
    case "NATIVE_ASSET_TRANSFER": {
      asset = {
        symbol: "ETH",
        name: "Ether",
        decimals: 18,
        verified: true,
      };
      break;
    }
    case "ERC721_APPROVAL":
    case "ERC721_APPROVAL_FOR_ALL":
    case "ERC721_TRANSFER": {
      asset = {
        symbol: rawInfo.data.symbol,
        name: rawInfo.data.name,
        decimals: 0,
        verified: false,
        lists: [],
        address: rawInfo.data.contract.address,
      };
      break;
    }
    case "ERC1155_TRANSFER": {
      asset = {
        symbol: (rawInfo.data as Erc1155TransferData).tokenId,
        address: rawInfo.data.contract.address,
        verified: false,
        decimals: 0,
      };
      break;
    }
    case "ERC1155_APPROVAL_FOR_ALL": {
      asset = {
        decimals: 0,
        verified: false,
        address: rawInfo.data.contract.address,
      };
      break;
    }
  }

  // TODO(kimpers): What to link to for native assets?
  return (
    <Wrapper style={style} className={className}>
      <StateChangeRow>
        {isNativeAsset(address) ? (
          <AssetInner asset={asset as EvmAsset} />
        ) : (
          <AssetLink
            href={explorer_url}
            target="_blank"
            isPositiveEffect={isPositiveEffect}
          >
            <AssetInner asset={asset as EvmAsset} />
          </AssetLink>
        )}
      </StateChangeRow>
    </Wrapper>
  );
};

export interface AssetInnerProps {
  style?: React.CSSProperties;
  className?: string;
  asset: EvmAsset;
}

export const AssetInner: React.FC<AssetInnerProps> = ({
  style,
  className,
  asset,
}) => {
  let identifier = asset.symbol || shortenHex(asset.address || "", 6);
  // TODO(fabio): Map list to human-readable values
  let popover = asset.verified
    ? `Verified by ${asset.lists?.join(", ")}`
    : "Unverified";
  let warning = (
    <WarningIcon style={{ color: asset.verified ? "green" : "red" }} />
  );
  return (
    <Wrapper style={style} className={className}>
      {identifier && <span title={popover}>{identifier}</span>}
    </Wrapper>
  );
};
