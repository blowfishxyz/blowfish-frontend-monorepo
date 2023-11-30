import { WarningInnerKindEnum } from "@blowfishxyz/api-client/v20230605";
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
      case WarningInnerKindEnum.ApprovalToEoa:
        return "Approval to EOA";
      case WarningInnerKindEnum.BlurBulkOrderNotOnBlur:
        return "Blur bulk order on a non-Blur domain";
      case WarningInnerKindEnum.BlurV2OrderNotOnBlur:
        return "Blur v2 order on a non-Blur domain";
      case WarningInnerKindEnum.BlocklistedDomainCrossOrigin:
        return "Blocklisted domain cross-origin";
      case WarningInnerKindEnum.BulkApprovalsRequest:
        return "Bulk approval request";
      case WarningInnerKindEnum.CompromisedAuthorityUpgrade:
        return "Compromised authority upgrade";
      case WarningInnerKindEnum.CopyCatDomain:
        return "Copycat domain";
      case WarningInnerKindEnum.CopyCatImageUnresponsiveDomain:
        return "Copycat unresponsive domain";
      case WarningInnerKindEnum.DanglingApproval:
        return "Dangling approval";
      case WarningInnerKindEnum.DebuggerPaused:
        return "Debugger paused";
      case WarningInnerKindEnum.DurableNonce:
        return "Durable nonce";
      case WarningInnerKindEnum.EthSignTxHash:
        return "Eth sign transaction hash";
      case WarningInnerKindEnum.Forta:
        return "Potentially malicious on the Forta Network";
      case WarningInnerKindEnum.ImbalancedDollarValue:
        return "Imbalanced Dollar Value";
      case WarningInnerKindEnum.KnownMalicious:
        return "Known malicious";
      case WarningInnerKindEnum.MaliciousPackages:
        return "Malicious packages detected";
      case WarningInnerKindEnum.MultiCopyCatDomain:
        return "Multi copycat domain";
      case WarningInnerKindEnum.NewDomain:
        return "New Domain";
      case WarningInnerKindEnum.PermitNoExpiration:
        return "Permit without expiration";
      case WarningInnerKindEnum.PermitUnlimitedAllowance:
        return "Permit with unlimited allowance";
      case WarningInnerKindEnum.PoisonedAddress:
        return "Poisoned address";
      case WarningInnerKindEnum.ReferencedOfacAddress:
        return "Referenced OFAC Sanctioned Address";
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
      case WarningInnerKindEnum.TradeForUnverifiedNft:
        return "Trade for unverified NFT";
      case WarningInnerKindEnum.TransferringErc20ToOwnContract:
        return "Transferring ERC20 to own contract";
      case WarningInnerKindEnum.TransferringTooMuchSol:
        return "Transferring too much SOL";
      case WarningInnerKindEnum.TransfersMajorityOfYourSol:
        return "Transfers majority of your SOL";
      case WarningInnerKindEnum.TrustedBlocklistDomain:
        return "Trusted blocklist domain";
      case WarningInnerKindEnum.UnlimitedAllowanceToNfts:
        return "Unlimited allowance to NFTs";
      case WarningInnerKindEnum.UnusualGasConsumption:
        return "Unusual gas consumption";
      case WarningInnerKindEnum.UserAccountOwnerChange:
        return "User account owner change";
      case WarningInnerKindEnum.WhitelistedDomainCrossOrigin:
        return "Whitelisted domain cross-origin";
      case WarningInnerKindEnum.YakoaNftIpInfringement:
        return "Possible IP infringement";
    }
  }, [warning.kind]);
  const defaultKindText =
    warning.severity === "WARNING"
      ? "Possible dangerous behaviour"
      : "Dangerous behaviour";

  const kindIcon: IconVariant = useMemo(() => {
    switch (warning.kind) {
      case WarningInnerKindEnum.ApprovalToEoa:
      case WarningInnerKindEnum.CompromisedAuthorityUpgrade:
      case WarningInnerKindEnum.SetOwnerAuthority:
      case WarningInnerKindEnum.UserAccountOwnerChange:

      case WarningInnerKindEnum.BlurBulkOrderNotOnBlur:
      case WarningInnerKindEnum.BlurV2OrderNotOnBlur:
        return "user";
      case WarningInnerKindEnum.CopyCatDomain:
      case WarningInnerKindEnum.MultiCopyCatDomain:
      case WarningInnerKindEnum.CopyCatImageUnresponsiveDomain:
        return "identification";
      case WarningInnerKindEnum.DebuggerPaused:
        return "dev-tools";
      case WarningInnerKindEnum.PermitNoExpiration:
      case WarningInnerKindEnum.PermitUnlimitedAllowance:
      case WarningInnerKindEnum.UnlimitedAllowanceToNfts:
        return "lock-open";
      case WarningInnerKindEnum.TooManyTransactions:
      case WarningInnerKindEnum.TradeForNothing:
      case WarningInnerKindEnum.NewDomain:
      case WarningInnerKindEnum.TradeForUnverifiedNft:
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
      case WarningInnerKindEnum.ReferencedOfacAddress:
      case WarningInnerKindEnum.UnusualGasConsumption:
      case WarningInnerKindEnum.DurableNonce:
      case WarningInnerKindEnum.Forta:
      case WarningInnerKindEnum.MaliciousPackages:
      case WarningInnerKindEnum.TransferringTooMuchSol:
      case WarningInnerKindEnum.TransfersMajorityOfYourSol:
      case WarningInnerKindEnum.YakoaNftIpInfringement:
      case WarningInnerKindEnum.ImbalancedDollarValue:
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
