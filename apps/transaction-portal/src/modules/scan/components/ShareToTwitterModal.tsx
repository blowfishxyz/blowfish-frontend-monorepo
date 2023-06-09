import React from "react";
import { styled } from "styled-components";
import { Row, Column, Text } from "@blowfish/ui/core";
import Image from "next/image";
import { Modal } from "~components/common/Modal";
import { ArrowDownIcon } from "@blowfish/ui/icons";

const StyledArrowDownIcon = styled(ArrowDownIcon)`
  margin-left: 4px;
  width: 15px;
  transform: rotate(-90deg);
`;

const SharetoTwitterWrapper = styled(Row).attrs({
  marginBottom: 10,
  paddingBlock: 20,
  paddingLeft: 20,
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

interface ShareToTwitterModalProps {
  domain: string | undefined;
  rejectTxn: () => void;
}

const ShareToTwitterModal = ({
  domain,
  rejectTxn,
}: ShareToTwitterModalProps) => {
  const shareMessage = `I avoided having my funds stolen by a malicious website (${domain}) and reported it to Blowfish.`;

  const handleShareToTwitter = () => {
    const hashtags = ["Blowfish", "Security"];

    window.open(
      `https://twitter.com/intent/tweet?&text=${encodeURIComponent(
        shareMessage
      )}&hashtags=${encodeURIComponent(hashtags.join(","))}`,
      "Share to Twitter",
      "width=600,height=300"
    );
  };

  return (
    <Modal
      title="You are saved!"
      description="Tell your friends that you have avoided danger with Blowfish."
      action={{
        cb: handleShareToTwitter,
        title: "Share to twitter",
        closeOnComplete: true,
      }}
      options={{ onClose: rejectTxn }}
      content={
        <SharetoTwitterWrapper>
          <Column gap="sm">
            <Text size="lg" weight="semi-bold">
              Danger avoided!
            </Text>
            <Text size="sm" design="secondary">
              {shareMessage}
            </Text>
            <Row alignItems="center">
              <Text size="sm">Download Blowfish today</Text>
              <StyledArrowDownIcon />
            </Row>
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
