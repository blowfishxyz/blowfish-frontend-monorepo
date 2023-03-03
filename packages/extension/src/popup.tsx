import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "./style.css";

import { ethers } from "ethers";

import { SmallButtonPrimary } from "~components/Buttons";
import { Input } from "~components/Input";
import Toggle from "~components/Toggle";
import { IS_IMPERSONATION_AVAILABLE } from "~config";
import {
  getBlowfishImpersonationWallet,
  setBlowfishImpersonationWallet,
} from "~utils/storage";
import { isENS } from "~utils/utils";

import { LinkWithArrow, UnstyledA } from "./components/Links";
import { PopupContainer } from "./components/PopupContainer";
import { Providers } from "./components/Providers";
import { Text, TextXL } from "./components/Typography";
import { BlowfishIcon } from "./components/icons/BlowfishIcon";
import {
  BLOWFISH_FEEDBACK_URL,
  BLOWFISH_TWITTER_URL,
  BLOWFISH_WEBSITE_URL,
} from "./constants";

const WebsiteIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM13.9 7H12C11.9 5.5 11.6 4.1 11.2 2.9C12.6 3.8 13.6 5.3 13.9 7ZM8 14C7.4 14 6.2 12.1 6 9H10C9.8 12.1 8.6 14 8 14ZM6 7C6.2 3.9 7.3 2 8 2C8.7 2 9.8 3.9 10 7H6ZM4.9 2.9C4.4 4.1 4.1 5.5 4 7H2.1C2.4 5.3 3.4 3.8 4.9 2.9ZM2.1 9H4C4.1 10.5 4.4 11.9 4.8 13.1C3.4 12.2 2.4 10.7 2.1 9ZM11.1 13.1C11.6 11.9 11.8 10.5 11.9 9H13.8C13.6 10.7 12.6 12.2 11.1 13.1Z"
        fill="#212121"
      />
    </svg>
  );
};

const TwitterIcon = () => {
  return (
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2.05C15.4 2.3 14.775 2.5 14.125 2.575C14.8 2.175 15.325 1.525 15.575 0.75C14.95 1.125 14.25 1.4 13.5 1.55C12.875 0.9 12.025 0.5 11.075 0.5C9.25 0.5 7.8 1.975 7.8 3.775C7.8 4.025 7.825 4.275 7.875 4.525C5.15 4.4 2.725 3.075 1.125 1.1C0.85 1.575 0.675 2.15 0.675 2.75C0.675 3.9 1.25 4.9 2.125 5.475C1.575 5.45 1.075 5.3 0.65 5.075C0.65 5.1 0.65 5.1 0.65 5.125C0.65 6.725 1.775 8.05 3.275 8.35C3 8.425 2.7 8.475 2.4 8.475C2.2 8.475 1.975 8.45 1.775 8.425C2.2 9.725 3.4 10.675 4.85 10.7C3.725 11.575 2.3 12.1 0.775 12.1C0.5 12.1 0.25 12.075 0 12.05C1.45 12.95 3.175 13.5 5.025 13.5C11.075 13.5 14.375 8.5 14.375 4.15C14.375 4 14.375 3.875 14.375 3.725C15 3.275 15.55 2.7 16 2.05Z"
        fill="#212121"
      />
    </svg>
  );
};

const ContactIcon = () => {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.83767 7.95296C7.58055 8.09327 7.29232 8.16679 6.99942 8.16679C6.70651 8.16679 6.41829 8.09327 6.16117 7.95296L0 4.5918V9.91646C0 10.3806 0.184374 10.8257 0.512563 11.1539C0.840752 11.4821 1.28587 11.6665 1.75 11.6665H12.25C12.7141 11.6665 13.1592 11.4821 13.4874 11.1539C13.8156 10.8257 14 10.3806 14 9.91646V4.5918L7.83767 7.95296Z"
        fill="#212121"
      />
      <path
        d="M7 7C6.90257 6.99994 6.80671 6.97547 6.72117 6.92883L0.3045 3.42883C0.212398 3.37871 0.135509 3.30469 0.0819238 3.21456C0.0283383 3.12443 3.77347e-05 3.02152 0 2.91667L0 1.75C0 1.28587 0.184374 0.840752 0.512563 0.512563C0.840752 0.184375 1.28587 0 1.75 0H12.25C12.7141 0 13.1592 0.184375 13.4874 0.512563C13.8156 0.840752 14 1.28587 14 1.75V2.91667C14 3.02152 13.9717 3.12443 13.9181 3.21456C13.8645 3.30469 13.7876 3.37871 13.6955 3.42883L7.27883 6.92883C7.19329 6.97547 7.09743 6.99994 7 7Z"
        fill="#212121"
      />
    </svg>
  );
};

