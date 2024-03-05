'use client'

import React from 'react';
import { useScreenWidth } from '@/lib/hooks';
import { HamburgerMenu } from "./Hamburger";
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

import './styles.scss';
import '@styles/grids.scss';

const NavMenu: React.FC = () => {
  const width = useScreenWidth();
  if (width > 0 && width < 600)
    return <>
      <HamburgerMenu>
        <MobileMenu />
      </HamburgerMenu>
    </>
  return <DesktopMenu />
}

export default NavMenu;