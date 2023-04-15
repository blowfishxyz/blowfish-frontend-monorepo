import { Row, SmallButtonPrimary, Text } from "@blowfish/ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { Input } from "~components/Input";
import Toggle from "~components/Toggle";
import { BLOWFISH_TRANSACTION_PORTAL_URL } from "~config";
import { getBlowfishPortalUrl, setBlowfishPortalUrl } from "~utils/storage";

export const CustomPortalUrl: React.FC = () => {
  const { data: url } = useSWR("customPortalUrl", getBlowfishPortalUrl);

  if (!url) return null;

  return <CustomPortalUrlInner initialUrl={url} />;
};

const CustomPortalUrlInner: React.FC<{
  initialUrl: string;
}> = ({ initialUrl }) => {
  const [customUrl, setCutomUrl] = useState(initialUrl);

  const [isEnabled, setIsEnabled] = useState(
    initialUrl !== BLOWFISH_TRANSACTION_PORTAL_URL
  );
  const [isOverriden, setIsOverriden] = useState(false);
  const invalidUrl = !checkUrl(customUrl);

  const handleToggle = () => {
    setIsEnabled((prev) => {
      const enabled = !prev;
      if (!enabled) {
        setBlowfishPortalUrl(undefined);
      }
      return enabled;
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCutomUrl(e.target.value);
    if (isOverriden) {
      setIsOverriden(false);
    }
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!isEnabled || isOverriden) {
      return;
    }

    setBlowfishPortalUrl(customUrl);
    setIsOverriden(true);
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
            disabled={!isEnabled || isOverriden || invalidUrl}
          >
            {isOverriden ? "Updated!" : "Confirm"}
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
