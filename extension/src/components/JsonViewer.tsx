import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { getAddress, isAddress } from "@ethersproject/address";

import { TextSmall } from "./Typography";

const Wrapper = styled.div`
  margin: 16px 0;
`;

const StyledTextSmall = styled(TextSmall)<{
  capitalize?: boolean;
  isValue?: boolean;
}>`
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

interface JsonViewerProps {
  data: object;
}
export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const isFlat = useMemo(() => isFlatObject(data), [data]);

  // TODO(kimpers): A prettier way to display arbitrary json
  return (
    <Wrapper>
      {isFlat ? (
        Object.entries(data).map(([key, value]) => {
          const displayValue = isAddress(value) ? getAddress(value) : value;

          return (
            <DetailsRow key={`details-${key}`}>
              <StyledTextSmall capitalize secondary>
                {key}
              </StyledTextSmall>
              <StyledTextSmall isValue>{displayValue}</StyledTextSmall>
            </DetailsRow>
          );
        })
      ) : (
        <StyledTextSmall>
          <pre>{JSON.stringify(data, undefined, 2)}</pre>
        </StyledTextSmall>
      )}
    </Wrapper>
  );
};
