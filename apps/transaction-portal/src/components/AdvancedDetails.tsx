import { memo, useState } from "react";
import { CardContent, Divider } from "~components/cards/common";
import RequestJsonViewer from "./RequestJsonViewer";
import { Column, Row, Text } from "@blowfishxyz/ui";
import { ArrowDownIcon } from "@blowfish/protect-ui/icons";
import styled, { keyframes } from "styled-components";
import { DappRequest } from "@blowfish/utils/types";
import {
  EvmDecodedLog,
  ScanMessageEvm200Response,
  ScanTransactionsEvm200Response,
} from "@blowfishxyz/api-client";
import RawResponseViewer from "./RawResponseViewer";

export const AdvancedDetails = memo<{
  request: DappRequest;
  scanResults:
    | ScanMessageEvm200Response
    | ScanTransactionsEvm200Response
    | undefined;
  decodedLogs: EvmDecodedLog[] | undefined;
}>(function AdvancedDetails({ request, decodedLogs, scanResults }) {
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);

  return (
    <Column width="100%">
      {showAdvancedDetails && (
        <DynamicJsonViewerWrapper $show={showAdvancedDetails}>
          <CardContent>
            {showAdvancedDetails &&
              (scanResults ? (
                <RawResponseViewer
                  request={request}
                  scanResults={scanResults}
                />
              ) : (
                <RequestJsonViewer request={request} />
              ))}

            {!scanResults &&
              decodedLogs &&
              decodedLogs.filter((decodedLog) => decodedLog !== null).length >
                0 && (
                <Column marginTop={16} gap="sm">
                  <Text size="sm" design="secondary">
                    Decoded Logs
                  </Text>
                  <Column gap="lg">
                    {decodedLogs.map(
                      (decodedLog, i) =>
                        decodedLog && (
                          <Column gap="sm" key={`${decodedLog.name}-${i}`}>
                            <Text size="xs" design="secondary">
                              Name:{" "}
                              <Text size="xs">
                                {decodedLog.name} (
                                {decodedLog.params.map((param, i) => (
                                  <DecodedLogsParams
                                    size="xs"
                                    key={`${param.name}-${i}`}
                                  >
                                    {param.paramType} {param.name}
                                  </DecodedLogsParams>
                                ))}
                                )
                              </Text>
                            </Text>
                            <Text size="xs" design="secondary">
                              Address:{" "}
                              <Text size="xs">{decodedLog.signature}</Text>
                            </Text>
                          </Column>
                        )
                    )}
                  </Column>
                </Column>
              )}
          </CardContent>
        </DynamicJsonViewerWrapper>
      )}
      {showAdvancedDetails && <Divider $margin="16px 0" />}
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
            {scanResults
              ? showAdvancedDetails
                ? "Hide raw request and response data"
                : "View raw request and response data"
              : showAdvancedDetails
              ? "View less details"
              : "View more details"}
          </Text>
          <StyledArrowDownIcon expanded={showAdvancedDetails} />
        </ViewDetailsWrapper>
      </CardContent>
    </Column>
  );
});

const DecodedLogsParams = styled(Text)`
  &:not(:last-child)::after {
    content: ", ";
  }
`;

const ViewDetailsWrapper = styled(Row)`
  cursor: pointer;
  width: 100%;
`;

const DynamicJsonViewerWrapper = styled.div<{ $show: boolean }>`
  animation: ${({ $show }) => ($show ? fadeIn : fadeOut)} 1s ease forwards;
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  width: 100%;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    width: 0px;
  }
`;

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  width: 16px;
  height: 17px;
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
