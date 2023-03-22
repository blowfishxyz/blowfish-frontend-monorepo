import Airtable from "airtable";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CHROME_EXTENSION_STORE_URL } from "../../config";

const { AIRTABLE_API_KEY } = process.env;

const AIRTABLE_BASE_ID = "appm87MGvX3frydFL";
const AIRTABLE_BASE_NAME = "Private Beta";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!CHROME_EXTENSION_STORE_URL) {
    throw new Error("CHROME_EXTENSION_STORE_URL is not defined");
  }

  const code = (req.query.code as string | undefined)?.trim();

  if (!code) {
    console.log("Redirecting without invite code");
    res.redirect(CHROME_EXTENSION_STORE_URL);
    return;
  }

  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  try {
    const records = await base(AIRTABLE_BASE_NAME)
      .select({
        filterByFormula: `IF(Code = "${code}", 1, 0)`,
      })
      .firstPage();

    if (records.length === 0) {
      res
        .status(400)
        .send("Invalid invite code provided. Please check your link");
      return;
    }

    const record = records[0];
    const numClicks = (record.get("NumClicks") ?? 0) as number;
    const maxClicks = (record.get("MaxClicks") ?? 1) as number;
    if (numClicks >= maxClicks) {
      res
        .status(400)
        .send(
          "No more invites available for this code. Please look out for a new code"
        );
      return;
    }

    await base(AIRTABLE_BASE_NAME).update([
      {
        id: records[0].id,
        fields: {
          NumClicks: numClicks + 1,
          Downloaded: true,
        },
      },
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
    return;
  }

  res.redirect(CHROME_EXTENSION_STORE_URL);
}
