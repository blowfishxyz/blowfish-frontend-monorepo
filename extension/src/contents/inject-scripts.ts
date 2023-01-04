import type { PlasmoContentScript } from "plasmo";
import evmProxyScript from "url:~/injected/proxy-window-evm";

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

addScript(evmProxyScript);

export default {};
