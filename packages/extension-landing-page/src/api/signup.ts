import Airtable from "airtable";
import { EMAIL_REGEX } from "../utils/constants";

const AIRTABLE_BASE_ID = "appm87MGvX3frydFL";
const AIRTABLE_BASE_NAME = "Private Beta";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate submitted email
  let email = req.body.email;
  if (!email || !EMAIL_REGEX.test(email)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  try {
    let records = await base(AIRTABLE_BASE_NAME)
      .select({
        filterByFormula: `IF(Email = "${email}", 1, 0)`,
      })
      .firstPage();

    if (records && records.length !== 0) {
      res.status(400).json({ error: "email already exists" });
      return;
    }

    await base(AIRTABLE_BASE_NAME).create([
      {
        fields: {
          Email: email,
        },
      },
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
    return;
  }

  res.status(200).json({ email });
}
