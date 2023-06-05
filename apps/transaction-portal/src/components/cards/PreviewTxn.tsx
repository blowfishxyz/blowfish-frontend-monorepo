import React, { FC, ReactNode, useState } from "react";
import {
  BlockExplorerLink,
  Column,
  LinkWithArrow,
  Row,
  Text,
  device,
} from "@blowfish/ui/core";
import styled, { keyframes } from "styled-components";
import { Chip } from "../chips/Chip";
import {
  CardWrapper,
  CardContent,
  Divider,
  CardText,
  CardBlackTextLink,
} from "./common";
import { TxnSimulation } from "~components/simulation-results-types/TxnSimulation";
import { SignatureSimulation } from "~components/simulation-results-types/SignatureSimulation";
import { shortenHex } from "~utils/hex";
import { ConfirmTxn } from "./ConfirmTxn";
import {
  SignatureDataType,
  TxnSimulationDataType,
} from "~components/simulation-results-types/mock-data";
import { UIWarning } from "~modules/scan/components/ScanResultsV2";
import { Severity, TransactionPayload } from "@blowfish/utils/types";
import { ChainFamily, ChainNetwork } from "@blowfish/api-client";
import dynamic from "next/dynamic";
import { ArrowDownIcon } from "@blowfish/ui/icons";

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;

  @media (${device.lg}) {
    font-size: 22px;
    line-height: 25px;
  }
`;

const SmallGrayText = styled(Text).attrs({ size: "sm", design: "secondary" })``;

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

const TxnDataWrapper = styled.div`
  padding: 5px 0 0;
  max-height: 200px;
  height: 100%;
  overflow-y: auto;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: 4px;
  }

  scrollbar-color: ${({ theme }) =>
    `${theme.colors.backgroundPrimary} ${theme.colors.backgroundSecondary}`};

  & {
    scrollbar-width: thin;
  }

  & {
    scrollbar-color: ${({ theme }) =>
      `${theme.colors.backgroundPrimary} ${theme.colors.backgroundSecondary}`};
    scrollbar-width: thin;
  }
`;

const ViewDetailsWrapper = styled(Row)`
  cursor: pointer;
  width: 100%;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    max-height: 0;
  }
  100% {
    opacity: 1;
    max-height: 1000px;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    max-height: 1000px;
  }
  100% {
    opacity: 0;
    max-height: 0;
  }
`;

const DynamicJsonViewerWrapper = styled.div<{ show: boolean }>`
  animation: ${(props) => (props.show ? fadeIn : fadeOut)} 1s ease forwards;
  opacity: ${(props) => (props.show ? "1" : "0")};
  overflow: hidden;
