import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Logo = styled(Link)`
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
  font-weight: bold;
  gap: 32px;
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Sides>
        <Logo href={`https://${process.env.NEXT_PUBLIC_BLOWFISH_ROOT_DOMAIN}`}>
          <Image src="/logo.svg" width="135" height="35" alt="Logo" />
        </Logo>
      </Sides>
      <Sides>
        <MenuItems>
          <Link href="/login">API Docs</Link>
          <Link href="/login">Join us</Link>
        </MenuItems>
      </Sides>
    </HeaderContainer>
  );
};
