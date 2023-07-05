import React from "react";
import { styled } from "styled-components";
import { Row, Column, Text } from "@blowfishxyz/ui";
import Image from "next/image";
import { Modal } from "~components/common/Modal";
import { ArrowDownIcon } from "@blowfish/protect-ui/icons";
import { shortenHex } from "~utils/hex";
import { useLocalStorage } from "react-use";

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  margin-left: 4px;
  width: 15px;
  transform: rotate(-90deg);
`;

const SharetoTwitterWrapper = styled(Row).attrs({
  marginBottom: 10,
  paddingBlock: 10,
  paddingLeft: 20,
  gap: "lg",
  alignItems: "center",
})`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  border-radius: 10px;
`;

const WalletImage = styled(Image)`
  width: 100%;
  height: auto;
  justify-self: flex-end;
`;

const CheckboxWrapper = styled(Row)`
  cursor: pointer;
`;

interface ShareToTwitterModalProps {
  scammerAddress: string | undefined;
  rejectTxn: () => void;
}

const ShareToTwitterModal: React.FC<ShareToTwitterModalProps> = ({
  scammerAddress,
  rejectTxn,
}) => {
  const [shouldNotShowModal, setShouldNotShowModal] = useLocalStorage(
    "shouldNotShowModal",
    false
  );

  const shareMessage = scammerAddress
    ? `I avoided having my funds stolen by a malicious address (${shortenHex(
        scammerAddress
      )}) and reported it to Blowfish.`
    : "I avoided having my funds stolen and reported it to Blowfish.";

  const handleShareToTwitter = () => {
    const hashtags = ["Blowfish", "Security"];

    window.open(
      `https://twitter.com/intent/tweet?&text=${encodeURIComponent(
        shareMessage
      )}&hashtags=${encodeURIComponent(hashtags.join(","))}`,
      "_blank",
      "noopener noreferrer"
    );

    rejectTxn();
  };

  return (
    <Modal
      title="You are saved!"
      description={
        <Column gap="md">
          <Text>
            Tell your friends that you have avoided danger with Blowfish.
          </Text>
          <CheckboxWrapper
            gap="sm"
            justifyContent="center"
            onClick={() => {
              setShouldNotShowModal(!shouldNotShowModal);
            }}
          >
            <input type="checkbox" checked={shouldNotShowModal} />
            <Text size="sm" design="secondary">
              Don&apos;t show this again
            </Text>
          </CheckboxWrapper>
        </Column>
      }
      action={{
        cb: handleShareToTwitter,
        title: "Share to twitter",
        closeOnComplete: true,
      }}
      onCancel={rejectTxn}
      content={
        <SharetoTwitterWrapper>
          <Column gap="sm">
            <Text size="lg" weight="semi-bold">
              Danger avoided!
            </Text>
            <Text size="sm" design="secondary">
              {shareMessage}
            </Text>
          </Column>
          <WalletImage
            src="/wallet_image.svg"
            alt="extension"
            width="107"
            height="138"
          />
        </SharetoTwitterWrapper>
      }
      cancelText={
        <Row alignItems="center">
          No thanks
          <StyledArrowDownIcon />
        </Row>
      }
    />
  );
};

export default ShareToTwitterModal;
