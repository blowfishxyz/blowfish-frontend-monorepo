import Browser from "webextension-polyfill";

import { createBlocklistFilter } from "~utils/blocklist";

enum BlowfishAlarm {
  REFETCH_BLOCKLIST = "REFETCH_BLOCKLIST",
}

export const setupAlarms = () => {
  Browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === BlowfishAlarm.REFETCH_BLOCKLIST) {
      createBlocklistFilter();
    }
  });

  Browser.alarms.create(BlowfishAlarm.REFETCH_BLOCKLIST, {
    periodInMinutes: 2,
    delayInMinutes: 0,
  });
};
