import { DappRequest } from "@blowfish/utils/types";
import { useMemo } from "react";

const baseUrl = "https://airtable.com/shr7Gi3ABjsjqzl7P";

export const useReportTransactionUrl = (request: DappRequest) => {
  return useMemo(() => {
    const serializedPayload = encodeURIComponent(
      JSON.stringify(request.payload)
    );
    // airtable has 16000 character limit
    const payload =
      serializedPayload.length > 15000
        ? serializedPayload.slice(0, 15000)
        : serializedPayload;

    return `${baseUrl}?prefill_Payload=${payload}&hide_Payload=true&prefill_Address=${request.userAccount}`;
  }, [request.payload, request.userAccount]);
};
