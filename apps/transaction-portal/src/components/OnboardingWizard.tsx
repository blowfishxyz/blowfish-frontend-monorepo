import styled, { css, keyframes } from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";
import { useTimeout } from "react-use";
import dynamic from "next/dynamic";
import UserWallet from "./client/UserWallet";
import { Column, PrimaryButton, Row, Text, TextXL } from "@blowfish/ui/core";
import { breakpoint } from "~utils/breakpoints";
import {
  ArbitrumIcon,
  BnbChainIcon,
  EthereumIcon,
  PolygonIcon,
} from "@blowfish/ui/icons";

const OnboardingButtons = dynamic(() => import("./client/OnboardingButtons"), {
  ssr: false,
});

// TODO:(Andrei) extract to app
const HeaderWrapper = styled(Row)`
  padding: 24px;
`;

const Logo = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullHeightCenterContainer = styled(Row)`
  height: 100%;
  justify-content: center;

  @media only screen and ${breakpoint.device.lg} {
    margin-top: 200px;
  }
`;

const OnboardingContainer = styled(Column)`
  gap: 80px;
  max-width: 1024px;
  padding: 32px;

  @media only screen and ${breakpoint.device.lg} {
    flex-direction: row;
  }
`;

const OnboardingDetailsContainer = styled(Column)`
  align-items: center;
  justify-content: center;
`;

const SubHeading = styled(Text)`
  font-size: 22px;
  font-weight: 500;
  opacity: 0.4;
  line-height: 28px;
`;

const Heading = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  margin-bottom: 18px;
`;

const StyledOl = styled.ol`
  list-style: none;
  counter-reset: item;
  padding-left: 0;
  margin-bottom: 32px;
  margin-top: 0;

  li {
    counter-increment: item;
    margin-bottom: 1rem;

    &:before {
      margin-right: 10px;
      content: counter(item);
      border-radius: 100%;
      font-weight: 500;
      line-height: 30px;
      width: 30px;
      height: 30px;
      text-align: center;
      display: inline-block;
    }
  }
`;

const TextStep = styled(Text)<{ active: boolean }>`
  transition: all 0.2s linear;

  ${({ active }) => {
    if (active) {
      return css`
        font-weight: 500;
        opacity: 1;
        font-size: 22px;

        &:before {
          background-color: black;
          color: white;
          font-size: 22px;
          width: 32px;
          height: 32px;
          line-height: 32px;
        }
      `;
    }
    return css`
      opacity: 0.4;
      font-size: 14px;

      &:before {
        background-color: rgba(0, 0, 0, 0.1);
        color: black;
        font-size: 14px;
      }
    `;
  }};
`;

const CenterColumn = styled(Column)`
  position: relative;
  align-items: center;
  text-align: center;

  ${TextXL} {
    line-height: 28px;
  }

  img {
    border-radius: 12px;
  }
`;

//todo move to ui
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const BlockedImage = styled(Image)`
  position: absolute;
  bottom: -40px;
  transform: translateX(-25%);
  @media only screen and (max-width: 500px) {
    transform: translateX(-20px);
  }
`;
const CenteredColumnContainer = styled(CenterColumn)`
  display: flex;
  flex-direction: column;

  > * {
    opacity: 0;
    animation-name: ${fadeIn};
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-duration: 0.24s;
  }

  > *:nth-child(1) {
    animation-delay: 0.32s;
  }

  > *:nth-child(2) {
    animation-delay: 0.64s;
  }

  > *:nth-child(3) {
    animation-delay: 1.28s;
  }
`;
const IconGroup = styled(Row)`
  gap: 32px;
  justify-content: center;

  > svg {
    height: 32px;
    width: auto;
  }
`;

const HiddenTooltipTrigger = styled.div`
  position: absolute;
  top: 0;
  right: 12%;
`;

const StyledTooltipContent = styled(Column)`
  padding: 16px;

  ${Logo} {
    justify-content: left;
  }
