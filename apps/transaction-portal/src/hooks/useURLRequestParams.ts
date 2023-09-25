import { MessageError } from "~utils/utils";
import { useQueryParams } from "./useQueryParams";
import { ChainMetadata, useChainMetadata } from "./useChainMetadata";
import {
  EvmSignMessage,
  ScanMessageEvmRequest,
  ScanTransactionsEvmRequest,
} from "@blowfishxyz/api-client/.";

export function useURLRequestParams() {
  const chain = useChainMetadata();
  const { request: requestParam } = useQueryParams<{
    request?: string;
  }>();

  let parsedRequest;
  if (requestParam) {
    parsedRequest = JSON.parse(decodeURIComponent(requestParam));
  }

  if (!parsedRequest) {
    return {
      error: MessageError.PARAMS_NOT_OK,
    };
  }

  const data:
    | ScanTransactionsEvmRequest
    | ScanMessageEvmRequest
    | EvmSignMessage = { ...parsedRequest, chain };

  type ExtendedData = (
    | ScanTransactionsEvmRequest
    | ScanMessageEvmRequest
    | EvmSignMessage
  ) & { chain: ChainMetadata };

  const extendedData = data as ExtendedData;

  if ("txObjects" in data) {
    const transaction = data.txObjects[0];

    return {
      message: {
        data: {
          type: "TRANSACTION",
          payload: {
            data: transaction.data,
            from: transaction.from,
            to: transaction.to,
          },
          userAccount: data.userAccount,
        },
        origin: data.metadata.origin,
        type: "TRANSACTION",
      },
      userAccount: data.userAccount as `0x${string}`,
      request: {
        type: "TRANSACTION",
        payload: {
          data: transaction.data,
          from: transaction.from,
          to: transaction.to,
        },
        userAccount: data.userAccount,
      },
      chain: extendedData.chain,
      isImpersonating: false,
    };
  }

  if ("message" in data) {
    if (data.message && data.message.kind === "SIGN_TYPED_DATA") {
      return {
        message: {
          data: {
            type: "SIGN_TYPED_DATA",
            payload: data.message.data,
            userAccount: data.userAccount,
          },
          origin: data.metadata.origin,
        },
        userAccount: data.userAccount as `0x${string}`,
        request: {
          type: "SIGN_TYPED_DATA",
          payload: data.message.data,
          userAccount: data.userAccount,
        },
        chain: extendedData.chain,
        isImpersonating: false,
      };
    }

    if (data.message && data.message.kind === "SIGN_MESSAGE") {
      return {
        message: {
          data: {
            type: "SIGN_MESSAGE",
            payload: {
              message: data.message.rawMessage,
            },
            userAccount: data.userAccount,
          },
          origin: data.metadata.origin,
        },
        userAccount: data.userAccount as `0x${string}`,
        request: {
          type: "SIGN_MESSAGE",
          payload: {
            message: data.message.rawMessage,
          },
          userAccount: data.userAccount,
        },
        chain: extendedData.chain,
        isImpersonating: false,
      };
    }
  }

  return data;
}
