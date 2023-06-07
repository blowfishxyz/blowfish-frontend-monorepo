import { Button, Column, Row, Text } from "@blowfish/ui/core";
import { BlowfishIconStroke } from "@blowfish/ui/icons";
import { ArrowRightIcon } from "@blowfish/ui/icons";
import Decimal from "decimal.js";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { css, styled } from "styled-components";
import useSWR from "swr";
import { useAccount } from "wagmi";
import { Layout } from "~components/layout/Layout";
import type { Transaction } from "~pages/api/user-transactions";
import { shortenHex } from "~utils/hex";
import { logger } from "~utils/logger";
import { capitalize } from "~utils/utils";

async function fetchTransactions(
  address: string | undefined
): Promise<Transaction[]> {
  if (!address) return [];
  return fetch(`/api/user-transactions?address=${address}`)
    .then(async (x) => {
      if (x.ok) {
        return x.json();
      }
      throw await x.json();
    })
    .catch((e) => {
      logger.debug("Etherscan error: " + e.error);
      return [];
    });
}

function DashboardPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isConnected) {
      router.replace("/v2/start");
      return;
    }
  }, [isConnected, router]);

  const { data, isLoading } = useSWR(
    `transactions-${address}`,
    () => fetchTransactions(address),
    {
      revalidateOnFocus: false,
    }
  );
  const transactions = data || [];
  const isEmpty = transactions.length === 0;

  return (
    <Layout>
      <Wrapper height={isEmpty ? "100%" : undefined} marginTop={12}>
        <Heading
          size="lg"
          weight="semi-bold"
          paddingBlock={18}
          paddingInline={32}
          minWidth={isEmpty ? undefined : 960}
        >
          Recent transactions
        </Heading>
        {isLoading || !isConnected || !address ? null : isEmpty ? (
          <Column alignItems="center" justifyContent="center" flexGrow={1}>
            <Column maxWidth={290} alignItems="center">
              <Icon />
              <Text size="xl" marginBlock={10}>
                No transactions found
              </Text>
              <Text size="md" design="secondary" textAlign="center">
                Make your first transaction with Blowfish Protect enabled to see
                things here.
              </Text>
            </Column>
          </Column>
        ) : (
          <>
            <Column paddingTop={8} paddingInline={32} minWidth={960}>
              <TableGrid>
                <Text></Text>
                <Text weight="semi-bold">Method</Text>
                <Text weight="semi-bold">From</Text>
                <Text weight="semi-bold">To</Text>
                <Text weight="semi-bold">Value</Text>
                <Text weight="semi-bold">Date</Text>
                <Column width={100} />
              </TableGrid>
            </Column>
            {transactions.map((tx) => (
              <TransactionView tx={tx} key={tx.hash} userAddress={address} />
            ))}
          </>
        )}
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled(Column)`
  overflow: auto;
  max-height: 100%;
  border-radius: 12px;
  border: 1px solid ${(p) => p.theme.colors.border};

  a {
    text-decoration: none;
    color: inherit;
  }

  & > *:not(:nth-child(2), :last-child) {
    border-bottom: 1px solid ${(p) => p.theme.colors.border};
  }
`;

const Heading = styled(Text)``;

const IconWrapper = styled.div<{
  $isIn: boolean;
}>`
  height: 32px;
  width: 32px;
  padding: 6px;
  border-radius: 50%;
  background: ${({ $isIn }) => ($isIn ? "#BEEDD2" : "#FFE0C3")};

  svg {
    ${({ $isIn, theme }) => {
      if ($isIn) {
        return css`
          fill: #00bfa6;
          transform: rotate(135deg);
          transform-origin: center;
        `;
      }
      return css`
        fill: ${theme.colors.warning};
        transform: rotate(-45deg);
        transform-origin: center;
      `;
    }};
  }
`;

const TableGrid = styled.div`
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr 100px 140px;
`;

const Icon = styled(BlowfishIconStroke)`
  width: 105px;
  height: 105px;

  path {
    stroke: ${(p) => p.theme.colors.base30};
  }
`;

const intl = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "short",
});

const TransactionView: React.FC<{ tx: Transaction; userAddress: string }> = ({
  tx,
  userAddress,
}) => {
  const { from, to, timeStamp, hash, value, methodId, functionName } = tx;
  const isIn = userAddress.toLowerCase() === to.toLowerCase();
  return (
    <Row
      paddingInline={30}
      paddingBlock={10}
      maxHeight={80}
      flex={1}
      minWidth={960}
    >
      <TableGrid>
        <IconWrapper $isIn={isIn}>
          <ArrowRightIcon />
        </IconWrapper>
        <Text>{formatFunctionName(functionName, methodId)}</Text>
        <AddressText
          href={`https://etherscan.io/address/${from}`}
          target="_blank"
        >
          {formatAddress(from, userAddress)}
        </AddressText>
        <AddressText
          href={`https://etherscan.io/address/${to}`}
          target="_blank"
        >
          {formatAddress(to, userAddress)}
        </AddressText>
        <Text>{getValue(value, 18)} ETH</Text>
        <Text>{intl.format(parseInt(timeStamp) * 1000)}</Text>
        <Column alignItems="flex-end">
          <a href={`https://etherscan.io/tx/${hash}`} target="_blank">
            <Button design="tertiary">
              Details{" "}
              <ArrowRightIcon style={{ width: "12px", height: "12px" }} />
            </Button>
          </a>
        </Column>
      </TableGrid>
    </Row>
  );
};

const AddressText = styled(Text).attrs({ as: "a" })`
  && {
    text-decoration: underline;
  }
`;

function formatAddress(address: string, userAddress: string) {
  if (address.toLowerCase() === userAddress.toLowerCase()) {
    return "You";
  }
  return shortenHex(address);
}

function formatFunctionName(functionName: string, methodId: string) {
  if (methodId === "0x") {
    return "Transfer";
  }
  const readableName = functionName.split("(")[0];
  if (!readableName) {
    return methodId;
  }
  return capitalize(readableName);
}

function getValue(amount: string, decimals: number) {
  const x = new Decimal(amount);
  if (x.isZero()) {
    return "0";
  }
  return x.dividedBy(new Decimal(10).pow(decimals)).toFixed(4);
}

export default DashboardPage;
