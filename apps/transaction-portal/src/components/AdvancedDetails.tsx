import { memo, useState } from "react";
import { CardContent, Divider } from "~components/cards/common";
import RequestJsonViewer from "./RequestJsonViewer";
import { Column, Row, Text } from "@blowfishxyz/ui";
import { ArrowDownIcon } from "@blowfish/protect-ui/icons";
import styled, { keyframes } from "styled-components";
import { DappRequest } from "@blowfish/utils/types";

export const AdvancedDetails = memo<{ request: DappRequest }>(
  function AdvancedDetails({ request }) {
    const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);

    return (
      <Column width="100%">
        <DynamicJsonViewerWrapper $show={showAdvancedDetails}>
          <CardContent>
            {showAdvancedDetails && <RequestJsonViewer request={request} />}
          </CardContent>
        </DynamicJsonViewerWrapper>
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
              {showAdvancedDetails ? "View less details" : "View more details"}
            </Text>
            <StyledArrowDownIcon expanded={showAdvancedDetails} />
          </ViewDetailsWrapper>
        </CardContent>
      </Column>
    );
  }
);

const ViewDetailsWrapper = styled(Row)`
  cursor: pointer;
  width: 100%;
`;

const DynamicJsonViewerWrapper = styled.div<{ $show: boolean }>`
  animation: ${({ $show }) => ($show ? fadeIn : fadeOut)} 1s ease forwards;
  opacity: ${({ $show }) => ($show ? "1" : "0")};
  overflow: auto;
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
