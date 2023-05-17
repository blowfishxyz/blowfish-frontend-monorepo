import { Request, Response } from "express";
import fetch from "node-fetch";
import qs from "qs";

const { BLOWFISH_API_KEY, BLOWFISH_API_BASE_URL } = process.env;

export const blowfishProxyHandler = async (req: Request, res: Response) => {
  if (!BLOWFISH_API_KEY) {
    res.status(500).json({ error: "Missing BLOWFISH_API_KEY" });
    return;
  }
  if (!BLOWFISH_API_BASE_URL) {
    res.status(500).json({ error: "Missing BLOWFISH_API_BASE_URL" });
    return;
  }

  const { body, query, params, headers } = req;
  const requestedPath = params[0];

  const queryString = qs.stringify(query);
  const fullQueryString = queryString ? `?${queryString}` : "";
  const url = `${BLOWFISH_API_BASE_URL}/${requestedPath}${fullQueryString}`;
  const apiVersion = (headers["X-Api-Version"] || "2023-03-08") as string;

  req.log.info({ url }, "Proxying request to Blowfish API");

  try {
    const proxyResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": BLOWFISH_API_KEY,
        "X-Api-Version": apiVersion,
      },
      body: JSON.stringify(body),
    });

    const responseBody = await proxyResponse.json();
    res.status(proxyResponse.status).json(responseBody);
  } catch (err) {
    req.log.error({ err }, "Error proxying request to Blowfish API");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
