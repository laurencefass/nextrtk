'use client'

import useRouteChange, { useScreenWidth } from "@/lib/hooks";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode
}

export const HamburgerMenu: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Use the custom hook and provide a callback to close the menu
  useRouteChange(() => {
    console.log("route changed!")
    setIsOpen(false);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className="hamburger-icon" onClick={toggleMenu}>☰</div>
      <div className={`menu-content ${isOpen ? 'open' : 'closed'}`}>
        {children}
      </div>
    </div>
  );
};