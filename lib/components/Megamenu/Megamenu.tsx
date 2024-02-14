import React from 'react';
import './styles.css';
import '@styles/grids.css';
import siteMap, { MenuItem, MenuSection, MenuData } from './sitemap';
import Link from 'next/link';

// Render a single menu item (leaf)
const renderLeafItem = (item: MenuItem) => (
  <li key={item.url}>
    <Link href={item.url}>{item.title}</Link>
  </li>
);

// Render a section or a nested item with potential dropdowns
const renderNestedItems = (items: MenuSection | MenuItem['options'] | undefined) => {
  if (!items) return null; // Handle undefined items

  return (
    <ul className="dropdown">
      {Object.entries(items).map(([key, item]) => (
        <li key={key}>
          <Link href={item.url}>{item.title}</Link>
          {item.options && <ul className="submenu">{renderNestedItems(item.options)}</ul>}
        </li>
      ))}
    </ul>
  );
};


// Assuming siteMap is of type MenuData
const MegaMenu: React.FC = () => {
  return (
    <div className="block-container">
      <nav className="megaMenu">
        <div className="grid-menu">
          <div className="branding">
            <img style={{ width: "50px" }} src="/syntapse-logo.png" alt="logo" />
            <div>
              <h2>Syntapse + Next 14 + Redux</h2>
              <h4>View the code on <a target="_blank" rel="noopener noreferrer" href="https://github.com/laurencefass/nextrtk/blob/main/README.md">github</a></h4>
            </div>
          </div>
          <ul className="topLevelMenu">
            {Object.entries(siteMap as MenuData).map(([section, items]) => {
              // Check if the item is a direct MenuItem (leaf)
              if ((items as MenuItem).url && (items as MenuItem).title) {
                return renderLeafItem(items as MenuItem);
              }
              // If it's a MenuSection, render the section with potential nested items
              return (
                <li key={section}>
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


export default MegaMenu;