const IconRow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 40px 24px 40px;
  display: flex;
  justify-content: space-between;

  opacity: 0.65;

  svg {
    margin-right: 4px;
  }
`;

const StyledPopupContainer = styled(PopupContainer)`
  position: relative;
  width: 392px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px 40px 40px;
`;

const StyledItalicText = styled(Text)`
  font-style: italic;
  text-align: center;
  margin-top: 20px;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  width: 100%;

  & > ol {
    list-style-position: inside;
    padding-left: 0;

    li + li {
      margin-top: 0.5em;
    }
  }
`;

const BottomLink = styled(UnstyledA)`
  display: flex;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const ImpersonatorWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`;

const WalletInformationContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1em;
`;

const Impersonator: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [impersonationWalletAddress, setImpersonationWalletAddress] =
    useState("");
  const isAddressValid =
    ethers.utils.isAddress(impersonationWalletAddress) ||
    isENS(impersonationWalletAddress);

  useEffect(() => {
    (async () => {
      const storedWallet = await getBlowfishImpersonationWallet();
      setImpersonationWalletAddress(storedWallet);
      setIsEnabled(!!storedWallet);
      if (!storedWallet) {
        setBlowfishImpersonationWallet("");
      }
    })();
  }, []);

  return (
    <ImpersonatorWrapper>
      <Row>
        <Text semiBold>Impersonate Account</Text>
        <Toggle
          initialState={isEnabled}
          isActive={isEnabled}
          toggle={() => {
            if (isEnabled) {
              setImpersonationWalletAddress("");
              setBlowfishImpersonationWallet("");
            }
            setIsEnabled(!isEnabled);
          }}
        />
      </Row>
      {isEnabled && (
        <WalletInformationContainer>
          <Input
            error={!isAddressValid}
            type="text"
            value={impersonationWalletAddress || ""}
            onChange={(e) => setImpersonationWalletAddress(e.target.value)}
          />
          <SmallButtonPrimary
            disabled={!isAddressValid}
            onClick={() =>
              setBlowfishImpersonationWallet(impersonationWalletAddress)
            }
          >
            Update
          </SmallButtonPrimary>
        </WalletInformationContainer>
      )}
    </ImpersonatorWrapper>
  );
};

const Popup: React.FC = () => {
  return (
    <StyledPopupContainer>
      <BlowfishIcon />
      <TextXL>Blowfish</TextXL>
      <StyledItalicText>
        We simulate your web3 transactions and detect scams before they happen
      </StyledItalicText>
      <ContentContainer>
        <Text semiBold>To use:</Text>
        <ol>
          <Text as="li">
            Initiate your web3 transaction as you normally would.
          </Text>
          <Text as="li">
            Blowfish’s transaction simulation results and any warnings will pop
            up as a separate screen before you submit your transaction.
          </Text>
          <Text as="li">
            Click “Confirm” to approve your desired transaction within your
            wallet.
          </Text>
        </ol>
      </ContentContainer>
      <ContentContainer>
        <Text semiBold>Feedback</Text>
        <Text as="p">
          If you run into any bugs or have any suggestions, please{" "}
          <LinkWithArrow
            href={BLOWFISH_FEEDBACK_URL}
            style={{ textDecorationLine: "underline" }}
          >
            send them to us
          </LinkWithArrow>
        </Text>
      </ContentContainer>

      <IconRow>
        <BottomLink href={BLOWFISH_WEBSITE_URL} target="_blank" rel="noopener">
          <WebsiteIcon />
          <Text>Website</Text>
        </BottomLink>
        <BottomLink href={BLOWFISH_TWITTER_URL} target="_blank" rel="noopener">
          <TwitterIcon />
          <Text>Twitter</Text>
        </BottomLink>
        <BottomLink href={BLOWFISH_FEEDBACK_URL} target="_blank" rel="noopener">
          <ContactIcon />
          <Text>Feedback</Text>
        </BottomLink>
      </IconRow>
      {IS_IMPERSONATION_AVAILABLE && <Impersonator />}
    </StyledPopupContainer>
  );
};

const Page: React.FC = () => (
  <Providers>
    <Popup />
  </Providers>
);

export default Page;
