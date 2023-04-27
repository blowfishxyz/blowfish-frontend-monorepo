import { PrimaryButton, TertiaryButton, Text, TextXL } from "@blowfish/ui/core";
import { ArrowRightIcon, BlowfishWarningIcon } from "@blowfish/ui/icons";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { BLOWFISH_WEBSITE_URL } from "~constants";
import { useParsedRequestScanUrl } from "~hooks/useParsedRequestScanUrl";
import { sendWhitelistWebsite } from "~utils/messages";

export function BlockedPage() {
  const router = useRouter();
  const { href, host } = useParsedRequestScanUrl<{
    href: string;
    host: string;
  }>();

  const handleContinue = async () => {
    if (host) {
      await sendWhitelistWebsite(host);
    }
    if (href) {
      router.push(href);
    }
  };

  const handleBack = () => {
    router.replace(BLOWFISH_WEBSITE_URL);
  };

  return (
    <Wrapper>
      <Content>
        <MainIcon color="#c45050" />
        <Heading>Website flagged</Heading>
        <Description>
          We believe this website is dangerous and may be trying to steal your
          assets.
        </Description>
        <DetailsButton onClick={handleBack}>Back to safety</DetailsButton>
        <TertiaryButton onClick={handleContinue}>
          Continue anyways
          <Arrow />
        </TertiaryButton>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2a0000;
`;

const MainIcon = styled(BlowfishWarningIcon)`
  width: 104px;
  height: 104px;
`;

const Heading = styled(TextXL)`
  color: ${({ theme }) => theme.palette.white};
`;

const Description = styled(Text)`
  color: ${({ theme }) => theme.palette.white};
  opacity: 0.56;
  margin-top: 12px;
  text-align: center;
`;

const DetailsButton = styled(PrimaryButton)`
  background: #c45050;
`;

const Arrow = styled(ArrowRightIcon)`
  width: 12px;
  height: 12px;
  fill: currentColor;
  margin-top: 4px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 282px;

  ${Heading} {
    margin-top: 18px;
  }

  ${Description} {
    margin-top: 12px;
  }

  ${DetailsButton} {
    margin-top: 28px;
  }

  ${TertiaryButton} {
    margin-top: 8px;
  }
`;