`;

interface PreviewCardProps {
  title: string;
  simulationType: "transaction" | "signature";
  origin?: string;
  website?: string;
  contract: string;
  warnings: UIWarning[];
  severity: Severity | undefined;
  children: ReactNode;
  content: TransactionPayload | any;
  onContinue: () => void;
  onCancel: () => void;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
}

const PreviewCard: FC<PreviewCardProps> = ({
  title,
  origin,
  website,
  contract,
  warnings,
  severity,
  onContinue,
  onCancel,
  children,
  content,
  chainNetwork,
  chainFamily,
}) => {
  const [showAdvancedDetails, setShowAdvancedDetails] =
    useState<boolean>(false);
  const DynamicJsonViewer = dynamic(
    () =>
      import("../../modules/scan/components/JsonViewerV2").then(
        (mod) => mod.JsonViewer
      ),
    {
      ssr: false,
      loading: () => <Text size="sm">Loading...</Text>,
    }
  );

  return (
    <CardWrapper>
      <CardContent>
        <Row justifyContent="space-between">
          <Title>{title}</Title>
          <Chip severity={severity} />
        </Row>
      </CardContent>
      <Divider margin="16px 0" />
      <CardContent>{children}</CardContent>
      <Divider margin="24px 0 0" />
      <StyledCardContent>
        <StyledColumn gap="sm">
          <SmallGrayText>Website</SmallGrayText>
          <Row gap="xs" alignItems="center">
            <CardText>
              <LinkWithArrow href={origin || ""}>{website}</LinkWithArrow>
            </CardText>
          </Row>
        </StyledColumn>
        <Divider orientation="vertical" margin="0 36px" />
        <StyledColumn gap="sm">
          <SmallGrayText>Contract</SmallGrayText>
          <CardText>
            <CardBlackTextLink>
              <BlockExplorerLink
                chainFamily={chainFamily}
                chainNetwork={chainNetwork}
                address={contract}
              >
                {shortenHex(contract)}
              </BlockExplorerLink>
            </CardBlackTextLink>
          </CardText>
        </StyledColumn>
      </StyledCardContent>
      <Divider margin="0 0 16px" />
      <DynamicJsonViewerWrapper show={showAdvancedDetails}>
        <CardContent>
          {showAdvancedDetails && content && (
            <DynamicJsonViewer data={content} />
          )}
        </CardContent>
      </DynamicJsonViewerWrapper>
      {showAdvancedDetails && <Divider margin="16px 0" />}
      <CardContent>
        <ViewDetailsWrapper
          justifyContent="space-between"
          alignItems="center"
          marginBottom={16}
          onClick={() => {
            setShowAdvancedDetails((prev) => !prev);
          }}
        >
          <Text design="secondary" size="sm">
            View more details
          </Text>
          <ArrowDownIcon expanded={showAdvancedDetails} />
        </ViewDetailsWrapper>
        <ConfirmTxn
          onContinue={onContinue}
          onCancel={onCancel}
          warnings={warnings}
          severity={severity}
        />
      </CardContent>
    </CardWrapper>
  );
};

export interface PreviewTxnProps {
  simulationType: "transaction" | "signature";
  txnSimulationData?: TxnSimulationDataType;
  signatureData: SignatureDataType[];
  warnings: UIWarning[];
  severity: Severity | undefined;
  chainNetwork: ChainNetwork;
  chainFamily: ChainFamily;
  content: TransactionPayload | any;
  onContinue: () => void;
  onCancel: () => void;
}

const PreviewTxn: FC<PreviewTxnProps> = ({
  simulationType,
  txnSimulationData,
  signatureData,
  warnings,
  severity,
  onContinue,
  onCancel,
  chainNetwork,
  chainFamily,
  content,
}) => {
  const renderTransactionPreview = () => (
    <PreviewCard
      title="Preview"
      simulationType="transaction"
      origin={txnSimulationData?.dappUrl?.origin}
      website={txnSimulationData?.dappUrl?.host}
      contract={txnSimulationData?.account || ""}
      warnings={warnings}
      severity={severity}
      content={content}
      onContinue={onContinue}
      onCancel={onCancel}
      chainNetwork={chainNetwork}
      chainFamily={chainFamily}
    >
      <Column gap="lg">
        <Row justifyContent="space-between">
          <SmallGrayText>State</SmallGrayText>
        </Row>
        <TxnDataWrapper>
          {txnSimulationData?.data?.map((data, index) => {
            return <TxnSimulation key={index} txnData={data} />;
          })}
        </TxnDataWrapper>
      </Column>
    </PreviewCard>
  );

  const renderSignaturePreview = () => (
    <>
      {signatureData.map((data, index) => (
        <PreviewCard
          key={index}
          title="Preview"
          simulationType="signature"
          origin={data.dappUrl?.origin}
          website={data.dappUrl?.host}
          contract={data.account}
          warnings={warnings}
          severity={severity}
          content={content}
          onContinue={onContinue}
          onCancel={onCancel}
          chainNetwork={chainNetwork}
          chainFamily={chainFamily}
        >
          <Column gap="md">
            <Row justifyContent="space-between">
              <SmallGrayText>Signatures</SmallGrayText>
            </Row>
            <div>
              <SignatureSimulation data={data} />
            </div>
          </Column>
          <Column gap="sm" paddingTop={4}>
            <Row justifyContent="space-between">
              <SmallGrayText>State</SmallGrayText>
            </Row>
            <div>
              <Text design="secondary" size="md" marginTop={30}>
                {data.state}
              </Text>
            </div>
          </Column>
        </PreviewCard>
      ))}
    </>
  );

  return (
    <>
      {simulationType === "transaction" && renderTransactionPreview()}
      {simulationType === "signature" && renderSignaturePreview()}
    </>
  );
};

export default PreviewTxn;
