import React, { useMemo } from "react";
import { styled } from "styled-components";
import { Row, Text, Column, Button } from "@blowfishxyz/ui";
import { LoadingAnimation } from "~components/LoadingAnimation";
import { useBlockExplorerUrl, useChainMetadata } from "~hooks/useChainMetadata";
import { capitalize } from "~utils/utils";
import { ReportBtn } from "~components/txn-views/ReportBtn";

const LoadingIcon = styled(LoadingAnimation)`
  width: 48px;
  flex-shrink: 0;
`;

export const PendingView: React.FC<{
  className?: string;
  txHash: string;
  onReport: () => Promise<void>;
}> = ({ className, txHash, onReport }) => {
  const chain = useChainMetadata();
  const url = useBlockExplorerUrl(txHash);
  const handleEtherscanClick = () => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  const chainText = chain?.chainInfo?.chainFamily
    ? ` on the ${capitalize(chain.chainInfo.chainFamily)} network`
    : null;

  const explorerText: string = useMemo(() => {
    const chainFamily = chain?.chainInfo?.chainFamily;
    switch (chainFamily) {
      case "ethereum":
      case "optimism":
        return "Etherscan";
      case "polygon":
        return "Polygonscan";
      case "bnb":
        return "Bscscan";
      case "arbitrum":
        return "Arbiscan";
      default:
        return "Explorer";
    }
  }, [chain?.chainInfo?.chainFamily]);

  return (
    <Wrapper
      gap="xl"
      justifyContent="space-between"
      flex={1}
      className={className}
    >
      <Column maxWidth={300}>
        <Row gap="sm" alignItems="center" marginBottom={4}>
          <LoadingIcon />
          <Text size="xl" weight="semi-bold">
            Pending
          </Text>
        </Row>
        <Text size="md" color="base75">
          Your transaction is being mined{chainText}.
        </Text>
      </Column>
      <Column gap="md" flex={1} minWidth={140}>
        <Button design="primary" stretch onClick={handleEtherscanClick}>
          {explorerText}
        </Button>
        <ReportBtn variant="small" onReport={onReport} />
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled(Row)`
  @media (max-width: 574px) {
    flex-direction: column;
  }
`;