`;

export enum OnboardingStep {
  ConnectWallet,
  SurfDapps,
  Protection,
  MultiChain,
  Feedback,
  Ready,
}

const OnboardingSteps = ({ currentStep }: { currentStep: OnboardingStep }) => {
  return (
    <StyledOl>
      <TextStep as="li" active={currentStep === OnboardingStep.ConnectWallet}>
        Connect your wallet
      </TextStep>
      <TextStep as="li" active={currentStep === OnboardingStep.SurfDapps}>
        Surf Web3 dApps like you normally do
      </TextStep>
      <TextStep as="li" active={currentStep === OnboardingStep.Protection}>
        Transaction & Message Protection
      </TextStep>
      <TextStep as="li" active={currentStep === OnboardingStep.MultiChain}>
        Works where you need it
      </TextStep>
      <TextStep as="li" active={currentStep === OnboardingStep.Feedback}>
        Questions or Feedback
      </TextStep>
      <TextStep as="li" active={currentStep === OnboardingStep.Ready}>
        Ready Set Go!
      </TextStep>
    </StyledOl>
  );
};

const BlowfishExtensionPinCTA = () => {
  const [open, setOpen] = useState(false);
  const [isReady] = useTimeout(1000);
  const ready = isReady();

  useEffect(() => {
    if (ready) {
      setOpen(true);
    }
  }, [ready]);

  return (
    <Tooltip
      placement="bottom"
      initialOpen={true}
      shouldCloseOnOutsideClick={false}
      open={open}
      onOpenChange={setOpen}
    >
      <TooltipTrigger>
        <HiddenTooltipTrigger />
      </TooltipTrigger>
      <TooltipContent>
        <StyledTooltipContent gap="md">
          <Logo>
            <Image src="/logo.svg" width="135" height="35" alt="Logo" />
          </Logo>
          <Text>
            Blowfish extension successfully installed! Pin it for easy access.
          </Text>
          <Image
            src="/onboarding/pin-extension.webp"
            width="360"
            height="248"
            alt="pin extension"
          />
        </StyledTooltipContent>
        <PrimaryButton onClick={() => setOpen(false)}>Close</PrimaryButton>
      </TooltipContent>
    </Tooltip>
  );
};

const OnboardingDetails = ({
  currentStep,
}: {
  currentStep: OnboardingStep;
}) => {
  let content;
  if (currentStep === OnboardingStep.ConnectWallet) {
    content = (
      <CenterColumn gap="lg">
        <UserWallet />
      </CenterColumn>
    );
  }
  if (currentStep === OnboardingStep.SurfDapps) {
    content = (
      <CenteredColumnContainer gap="lg">
        <TextXL>
          If you try to navigate to a dangerous website, Blowfish will let you
          know
        </TextXL>
        <Image
          src="/onboarding/opensea.webp"
          width="297"
          height="420"
          alt="opensea gif"
        />
        <BlockedImage
          src="/onboarding/blocked.webp"
          width="297"
          height="420"
          alt="blocked website"
        />
      </CenteredColumnContainer>
    );
  }
  if (currentStep === OnboardingStep.Protection) {
    content = (
      <CenteredColumnContainer gap="lg">
        <TextXL>
          Blowfish will automatically open for every transaction & message
        </TextXL>
        <Image
          src="/onboarding/transactions.webp"
          width="360"
          height="250"
          alt="opensea gif"
        />
      </CenteredColumnContainer>
    );
  }
  if (currentStep === OnboardingStep.MultiChain) {
    content = (
      <CenteredColumnContainer gap="lg">
        <TextXL>Live on</TextXL>
        <IconGroup>
          <EthereumIcon />
          <PolygonIcon />
          <BnbChainIcon />
          <ArbitrumIcon />
        </IconGroup>
      </CenteredColumnContainer>
    );
  }
  if (currentStep === OnboardingStep.Feedback) {
    content = (
      <>
        <CenteredColumnContainer gap="lg">
          <TextXL>Let us know anytime in the app</TextXL>
          <Image
            src="/onboarding/feedback.webp"
            width="280"
            height="420"
            alt="feedback extension"
          />
        </CenteredColumnContainer>
        <BlowfishExtensionPinCTA />
      </>
    );
  }
  if (currentStep === OnboardingStep.Ready) {
    content = (
      <CenteredColumnContainer gap="lg">
        <TextXL>
          Please refresh the dApps you were using & Blowfish will start working
          immediately
        </TextXL>
        <Image
          width="320"
          height="280"
          src="/onboarding/wallet-hero.webp"
          alt="blowfish wallet protect"
        />
      </CenteredColumnContainer>
    );
  }

  return <OnboardingDetailsContainer>{content}</OnboardingDetailsContainer>;
};

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(OnboardingStep.ConnectWallet);
  const router = useRouter();

  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  const next = () => {
    if (currentStep !== OnboardingStep.Ready) {
      setCurrentStep(currentStep + 1);
      return;
    }
    router.replace("https://blowfish.xyz/");
  };

  return (
    <>
      <HeaderWrapper>
        <Logo
          href={`https://${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`}
          rel="noopener"
        >
          <Image src="/logo.svg" width="135" height="35" alt="Logo" />
        </Logo>
      </HeaderWrapper>
      <FullHeightCenterContainer>
        <OnboardingContainer>
          <OnboardingDetails currentStep={currentStep} />
          <Column>
            <SubHeading>Get started</SubHeading>
            <Heading>Protect your assets</Heading>
            <OnboardingSteps currentStep={currentStep} />
            <OnboardingButtons
              currentStep={currentStep}
              back={back}
              next={next}
              backToFirstStep={() =>
                setCurrentStep(OnboardingStep.ConnectWallet)
              }
            />
          </Column>
        </OnboardingContainer>
      </FullHeightCenterContainer>
    </>
  );
};

export default OnboardingWizard;
