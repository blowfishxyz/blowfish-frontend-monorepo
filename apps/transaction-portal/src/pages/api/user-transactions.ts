import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "~utils/logger";

const { ETHERSCAN_API_KEY } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = req.query.address as string;
  if (!address) {
    const error = "Missing address in request query";
    logger.debug(error);
    res.status(400).json({ error });
    return;
  }

  return fetchTransactions(address)
    .then((x) => {
      res.status(200).json(x);
    })
    .catch((e) => {
      res.status(404).json({ error: (e as any).message });
    });
}

async function fetchTransactions(address: string): Promise<Transaction[]> {
  return fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=9069000&endblock=99999999&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`
  ).then(async (x) => {
    if (x.ok) {
      const res = await x.json();
      if (Array.isArray(res.result)) {
        return res.result;
      }

      throw new Error(res.result);
    }
    throw new Error(await x.text());
  });
}

export type Transaction = {
  from: string;
  to: string;
  timeStamp: string;
  hash: string;
  value: string;
  methodId: string;
  functionName: string;
  contractAddress: string;
};
