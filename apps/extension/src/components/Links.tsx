import React from "react";
import styled from "styled-components";

import { ArrowIcon } from "@blowfish/ui/icons";

const SyledArrowIcon = styled(ArrowIcon)`
  margin-left: 4px;
`;

export const UnstyledA = styled.a`
  text-decoration: none;
`;

export const A = styled(UnstyledA)`
  color: ${(props) => props.theme.colors.primaryText};
`;

interface LinkWithArrowProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  href: string;
}

export const LinkWithArrow: React.FC<LinkWithArrowProps> = ({
  className,
  style,
  href,
  children,
}) => (
  <A
    className={className}
    style={style}
    href={href}
    target="_blank"
    rel="noopener"
  >
    {children}
    <SyledArrowIcon />
  </A>
);
