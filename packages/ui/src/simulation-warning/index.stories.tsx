import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { styled } from "styled-components";
import * as stateChangesMap from "@blowfishxyz/api-client/fixtures";

import { SimulationWarning } from "~/simulation-warning";
import { WarningInnerKindEnum } from "@blowfishxyz/api-client";

export default {
  title: "SimulationWarning",
  component: SimulationWarning,
  args: {},
} as ComponentMeta<typeof SimulationWarning>;

const SimulationWarningComponent: ComponentStory<typeof SimulationWarning> = (
  props
) => {
  return (
    <Wrapper>
      <SimulationWarning {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 392px;
`;

export const AllWarnings = () => <>{warnings}</>;

const warnings = [
  WarningInnerKindEnum.ApprovalToEOA,
  WarningInnerKindEnum.BlocklistedDomainCrossOrigin,
  WarningInnerKindEnum.BulkApprovalsRequest,
  WarningInnerKindEnum.CompromisedAuthorityUpgrade,
  WarningInnerKindEnum.CopyCatDomain,
  WarningInnerKindEnum.DanglingApproval,
  WarningInnerKindEnum.DevtoolsDisabled,
  WarningInnerKindEnum.EthSignTxHash,
  WarningInnerKindEnum.KnownMalicious,
  WarningInnerKindEnum.NonAsciiUrl,
  WarningInnerKindEnum.ObfuscatedCode,
  WarningInnerKindEnum.PermitNoExpiration,
  WarningInnerKindEnum.PermitUnlimitedAllowance,
  WarningInnerKindEnum.PoisonedAddress,
  WarningInnerKindEnum.SemiTrustedBlocklistDomain,
  WarningInnerKindEnum.SetOwnerAuthority,
  WarningInnerKindEnum.SuspectedMalicious,
  WarningInnerKindEnum.TooManyTransactions,
  WarningInnerKindEnum.TradeForNothing,
  WarningInnerKindEnum.TransferringErc20ToOwnContract,
  WarningInnerKindEnum.TrustedBlocklistDomain,
  WarningInnerKindEnum.UnlimitedAllowanceToNfts,
  WarningInnerKindEnum.WhitelistedDomainCrossOrigin,
].map((kind) => {
  const warning = {
    kind,
    message: "Human-readable warning that comes from Blowfish API",
    severity: "WARNING" as const,
  };

  return <SimulationWarningComponent warning={warning} />;
});
