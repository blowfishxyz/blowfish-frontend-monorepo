import { EvmSimulatorConfig } from "@blowfishxyz/api-client/v20230605";
import { useRouter } from "next/router";
import { useProvider } from "wagmi";
import { toUrlParam } from "~utils/url";
import type { UrlParsedRequest } from "~/hooks/useURLRequestParams";

export function useSimulateByTxnHash() {
  const router = useRouter();
  const provider = useProvider();

  return async (txnHash: string, domain: string) => {
    const data = await provider.getTransaction(txnHash);
    if (!data.blockNumber) {
      throw new Error("Block number missing");
    }

    const simulatorConfig: EvmSimulatorConfig = {
      blockNumber: (data.blockNumber - 1).toString(),
    };

    const dataToSend: UrlParsedRequest = {
      metadata: { origin: domain },
      userAccount: data.from,
      txObjects: [
        {
          from: data.from,
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
