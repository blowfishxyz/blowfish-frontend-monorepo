import {
  Row,
  Button,
  Column,
  Text,
  SimulationWarning,
  UIWarning,
} from "@blowfishxyz/ui";
import { ContinueIcon, BlowfishWarningIcon } from "@blowfish/protect-ui/icons";
import { Severity } from "@blowfish/utils/types";
import { useMemo } from "react";
import { useTheme } from "styled-components";
import { ReportBtn } from "~components/txn-views/ReportBtn";

export const DefaultView: React.FC<{
  severity: Severity | undefined;
  warnings: UIWarning[] | undefined;
  onContinue: (() => void) | undefined;
  onCancel: (() => void) | undefined;
  onReport: () => Promise<void>;
}> = ({ severity = "INFO", warnings, onContinue, onCancel, onReport }) => {
  const hasSafeguardAssertError = !!warnings?.some(
    (x) => x.kind === "SAFEGUARD_ASSERTION_ERROR"
  );
  const hasSafeguardVerifyError = !!warnings?.some(
    (x) => x.kind === "SAFEGUARD_VERIFY_ERROR"
  );
  const hasSafeguardError = hasSafeguardVerifyError || hasSafeguardAssertError;
  const title = useMemo(() => {
    if (hasSafeguardError) {
      return (
        <Text size="xxl" weight="semi-bold" textAlign="center">
          Safeguard Error
        </Text>
      );
    }
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
  }, [severity, hasSafeguardVerifyError, hasSafeguardAssertError]);

  const description = useMemo(() => {
    if (hasSafeguardError) {
      const errorsText = [
        hasSafeguardVerifyError ? "verification failed" : undefined,
        hasSafeguardAssertError
          ? "simulation failed with an assertion error"
          : undefined,
      ]
        .filter(Boolean)
        .join(" and ");
      return (
        <Text size="md" textAlign="center">
          Safeguard transaction {errorsText}.
        </Text>
      );
    } else if (severity === "CRITICAL") {
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
  }, [severity, hasSafeguardError]);

  const buttons = useMemo(() => {
    if (severity === "WARNING" || severity === "CRITICAL") {
      return (
        <>
          <Row gap="md">
            <ReportBtn variant="large" onReport={onReport} />
          </Row>
          <Row gap="md">
            <Button
              size="sm"
              stretch
              design="secondary"
              onClick={onCancel}
              disabled={!onCancel}
            >
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
          <Button
            size="sm"
            stretch
            design="danger"
            onClick={onCancel}
            disabled={!onCancel}
          >
            Cancel
          </Button>
          <ReportBtn variant="small" onReport={onReport} />
        </Row>
      </>
    );
  }, [severity, onCancel, onContinue, onReport]);

  const warningsContent = useMemo(() => {
    if (!warnings) {
      return [];
    }

    return warnings.map((warning) => (
      <SimulationWarning key={warning.message} warning={warning} />
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
