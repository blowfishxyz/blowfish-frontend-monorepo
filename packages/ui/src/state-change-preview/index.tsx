import {
  ChainFamily,
  ChainNetwork,
  EvmMessageScanResult,
  EvmTransactionScanResult,
} from "@blowfishxyz/api-client";
import { styled } from "styled-components";
import { Column, Row } from "~/common/layout";
import { Text } from "~/common/text";
import { SimulationResult } from "~/simulation-result";

type ScanResult = EvmTransactionScanResult | EvmMessageScanResult;
export type StateChangePreviewProps = {
  scanResult: ScanResult;
  chainFamily: ChainFamily;
  chainNetwork: ChainNetwork;
  sectionLabel?: string;
};

export const StateChangePreview: React.FC<StateChangePreviewProps> = ({
  scanResult,
  chainFamily,
  chainNetwork,
  sectionLabel = "State change",
}) => {
  const simulationResults =
    scanResult.simulationResults?.expectedStateChanges || [];
  const simulationError =
    scanResult.simulationResults?.error?.humanReadableError;

  if (simulationResults && simulationResults.length > 0) {
    return (
      <Column gap="lg">
        <Row justifyContent="space-between">
          <SectionHeading>{sectionLabel}</SectionHeading>
        </Row>
        <TxnDataWrapper>
          {simulationResults.map((data, index) => {
            return (
              <SimulationResult
                key={index}
                stateChange={data}
                chainFamily={chainFamily}
                chainNetwork={chainNetwork}
              />
            );
          })}
        </TxnDataWrapper>
      </Column>
    );
  }

  if (simulationError) {
    return (
      <Column gap="sm">
        <Row justifyContent="space-between">
          <SectionHeading>{sectionLabel}</SectionHeading>
        </Row>
        <Text size="md" color="danger">
          {simulationError}
        </Text>
      </Column>
    );
  }

  return (
    <Column gap="sm">
      <Row justifyContent="space-between">
        <SectionHeading>{sectionLabel}</SectionHeading>
      </Row>
      <Text size="md" color="base30">
        No state changes found. Proceed with caution
      </Text>
    </Column>
  );
};

const SectionHeading = styled(Text).attrs({
  size: "sm",
  color: "foregroundSecondary",
})``;

const TxnDataWrapper = styled.div`
  padding: 5px 0 0;
  height: 100%;
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
