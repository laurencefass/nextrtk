'use client'

import React from 'react';
import { useScreenWidth } from '@/lib/hooks';
import { HamburgerMenu } from "./Hamburger";
import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';

import './styles.css';
import '@styles/grids.css';

const MegaMenu: React.FC = () => {
  const width = useScreenWidth();
  if (width < 600)
    return <HamburgerMenu>
      <MobileMenu />
    </HamburgerMenu>
  return <DesktopMenu />
}

export default MegaMenu;