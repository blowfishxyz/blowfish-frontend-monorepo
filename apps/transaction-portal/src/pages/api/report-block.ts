import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";
import { logger } from "~utils/logger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const domain = req.query.domain as string;
  if (!domain) {
    logger.debug("Reporting domain missing in request query");
    res.status(400).json({ error: "Reporting domain missing" });
    return;
  }
  logger.debug("Start reporting: " + domain);
  try {
    await reportIgnoredDomain(domain);
    res.status(200).json({ success: true });
    return;
  } catch (e) {
    logger.debug("Error while reporting: " + e);
    res.status(420).json({ error: (e as any).message });
    return;
  }
}

const { AIRTABLE_API_KEY, NODE_ENV } = process.env;
const AIRTABLE_BASE_ID = "appqOwijGGdyi3DZl";
const AIRTABLE_TABLE_NAME =
  NODE_ENV === "production"
    ? "Block Page Detection Problem"
    : "[Test] Block Page Detection Problem";

async function reportIgnoredDomain(domain: string) {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );
  const countField = "reported_count";
  const nameField = "domain";

  const records = await base(AIRTABLE_TABLE_NAME)
    .select({ filterByFormula: `domain = "${domain}"` })
    .all();

  if (records.length > 0) {
    const record = records[0];
    const currentCount = record.get(countField) as number;
    const newCount = currentCount + 1;

    await base(AIRTABLE_TABLE_NAME).update([
      {
        id: record.id,
        fields: {
          [countField]: newCount,
        },
      },
    ]);
    logger.debug(`count for ${domain} incremented to ${newCount}`);
  } else {
    await base(AIRTABLE_TABLE_NAME).create([
      {
        fields: {
          [nameField]: domain,
          [countField]: 1,
        },
      },
    ]);
    logger.debug(`New record created for ${domain} with count set to 1`);
  }
}
