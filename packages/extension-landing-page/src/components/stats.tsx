import React from "react";
import styled from "styled-components";
import breakpoint from "../utils/breakpoints";

const StatsSection = styled.div`
  margin-top: 50px;
  box-sizing: border-box;
  width: 100%;
  
  padding: 35px 24px 35px 24px;
  overflow: hidden;
  border-radius: 0px 0px 0px 0px;
  border-color: #d5dbd7;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-right-width: 0px;

  @media only screen and ${breakpoint.device.md} {
    display: flex;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
  }
`;
const StatsGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  padding-top: 30px;

  @media only screen and ${breakpoint.device.md} {
    padding-top: 0px;
  }
  @media only screen and ${breakpoint.device.lg} {
    padding-top: 0px;
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
  padding-left: 24px;

  @media only screen and ${breakpoint.device.md} {
    padding-left: 0px;
    width: 280px;
  }
  @media only screen and ${breakpoint.device.lg} {
    padding-left: 0px;
    width: 280px;
  }
`;
const Date = styled.span`
  color: black;
  display: in-line;

  @media only screen and ${breakpoint.device.md} {
    display: block;
  }
  @media only screen and ${breakpoint.device.lg} {
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
            <StatNumber>207m</StatNumber>
            <StatLabel>Txns Scanned</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>18k</StatNumber>
            <StatLabel>Scams prevented</StatLabel>
          </Stat>
        </StatsGroup>
      </StatsSection>
      <Disclaimer>
        *These stats are cumulative across multiple wallets that have integrated directly with our security engine{" "}
      </Disclaimer>
    </>
  );
};
