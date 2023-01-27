import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Signup } from "../components/signup";

const H1 = styled.h1`
  font-size: 65px;
  font-weight: 500;
  color: black;
  line-height: 60px;
  letter-spacing: -0.02em;
`;
const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HeroSide = styled.div`
  padding-left: 70px;
  display: flex;
  flex-direction: column;
`;
const Side = styled.div`
  flex: 1;
`;
const Description = styled.div`
  font-size: 22px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0em;
`;

export const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <Side>
        <Image
          src="/hero_image.svg"
          alt="extension"
          width="0"
          height="0"
          style={{ width: "100%", height: "auto" }}
        />
      </Side>
      <Side>
        <HeroSide>
          <Image src="/browsers.svg" alt="browsers" width="113" height="43" />
          <H1>
            Proactive defense for <i>your wallet.</i>
          </H1>
          <Description>
            Blowfish’s browser extension works with your crypto wallet to
            protect you from fraud & theft. Mint, transfer, swap and stake
            without fear because we’ve got your back.
          </Description>
          <Signup />
        </HeroSide>
      </Side>
    </HeroContainer>
  );
};
