import {
  Identifier,
  Message,
  RequestType,
  UntypedMessageData,
} from "@blowfish/utils/types";
import { WindowPostMessageStream } from "@metamask/post-message-stream";
import type { PlasmoContentScript } from "plasmo";
import Browser from "webextension-polyfill";

import { IS_IMPERSONATION_AVAILABLE } from "~config";
import {
  createRawMessage,
  sendAndAwaitResponseFromPort,
} from "~utils/messages";
import {
  PREFERENCES_BLOWFISH_IMPERSONATION_WALLET,
  getBlowfishImpersonationWallet,
  storage,
} from "~utils/storage";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"],
  all_frames: true,
  run_at: "document_start",
};
// Connect to page
const stream = new WindowPostMessageStream({
  name: Identifier.ContentScript,
  target: Identifier.Inpage,
});

stream.on("data", (message: Message<UntypedMessageData>) => {
  // Connect to background script
  const extensionPort = Browser.runtime.connect({
    name: Identifier.ContentScript,
  });

  // Forward received messages to background.js with origin
  const { origin } = location;
  const messageWithOrigin: Message<UntypedMessageData> = { ...message, origin };

  // Send message to background.js and pipe response back to stream
  sendAndAwaitResponseFromPort(extensionPort, messageWithOrigin).then(
    (response) => {
      stream.write(response);
    }
  );
});

if (IS_IMPERSONATION_AVAILABLE) {
  const init = async () => {
    const impersonatingWallet = await getBlowfishImpersonationWallet();
    if (impersonatingWallet) {
      const { address } = impersonatingWallet;
      const message: Message<UntypedMessageData> = createRawMessage(
        RequestType.BlowfishOptions,
        { address }
      );
      // Send impersonating wallet address to proxy-window-evm
      stream.write(message);
    }
  };
  init();

  // Watch extension storage for changes to the impersonating wallet
  storage.watch({
    [PREFERENCES_BLOWFISH_IMPERSONATION_WALLET]: () => {
      window.location.reload();
    },
  });
}
export default {};
