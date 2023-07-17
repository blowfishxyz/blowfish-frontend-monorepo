import { WarningInnerKindEnum } from "@blowfishxyz/api";
import { useMemo } from "react";
import { styled } from "styled-components";
import { Row, Column } from "~/common/layout";
import { Text } from "~/common/text";
import { Icon, IconVariant } from "~/common/icon";

export type UIWarning = {
  message: string;
  kind?: WarningInnerKindEnum;
  severity: "WARNING" | "CRITICAL" | "INFO";
};

export const SimulationWarning: React.FC<{ warning: UIWarning }> = ({
  warning,
}) => {
  const kindText = useMemo(() => {
    switch (warning.kind) {
      case WarningInnerKindEnum.ApprovalToEOA:
        return "Approval to EOA";
      case WarningInnerKindEnum.BlocklistedDomainCrossOrigin:
        return "Blocklisted domain cross-origin";
      case WarningInnerKindEnum.BulkApprovalsRequest:
        return "Bulk approvals request";
      case WarningInnerKindEnum.CompromisedAuthorityUpgrade:
        return "Compromised authority upgrade";
      case WarningInnerKindEnum.CopyCatDomain:
        return "Copycat domain";
      case WarningInnerKindEnum.DanglingApproval:
        return "Dangling approval";
      case WarningInnerKindEnum.DevtoolsDisabled:
        return "Devtools disabled";
      case WarningInnerKindEnum.EthSignTxHash:
        return "Eth sign transaction hash";
      case WarningInnerKindEnum.KnownMalicious:
        return "Known malicious";
      case WarningInnerKindEnum.NonAsciiUrl:
        return "Non-ASCII URL";
      case WarningInnerKindEnum.ObfuscatedCode:
        return "Obfuscated code";
      case WarningInnerKindEnum.PermitNoExpiration:
        return "Permit without expiration";
      case WarningInnerKindEnum.PermitUnlimitedAllowance:
        return "Permit with unlimited allowance";
      case WarningInnerKindEnum.PoisonedAddress:
        return "Poisoned address";
      case WarningInnerKindEnum.SemiTrustedBlocklistDomain:
        return "Semi-trusted blocklist domain";
      case WarningInnerKindEnum.SetOwnerAuthority:
        return "Set owner authority";
      case WarningInnerKindEnum.SuspectedMalicious:
        return "Suspected malicious behaviour";
      case WarningInnerKindEnum.TooManyTransactions:
        return "Too many transactions";
      case WarningInnerKindEnum.TradeForNothing:
        return "Trade for nothing";
      case WarningInnerKindEnum.TransferringErc20ToOwnContract:
        return "Transferring ERC20 to own contract";
      case WarningInnerKindEnum.TrustedBlocklistDomain:
        return "Trusted blocklist domain";
      case WarningInnerKindEnum.UnlimitedAllowanceToNfts:
        return "Unlimited allowance to NFTs";
      case WarningInnerKindEnum.WhitelistedDomainCrossOrigin:
        return "Whitelisted domain cross-origin";
    }
  }, [warning.kind]);
  const defaultKindText =
    warning.severity === "WARNING"
      ? "Possible dangerous behaviour"
      : "Dangerous behaviour";

  const kindIcon: IconVariant = useMemo(() => {
    switch (warning.kind) {
      case WarningInnerKindEnum.ApprovalToEOA:
      case WarningInnerKindEnum.CompromisedAuthorityUpgrade:
      case WarningInnerKindEnum.SetOwnerAuthority:
        return "user";
      case WarningInnerKindEnum.CopyCatDomain:
        return "identification";
      case WarningInnerKindEnum.DevtoolsDisabled:
        return "dev-tools";
      case WarningInnerKindEnum.NonAsciiUrl:
      case WarningInnerKindEnum.ObfuscatedCode:
        return "multi-text";
      case WarningInnerKindEnum.PermitNoExpiration:
      case WarningInnerKindEnum.PermitUnlimitedAllowance:
      case WarningInnerKindEnum.UnlimitedAllowanceToNfts:
        return "lock-open";
      case WarningInnerKindEnum.TooManyTransactions:
      case WarningInnerKindEnum.TradeForNothing:
        return "question-mark";
      case WarningInnerKindEnum.BlocklistedDomainCrossOrigin:
      case WarningInnerKindEnum.BulkApprovalsRequest:
      case WarningInnerKindEnum.DanglingApproval:
      case WarningInnerKindEnum.EthSignTxHash:
      case WarningInnerKindEnum.KnownMalicious:
      case WarningInnerKindEnum.PoisonedAddress:
      case WarningInnerKindEnum.SemiTrustedBlocklistDomain:
      case WarningInnerKindEnum.SuspectedMalicious:
      case WarningInnerKindEnum.TransferringErc20ToOwnContract:
      case WarningInnerKindEnum.TrustedBlocklistDomain:
      case WarningInnerKindEnum.WhitelistedDomainCrossOrigin:
      default:
        return "exclamation";
    }
  }, [warning.kind]);

  return (
    <Row borderRadius={8} padding={12}>
      <WarningIconWrapper
        alignItems="center"
        justifyContent="center"
        marginRight={10}
        withBorder
      >
        <Icon variant={kindIcon} size={20} />
      </WarningIconWrapper>
      <Column>
        <Text size="md" weight="semi-bold" color="foregroundPrimary">
          {kindText || defaultKindText}
        </Text>
        <Text size="md" color="base75">
          {warning.message}
        </Text>
      </Column>
    </Row>
  );
};

const WarningIconWrapper = styled(Row)`
  width: 45px;
  height: 45px;
  min-width: 45px;
  border-radius: 100%;

  svg {
    width: 22px;
    height: 22px;
  }

  path {
    fill: ${(p) => p.theme.colors.base50};
  }
`;
