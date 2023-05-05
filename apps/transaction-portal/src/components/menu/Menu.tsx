import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { GrayText, Text } from "@blowfish/ui/core";
import { MenuIcon } from "@blowfish/ui/icons";

const Wrapper = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.white};
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
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 320px;
`;

const MenuTitle = styled(Text)`
  font-size: 20px;
  line-height: 23px;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
`;

const MenuDescription = styled(GrayText)`
  font-size: 14px;
`;

const DropdownItem = styled.div`
  padding: 20px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba(219, 219, 219, 0.4);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Menu = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const menuItems = [
    { title: "Protect", description: "Keep your assets safe from scams" },
    { title: "Home", description: "Learn more about Blowfish" },
    { title: "Documentation", description: "Integrate Blowfish with your app" },
    { title: "Blog", description: "Read about Blowfish & our users" },
    { title: "Careers", description: "Help us keep crypto safe for everyone" },
    { title: "Report bug", description: "See something wrong? Let us know!" },
  ];

  return (
    <Wrapper onClick={toggleDropdown} ref={wrapperRef}>
      <MenuIcon />
      {dropdownVisible && (
        <Dropdown>
          {menuItems.map((item, index) => (
            <DropdownItem key={index}>
              <MenuTitle>{item.title}</MenuTitle>
              <div>
                <MenuDescription>{item.description}</MenuDescription>
              </div>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default Menu;
