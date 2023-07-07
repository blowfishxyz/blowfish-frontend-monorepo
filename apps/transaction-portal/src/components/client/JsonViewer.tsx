import { getAddress, isAddress } from "@ethersproject/address";
import React, { useMemo } from "react";
import ReactJson from "react-json-view";
import styled, { css } from "styled-components";

import { Text } from "@blowfishxyz/ui";

const Wrapper = styled.div`
  margin: 16px 0;
`;

type StyledTextSmallProps = { capitalize?: boolean; isValue?: boolean };
const StyledTextSmall = styled(Text).attrs({
  size: "sm",
})<StyledTextSmallProps>`
  word-wrap: break-word;
  ${(props) =>
    props.isValue &&
    css`
      font-size: 12px;
      line-height: 14px;
      font-family: "SF Mono", ui-monospace, monospace;
    `}
  ${(props) =>
    props.capitalize &&
    css`
      text-transform: capitalize;
    `}
`;
const DetailsRow = styled.div`
  display: flex;
  flex-direction: column;

  ${StyledTextSmall} + ${StyledTextSmall} {
    margin-top: 4px;
  }

  & + & {
    margin-top: 16px;
  }
`;

const isFlatObject = (obj: object) =>
  Object.values(obj).every((v) => !(typeof v === "object" && v !== null));

const FlatSectionContainer = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

interface FlatSectionProps {
  title?: string;
  data: object;
}
const FlatSection: React.FC<FlatSectionProps> = ({ title, data }) => {
  return (
    <FlatSectionContainer>
      {title && (
        <StyledTextSmall
          capitalize
          weight="semi-bold"
          as="div"
          style={{ marginBottom: "4px" }}
        >
          {title}
        </StyledTextSmall>
      )}
      {Object.entries(data).map(([key, value]) => {
        const displayValue = isAddress(value) ? getAddress(value) : value;

        return (
          <DetailsRow key={`details-${key}`}>
            <StyledTextSmall capitalize design="secondary">
              {key}
            </StyledTextSmall>
            <StyledTextSmall isValue>{displayValue}</StyledTextSmall>
          </DetailsRow>
        );
      })}
    </FlatSectionContainer>
  );
};

interface JsonViewerProps {
  data: object;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const FlattenedData = useMemo(() => {
    if (isFlatObject(data)) {
      return <FlatSection data={data} />;
    } else {
      const entries = Object.entries(data);
      const isSectionedFlatObject = entries.every(([, value]) =>
        isFlatObject(value)
      );

      if (isSectionedFlatObject) {
        return (
          <>
            {entries.map(([key, value]) => (
              <FlatSection
                key={`flat-section-${key}`}
                title={key}
                data={value}
              />
            ))}
          </>
        );
      }
    }

    return (
      <ReactJson
        style={{ wordBreak: "break-all" }}
        src={data}
        indentWidth={2}
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        name={false}
      />
    );
  }, [data]);

  return <Wrapper>{FlattenedData}</Wrapper>;
};
