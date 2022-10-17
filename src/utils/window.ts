import Browser from "webextension-polyfill";
import { sleep } from "../utils/utils";

export interface PopupParams extends Record<string, string> {
  id: string;
  hostname: string;
}
export const createPopupWithFile = async (
  filename: string,
  params: PopupParams
) => {
  const [window] = await Promise.all([
    Browser.windows.getCurrent(),
    sleep(100), // HACK: Add a slight delay to prevent weird window positioning
  ]);
  const queryString = new URLSearchParams(params).toString();

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
  const width = 480;
  const height = 320 + contentLines * 24;

  const left = window.left! + Math.round((window.width! - width) * 0.5);
  const top = window.top! + Math.round((window.height! - height) * 0.2);

  return { width, height, left, top };
};
