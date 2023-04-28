import { Row, SmallButtonPrimary } from "@blowfish/ui/core";
import { sleep } from "@blowfish/utils/helpers";
import React from "react";
import { useAsyncFn } from "react-use";
import styled from "styled-components";
import Browser from "webextension-polyfill";

export const ClearStorage: React.FC = () => {
  const [state, clearStorage] = useAsyncFn(async () => {
    await Promise.all([
      Browser.storage.local.clear(),
      Browser.storage.sync.clear(),
      sleep(2000),
    ]);
  });

  return (
    <Wrapper>
      <SmallButtonPrimary onClick={clearStorage} disabled={state.loading}>
        {state.loading ? "Loading..." : "Clear storage"}
      </SmallButtonPrimary>
    </Wrapper>
  );
};

const Wrapper = styled(Row)`
  margin: 16px 0;

  ${SmallButtonPrimary} {
    max-width: 120px;
  }
`;
