import { Row, SmallButtonPrimary, Text } from "@blowfish/ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { Input } from "~components/Input";
import Toggle from "~components/Toggle";
import { getBlowfishPortalUrl, setBlowfishPortalUrl } from "~utils/storage";

export const CustomPortalUrl: React.FC = () => {
  const { data } = useSWR("customPortalUrl", getBlowfishPortalUrl);

  if (!data) return null;

  return (
    <CustomPortalUrlInner initialUrl={data.url} initialEnabled={data.enabled} />
  );
};

const CustomPortalUrlInner: React.FC<{
  initialUrl: string;
  initialEnabled: boolean;
}> = ({ initialUrl, initialEnabled }) => {
  const [customUrl, setCutomUrl] = useState(initialUrl);

  const [isEnabled, setIsEnabled] = useState(initialEnabled);
  const [state, setState] = useState<"success" | "initial">("initial");
  const invalidUrl = !checkUrl(customUrl);

  const handleToggle = () => {
    setIsEnabled((prev) => {
      const enabled = !prev;
      setBlowfishPortalUrl({
        enabled,
        url: enabled ? customUrl : undefined,
      });
      return enabled;
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCutomUrl(e.target.value);
    if (state === "success") {
      setState("initial");
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!isEnabled) {
      return;
    }

    if (state !== "initial") {
      return;
    }

    setBlowfishPortalUrl({ url: customUrl, enabled: true });
    setState("success");
  };

  return (
    <Wrapper>
      <Row gap="sm">
        <Text semiBold>Set Custom Protal URL</Text>
        <Toggle isActive={isEnabled} toggle={handleToggle} />
      </Row>
      {isEnabled && (
        <FormWrapper onSubmit={handleSubmit}>
          <Input
            error={invalidUrl}
            type="text"
            value={customUrl}
            onChange={handleChange}
            autoFocus
            placeholder="Enter a custom portal URL"
          />
          <SmallButtonPrimary
            type="submit"
            disabled={!isEnabled || state !== "initial" || invalidUrl}
          >
            {state === "success" ? "Updated!" : "Confirm"}
          </SmallButtonPrimary>
        </FormWrapper>
      )}
    </Wrapper>
  );
};

function checkUrl(url: string) {
  try {
    const validUrl = new URL(url);
    return !!validUrl.host;
  } catch (e) {
    return false;
  }
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  margin: 8px 0;
`;

const FormWrapper = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1em;
`;
