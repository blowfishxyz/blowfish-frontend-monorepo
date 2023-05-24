import { ChainFamily, ChainNetwork } from "@blowfish/api-client";
import { ChainInfo } from "@blowfish/utils/chains";
import { chainIdToSupportedChainMapping } from "@blowfish/utils/chains";
import {
  DappRequest,
  Message,
  parseRequestFromMessage,
} from "@blowfish/utils/types";
import useSWR from "swr";

import { useQueryParams } from "~hooks/useParsedRequestScanUrl";
import { getScanRequestFromMessageChannel } from "~utils/messages";
import { MessageError, checkVersionAndTransformMessage } from "~utils/utils";

type HexString = `0x${string}`;

type ChainMetadata =
  | {
      chainId: number;
      chainInfo: ChainInfo | undefined;
    }
  | undefined;
export function useChainFromUrl(): ChainMetadata {
  const params = useQueryParams<{ chainId?: string }>();
  const chainId = params.chainId ? parseInt(params.chainId) : undefined;
  if (!chainId) {
    return undefined;
  }
  const chain = chainIdToSupportedChainMapping[chainId];
  if (!chain) {
    return {
      chainId,
      chainInfo: undefined,
    };
  }
  return { chainId, chainInfo: chain };
}

type ScanParams =
  | {
      message: Message<DappRequest["type"], DappRequest>;
      request: DappRequest;
      userAccount: HexString;
      chain: ChainMetadata;
      isImpersonating: boolean;
    }
  | { error: MessageError | undefined }
  | undefined;

async function fetcher([messageId]: [string]): Promise<
  | {
      error: MessageError;
    }
  | {
      message: Message<DappRequest["type"], DappRequest>;
    }
> {
  if (!messageId) {
    return Promise.resolve({ error: MessageError.PARAMS_NOT_OK });
  }
  const message = await getScanRequestFromMessageChannel(messageId).then(
    checkVersionAndTransformMessage
  );
  return { message };
}

export function useScanParams(): ScanParams {
  const chain = useChainFromUrl();
  const { id } = useQueryParams<{ id?: string }>();
  const { data, error: fetchError } = useSWR([id, "request-message"], fetcher);
  if (fetchError) {
    return { error: MessageError.PARAMS_NOT_OK };
  }
  if (!data) {
    return undefined; // loading
  }
  if ("error" in data) {
    return { error: data.error };
  }
  const { message } = data;
  const dappRequest = parseRequestFromMessage(message);
  if (!dappRequest || !message.origin) {
    return { error: MessageError.PARAMS_NOT_OK };
  }
  const { isImpersonatingWallet, userAccount } = dappRequest;

  return {
    message,
    request: dappRequest,
    userAccount: userAccount as HexString,
    chain,
    isImpersonating: !!isImpersonatingWallet,
  };
}
