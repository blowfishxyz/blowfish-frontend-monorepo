import { EvmSimulatorConfig } from "@blowfishxyz/api-client/v20230605";
import { useRouter } from "next/router";
import { useProvider } from "wagmi";
import { toUrlParam } from "~utils/url";
import type { UrlParsedRequest } from "~/hooks/useURLRequestParams";

export function useSimulateByTxnHash({ chainId }: { chainId?: number } = {}) {
  const router = useRouter();
  const provider = useProvider({ chainId });

  return async (txnHash: string, domain: string) => {
    const data = await provider.getTransaction(txnHash);
    if (!data.blockNumber) {
      throw new Error("Block number missing");
    }

    const simulatorConfig: EvmSimulatorConfig = {
      blockNumber: (data.blockNumber - 1).toString(),
    };

    const dataToSend: UrlParsedRequest = {
      metadata: { origin: domain || "https://scamsite.com" },
      userAccount: data.from,
      txObjects: [
        {
          from: data.from,
          // // Note: data.to is not present for base transactions that create a contract
          // // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // to: data.to || (data as any).creates,
          to: data.to,
          data: data.data,
          value: data.value.toString(),
        },
      ],
      simulatorConfig: simulatorConfig,
    };

    router.push(
      `/simulate?request=${toUrlParam(dataToSend)}&chainId=${data.chainId}`
    );
  };
}
