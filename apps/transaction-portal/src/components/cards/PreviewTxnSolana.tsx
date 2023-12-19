import React, { FC, ReactElement, ReactNode } from "react";
import {
  Column,
  Row,
  Text,
  device,
  StateChangePreviewSolana,
} from "@blowfishxyz/ui";
import { LinkWithArrow } from "@blowfish/protect-ui/core";
import styled from "styled-components";
import { Chip } from "../chips/Chip";
import { CardWrapper, CardContent, Divider } from "./common";
import { UIWarning } from "~components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";
import { ScanTransactionsSolana200Response } from "@blowfishxyz/api-client";
import { ConfirmTxn } from "./ConfirmTxn";

export type SolanaTxnSimulationDataType = {
  dappUrl: string | undefined;
  account: string;
  scanResult: ScanTransactionsSolana200Response;
};

const SectionHeading = styled(Text).attrs({ size: "sm", color: "base40" })``;

const StyledCardContent = styled(Row).attrs({
  alignItems: "center",
  paddingInline: 16,
})`
  @media (${device.lg}) {
    padding: 0 32px;
  }
`;

const StyledColumn = styled(Column).attrs({
  paddingBlock: 18,
})``;

interface PreviewCardProps {
  txnData: SolanaTxnSimulationDataType;
  title: string;
  origin?: string;
  website?: string;
  warnings: UIWarning[];
  severity: Severity | undefined;
  children: ReactNode;
  onReport: () => Promise<void>;
  advancedDetails: ReactElement;
}

const PreviewCard: FC<PreviewCardProps> = ({
  txnData,
  title,
  warnings,
  severity,
  children,
  onReport,
  advancedDetails,
}) => {
  const { dappUrl } = txnData;
  return (
    <PreviewWrapper gap="md" alignItems="flex-start" marginBottom={32}>
      <CardWrapper>
        <CardContent>
          <Row justifyContent="space-between" alignItems="center">
            <Text size="lg">{title}</Text>
            <Chip $severity={severity} />
          </Row>
        </CardContent>
        <Divider $margin="16px 0" />
        <CardContent>{children}</CardContent>
        <Divider $margin="24px 0 0" />
        <StyledCardContent>
          <StyledColumn gap="sm" flex={1}>
            <SectionHeading>Website</SectionHeading>
            <Row gap="xs" alignItems="center">
              <LinkWithArrow href={dappUrl || ""}>
                <Text truncate>{dappUrl}</Text>
              </LinkWithArrow>
            </Row>
          </StyledColumn>
        </StyledCardContent>
        <Divider $margin="0 0 16px" />
        {advancedDetails}
      </CardWrapper>
      <ConfirmTxn
        onContinue={async () => console.log("tbd")}
        onReport={onReport}
        onCancel={async () => console.log("tbd")}
        warnings={warnings}
        severity={severity}
      />
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled(Row)`
  @media (max-width: 1100px) {
    width: 100%;
    flex-direction: column;
  }
`;

export interface PreviewTxnSolanaProps {
  txnData: SolanaTxnSimulationDataType;
  simulationError: string | undefined;
  warnings: UIWarning[];
  severity: Severity | undefined;
  onReport: () => Promise<void>;
  advancedDetails: ReactElement;
}

export const PreviewTxnSolana: FC<PreviewTxnSolanaProps> = ({
  txnData,
  warnings,
  severity,
  onReport,
  advancedDetails,
}) => {
  const { scanResult, account } = txnData;

  return (
    <PreviewCard
      txnData={txnData}
      title="Preview changes"
      warnings={warnings}
      severity={severity}
      onReport={onReport}
      advancedDetails={advancedDetails}
    >
      {
        <StateChangePreviewSolana
          scanResult={scanResult}
          chainNetwork="mainnet"
          userAccount={account}
        />
      }
    </PreviewCard>
  );
};
