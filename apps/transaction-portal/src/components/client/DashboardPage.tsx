import { Column, Text } from "@blowfish/ui/core";
import { BlowfishIconStroke } from "@blowfish/ui/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { styled } from "styled-components";
import { useAccount } from "wagmi";
import { Layout } from "~components/layout/Layout";

function DashboardPage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/start");
    }
  }, [isConnected]);
  return (
    <Layout>
      <Wrapper>
        <Heading size="lg" paddingBlock={18} paddingInline={32}>
          Recent transactions
        </Heading>
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
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled(Column)`
  overflow: hidden;
  height: 100%;
  border-radius: 12px;
  border: 1px solid ${(p) => p.theme.colors.border};
`;

const Heading = styled(Text)`
  border-bottom: 1px solid ${(p) => p.theme.colors.border};
`;

const Icon = styled(BlowfishIconStroke)`
  width: 105px;
  height: 105px;

  path {
    stroke: ${(p) => p.theme.colors.base30};
  }
`;

export default DashboardPage;
