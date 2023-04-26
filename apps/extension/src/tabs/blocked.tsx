import "../style.css";

import { PrimaryButton, TertiaryButton, Text, TextXL } from "@blowfish/ui/core";
import { ArrowRightIcon, BlowfishWarningIcon } from "@blowfish/ui/icons";
import { logger } from "@blowfish/utils/logger";
import React, { useMemo } from "react";
import styled from "styled-components";

import { updateStoredWhitelist } from "~utils/blocklist";

import { ThemeProvider } from "../theme";

function BlockedPage() {
  const { href, host } = useMemo(() => {
    try {
      const params = new URL(window.location.href).searchParams;
      return { href: params.get("href"), host: params.get("host") };
    } catch (e) {
      logger.error("Failed to parse host", e);
      return { href: null, host: null };
    }
  }, []);

  const handleContinue = async () => {
    if (host) {
      await updateStoredWhitelist(host);
    }
    if (href) {
      window.location.assign(href);
    }
  };

  const handleLearnMore = () => {
    // TODO(Alex): Add link to FAQ
    window.location.assign(
      "https://twitter.com/blowfishxyz/status/1650635743356923904"
    );
  };

  return (
    <ThemeProvider>
      <Wrapper>
        <Content>
          <MainIcon color="#c45050" />
          <Heading>Website flagged</Heading>
          <Description>
            We believe this website is malicious and unsafe to sign, and is
            highly likely to steal funds.
          </Description>
          <DetailsButton onClick={handleLearnMore}>
            See the details
          </DetailsButton>
          <TertiaryButton onClick={handleContinue}>
            Continue anyways
            <Arrow />
          </TertiaryButton>
        </Content>
      </Wrapper>
    </ThemeProvider>
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

export default BlockedPage;
