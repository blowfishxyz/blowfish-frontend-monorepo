import { WindowPostMessageStream } from "@metamask/post-message-stream";
import Browser from "webextension-polyfill";
import { Identifier } from "../utils/constants";
import {
  sendAndAwaitResponseFromPort,
  createMessage,
  Message,
} from "../utils/messages";

// Connect to page
const stream = new WindowPostMessageStream({
  name: Identifier.ContentScript,
  target: Identifier.Inpage,
});

stream.on("data", (message: Message) => {
  // Connect to background script
  const extensionPort = Browser.runtime.connect({
    name: Identifier.ContentScript,
  });

  // Forward received messages to background.js with hostname
  const { type, data } = message;
  const { hostname } = location;
  const messageWithHostname = createMessage(type, data, hostname);

  // Send message to background.js and pipe response back to stream
  sendAndAwaitResponseFromPort(extensionPort, messageWithHostname).then(
    (response) => {
      stream.write(response);
    }
  );
});
