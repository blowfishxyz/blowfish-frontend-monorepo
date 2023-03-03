import { WindowPostMessageStream } from "@metamask/post-message-stream";
import type { PlasmoContentScript } from "plasmo";
import Browser from "webextension-polyfill";

import {
  PREFERENCES_BLOWFISH_IMPERSONATION_WALLET,
  storage,
} from "~utils/storage";

import { Identifier, Message, UntypedMessageData } from "../types";
import { sendAndAwaitResponseFromPort } from "../utils/messages";

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

storage.watch({
  [PREFERENCES_BLOWFISH_IMPERSONATION_WALLET]: (change) => {
    localStorage.setItem(
      PREFERENCES_BLOWFISH_IMPERSONATION_WALLET,
      JSON.parse(change.newValue)
    );
  },
});

export default {};
