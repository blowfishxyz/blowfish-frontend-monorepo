import React from "react";
import { Row, Column, Text, Icon } from "@blowfishxyz/ui";
import { Divider } from "./common";
import { ImageBase } from "~components/common/ImageBase";
import { capitalize } from "~utils/utils";

interface PreviewProtocolProps {
  imageUrl: string | null;
  name: string | undefined;
  verified: boolean;
  description?: string;
  trustLevel: "KNOWN" | "TRUSTED" | "NATIVE";
}

export const PreviewProtocol: React.FC<PreviewProtocolProps> = ({
  imageUrl,
  name,
  verified,
  description,
  trustLevel,
}) => {
  let trustLevelText = "";

  if (trustLevel === "NATIVE") {
    trustLevelText =
      "A native asset transfer or any other transaction that is considered to be as secure as the chain itself";
  } else if (trustLevel === "TRUSTED") {
    trustLevelText = "One of core projects on the chain";
  } else if (trustLevel === "KNOWN") {
    trustLevelText = "One of “long tail projects”";
  }
  return (
    <div>
      <ImageBase
        src={imageUrl || undefined}
        alt={name || "Protocol"}
        width={120}
        height={120}
        borderRadius="100%"
      />
      <Column marginTop={10}>
        <Row alignItems="flex-start">
          <Text weight="semi-bold" size="md" marginBottom={5} marginRight={3}>
            {name}
          </Text>
          {verified && <Icon variant="verified" size={19} />}
        </Row>
      </Column>
      <Divider $margin="13px 0" />
      <Text>{description}</Text>
      {trustLevelText ? (
        <>
          <Divider $margin="13px 0" />
          <Text>
            <b>{capitalize(trustLevel)}</b> protocol: {trustLevelText}
          </Text>
        </>
      ) : null}
    </div>
  );
};
