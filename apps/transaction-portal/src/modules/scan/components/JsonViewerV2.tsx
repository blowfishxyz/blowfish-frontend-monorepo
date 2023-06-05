import React, { useMemo } from "react";
import ReactJson from "react-json-view";
import styled from "styled-components";

import { Row, Text } from "@blowfish/ui/core";
import { Divider } from "~components/cards/common";

const Wrapper = styled.div`
  width: 100%;
`;

const LeftColumn = styled.div`
  flex: 1;
  margin-right: 8px;
`;

const RightColumn = styled.div`
  flex: 1;
  margin-left: 8px;
`;

const JsonData = styled.div`
  margin-top: 8px;
  max-height: 100px;
  max-width: 280px;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    border-radius: 4px;
  }
`;

// TO-DO: Replace with proper type definition
interface JsonViewerProps {
  data: any;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const domainData = useMemo(() => data?.domain || {}, [data]);
  const messageData = useMemo(() => data?.message || {}, [data]);

  const renderData = (dataObject: object) => {
    if (Object.keys(dataObject).length === 0) {
      return <Text>No data available</Text>;
    }

    return (
      <ReactJson
        src={dataObject}
        indentWidth={1}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        name={false}
        collapseStringsAfterLength={2}
        theme={{
          base00: "tranparent",
          base01: "tranparent",
          base02: "tranparent",
          base03: "rgba(0, 0, 0, 0.5)",
          base04: "transparent",
          base05: "rgba(0, 0, 0, 0.5)",
          base06: "rgba(0, 0, 0, 0.5)",
          base07: "rgba(0, 0, 0, 0.5)",
          base08: "rgba(0, 0, 0, 0.5)",
          base09: "black",
          base0A: "black",
          base0B: "black",
          base0C: "black",
          base0D: "black",
          base0E: "black",
          base0F: "black",
        }}
      />
    );
  };

  return (
    <Wrapper>
      <Row justifyContent="space-between" gap="md">
        <RightColumn>
          <Text size="xs" design="secondary" marginBottom={8}>
            Contract
          </Text>
          <JsonData>{renderData(domainData)}</JsonData>
        </RightColumn>
        <Divider orientation="vertical" margin="0 32px" />
        <LeftColumn>
          <Text size="xs" design="secondary" marginBottom={8}>
            Message
          </Text>
          <JsonData>{renderData(messageData)}</JsonData>
        </LeftColumn>
      </Row>
    </Wrapper>
  );
};
