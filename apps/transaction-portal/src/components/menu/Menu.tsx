import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { Text } from "@blowfish/ui";
import { MenuIcon } from "@blowfish/protect-ui/icons";
import Link from "next/link";
import { BLOWFISH_FEEDBACK_URL } from "~constants";

const Wrapper = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 320px;
`;

const MenuTitle = styled(Text).attrs({ weight: "semi-bold" })`
  font-size: 20px;
  line-height: 23px;
`;

const MenuDescription = styled(Text).attrs({
  size: "sm",
  design: "secondary",
})``;

const DropdownItemWrapper = styled(Link)`
  padding: 20px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  display: block;

  &:hover {
    background: rgba(219, 219, 219, 0.4);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const Menu = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const menuItems = [
    {
      title: "Documentation",
      description: "Integrate Blowfish with your app",
      url: "https://docs.blowfish.xyz/",
    },
    {
      title: "Blog",
      description: "Read about Blowfish & our users",
      url: "https://blog.blowfish.xyz/",
    },
    {
      title: "Careers",
      description: "Help us keep crypto safe for everyone",
      url: "https://jobs.blowfish.xyz",
    },
    {
      title: "Report bug",
      description: "See something wrong? Let us know!",
      url: BLOWFISH_FEEDBACK_URL,
    },
  ];

  return (
    <Wrapper onClick={toggleDropdown} ref={wrapperRef}>
      <MenuIcon />
      {dropdownVisible && (
        <Dropdown>
          {menuItems.map((item, index) => (
            <DropdownItemWrapper
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MenuTitle weight="semi-bold">{item.title}</MenuTitle>
              <div>
                <MenuDescription>{item.description}</MenuDescription>
              </div>
            </DropdownItemWrapper>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};
