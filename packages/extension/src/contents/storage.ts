import type { PlasmoContentScript } from "plasmo";

import { IS_IMPERSONATION_AVAILABLE } from "~constants";
import {
  PREFERENCES_BLOWFISH_IMPERSONATION_WALLET,
  storage,
} from "~utils/storage";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"],
  all_frames: true,
};

if (IS_IMPERSONATION_AVAILABLE) {
  storage.watch({
    [PREFERENCES_BLOWFISH_IMPERSONATION_WALLET]: ({ newValue }) => {
      localStorage.setItem(PREFERENCES_BLOWFISH_IMPERSONATION_WALLET, newValue);
    },
  });
}

export default {};
