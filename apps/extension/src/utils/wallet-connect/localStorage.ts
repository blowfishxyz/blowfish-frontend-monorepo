export const loadKeychainFromLocalStorage = () => {
  try {
    //todo: 0.3??
    return JSON.parse(
      window.localStorage.getItem("wc@2:core:0.3//keychain") || ""
    );
  } catch {
    return {};
  }
};

export const loadSessionFromLocalStorage = () => {
  try {
    //todo: 0.3??
    return JSON.parse(
      window.localStorage.getItem("wc@2:client:0.3//session") || ""
    );
  } catch {
    return {};
  }
};

export const loadSubscriptionFromLocalStorage = () => {
  try {
    //todo: 0.3??
    return JSON.parse(
      window.localStorage.getItem("wc@2:core:0.3//subscription") || ""
    );
  } catch {
    return {};
  }
};

export const loadWalletConnectV1FromLocalStorage = () => {
  try {
    return JSON.parse(window.localStorage.getItem("walletconnect") || "");
  } catch {
    return {};
  }
};
