import { useRouter } from "next/router";
import qs from "qs";
import { useMemo } from "react";

const booleanDecoder = (value: string): boolean | string => {
  if (value === "true") {
    return true;
  } else if (value === "false") {
    return false;
  } else {
    return value;
  }
};

export const useQueryParams = <T>() => {
  const router = useRouter();
  return useMemo(() => {
    const cleanedQs = router.asPath.split("?")[1];
    return qs.parse(decodeURIComponent(cleanedQs), {
      decoder: booleanDecoder,
    }) as T;
  }, [router.asPath]);
};
