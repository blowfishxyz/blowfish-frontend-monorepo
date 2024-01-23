import React, { FC, ReactElement, ReactNode } from "react";
import {
  Column,
  Row,
  Text,
  device,
  StateChangePreviewSolana,
  Tooltip,
  TooltipTrigger,
  Icon,
  TooltipContent,
} from "@blowfishxyz/ui";
import { LinkWithArrow } from "@blowfish/protect-ui/core";
import styled from "styled-components";
import { Chip } from "../chips/Chip";
import { CardWrapper, CardContent, Divider } from "./common";
import { UIWarning } from "~components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";
import {
  ScanTransactionsSolana200Response,
  SolanaProtocol,
} from "@blowfishxyz/api-client";
import { ConfirmTxn } from "./ConfirmTxn";
import { PreviewProtocol } from "./PreviewProtocol";

export type SolanaTxnSimulationDataType = {
  dappUrl: string | undefined;
  account: string;
  scanResult: ScanTransactionsSolana200Response;
  protocol: SolanaProtocol | null;
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

const PreviewTokenTooltipContent = styled(TooltipContent)`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  box-shadow: 0px 4px 24px ${({ theme }) => theme.colors.border};
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  z-index: 4;
  width: 200px;
  border-radius: 12px;
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
          {txnData.protocol && (
            <>
              <Divider orientation="vertical" $margin="0 30px" />
              <StyledColumn gap="sm" flex={1}>
                <SectionHeading>Protocol</SectionHeading>
                <Tooltip>
                  <TooltipTrigger>
                    <Row alignItems="center">
                      {(txnData.protocol.trustLevel === "TRUSTED" ||
                        txnData.protocol.trustLevel === "NATIVE") && (
                        <Icon variant="verified" size={20} />
                      )}
                      <LinkWithArrow href={txnData.protocol.websiteUrl || ""}>
                        <Text truncate>{txnData.protocol.name}</Text>
                      </LinkWithArrow>
                    </Row>
                    <PreviewTokenTooltipContent showArrow={false}>
                      <PreviewProtocol
                        imageUrl={txnData.protocol.imageUrl}
                        name={txnData.protocol.name}
                        verified={
                          txnData.protocol.trustLevel === "TRUSTED" ||
                          txnData.protocol.trustLevel === "NATIVE"
                        }
                        description={txnData.protocol.description}
                      />
                    </PreviewTokenTooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </StyledColumn>
            </>
          )}
        </StyledCardContent>
        <Divider $margin="0 0 16px" />
        {advancedDetails}
      </CardWrapper>
      <ConfirmTxn
        onContinue={() => Promise.resolve()}
        onReport={onReport}
        onCancel={() => Promise.resolve()}
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
