import { ComponentMeta, StoryObj } from "@storybook/react";
import { styled } from "styled-components";

import { SimulationWarning } from "~/simulation-warning";
import { WarningInnerKindEnum } from "@blowfishxyz/api-client";

export default {
  title: "SimulationWarning",
  component: SimulationWarning,
  args: {},
} as ComponentMeta<typeof SimulationWarningStory>;

const SimulationWarningStory = ({ kind }: { kind: WarningInnerKindEnum }) => {
  const warning = {
    kind,
    message: "Human-readable warning that comes from Blowfish API",
    severity: "WARNING" as const,
  };
  return (
    <Wrapper>
      <SimulationWarning warning={warning} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 392px;
`;

export const AllWarnings = () => <>{warnings}</>;

const supportedWarnings = [
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
];

const warnings = supportedWarnings.map((kind) => {
  return <SimulationWarningStory kind={kind} />;
});

export const SingleWarning: StoryObj<{ kind: WarningInnerKindEnum }> = {
  render: ({ kind }) => {
    const warning = {
      kind,
      message: "Human-readable warning that comes from Blowfish API",
      severity: "WARNING" as const,
    };
    return (
      <Wrapper>
        <SimulationWarning warning={warning} />
      </Wrapper>
    );
  },
  argTypes: {
    kind: {
      control: {
        type: "select",
        options: supportedWarnings,
      },
      defaultValue: WarningInnerKindEnum.ApprovalToEOA,
    },
  },
};
