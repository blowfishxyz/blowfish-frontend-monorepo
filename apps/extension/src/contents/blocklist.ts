import { withRetry } from "@blowfish/utils/helpers";
import { logger } from "@blowfish/utils/logger";
import type { PlasmoContentScript } from "plasmo";
import Browser from "webextension-polyfill";

import { Action, scanDomain } from "~utils/blocklist";
import { createBlockDomainRequestMessage } from "~utils/messages";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"],
  all_frames: true,
  run_at: "document_start",
};

withRetry(() => scanDomain(window.location.href), 3).then((action) => {
  logger.debug("Domain scanned", window.location.href, action);
  if (action === Action.BLOCK) {
    Browser.runtime.sendMessage(
      createBlockDomainRequestMessage({
        host: window.location.hostname,
        href: encodeURI(window.location.href),
      })
    );
  }
});

export default {};
