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
  StateChangePreview,
} from "@blowfishxyz/ui";
import { LinkWithArrow } from "@blowfish/protect-ui/core";
import styled from "styled-components";
import { Chip } from "../chips/Chip";
import { CardWrapper, CardContent, Divider, CardText } from "./common";
import { UIWarning } from "~components/ScanResultsV2";
import { Severity } from "@blowfish/utils/types";
import {
  ChainFamily,
  ChainNetwork,
  EvmProtocol,
  EvmTransactionScanResult,
  EvmMessageScanResult,
} from "@blowfishxyz/api-client";
import { ConfirmTxn } from "./ConfirmTxn";
import { SendTransactionResult } from "@wagmi/core";
import { useChainMetadata } from "~hooks/useChainMetadata";
import { ImageBase } from "~components/common/ImageBase";
import { PreviewProtocol } from "./PreviewProtocol";

export type TxnSimulationDataType = {
  dappUrl: URL | undefined;
  account: string;
  message: string | undefined;
  scanResult: EvmTransactionScanResult | EvmMessageScanResult;
  protocol?: EvmProtocol | null;
};

const SectionHeading = styled(Text).attrs({ size: "xs", color: "base40" })``;

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

const TxnSimulationImage = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const VerifiedBadgeWrapper = styled(Row).attrs({
  alignItems: "center",
  justifyContent: "center",
})`
  position: absolute;
  right: -2px;
  bottom: -2px;
`;

const PreviewTokenTooltipContent = styled(TooltipContent)`
  background-color: white;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 4;
  width: 200px;
  border-radius: 12px;
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
  onReport: () => void;
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
}) => (
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
      {txnData.protocol && (
        <>
          <CardContent>
            <StyledColumn gap="md">
              <SectionHeading>Protocol</SectionHeading>
              <Row gap="sm" alignItems="center">
                <Tooltip>
                  <TooltipTrigger>
                    <TxnSimulationImage>
                      {(txnData.protocol.trustLevel === "TRUSTED" ||
                        txnData.protocol.trustLevel === "NATIVE") && (
                        <VerifiedBadgeWrapper>
                          <Icon variant="verified" size={14} />
                        </VerifiedBadgeWrapper>
                      )}

                      <ImageBase
                        src={txnData.protocol.imageUrl}
                        alt={txnData.protocol.name}
                        width={38}
                        height={38}
                        borderRadius="6px"
                      />
                    </TxnSimulationImage>
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
                  <CardText size="xs" marginLeft={8}>
                    <LinkWithArrow href={txnData.protocol.websiteUrl || ""}>
                      {txnData.protocol.name}
                    </LinkWithArrow>
                  </CardText>
                </Tooltip>
              </Row>
            </StyledColumn>
          </CardContent>
          <Divider />
        </>
      )}
      <StyledCardContent>
        <StyledColumn gap="sm">
          <SectionHeading>Website</SectionHeading>
          <Row gap="xs" alignItems="center">
            <CardText>
              <LinkWithArrow href={origin || ""}>{website}</LinkWithArrow>
            </CardText>
          </Row>
        </StyledColumn>
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
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  advancedDetails: ReactElement;
  onContinue: () => Promise<SendTransactionResult | void>;
  onCancel: () => void;
  onReport: () => void;
}

export const PreviewTxn: FC<PreviewTxnProps> = ({
  txnData,
  warnings,
  severity,
  onContinue,
  onReport,
  onCancel,
  advancedDetails,
}) => {
  const { dappUrl, scanResult, message } = txnData;
  const { origin, host } = dappUrl || {};
  const chain = useChainMetadata();

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
      {message ? <SignaturePreview message={message} /> : null}
      {
        <StateChangePreview
          scanResult={scanResult}
          chainFamily={chain?.chainInfo?.chainFamily || "ethereum"}
          chainNetwork={chain?.chainInfo?.chainNetwork || "mainnet"}
        />
      }
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
