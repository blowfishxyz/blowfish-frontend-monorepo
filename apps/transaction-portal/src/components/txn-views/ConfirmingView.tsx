import React from "react";
import { styled } from "styled-components";
import { Button, Column, Row, Text } from "@blowfishxyz/ui";
import { ConfirmIcon } from "@blowfish/protect-ui/icons";

const CardConfirmIcon = styled(ConfirmIcon)`
  width: 22px;
`;

export const ConfirmingView: React.FC<{
  className?: string;
  onCancel: () => void;
}> = ({ className, onCancel }) => {
  return (
    <Wrapper
      gap="xl"
      justifyContent="space-between"
      flex={1}
      className={className}
    >
      <Column maxWidth={300}>
        <Row gap="sm" alignItems="center" marginBottom={4}>
          <CardConfirmIcon />
          <Text size="xl" weight="semi-bold">
            Check your wallet
          </Text>
        </Row>
        <Text size="md" color="base75">
          We forwarded the transaction request to your connected wallet.{" "}
          <Text weight="semi-bold" color="base75">
            Always make sure that the request is from{" "}
            <span style={{ textDecoration: "underline" }}>blowfish.xyz</span>.
          </Text>
        </Text>
      </Column>
      <Column gap="md" flex={1} minWidth={120}>
        <Button $design="secondary" stretch loading>
          Try again
        </Button>
        <Button $design="danger" stretch onClick={onCancel}>
          Cancel
        </Button>
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled(Row)`
  @media (max-width: 574px) {
    flex-direction: column;
  }
`;
