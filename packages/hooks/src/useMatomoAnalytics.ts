import { useEffect, useState, useRef } from "react";
import { init, push } from "@socialgouv/matomo-next";

// NOTE: This is a workaround due to an incompatibilty with Nextjs 13
// See https://github.com/SocialGouv/matomo-next/issues/99
export const useMatomoAnalytics = (
  isEnabled: boolean,
  siteId: string,
  pathname: string | undefined
) => {
  const isInitialized = useRef(false);
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    if (!isEnabled || !pathname || isInitialized.current) {
      return;
    }
    init({
      siteId,
      url: "https://blowfishxyz.matomo.cloud",
      onInitialization: () => {
        push(["disableCookies"]);
        push(["trackPageView"]);
        push(["enableLinkTracking"]);
      },
    });

    isInitialized.current = true;
  }, [isEnabled, siteId, pathname]);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!previousPath) {
      return setPreviousPath(pathname);
    }

    push(["setReferrerUrl", `${previousPath}`]);
    push(["setCustomUrl", pathname]);
    push(["deleteCustomVariables", "page"]);
    setPreviousPath(pathname);
    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      push(["setDocumentTitle", document.title]);
      push(["trackPageView"]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
};
