import React, { Fragment, ReactElement } from "react";
import styled from "styled-components";
import Image from "next/image";
import {
  device,
  PrimaryButton,
  supportedChains,
  Text,
} from "@blowfish/ui/core";
import { OptimismIcon } from "@blowfish/ui/icons";
import { CHROME_EXTENSION_STORE_URL } from "../config";

const H1 = styled.h1`
  font-size: 40px;
  font-weight: 500;
  color: black;
  line-height: 60px;
  letter-spacing: -0.02em;
  margin-top: 15px;

  @media only screen and (${device.md}) {
    font-size: 55px;
    margin-top: 43px;
  }
  @media only screen and (${device.lg}) {
    font-size: 65px;
    margin-top: 43px;
  }
`;
const HeroContainer = styled.div`
  padding-top: 10px;

  @media only screen and (${device.md}) {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
  }
  @media only screen and (${device.lg}) {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
  }
`;
const HeroSide = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (${device.md}) {
    padding-left: 70px;
  }
  @media only screen and (${device.lg}) {
    padding-left: 70px;
  }
`;
const LeftSide = styled.div`
  flex: 1;
  display: none;

  @media only screen and (${device.md}) {
    display: block;
  }
  @media only screen and (${device.lg}) {
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

  @media only screen and (${device.md}) {
    font-size: 18px;
  }
  @media only screen and (${device.lg}) {
    font-size: 22px;
  }
`;
const MobileImage = styled.div`
  display: block;
  padding-bottom: 20px;

  @media only screen and (${device.md}) {
    display: none;
  }
  @media only screen and (${device.lg}) {
    display: none;
  }
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

    @media only screen and (${device.md}) {
      height: 43px;
    }
    @media only screen and (${device.lg}) {
      height: 43px;
    }
  }
`;

const BrowserSupportNotice = styled(Text).attrs({ size: "sm" })`
  margin-top: 10px;

  @media only screen and (${device.lg}) {
    text-align: center;
  }
`;

const InstallLink = styled.a.attrs({ target: "_blank", rel: "noopener" })`
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
  @media only screen and (${device.lg}) {
    align-self: center;
  }
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
            {supportedChains.map((chain: ReactElement, index: number) => {
              return <Fragment key={`chain-${index}`}>{chain}</Fragment>;
            })}
            <FadedOptimismIcon />
          </IconGroup>
          <InstallLink href={CHROME_EXTENSION_STORE_URL}>
            <PrimaryButton>Download Blowfish Protect</PrimaryButton>{" "}
          </InstallLink>
          <BrowserSupportNotice>
            Available on Chrome, Brave, Arc and other Chromium-based browsers.
          </BrowserSupportNotice>
        </HeroSide>
      </RightSide>
    </HeroContainer>
  );
};
