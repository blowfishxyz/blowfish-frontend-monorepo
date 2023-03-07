import {
  type BrowserContext,
  Page,
  test as base,
  chromium,
} from "@playwright/test";
import path from "path";

import { IS_CI } from "~config";

import prepareMetamask from "./metamask-setup";

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    const pathToBlowfishExtension = path.join(
      __dirname,
      `../build/chrome-mv3-${IS_CI ? "prod" : "dev"}`
    );
    const pathToToMetamask = path.join(
      __dirname,
      "../build/metamask/",
      await prepareMetamask()
    );

    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: [
        ...(IS_CI ? [`--headless=new`] : []),
        `--disable-extensions-except=${pathToToMetamask},${pathToBlowfishExtension}`,
        `--load-extension=${pathToToMetamask},${pathToBlowfishExtension}`,
      ],
    });

    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    await use(extensionId);
  },
});

export const expect = test.expect;

const waitToBeHidden = async (selector: string, page: Page) => {
  let retries = 0;
  // info: waits for 60 seconds
  const locator = page.locator(selector);
  for (const element of await locator.all()) {
    if ((await element.isVisible()) && retries < 300) {
      retries++;
      await page.waitForTimeout(200);
      await waitToBeHidden(selector, page);
    } else if (retries >= 300) {
      retries = 0;
      throw new Error(
        `[waitToBeHidden] Max amount of retries reached while waiting for ${selector} to disappear.`
      );
    }
    retries = 0;
  }
};

export const impersonateAccount = async (
  page: Page,
  extensionId: string,
  account: string
) => {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await page.getByTestId("impersonator-toggle").click();
  await page.getByTestId("impersonator-input").fill(account);
  await page.getByTestId("update-button").click();
};

export const waitUntilStable = async (page: Page) => {
  await page.waitForLoadState("load");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
};

export const waitUntilStableMetamask = async (page: Page) => {
  await waitUntilStable(page);
  await waitToBeHidden(".loading-logo", page);
  await waitToBeHidden(".loading-spinner", page);
};
