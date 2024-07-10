import { WarningInnerKindEnum } from "@blowfishxyz/api-client/v20230605";
import { useMemo } from "react";
import { styled } from "styled-components";
import { Row, Column } from "~/common/layout";
import { Text } from "~/common/text";
import { Icon, IconVariant } from "~/common/icon";

export type UIWarning = {
  message: string;
  kind?: UIWarningKind;
  severity: "WARNING" | "CRITICAL" | "INFO";
};

export type UIWarningKind = WarningInnerKindEnum | "SAFEGUARD_ASSERTION_ERROR";

const WARNING_TEXT: { [key in UIWarningKind]: string } = {
  [WarningInnerKindEnum.ApprovalToEoa]: "Approval to EOA",
  [WarningInnerKindEnum.BlurBulkOrderNotOnBlur]:
    "Blur bulk order on a non-Blur domain",
  [WarningInnerKindEnum.BlurV2OrderNotOnBlur]:
    "Blur v2 order on a non-Blur domain",
  [WarningInnerKindEnum.BlocklistedDomainCrossOrigin]:
    "Blocklisted domain cross-origin",
  [WarningInnerKindEnum.BulkApprovalsRequest]: "Bulk approval request",
  [WarningInnerKindEnum.CompromisedAuthorityUpgrade]:
    "Compromised authority upgrade",
  [WarningInnerKindEnum.CopyCatDomain]: "Copycat domain",
  [WarningInnerKindEnum.CopyCatImageUnresponsiveDomain]:
    "Copycat unresponsive domain",
  [WarningInnerKindEnum.DanglingApproval]: "Dangling approval",
  [WarningInnerKindEnum.DebuggerPaused]: "Debugger paused",
  [WarningInnerKindEnum.DurableNonce]: "Durable nonce",
  [WarningInnerKindEnum.EthSignTxHash]: "Eth sign transaction hash",
  [WarningInnerKindEnum.Forta]: "Potentially malicious on the Forta Network",
  [WarningInnerKindEnum.ImbalancedDollarValue]: "Imbalanced Dollar Value",
  [WarningInnerKindEnum.KnownMalicious]: "Known malicious",
  [WarningInnerKindEnum.MaliciousPackages]: "Malicious packages detected",
  [WarningInnerKindEnum.MultiCopyCatDomain]: "Multi copycat domain",
  [WarningInnerKindEnum.NewDomain]: "New Domain",
  [WarningInnerKindEnum.PermitNoExpiration]: "Permit without expiration",
  [WarningInnerKindEnum.PermitUnlimitedAllowance]:
    "Permit with unlimited allowance",
  [WarningInnerKindEnum.PoisonedAddress]: "Poisoned address",
  [WarningInnerKindEnum.ReferencedOfacAddress]:
    "Referenced OFAC Sanctioned Address",
  [WarningInnerKindEnum.SemiTrustedBlocklistDomain]:
    "Semi-trusted blocklist domain",
  [WarningInnerKindEnum.SetOwnerAuthority]: "Set owner authority",
  [WarningInnerKindEnum.SuspectedMalicious]: "Suspected malicious behaviour",
  [WarningInnerKindEnum.TooManyTransactions]: "Too many transactions",
  [WarningInnerKindEnum.TradeForNothing]: "Trade for nothing",
  [WarningInnerKindEnum.TradeForUnverifiedNft]: "Trade for unverified NFT",
  [WarningInnerKindEnum.TransferringErc20ToOwnContract]:
    "Transferring ERC20 to own contract",
  [WarningInnerKindEnum.TransferringTooMuchSol]: "Transferring too much SOL",
  [WarningInnerKindEnum.TransfersMajorityOfYourSol]:
    "Transfers majority of your SOL",
  [WarningInnerKindEnum.TrustedBlocklistDomain]: "Trusted blocklist domain",
  [WarningInnerKindEnum.UnlimitedAllowanceToNfts]:
    "Unlimited allowance to NFTs",
  [WarningInnerKindEnum.UnusualGasConsumption]: "Unusual gas consumption",
  [WarningInnerKindEnum.UserAccountOwnerChange]: "User account owner change",
  [WarningInnerKindEnum.WhitelistedDomainCrossOrigin]:
    "Whitelisted domain cross-origin",
  [WarningInnerKindEnum.YakoaNftIpInfringement]: "Possible IP infringement",
  [WarningInnerKindEnum.TransferToMintAccount]: "Transfer to mint account",
  [WarningInnerKindEnum.ReliableSimulationNotPossible]:
    "Reliable simulation not possible",
  SAFEGUARD_ASSERTION_ERROR: "Safeguard assertion error",
};

export const SimulationWarning: React.FC<{ warning: UIWarning }> = ({
  warning,
}) => {
  const defaultKindText =
    warning.severity === "WARNING"
      ? "Possible dangerous behaviour"
      : "Dangerous behaviour";
  const warningText = warning.kind ? WARNING_TEXT[warning.kind] : undefined;
  const kindText = warningText || defaultKindText;

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
      case WarningInnerKindEnum.TransferToMintAccount:
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
