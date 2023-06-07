import { Row, Text } from "@blowfish/ui/core";
import React from "react";
import useSWR from "swr";

import Toggle from "~components/Toggle";
import { getBlowfishV2Enabled, setBlowfishV2Enabled } from "~utils/storage";

export const V2Toggle: React.FC = () => {
  const {
    data: enabled,
    isLoading,
    mutate,
  } = useSWR("v2Toggle", getBlowfishV2Enabled);

  if (isLoading) return null;

  const handleToggle = async () => {
    await setBlowfishV2Enabled(!enabled);
    mutate();
  };

  return (
    <Row alignSelf="flex-start" alignItems="center" gap="md">
      <Text weight="semi-bold">Enable V2</Text>
      <Toggle isActive={!!enabled} toggle={handleToggle} />
    </Row>
  );
};
