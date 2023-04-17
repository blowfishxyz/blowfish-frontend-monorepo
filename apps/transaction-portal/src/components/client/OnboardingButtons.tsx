import styled from "styled-components";
import { OnboardingStep } from "~components/OnboardingWizard";
import { breakpoint } from "~utils/breakpoints";
import SimpleConnectButton from "~components/SimpleConnectButton";
import { useAccount } from "wagmi";
import { PrimaryButton, SecondaryButton } from "@blowfish/ui/core";

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 20px;

  ${PrimaryButton} {
    min-width: 170px;
    max-width: 265px;
  }

  @media only screen and ${breakpoint.device.lg} {
    ${PrimaryButton} {
      max-width: unset;
    }
  }
`;

interface OnboardingButtonsProps {
  currentStep: OnboardingStep;
  back: () => void;
  next: () => void;
  backToFirstStep: () => void;
}

const OnboardingButtons = ({
  currentStep,
  back,
  next,
  backToFirstStep,
}: OnboardingButtonsProps) => {
  const { isConnected } = useAccount({
    onConnect({ isReconnected }) {
      if (!isReconnected) {
        // change the step only if the user does not reconnect via autoConnect,e.g connects using the modal
        setTimeout(() => {
          next();
        }, 600);
      }
    },
    onDisconnect() {
      backToFirstStep();
    },
  });

  return (
    <ButtonRow>
      {currentStep !== OnboardingStep.ConnectWallet && (
        <SecondaryButton onClick={back}>Back</SecondaryButton>
      )}
      {currentStep === OnboardingStep.ConnectWallet && !isConnected ? (
        <SimpleConnectButton />
      ) : (
        <PrimaryButton onClick={next}>
          {currentStep === OnboardingStep.Ready ? <>Done!</> : <>Next</>}
        </PrimaryButton>
      )}
    </ButtonRow>
  );
};
export default OnboardingButtons;
