import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Signup } from "../components/Signup";
import { breakpoint } from "../utils/breakpoints";
import {
  EthereumIcon,
  PolygonIcon,
  ArbitrumIcon,
  OptimismIcon,
} from "./icons/ChainIcons";
import { TextSmall } from "./Typography";

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 500;
  color: black;
  line-height: 60px;
  letter-spacing: -0.02em;
  margin-top: 15px;

  @media only screen and ${breakpoint.device.md} {
    font-size: 55px;
    margin-top: 43px;
  }
  @media only screen and ${breakpoint.device.lg} {
    font-size: 65px;
    margin-top: 43px;
  }
`;
const HeroContainer = styled.div`
  padding-top: 10px;

  @media only screen and ${breakpoint.device.md} {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
  }
`;
const HeroSide = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and ${breakpoint.device.md} {
    padding-left: 70px;
  }
  @media only screen and ${breakpoint.device.lg} {
    padding-left: 70px;
  }
`;
const LeftSide = styled.div`
  flex: 1;
  display: none;

  @media only screen and ${breakpoint.device.md} {
    display: block;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: block;
  }
`;
const RightSide = styled.div`
  flex: 1;
`;
const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 34px;
  letter-spacing: 0em;

  @media only screen and ${breakpoint.device.md} {
    font-size: 18px;
  }
  @media only screen and ${breakpoint.device.lg} {
    font-size: 22px;
  }
`;
const MobileImage = styled.div`
  display: block;
  padding-bottom: 20px;

  @media only screen and ${breakpoint.device.md} {
    display: none;
  }
  @media only screen and ${breakpoint.device.lg} {
    display: none;
  }
`;

const FadedArbitrumIcon = styled(ArbitrumIcon)`
  opacity: 0.3;
`;

const FadedOptimismIcon = styled(OptimismIcon)`
  opacity: 0.3;
`;

const IconGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 18px;
  > * {
    width: auto;
    height: 16px;

    @media only screen and ${breakpoint.device.md} {
      height: 43px;
    }
    @media only screen and ${breakpoint.device.lg} {
      height: 43px;
    }
  }
`;

const TextXS = styled(TextSmall)`
  font-size: 14px;
  line-height: 16px;
`;

export const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <LeftSide>
        <Image
          src="/hero_image.svg"
          alt="extension"
          width="0"
          height="0"
          style={{ width: "100%", height: "auto" }}
        />
      </LeftSide>
      <RightSide>
        <HeroSide>
          <H1>Proactive defense for your wallet.</H1>
          <MobileImage>
            <Image
              src="/hero_image.svg"
              alt="extension"
              width="0"
              height="0"
              style={{ width: "100%", height: "auto" }}
            />
          </MobileImage>
          <Description>
            Blowfish’s browser extension works with your crypto wallet to
            protect you from fraud & theft. Mint, transfer, swap and stake
            without fear because we’ve got your back.
          </Description>
          <IconGroup>
            <EthereumIcon />
            <PolygonIcon />
            <FadedArbitrumIcon />
            <FadedOptimismIcon />
          </IconGroup>
          <Signup />
          <TextXS style={{ marginTop: "10px", textAlign: "center" }}>
            Available on Chrome, Brave, Arc and other Chromium-based browsers.
          </TextXS>
        </HeroSide>
      </RightSide>
    </HeroContainer>
  );
};
