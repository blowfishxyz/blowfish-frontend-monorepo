import { EvmSimulatorConfig } from "@blowfishxyz/api-client/v20230605";
import { useRouter } from "next/router";
import { useClient } from "wagmi";
import { UrlParsedRequest } from "./useURLRequestParams";

export function useSimulateByTxnHash() {
  const router = useRouter();
  const client = useClient();

  return async (txnHash: string, domain: string) => {
    const data = await client.getProvider().getTransaction(txnHash);
    if (!data.blockNumber) {
      return;
    }
    const dataToSend: UrlParsedRequest = {
      metadata: { origin: domain },
      userAccount: data.from,
      txObjects: [
        {
          from: data.from,
          to: data.to,
          data: data.data,
        },
      ],
    };
    const simulatorConfig: EvmSimulatorConfig = {
      blockNumber: (data.blockNumber - 1).toString(),
    };
    router.push(
      `/simulate?request=${encodeURIComponent(
        JSON.stringify(dataToSend)
      )}&chainId=${data.chainId}&simulatorConfig=${encodeURIComponent(
        JSON.stringify(simulatorConfig)
      )}`
    );
  };
}
