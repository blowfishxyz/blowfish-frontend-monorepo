import styled from "styled-components";
import { OnboardingStep } from "~components/OnboardingWizard";
import { breakpoint } from "~utils/breakpoints";
import SimpleConnectButton from "~components/SimpleConnectButton";
import { useAccount } from "wagmi";
import { PrimaryButton, SecondaryButton } from "@blowfish/ui/core";
import { AnimatePresence, motion } from "framer-motion";

const ButtonRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  ${PrimaryButton} {
    transition: width 0.2s ease-in;
    min-width: 170px;
    max-width: 265px;
  }

  ${SecondaryButton} {
    width: 120px;
  }

  @media only screen and (${breakpoint.device.lg}) {
    display: grid;
    grid-template-columns: 1fr 120px;
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
      {currentStep === OnboardingStep.ConnectWallet && !isConnected ? (
        <SimpleConnectButton />
      ) : (
        <PrimaryButton onClick={next}>
          {currentStep === OnboardingStep.Ready ? <>Done!</> : <>Next</>}
        </PrimaryButton>
      )}
      <AnimatePresence>
        {currentStep !== OnboardingStep.ConnectWallet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SecondaryButton onClick={back}>Back</SecondaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </ButtonRow>
  );
};
export default OnboardingButtons;
