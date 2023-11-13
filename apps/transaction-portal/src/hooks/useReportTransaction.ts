import { ReportRequestEventEnum } from "@blowfishxyz/api-client";
import { useClient } from "~hooks/useClient";

export const useReportTransaction = () => {
  const client = useClient();

  return async (requestId: string) => {
    client.reportTransaction(
      requestId,
      ReportRequestEventEnum.ReportedMalicious
    );
  };
};
