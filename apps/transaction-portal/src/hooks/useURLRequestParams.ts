import { MessageError } from "~utils/utils";
import { useQueryParams } from "./useQueryParams";
import { useChainMetadata } from "./useChainMetadata";
import { ScanParams } from "./useScanParams";
import { DappRequest, Message, RequestType } from "@blowfish/utils/types";
import { EvmSimulatorConfig } from "@blowfishxyz/api-client";

export type UrlParsedRequest = {
  metadata: {
    origin: string;
  };
  userAccount: string;
} & (
  | {
      txObjects: [
        {
          from: string;
          to: string | undefined;
          data: string;
          value: string;
        }
      ];
      simulatorConfig: EvmSimulatorConfig;
    }
  | {
      message?: {
        kind: RequestType.SignTypedData;
        data: unknown;
      };
    }
  | {
      message?: {
        kind: RequestType.SignMessage;
        rawMessage: string;
      };
    }
);

export function useURLRequestParams(): ScanParams {
  const chain = useChainMetadata();
  const { request: requestParam } = useQueryParams<{
    request?: string;
  }>();

  let parsedRequest: UrlParsedRequest | undefined;

  try {
    if (requestParam) {
      parsedRequest = JSON.parse(
        decodeURIComponent(requestParam)
      ) as UrlParsedRequest;
    }
  } catch {
    return { error: MessageError.PARAMS_NOT_OK, id: undefined };
  }

  if (!parsedRequest) {
    return {
      error: MessageError.PARAMS_NOT_OK,
      id: undefined,
    };
  }

  if ("txObjects" in parsedRequest) {
    const transaction = parsedRequest.txObjects[0];

    return {
      message: {
        data: {
          type: "TRANSACTION",
          payload: {
            data: transaction.data,
            from: transaction.from,
            to: transaction.to,
            value: transaction.value,
          },
          userAccount: parsedRequest.userAccount,
        },
        origin: parsedRequest.metadata.origin,
        type: "TRANSACTION",
      } as Message<DappRequest["type"], DappRequest>,
      userAccount: parsedRequest.userAccount as `0x${string}`,
      request: {
        type: "TRANSACTION",
        payload: {
          data: transaction.data,
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
        },
        simulatorConfig: parsedRequest.simulatorConfig,
        userAccount: parsedRequest.userAccount,
      } as DappRequest,
      chain: chain,
      isImpersonating: false,
    };
  }

  if ("message" in parsedRequest) {
    if (
      parsedRequest.message &&
      parsedRequest.message.kind === "SIGN_TYPED_DATA"
    ) {
      return {
        message: {
          data: {
            type: "SIGN_TYPED_DATA",
            payload: parsedRequest.message.data,
            userAccount: parsedRequest.userAccount,
          },
          origin: parsedRequest.metadata.origin,
        } as Message<DappRequest["type"], DappRequest>,
        userAccount: parsedRequest.userAccount as `0x${string}`,
        request: {
          type: "SIGN_TYPED_DATA",
          payload: parsedRequest.message.data,
          userAccount: parsedRequest.userAccount,
        } as DappRequest,
        chain: chain,
        isImpersonating: false,
      };
    }

    if (
      parsedRequest.message &&
      parsedRequest.message.kind === "SIGN_MESSAGE"
    ) {
      return {
        message: {
          data: {
            type: "SIGN_MESSAGE",
            payload: {
              message: parsedRequest.message.rawMessage,
            },
            userAccount: parsedRequest.userAccount,
          },
          origin: parsedRequest.metadata.origin,
        } as Message<DappRequest["type"], DappRequest>,
        userAccount: parsedRequest.userAccount as `0x${string}`,
        request: {
          type: "SIGN_MESSAGE",
          payload: {
            message: parsedRequest.message.rawMessage,
          },
          userAccount: parsedRequest.userAccount,
        } as DappRequest,
        chain: chain,
        isImpersonating: false,
      };
    }
  }
}
