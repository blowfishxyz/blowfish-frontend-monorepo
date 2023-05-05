import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { GrayText, Text } from "@blowfish/ui/core";

const Hamburger = styled.div`
  width: 18px;
  height: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.black};
  }
`;

const GreyWrapper = styled.div`
  width: 36px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.border};
  padding: 10px 0;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
`;

const Dropdown = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "menuOnLeft",
})<{ menuOnLeft: boolean }>`
  position: absolute;
  top: 50px;
  right: ${({ menuOnLeft }) => (menuOnLeft ? "0" : "auto")};
  left: ${({ menuOnLeft }) => (menuOnLeft ? "auto" : "0")};
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
  transition: color 0.3s;
`;

const MenuDescription = styled(GrayText)`
  font-size: 14px;
  transition: color 0.3s;
`;

const DropdownItem = styled.div`
  padding: 20px;
  cursor: pointer;

  &:hover {
    background: rgba(219, 219, 219, 0.4);
  }

  &:hover ${MenuTitle} {
    color: rgba(0, 0, 0, 0.5);
  }

  &:hover ${MenuDescription} {
    color: rgba(0, 0, 0, 0.3);
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Menu = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOnLeft, setMenuOnLeft] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAvailableSpace = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const availableSpace = window.innerWidth - rect.right;
        setMenuOnLeft(availableSpace < 320);
      }
    };

    checkAvailableSpace();
    window.addEventListener("resize", checkAvailableSpace);

    return () => {
      window.removeEventListener("resize", checkAvailableSpace);
    };
  }, []);

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
    <GreyWrapper onClick={toggleDropdown} ref={wrapperRef}>
      <Hamburger>
        <div />
        <div />
        <div />
      </Hamburger>
      {dropdownVisible && (
        <Dropdown menuOnLeft={menuOnLeft}>
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
    </GreyWrapper>
  );
};

export default Menu;
