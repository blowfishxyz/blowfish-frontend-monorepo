import { Button, Column, Row, Text } from "@blowfish/ui/core";
import { BlowfishIconStroke } from "@blowfish/ui/icons";
import { chainToBlockExplorerUrl } from "@blowfish/utils/chains";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { styled } from "styled-components";
import useSWR from "swr";
import { useAccount } from "wagmi";
import { Layout } from "~components/layout/Layout";

async function fetchTransactions<T>(
  address: string,
  actionType: string
): Promise<T> {
  return fetch(
    `https://api.etherscan.io/api?module=account&action=${actionType}&address=${address}&startblock=9069000&endblock=99999999&page=1&offset=10&sort=desc&apikey=IKQSBP9H6H1YXRINZB33RVB3V93QYJUR5Z`
  )
    .then(async (x) => {
      if (x.ok) {
        return x.json();
      }
      throw new Error(await x.text());
    })
    .then((x) => x.result);
}

async function fetchAddressTransactions(
  address: string
): Promise<Transaction[]> {
  const [currencyTxs, nftTxs] = await Promise.all([
    fetchTransactions<CurrencyTransaction[]>(address, "tokentx"),
    fetchTransactions<NFTTransaction[]>(address, "tokennfttx"),
  ]);
  return [
    ...currencyTxs.map((x) => ({ ...x, type: "currency" as const })),
    ...nftTxs.map((x) => ({ ...x, type: "nft" as const })),
  ].sort((a, b) => {
    console.log(parseInt(b.timeStamp), parseInt(a.timeStamp));
    return parseInt(b.timeStamp) - parseInt(a.timeStamp);
  });
}

function DashboardPage() {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/start");
      return;
    }
  }, [isConnected]);

  const { data } = useSWR(address, (addr) => fetchAddressTransactions(addr));
  const transactions = data || [];

  return (
    <Layout>
      <Wrapper>
        <Heading size="lg" paddingBlock={18} paddingInline={32}>
          Recent transactions
        </Heading>
        {transactions.length > 0 ? (
          <>
            {transactions.map((tx) => (
              <TransactionView tx={tx} key={tx.hash} />
            ))}
          </>
        ) : (
          <Column alignItems="center" justifyContent="center" flex={1}>
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
        )}
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled(Column)`
  overflow: hidden;
  height: 100%;
  border-radius: 12px;
  border: 1px solid ${(p) => p.theme.colors.border};

  & > *:not(:last-child) {
    border-bottom: 1px solid ${(p) => p.theme.colors.border};
  }
`;

const Heading = styled(Text)`
  /* border-bottom: 1px solid ${(p) => p.theme.colors.border}; */
`;

const Icon = styled(BlowfishIconStroke)`
  width: 105px;
  height: 105px;

  path {
    stroke: ${(p) => p.theme.colors.base30};
  }
`;

type TransactionBase = {
  from: string;
  to: string;
  timeStamp: string;
  hash: string;
  value: string;
  methodId: string;
  contractAddress: string;
};

type CurrencyTransaction = TransactionBase & {
  type: "currency";
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
};

type NFTTransaction = TransactionBase & {
  type: "nft";
  tokenName: string;
  tokenSymbol: string;
  tokenID: string;
};

type Transaction = CurrencyTransaction | NFTTransaction;

const TransactionView: React.FC<{ tx: Transaction }> = ({ tx }) => {
  const { from, to, timeStamp, hash, value, type } = tx;
  return (
    <Row paddingInline={30} flex={1}>
      <Column flex={1}>
        <Text truncate>
          {type}: {from} – {to}
        </Text>
        <Text>{timeStamp}</Text>
      </Column>
      <Column alignItems="center">
        <a href={`https://etherscan.io/tx/${hash}`} target="_blank">
          <Button>Details</Button>
        </a>
      </Column>
    </Row>
  );
};

export default DashboardPage;
