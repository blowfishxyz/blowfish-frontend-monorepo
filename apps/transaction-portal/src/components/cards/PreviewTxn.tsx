import React, { FC, ReactElement, ReactNode } from "react";
import {
  Column,
  Row,
  Text,
  device,
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@blowfishxyz/ui";
import { LinkWithArrow } from "@blowfish/protect-ui/core";
import styled from "styled-components";
import { Chip } from "../chips/Chip";
import { CardWrapper, CardContent, Divider } from "./common";
import { UIWarning } from "~components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";
import {
  EvmProtocol,
  EvmDecodedCalldata,
  SolanaProtocol,
} from "@blowfishxyz/api-client";
import { ConfirmTxn } from "./ConfirmTxn";
import { SendTransactionResult } from "@wagmi/core";
import { PreviewProtocol } from "./PreviewProtocol";
import { InfoIcon } from "@blowfish/protect-ui/icons";

export type TxnSimulationDataType = {
  dappUrl: URL | undefined;
  account: string;
  message: string | undefined;
  protocol?: EvmProtocol | SolanaProtocol | null;
  decodedCalldata?: EvmDecodedCalldata | null;
};

export const SectionHeading = styled(Text).attrs({
  size: "sm",
  color: "base40",
})``;

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

const StyledInfoIcon = styled(InfoIcon)`
  fill: rgba(0, 0, 0, 0.4);
  width: 14px;
  height: auto;
  margin-left: 8px;
  cursor: pointer;
`;

const DecodedCallDataArgs = styled(Text)`
  &:not(:last-child)::after {
    content: ", ";
  }
`;

const DecodedCallDataText = styled(Text).attrs({ size: "sm" })`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
  display: inline-block;
`;

interface PreviewCardProps {
  title: string;
  origin?: string;
  website?: string;
  warnings: UIWarning[];
  severity: Severity | undefined;
  children: ReactNode;
  onContinue: () => Promise<SendTransactionResult | void>;
  onReport: () => Promise<void>;
  onCancel: () => void;
  advancedDetails: ReactElement;
  protocol?: EvmProtocol | SolanaProtocol | null;
  decodedCalldata?: EvmDecodedCalldata | null;
}

const PreviewCard: FC<PreviewCardProps> = ({
  title,
  warnings,
  severity,
  children,
  onContinue,
  onReport,
  onCancel,
  advancedDetails,
  website,
  protocol,
  decodedCalldata,
}) => {
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
              <LinkWithArrow href={origin || ""}>
                <Text truncate>{website}</Text>
              </LinkWithArrow>
            </Row>
          </StyledColumn>
          {protocol && (
            <>
              <Divider orientation="vertical" $margin="0 30px" />
              <StyledColumn gap="sm" flex={1}>
                <SectionHeading>Protocol</SectionHeading>
                <Tooltip>
                  <TooltipTrigger>
                    <Row alignItems="center">
                      {(protocol.trustLevel === "TRUSTED" ||
                        protocol.trustLevel === "NATIVE") && (
                        <Icon variant="verified" size={20} />
                      )}
                      <LinkWithArrow href={protocol.websiteUrl || ""}>
                        <Text truncate>{protocol.name}</Text>
                      </LinkWithArrow>
                    </Row>
                    <PreviewTokenTooltipContent showArrow={false}>
                      <PreviewProtocol
                        imageUrl={protocol.imageUrl}
                        name={protocol.name}
                        verified={
                          protocol.trustLevel === "TRUSTED" ||
                          protocol.trustLevel === "NATIVE"
                        }
                        description={protocol.description}
                      />
                    </PreviewTokenTooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </StyledColumn>
            </>
          )}
          {/* <Divider orientation="vertical" $margin="0 36px" />
      <StyledColumn gap="sm">
        <SectionHeading>Contract</SectionHeading>
        <CardText>
          <BlockExplorerLink
            chainFamily={chainFamily}
            chainNetwork={chainNetwork}
            address={contract}
          >
            {shortenHex(contract)}
          </BlockExplorerLink>
        </CardText>
      </StyledColumn> */}
        </StyledCardContent>
        {decodedCalldata && (
          <>
            <Divider />
            <CardContent>
              <StyledColumn gap="md">
                <Row>
                  <SectionHeading>Decoded calldata</SectionHeading>
                  {!protocol && (
                    <Tooltip>
                      <TooltipTrigger>
                        <StyledInfoIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        We could not verify that this is a trusted protocol.
                      </TooltipContent>
                    </Tooltip>
                  )}
                </Row>

                <Column gap="xs">
                  <DecodedCallDataText>
                    function {decodedCalldata?.data.functionName}(
                    {decodedCalldata &&
                      decodedCalldata.data.arguments.map((arg, i) => (
                        <DecodedCallDataArgs key={`${arg}-${i}`}>
                          {arg.paramType} {arg.name}
                        </DecodedCallDataArgs>
                      ))}
                    )
                  </DecodedCallDataText>
                </Column>
              </StyledColumn>
            </CardContent>
          </>
        )}
        <Divider $margin="0 0 16px" />
        {advancedDetails}
      </CardWrapper>
      <ConfirmTxn
        onContinue={onContinue}
        onReport={onReport}
        onCancel={onCancel}
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

export interface PreviewTxnProps {
  simulationError: string | undefined;
  warnings: UIWarning[];
  severity: Severity | undefined;
  advancedDetails: ReactElement;
  onContinue: () => Promise<SendTransactionResult | void>;
  onCancel: () => void;
  onReport: () => Promise<void>;
  children: ReactNode;
  protocol: EvmProtocol | SolanaProtocol | null;
  decodedCalldata?: EvmDecodedCalldata | null;
  dappUrl: URL | undefined;
}

export const PreviewTxn: FC<PreviewTxnProps> = ({
  warnings,
  severity,
  onContinue,
  onReport,
  onCancel,
  advancedDetails,
  children,
  protocol,
  decodedCalldata,
  dappUrl,
}) => {
  const { origin, host } = dappUrl || {};

  return (
    <PreviewCard
      title="Preview changes"
      origin={origin}
      website={host}
      warnings={warnings}
      severity={severity}
      onContinue={onContinue}
      onReport={onReport}
      onCancel={onCancel}
      advancedDetails={advancedDetails}
      protocol={protocol}
      decodedCalldata={decodedCalldata}
    >
      {children}
    </PreviewCard>
  );
};
