import React, {
  FC,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
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
  EvmTransactionsScanResult,
  EvmMessageScanResult,
  SolanaProtocol,
  ScanTransactionsSolana200Response,
} from "@blowfishxyz/api-client";
import { ChainFamily, ChainNetwork } from "@blowfish/utils/chains";
import { ConfirmTxn } from "./ConfirmTxn";
import { SendTransactionResult } from "@wagmi/core";
import { PreviewProtocol } from "./PreviewProtocol";
import { InfoIcon } from "@blowfish/protect-ui/icons";

export type TxnSimulationDataType = {
  dappUrl: URL | undefined;
  account: string;
  message: string | undefined;
  scanResult:
    | EvmTransactionsScanResult
    | EvmMessageScanResult
    | ScanTransactionsSolana200Response;
  protocol?: EvmProtocol | SolanaProtocol | null;
  decodedCalldata?: EvmDecodedCalldata | null;
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
  txnData: TxnSimulationDataType;
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
}

const PreviewCard: FC<PreviewCardProps> = ({
  txnData,
  title,
  warnings,
  severity,
  children,
  onContinue,
  onReport,
  onCancel,
  advancedDetails,
  website,
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
        {txnData.decodedCalldata && (
          <>
            <Divider />
            <CardContent>
              <StyledColumn gap="md">
                <Row>
                  <SectionHeading>Decoded calldata</SectionHeading>
                  {!txnData.protocol && (
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
                    function {txnData.decodedCalldata?.data.functionName}(
                    {txnData.decodedCalldata &&
                      txnData.decodedCalldata.data.arguments.map((arg, i) => (
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
  txnData: TxnSimulationDataType;
  simulationError: string | undefined;
  warnings: UIWarning[];
  severity: Severity | undefined;
  chainNetwork?: ChainNetwork;
  chainFamily?: ChainFamily;
  advancedDetails: ReactElement;
  onContinue: () => Promise<SendTransactionResult | void>;
  onCancel: () => void;
  onReport: () => Promise<void>;
  children: ReactNode;
}

export const PreviewTxn: FC<PreviewTxnProps> = ({
  txnData,
  warnings,
  severity,
  onContinue,
  onReport,
  onCancel,
  advancedDetails,
  children,
}) => {
  const { dappUrl, message } = txnData;
  const { origin, host } = dappUrl || {};

  return (
    <PreviewCard
      txnData={txnData}
      title="Preview changes"
      origin={origin}
      website={host}
      warnings={warnings}
      severity={severity}
      onContinue={onContinue}
      onReport={onReport}
      onCancel={onCancel}
      advancedDetails={advancedDetails}
    >
      {message && <SignaturePreview message={message} />}
      {children}
    </PreviewCard>
  );
};

type MsgTextProps = { $expanded?: boolean };

const SignatureSimulatioMsgText = styled(Text).attrs({
  size: "sm",
  design: "primary",
})<MsgTextProps>`
  display: -webkit-box;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? "none" : "5")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: max-height 0.3s ease;
`;

const ShowMoreButtonWrapper = styled.div`
  width: 50px;
`;

const ShowMoreButton = styled(Button).attrs({
  design: "tertiary",
  size: "sm",
})`
  height: 15px;
  padding: 0;
  justify-content: flex-start;
`;

const SignaturePreview: React.FC<{ message: string }> = ({ message }) => {
  const [expanded, setExpanded] = useState(false);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (textRef.current) {
      const isOverflowing =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsTextOverflowing(isOverflowing);
      setExpanded(!isOverflowing);
    }
  }, []);

  const handleShowMore = () => {
    setExpanded(!expanded);
  };

  return (
    <Column gap="sm" marginBottom={18}>
      <Row justifyContent="space-between">
        <SectionHeading>Message</SectionHeading>
      </Row>
      <SignatureSimulatioMsgText ref={textRef} $expanded={expanded}>
        {message}
      </SignatureSimulatioMsgText>

      <ShowMoreButtonWrapper>
        <ShowMoreButton stretch design="tertiary" onClick={handleShowMore}>
          <Text size="xs" design="secondary">
            {isTextOverflowing ? (expanded ? "Show less" : "Show more") : ""}
          </Text>
        </ShowMoreButton>
      </ShowMoreButtonWrapper>
    </Column>
  );
};
