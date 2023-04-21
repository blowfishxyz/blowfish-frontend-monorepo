import styled, { css } from "styled-components";
import Image from "next/image";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~components/common/Tooltip";
import { useTimeout } from "react-use";
import dynamic from "next/dynamic";
import {
  Column,
  PrimaryButton,
  Row,
  supportedChains,
  Text,
  TextXL,
} from "@blowfish/ui/core";
import { breakpoint } from "~utils/breakpoints";
import { UserWalletConnectKitWrapper } from "./UserWalletConnectKitWrapper";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

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
  justify-content: center;
  height: 100%;
  overflow-x: hidden;
`;

const OnboardingContainer = styled(Column)`
  gap: 60px;
  max-width: 1024px;
  padding: 32px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  @media only screen and ${breakpoint.device.lg} {
    gap: 80px;
    flex-direction: row;
  }
`;

export const OnboardingStepsWrapper = styled(Column)`
  flex: 1;
  justify-content: flex-end;

  @media only screen and ${breakpoint.device.lg} {
    justify-content: flex-start;
  }
`;

const OnboardingDetailsContainer = styled(motion(Column))`
  align-items: center;
  justify-content: center;
  flex: 1;
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
      transition: background-color 0.2s ease-in;
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
  transition: font-size 0.2s ease-in;

  ${({ active }) => {
    if (active) {
      return css`
        font-weight: 500;
        opacity: 1;

        &:before {
          background-color: black;
          color: white;
        }

        @media screen and (min-width: 500px) {
          font-size: 22px;

          &:before {
            font-size: 22px;
            width: 32px;
            height: 32px;
            line-height: 32px;
          }
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

  > img {
    border-radius: 12px;
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
`;

const IconGroup = styled(Row)`
  gap: 32px;
  justify-content: center;

  > svg {
    height: 48px;
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

  img {
    border-radius: 12px;
  }
`;

const ImageWithShadow = styled(Image)`
  box-shadow: 0px 4.13211px 10.0172px rgba(0, 0, 0, 0.105),
    0px 1.4945px 3.62304px rgba(0, 0, 0, 0.0731663);
`;

const VideoOuterContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 360px;
  width: 360px;

  @media only screen and ${breakpoint.device.lg} {
    width: 420px;
    height: 420px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

export enum OnboardingStep {
  ConnectWallet = "CONNECT_WALLET",
  SurfDapps = "SURF_DAPPS",
  Protection = "PROTECTION",
  MultiChain = "MULTI_CHAIN",
  Feedback = "FEEDBACK",
  Ready = "READY",
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
  const [isReady] = useTimeout(300);
  const ready = isReady();

  useEffect(() => {
    if (ready) {
      setOpen(true);
    }
  }, [ready]);

  return (
    <AnimatePresence>
      {open && (
        <Tooltip
          placement="bottom"
          initialOpen={true}
          shouldCloseOnOutsideClick={false}
          onOpenChange={setOpen}
        >
          <TooltipTrigger>
            <HiddenTooltipTrigger />
          </TooltipTrigger>
          <TooltipContent
            maxWidth={420}
            style={{ transform: "translateX(-20px)" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <StyledTooltipContent gap="md">
                <Logo>
                  <Image src="/logo.svg" width="135" height="35" alt="Logo" />
                </Logo>
                <Text>
                  Blowfish extension successfully installed! Pin it for easy
                  access.
                </Text>
                <Image
                  src="/onboarding/pin-extension.webp"
                  width="360"
                  height="248"
                  alt="pin extension"
                />
              </StyledTooltipContent>
              <PrimaryButton onClick={() => setOpen(false)}>
                Close
              </PrimaryButton>
            </motion.div>
          </TooltipContent>
        </Tooltip>
      )}
    </AnimatePresence>
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
        <UserWalletConnectKitWrapper />
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
          height="380"
          width="440"
          alt="transactions"
        />
      </CenteredColumnContainer>
    );
  }
  if (currentStep === OnboardingStep.MultiChain) {
    content = (
      <>
        <CenteredColumnContainer gap="lg">
          <TextXL>Live on</TextXL>
          <IconGroup>
            {supportedChains.map((chain: ReactElement, index: number) => {
              return <Fragment key={`chain-${index}`}>{chain}</Fragment>;
            })}
          </IconGroup>
        </CenteredColumnContainer>
        <BlowfishExtensionPinCTA />
      </>
    );
  }
  if (currentStep === OnboardingStep.Feedback) {
    content = (
      <CenteredColumnContainer gap="lg">
        <TextXL>Let us know anytime in the app</TextXL>
        <ImageWithShadow
          src="/onboarding/feedback.webp"
          width="280"
          height="420"
          alt="feedback extension"
        />
      </CenteredColumnContainer>
    );
  }
  if (currentStep === OnboardingStep.Ready) {
    content = (
      <CenteredColumnContainer gap="lg">
        <TextXL>
          Please reload any open dApps & Blowfish will start working immediately
        </TextXL>
        <VideoOuterContainer>
          <Video
            src="https://framerusercontent.com/modules/assets/ABKGG2mazmK87jGsN6CbRkaoYP0~tV7jxL_gYFMk8GNcDbSBgx0YO-bKKnfT3gFDsePqGgs.mp4"
            loop
            autoPlay
            muted
            playsInline
          ></Video>
        </VideoOuterContainer>
      </CenteredColumnContainer>
    );
  }

  return (
    <OnboardingDetailsContainer
      key={currentStep}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </OnboardingDetailsContainer>
  );
};

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(OnboardingStep.ConnectWallet);
  const router = useRouter();

  const back = () => {
    switch (currentStep) {
      case OnboardingStep.SurfDapps:
        setCurrentStep(OnboardingStep.ConnectWallet);
        break;
      case OnboardingStep.Protection:
        setCurrentStep(OnboardingStep.SurfDapps);
        break;
      case OnboardingStep.MultiChain:
        setCurrentStep(OnboardingStep.Protection);
        break;
      case OnboardingStep.Feedback:
        setCurrentStep(OnboardingStep.MultiChain);
        break;
      case OnboardingStep.Ready:
        setCurrentStep(OnboardingStep.Feedback);
        break;
      default:
        break;
    }
  };

  const next = () => {
    switch (currentStep) {
      case OnboardingStep.ConnectWallet:
        setCurrentStep(OnboardingStep.SurfDapps);
        break;
      case OnboardingStep.SurfDapps:
        setCurrentStep(OnboardingStep.Protection);
        break;
      case OnboardingStep.Protection:
        setCurrentStep(OnboardingStep.MultiChain);
        break;
      case OnboardingStep.MultiChain:
        setCurrentStep(OnboardingStep.Feedback);
        break;
      case OnboardingStep.Feedback:
        setCurrentStep(OnboardingStep.Ready);
        break;
      case OnboardingStep.Ready:
        router.replace("https://blowfish.xyz/");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        {/*NOTE: background color style needed to match the blowfish wallet video on step 6*/}
        <style>{`
          body {
            background-color: #f2f4f1;
          }
        `}</style>
      </Head>
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
          <OnboardingStepsWrapper>
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
          </OnboardingStepsWrapper>
        </OnboardingContainer>
      </FullHeightCenterContainer>
    </>
  );
};

export default OnboardingWizard;
