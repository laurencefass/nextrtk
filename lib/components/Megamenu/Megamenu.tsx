'use client'

import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import '@styles/grids.css';
import siteMap, { MenuItem, MenuSection, MenuData } from './sitemap';
import Link from 'next/link';
import { AccordionContainer, AccordionSection } from '../layout/Accordion/Accordion';
import { HamburgerMenu } from "./Hamburger";
import useRouteChange, { useScreenWidth } from '@/lib/hooks';

const MegaMenu: React.FC = () => {
  const width = useScreenWidth();
  if (width < 600)
    return <HamburgerMenu>
      <MobileMenu />
    </HamburgerMenu>
  return <DesktopMenu />
}

const MobileMenu: React.FC = () => {
  return <div className="main-menu">
    <AccordionContainer>
      {Object.entries(siteMap as MenuData).map(([section, itemOrSection]) => {
        // Check if it's a direct MenuItem
        if (typeof itemOrSection === 'object' && 'url' in itemOrSection) {
          // It's a MenuItem, render a single Link
          return (
            // <AccordionSection key={section} title={itemOrSection.title as string}>
            <div className="menu-link"><h2>
              <Link href={itemOrSection.url as string}>{itemOrSection.title as string}</Link>
            </h2></div>
            // </AccordionSection>
          );
        } else {
          // It's a MenuSection, render nested MenuItems
          return (
            <AccordionSection key={section} title={section}>
              <ul>
                {Object.entries(itemOrSection as MenuSection).map(([key, { title, url }]) => (
                  <li key={key}>
                    {/* Ensure url is always a string */}
                    <Link href={url}>{title}</Link>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          );
        }
      })}
    </AccordionContainer>
  </div>
}


const DesktopMenu: React.FC = () => {
  // State to control the visibility of dropdowns
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useRouteChange(() => {
    setDropdownOpen(false);
  })

  useEffect(() => {
    console.log("dropdownOpen", dropdownOpen);
  }, [dropdownOpen]);

  // Function to toggle dropdown visibility
  const closeDropdown = () => {
    setDropdownOpen(false);
  }

  const onMouseEnter = () => {
    setDropdownOpen(true);
  }

  const onMouseLeave = () => {
    setDropdownOpen(false);
  }

  // Modify renderLeafItem to accept the closeDropdown function
  const renderLeafItem = (item: MenuItem) => (
    <li key={item.url}>
      <Link href={item.url} onClick={closeDropdown}>{item.title}</Link>
    </li>
  );


  interface DropdownProps {
    items: MenuItem['options'];
  }

  const Dropdown: React.FC<DropdownProps> = ({ items }) => {
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [alignRight, setAlignRight] = useState(false);

    useEffect(() => {
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const rightSpace = window.innerWidth - dropdownRect.right;
        const shouldAlignRight = rightSpace < 200; // Adjust based on your dropdown width or specific needs
        setAlignRight(shouldAlignRight);
      }
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
      // Function to calculate and set alignment
      const checkAndSetAlignment = () => {
        if (dropdownRef.current) {
          const dropdownRect = dropdownRef.current.getBoundingClientRect();
          const rightSpace = window.innerWidth - dropdownRect.right;
          const shouldAlignRight = rightSpace < 200;
          setAlignRight(shouldAlignRight);
        }
      };

      checkAndSetAlignment();

      // Re-check alignment whenever the dropdown is opened or the window is resized
      window.addEventListener('resize', checkAndSetAlignment);
      return () => window.removeEventListener('resize', checkAndSetAlignment);
    }, [dropdownOpen]); // Assuming dropdownOpen state is lifted up or passed as a prop

    return <>
      <ul ref={dropdownRef} className={`dropdown ${alignRight ? 'align-right' : ''}`}>
        {Object.entries(items || {}).map(([key, item]) => (
          <li key={key}>
            <Link href={item.url}>{item.title}</Link>
            {item.options && <Dropdown items={item.options} />}
          </li>
        ))}
      </ul>
    </>
  };

  // Pass closeDropdown to renderNestedItems as well, applying it to each Link
  const renderNestedItems = (items: MenuSection | MenuItem['options'] | undefined) => {
    if (!items) return null;
    if (!dropdownOpen) {
      return null;
    }
    return <Dropdown items={items} />;
  };

  return (
    <div className="block-container">
      <nav className="megaMenu">
        <div className="grid-menu">
          <Branding />
          <ul className="topLevelMenu">
            {Object.entries(siteMap as MenuData).map(([section, items]) => {
              if ((items as MenuItem).url && (items as MenuItem).title) {
                return renderLeafItem(items as MenuItem);
              }
              return (
                <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} key={section}>
                  <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                  {renderNestedItems(items as MenuItem['options'])}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

function Branding() {
  return <>
    <div className="branding">
      <img style={{ width: "50px" }} src="/syntapse-logo-2.png" alt="logo" />
      <div>
        <h2>Syntapse + Next 14 + Redux</h2>
        <h4>Tests, demos and experiments</h4>
        <h4>View the code on <a target="_blank" rel="noopener noreferrer" href="https://github.com/laurencefass/nextrtk/blob/main/README.md">github</a></h4>
      </div>
    </div>
  </>
}

export default MegaMenu;
