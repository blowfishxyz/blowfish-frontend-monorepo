import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { Row, Text, Column, Button } from "@blowfishxyz/ui";
import { useBlockExplorerUrl, useChainMetadata } from "~hooks/useChainMetadata";
import { capitalize } from "~utils/utils";
import { VerifiedCheckIcon } from "@blowfish/protect-ui/icons";
import { chainToBlockExplorerTitle } from "@blowfish/utils/chains";
import { ReportBtn } from "~components/txn-views/ReportBtn";

const SuccessIcon = styled(VerifiedCheckIcon)`
  width: 28px;
  flex-shrink: 0;
`;

export const SuccessView: React.FC<{
  className?: string;
  txHash: string;
  onReport: () => Promise<void>;
}> = ({ className, txHash, onReport }) => {
  const chain = useChainMetadata();
  const url = useBlockExplorerUrl(txHash);
  const [seconds, setSeconds] = useState(3);

  const handleEtherscanClick = () => {
    window.open(url, "_blank", "noopener noreferrer");
  };

  const chainText = chain?.chainInfo?.chainFamily
    ? ` on the ${capitalize(chain.chainInfo.chainFamily)} network`
    : null;

  const explorerText: string = useMemo(() => {
    const chainFamily = chain?.chainInfo?.chainFamily;
    if (!chainFamily) return "Explorer";
    return chainToBlockExplorerTitle(chainFamily) || "Explorer";
  }, [chain?.chainInfo?.chainFamily]);

  const closingText = useMemo(() => {
    if (seconds <= 0) {
      return "now";
    }
    if (seconds === 1) {
      return "in 1 second";
    }

    return `in ${seconds} seconds`;
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      if (url) {
        window.location.replace(url);
      } else {
        window.close();
      }
    }
  }, [seconds]);

  return (
    <Wrapper
      gap="xl"
      justifyContent="space-between"
      flex={1}
      className={className}
    >
      <Column maxWidth={300}>
        <Row gap="sm" alignItems="center" marginBottom={4}>
          <SuccessIcon />
          <Text size="xl" weight="semi-bold">
            Confirmed
          </Text>
        </Row>
        <Text size="md" color="base75">
          Your transaction has been successfully mined{chainText}.
          <br />
          <br />
          The window will close {closingText}.
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
          <ReportBtn variant="small" onReport={onReport} />
        </Row>
      </Column>
    </Wrapper>
  );
};

const Wrapper = styled(Row)`
  @media (max-width: 574px) {
    flex-direction: column;
  }
`;
