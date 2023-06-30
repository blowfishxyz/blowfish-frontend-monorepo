import { Column, Row, Text } from "@blowfish/ui";
import { PrimaryButton, TertiaryButton } from "@blowfish/protect-ui/core";
import {
  ArrowRightIcon,
  BlowfishWarningIcon,
} from "@blowfish/protect-ui/icons";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { BLOWFISH_PORTAL_API_BASE_URL } from "~config";

import { BLOWFISH_PROTECT_WEBSITE_URL, BLOWFISH_WEBSITE_URL } from "~constants";
import { useQueryParams } from "~hooks/useQueryParams";
import { useV2Enabled } from "~hooks/useV2Enabled";
import { logger } from "~utils/logger";
import { sendAllowlistedDomain } from "~utils/messages";

async function report(domain: string) {
  try {
    await fetch(
      `${BLOWFISH_PORTAL_API_BASE_URL}/report-block?domain=${domain}`
    ).then(async (x) => {
      if (x.ok) {
        return x.json();
      }
      throw new Error((await x.json()).error);
    });
    logger.debug(`Reported ${domain}`);
  } catch (e: unknown) {
    if (e instanceof Error) {
      logger.debug(`Report failed: ${e?.message}`);
    }
  }
}

export function BlockedPage() {
  const router = useRouter();
  const [v2Enabled] = useV2Enabled();
  const { href, host } = useQueryParams<{
    href: string;
    host: string;
  }>();

  const handleContinue = async () => {
    if (host) {
      report(host);
      await sendAllowlistedDomain(host);
    }
    if (href) {
      router.push(href);
    }
  };

  const handleBack = () => {
    if (v2Enabled) {
      window.location.replace(`${BLOWFISH_PROTECT_WEBSITE_URL}/v2`);
      return;
    }
    window.location.replace(BLOWFISH_WEBSITE_URL);
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

const Wrapper = styled(Row)`
  height: 100%;
  justify-content: center;
  background-color: #2a0000;
`;

const MainIcon = styled(BlowfishWarningIcon)`
  width: 104px;
  height: 104px;
`;

const Heading = styled(Text).attrs({ size: "xxl" })`
  color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.backgroundPrimary};
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

const Content = styled(Column)`
  justify-content: center;
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
