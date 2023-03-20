import styled, { css } from "styled-components";
import { Column } from "~components/common/Column";
import Row from "~components/common/Row";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "~components/Buttons";
import { Text } from "~components/Typography";
import { useState } from "react";
import { useRouter } from "next/router";
import { breakpoint } from "~utils/breakpoints";

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
  height: calc(100vh - 84px);
  justify-content: center;
`;

const OnboardingContainer = styled(Column)`
  gap: 80px;
  max-width: 1024px;
  padding: 32px;

  @media only screen and ${breakpoint.device.lg} {
    flex-direction: row;
  }
`;

const ImageContainer = styled(Column)`
  align-items: center;
`;

const StepDescriptionContainer = styled(Column)``;

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

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;

  ${PrimaryButton} {
    min-width: 140px;
    max-width: 265px;
  }

  @media only screen and ${breakpoint.device.lg} {
    ${PrimaryButton} {
      max-width: unset;
    }
  }
`;

enum OnboardingStep {
  InvokeTransaction,
  CheckBlowfish,
  ConfirmTransaction,
}

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(
    OnboardingStep.InvokeTransaction
  );
  const router = useRouter();

  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  const next = () => {
    if (currentStep !== OnboardingStep.ConfirmTransaction) {
      setCurrentStep(currentStep + 1);
      return;
    }
    // TODO: redirect or make user connect wallet
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
          <ImageContainer>
            {/*TODO: change image on each step*/}
            <Image
              src="/wallet-hero.webp"
              width={291}
              height={291}
              alt="blowfish wallet hero"
            />
          </ImageContainer>
          <StepDescriptionContainer>
            <SubHeading>Get started</SubHeading>
            <Heading>Protect your assets</Heading>
            <StyledOl>
              <TextStep
                as="li"
                active={currentStep === OnboardingStep.InvokeTransaction}
              >
                Invoke a transaction on web3
              </TextStep>
              <TextStep
                as="li"
                active={currentStep === OnboardingStep.CheckBlowfish}
              >
                Check Blowfish before your wallet
              </TextStep>
              <TextStep
                as="li"
                active={currentStep === OnboardingStep.ConfirmTransaction}
              >
                Confirm transaction with confidence
              </TextStep>
            </StyledOl>
            <ButtonRow>
              {currentStep !== OnboardingStep.InvokeTransaction && (
                <SecondaryButton onClick={back}>Back</SecondaryButton>
              )}
              <PrimaryButton onClick={next}>
                {currentStep === OnboardingStep.ConfirmTransaction ? (
                  <>Done!</>
                ) : (
                  <>Next</>
                )}
              </PrimaryButton>
            </ButtonRow>
          </StepDescriptionContainer>
        </OnboardingContainer>
      </FullHeightCenterContainer>
    </>
  );
};

export default OnboardingPage;
