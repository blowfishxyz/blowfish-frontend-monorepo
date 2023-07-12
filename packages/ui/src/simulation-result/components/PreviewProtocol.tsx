import React from "react";
import { Row, Column } from "~/common/layout";
import { Text } from "~/common/text";
import { Divider } from "~/simulation-result/components/Divider";
import { ImageBase } from "~/simulation-result/components/ImageBase";
import { Icon } from "~/common/icon";

interface PreviewProtocolProps {
  imageUrl: string | null;
  name: string | undefined;
  verified: boolean;
  description?: string;
}

export const PreviewProtocol: React.FC<PreviewProtocolProps> = ({
  imageUrl,
  name,
  verified,
  description,
}) => {
  return (
    <div>
      <ImageBase
        src={imageUrl || undefined}
        alt={name || "Protocol"}
        width={48}
        height={48}
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
      <Divider margin="13px 0" />
      <Text>{description}</Text>
    </div>
  );
};
