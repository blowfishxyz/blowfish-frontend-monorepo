import React, { useMemo } from "react";
import { styled } from "styled-components";
import { Row, Text, Column, Button } from "@blowfish/ui/core";
import {
  useBlockExplorerUrl,
  useChainMetadata,
} from "~modules/common/hooks/useChainMetadata";
import { capitalize } from "~utils/utils";
import { VerifiedCheckIcon } from "@blowfish/ui/icons";

const SuccessIcon = styled(VerifiedCheckIcon)`
  width: 28px;
  flex-shrink: 0;
`;

export const SuccessView: React.FC<{
  className?: string;
  txHash: string;
  onReport: () => void;
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
    if (!chainFamily) return "Explorer";
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
    }
  }, [chain?.chainInfo?.chainFamily]);

  return (
    <Row gap="xl" justifyContent="space-between" flex={1} className={className}>
      <Column maxWidth={300}>
        <Row gap="sm" alignItems="center" marginBottom={4}>
          <SuccessIcon />
          <Text size="xl" weight="semi-bold">
            Confirmed
          </Text>
        </Row>
        <Text size="md" color="base75">
          Your transaction has been successfully mined{chainText}.
        </Text>
      </Column>
      <Column gap="md" flex={1} minWidth={200}>
        <Row gap="md">
          <Button design="primary" stretch onClick={handleEtherscanClick}>
            {explorerText}
          </Button>
        </Row>
        <Row gap="md">
          <Button
            size="sm"
            stretch
            design="secondary"
            onClick={() => {
              window.close();
            }}
          >
            Close
          </Button>
          <Button size="sm" design="secondary" stretch onClick={onReport}>
            Report
          </Button>
        </Row>
      </Column>
    </Row>
  );
};
