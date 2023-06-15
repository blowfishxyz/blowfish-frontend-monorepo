import { useAsync } from "react-use";
import { getV2Enabled } from "~utils/messages";

export const useV2Enabled = () => {
  const state = useAsync(getV2Enabled, []);

  return [!!state.value, state.loading] as const;
};
