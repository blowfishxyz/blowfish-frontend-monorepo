import React from "react";
import styled from "styled-components";
import { device } from "@blowfishxyz/ui";

const StatsSection = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  width: 100%;
  padding: 24px 35px;
  overflow: hidden;
  border-radius: 0px 0px 0px 0px;
  border-color: #d5dbd7;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-right-width: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (${device.md}) {
    display: flex;
    flex-direction: row;
  }
  @media only screen and (${device.lg}) {
    display: flex;
    flex-direction: row;
  }
`;
const StatsGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  gap: 80px;
  padding-top: 30px;
  flex-wrap: wrap;

  @media only screen and (${device.md}) {
    padding-top: 0px;
    flex-wrap: nowrap;
  }
  @media only screen and (${device.lg}) {
    padding-top: 0px;
    flex-wrap: nowrap;
  }
`;
const Timeframe = styled.div`
  flex: 1;
  font-size: 21px;
  width: auto;
  height: auto;
  white-space: pre;
  color: #636363;
  line-height: 1.2;
`;
const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StatNumber = styled.div`
  font-size: 21px;
  width: auto;
  height: auto;
  font-weight: bold;
  white-space: pre;
  color: #000000;
  line-height: 1.2;
`;
const StatLabel = styled.div`
  font-size: 21px;
  width: auto;
  height: auto;
  white-space: pre;
  color: #636363;
  line-height: 1.2;
`;
const Disclaimer = styled.div`
  padding-top: 10px;
  font-size: 11px;
  width: 330px;
`;
const Date = styled.span`
  color: black;
  display: in-line;

  @media only screen and (${device.md}) {
    display: block;
  }
  @media only screen and (${device.lg}) {
    display: block;
  }
`;

export const Stats: React.FC = () => {
  return (
    <>
      <StatsSection>
        <Timeframe>
          Since our beta in <Date>April 2022</Date>
        </Timeframe>
        <StatsGroup>
          <Stat>
            <StatNumber>234m</StatNumber>
            <StatLabel>Txns Scanned</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>114k</StatNumber>
            <StatLabel>Scams prevented</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>Over $1bn</StatNumber>
            <StatLabel>assets protected</StatLabel>
          </Stat>
        </StatsGroup>
      </StatsSection>
      <Disclaimer>
        *These stats are cumulative across multiple wallets that have integrated
        directly with our security engine{" "}
      </Disclaimer>
    </>
  );
};
