import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FooterContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 120px 0px 370px 0px;
  overflow: hidden;
  align-content: flex-start;
  flex-wrap: nowrap;
  gap: 20;
  border-radius: 0px 0px 0px 0px;
`;
const LinkColumn = styled.div`
  flex: 1;
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 0px 0px 0px 0px;
  align-content: center;
  flex-wrap: nowrap;
  gap: 0;
  border-radius: 0px 0px 0px 0px;
  margin-right: 20px;
`;
const FooterLink = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: black;
  box-sizing: border-box;
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px 0px 24px 0px;
  max-width: 1280px;
  overflow: hidden;
  align-content: flex-start;
  flex-wrap: nowrap;
  row-gap: 20;
  border-radius: 0px 0px 0px 0px;
  border-color: #d5dbd7;
  border-style: solid;
  border-top-width: 0px;
  border-bottom-width: 1px;
  border-left-width: 0px;
  border-right-width: 0px;
`;
const LogoSide = styled.div`
  display: flex;
  flex: 16;
`;
const MenuSide = styled.div`
  display: flex;
  flex: 21;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <LogoSide>
        <Logo
          href={`https://${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`}
          target="_blank"
        >
          <Image src="/logo.svg" width="238" height="62" alt="Logo" />
        </Logo>
      </LogoSide>
      <MenuSide>
        <LinkColumn>
          <FooterLink>
            <Link
              href={`https://docs.${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`}
              target="_blank"
            >
              Documentation
            </Link>
          </FooterLink>
          <FooterLink>
            <Link
              href="https://blowfish-xyz.notion.site/Blowfish-Logos-f9fc899e55ec4faebb2eafb7796a6bed"
              target="_blank"
            >
              Press kit
            </Link>
          </FooterLink>
          <FooterLink>
            <Link
              href={`https://jobs.${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`}
              target="_blank"
            >
              Join us
            </Link>
          </FooterLink>
          <FooterLink>
            <Link
              href="https://blowfish-xyz.notion.site/Blowfish-Responsible-Disclosure-Policy-6ea9c2b4774246dfaac2c7fb5ca9e62b"
              target="_blank"
            >
              Responsible Disclosure Policy
            </Link>
          </FooterLink>
        </LinkColumn>
        <LinkColumn>
          <FooterLink>
            <Link href="https://twitter.com/blowfishxyz" target="_blank">
              Twitter
            </Link>
          </FooterLink>
          <FooterLink>
            <Link
              target="_blank"
              href={`https://blog.${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`}
            >
              Blog
            </Link>
          </FooterLink>
          <FooterLink>
            <Link href="mailto:contact@blowfish.xyz" target="_blank">
              Contact Us
            </Link>
          </FooterLink>
        </LinkColumn>
      </MenuSide>
    </FooterContainer>
  );
};
