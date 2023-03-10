import type { FullConfig } from "@playwright/test";

import {
  getBlowfishExtensionId,
  impersonateAccount,
  launch,
} from "./test-utils";

async function globalSetup(config: FullConfig): Promise<void> {
  const { context, page } = await launch();

  await impersonateAccount(
    page,
    await getBlowfishExtensionId(context),
    "vitalik.eth"
  );

  await context.close();
}

export default globalSetup;
