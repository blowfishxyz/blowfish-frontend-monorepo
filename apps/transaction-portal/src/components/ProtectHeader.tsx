import React from "react";
import { styled } from "styled-components";
import { Row } from "@blowfishxyz/ui";
import { BlowfishIconFull, ImmutableIcon } from "@blowfish/protect-ui/icons";
import { Menu } from "./menu/Menu";
import { UserWalletConnectKitWrapper } from "./UserWalletConnectKitWrapper";
import { useLayoutConfig } from "./layout/Layout";
import { useRouter } from "next/router";
import { ImpersonatorWallet } from "./UserWallet";
import SolanaIcon from "./icons/SolanaIcon";
import { ChainIcon } from "connectkit";
import { ToggleWithLabel } from "./Toggle";

const ProtectScreenContent = styled(Row)`
  width: 100%;
`;

const StyledBlowfishIconFull = styled(BlowfishIconFull)<{ $contrast: boolean }>`
  width: 130px;
  flex-shrink: 0;

  path {
    fill: ${(p) =>
      p.$contrast ? p.theme.colors.backgroundPrimary : undefined};
  }
`;

const RightContentWrapper = styled(Row)`
  width: unset;
`;

export const ProtectHeader: React.FC<{
  impersonatingAddress?: string | undefined;
}> = ({ impersonatingAddress }) => {
  const [
    { severity, forceSafeguard, forceSimulation, hasRequestParams },
    setLayoutConfig,
  ] = useLayoutConfig();
  const { pathname, query } = useRouter();
  const isSolana = query.solanaNetwork;
  const chainIdIcon = hasRequestParams ? Number(query.chainId) : undefined;
  const isImmutable = query.chainId === "13371";
  const chainIcon = isImmutable ? (
    <ImmutableIcon />
  ) : isSolana ? (
    <SolanaIcon />
  ) : (
    <ChainIcon id={chainIdIcon} size={30} />
  );

  return (
    <ProtectScreenContent justifyContent="space-between">
      <StyledBlowfishIconFull $contrast={severity === "CRITICAL"} />
      <RightContentWrapper gap="md">
        {isSolana && (
          <ToggleWithLabel
            label="Force Simulation"
            style={{ height: "30px", alignSelf: "center" }}
            initialState={forceSimulation}
            isActive={forceSimulation}
            toggle={() =>
              setLayoutConfig((prev) => ({
                ...prev,
                forceSimulation: !prev.forceSimulation,
              }))
            }
          />
        )}
        {isSolana && (
          <ToggleWithLabel
            label="Force Safeguard"
            style={{ height: "30px", alignSelf: "center" }}
            initialState={forceSafeguard}
            isActive={forceSafeguard}
            toggle={() =>
              setLayoutConfig((prev) => ({
                ...prev,
                forceSafeguard: !prev.forceSafeguard,
              }))
            }
          />
        )}
        {impersonatingAddress && (
          <ImpersonatorWallet
            address={impersonatingAddress}
            chainIcon={chainIcon}
          />
        )}
        {pathname !== "/" && !pathname.startsWith("/simulate") ? (
          <UserWalletConnectKitWrapper />
        ) : null}
        <Menu />
      </RightContentWrapper>
    </ProtectScreenContent>
  );
};
