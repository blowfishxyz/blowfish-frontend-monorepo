import Browser from "webextension-polyfill";
import qs from "qs";

import { RequestType } from "../types";
import { sleep } from "../utils/utils";

export interface PopupParams {
  type: RequestType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export const createPopupWithFile = async (
  filename: string,
  params: PopupParams
) => {
  const [window] = await Promise.all([
    Browser.windows.getCurrent(),
    sleep(100), // HACK: Add a slight delay to prevent weird window positioning
  ]);
  const queryString = qs.stringify(params);

  const positions = getPopupPositions(window, 0);

  const popupWindow = await Browser.windows.create({
    url: `${filename}?${queryString}`,
    type: "popup",
    ...positions,
  });

  // HACK: Positioning doesn't work on Firefox, on Chrome the window is already
  // in the right position
  await Browser.windows.update(popupWindow.id!, positions);
};

const getPopupPositions = (
  window: Browser.Windows.Window,
  contentLines: number
) => {
  // TODO(kimpers): actual dimensions
  const width = 640;
  const height = 520 + contentLines * 24;

  const left = window.left! + Math.round((window.width! - width) * 0.5);
  const top = window.top! + Math.round((window.height! - height) * 0.2);

  return { width, height, left, top };
};
