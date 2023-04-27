import type { PlasmoContentScript } from "plasmo";
import walletConnectSocketWrapperScript from "url:~/injected/WalletConnectSocketWrapper";
import evmProxyScript from "url:~/injected/proxy-window-evm";

import { BLOWFISH_PORTAL_TRUSTED_URLS } from "~constants";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"],
  all_frames: true,
  run_at: "document_start",
};

const addScript = (url: string) => {
  const container = document.head || document.documentElement;
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("async", "false");
  scriptTag.setAttribute("src", url);
  container.appendChild(scriptTag);
  scriptTag.onload = () => scriptTag.remove();
};

// Do not inject the wallet proxy on the Blowfish Protect portal
// here we want to talk directly to the wallet
const { hostname } = window.location;
if (!BLOWFISH_PORTAL_TRUSTED_URLS.some((url) => url.hostname === hostname)) {
  addScript(walletConnectSocketWrapperScript);
  addScript(evmProxyScript);
}

export default {};
