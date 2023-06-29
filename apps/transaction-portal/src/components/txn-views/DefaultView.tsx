import { WarningInnerKindEnum } from "@blowfish/api-client";
import { Row, Button, Column, Text } from "@blowfish/ui/core";
import {
  ReportIcon,
  ContinueIcon,
  BlowfishWarningIcon,
  UserIcon,
  IdentificationIcon,
  DevToolsIcon,
  TextIcon,
  LockOpenIcon,
  QuestionMarkIcon,
  ExclamationIcon,
} from "@blowfish/ui/icons";
import { Severity } from "@blowfish/utils/types";
import { useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { UIWarning } from "~components/ScanResultsV2";

export const DefaultView: React.FC<{
  severity: Severity | undefined;
  warnings: UIWarning[] | undefined;
  onContinue: (() => void) | undefined;
  onCancel: () => void;
  onReport: () => void;
}> = ({ severity = "INFO", warnings, onContinue, onCancel, onReport }) => {
  const title = useMemo(() => {
    if (severity === "CRITICAL") {
      return (
        <Text size="xxl" weight="semi-bold" textAlign="center">
          Do not proceed!
        </Text>
      );
    } else if (severity === "WARNING") {
      return (
        <Text size="xxl" weight="semi-bold" textAlign="center">
          This seems{" "}
          <Text design="warning" size="xxl" weight="semi-bold">
            fishy...
          </Text>
        </Text>
      );
    } else {
      return (
        <Text size="xxl" weight="semi-bold" textAlign="center">
          This is low risk
        </Text>
      );
    }
  }, [severity]);

  const description = useMemo(() => {
    if (severity === "CRITICAL") {
      return (
        <Text size="md" textAlign="center">
          We believe this transaction is malicious and unsafe to sign, and is
          likely to steal funds.
        </Text>
      );
    } else if (severity === "WARNING") {
      return (
        <Text size="md" textAlign="center">
          This transaction does not appear to be safe. We strongly recommend
          that you do not proceed.
        </Text>
      );
    } else {
      return (
        <Text size="md" textAlign="center">
          This signature request seems to be trustworthy. If something feels
          fishy, you should report it.
        </Text>
      );
    }
  }, [severity]);

  const buttons = useMemo(() => {
    if (severity === "WARNING" || severity === "CRITICAL") {
      return (
        <>
          <Row gap="md">
            <Button stretch size="sm" onClick={onReport}>
              <ReportIcon />
              Report to Blowfish
            </Button>
          </Row>
          <Row gap="md">
            <Button size="sm" stretch design="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              stretch
              design="danger"
              onClick={onContinue}
              disabled={!onContinue}
              title="Disabled while impersonating"
            >
              Continue
            </Button>
          </Row>
        </>
      );
    }

    return (
      <>
        <Row gap="md">
          <Button
            stretch
            size="sm"
            onClick={onContinue}
            disabled={!onContinue}
            title="Disabled while impersonating"
          >
            <ContinueIcon />
            Continue
          </Button>
        </Row>
        <Row gap="md">
          <Button size="sm" stretch design="danger" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" stretch design="secondary" onClick={onReport}>
            Report
          </Button>
        </Row>
      </>
    );
  }, [severity, onCancel, onContinue, onReport]);

  const warningsContent = useMemo(() => {
    if (!warnings) {
      return [];
    }

    return warnings.map((warning) => (
      <WarningNotice key={warning.message} warning={warning} />
    ));
  }, [warnings]);

  const theme = useTheme();

  return (
    <Column width="100%" justifyContent="space-between" gap="lg">
      <Row gap="md" alignItems="center" alignSelf="center">
        <Column gap="xs" flex={1} alignSelf="center" maxWidth={300}>
          {severity !== "INFO" && (
            <BlowfishWarningIcon
              style={{ width: 92, height: 92, alignSelf: "center" }}
              color={theme?.severityColors[severity].backgroundV2}
            />
          )}
          {title}
          {description}
        </Column>
      </Row>
      <Column gap="sm">{warningsContent}</Column>
      <Column gap="md" flex={1} width="100%">
        {buttons}
      </Column>
    </Column>
  );
};

const WarningNotice: React.FC<{ warning: UIWarning }> = ({ warning }) => {
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

  const kindIcon = useMemo(() => {
    switch (warning.kind) {
      case WarningInnerKindEnum.ApprovalToEOA:
      case WarningInnerKindEnum.CompromisedAuthorityUpgrade:
      case WarningInnerKindEnum.SetOwnerAuthority:
        return <UserIcon />;
      case WarningInnerKindEnum.CopyCatDomain:
        return <IdentificationIcon />;
      case WarningInnerKindEnum.DevtoolsDisabled:
        return <DevToolsIcon />;
      case WarningInnerKindEnum.NonAsciiUrl:
      case WarningInnerKindEnum.ObfuscatedCode:
        return <TextIcon />;
      case WarningInnerKindEnum.PermitNoExpiration:
      case WarningInnerKindEnum.PermitUnlimitedAllowance:
      case WarningInnerKindEnum.UnlimitedAllowanceToNfts:
        return <LockOpenIcon />;
      case WarningInnerKindEnum.TooManyTransactions:
      case WarningInnerKindEnum.TradeForNothing:
        return <QuestionMarkIcon />;
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
        return <ExclamationIcon />;
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
        {kindIcon}
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
