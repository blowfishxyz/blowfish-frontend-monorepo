import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Logo = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  max-width: 1280px;
  margin: auto;
`;

const Sides = styled.div`
  display: flex;
  align-items: center;
`;

const MenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  gap: 32px;

  > a:hover {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const BLOWFISH_ROOT_DOMAIN = `https://${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`;
const BLOWFISH_JOBS_PAGE = `https://jobs.${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`;
const BLOWFISH_DOCS = `https://docs.${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Sides>
        <Logo href={BLOWFISH_ROOT_DOMAIN} rel="noopener">
          <Image src="/logo.svg" width="135" height="35" alt="Logo" />
        </Logo>
      </Sides>
      <Sides>
        <MenuItems>
          <Link href="/">Browser Extension</Link>
          <a href={BLOWFISH_DOCS} rel="noopener noreferrer" target="_blank">
            API Docs
          </a>
          <a
            href={BLOWFISH_JOBS_PAGE}
            rel="noopener noreferrer"
            target="_blank"
          >
            Join us
          </a>
        </MenuItems>
      </Sides>
    </HeaderContainer>
  );
};
