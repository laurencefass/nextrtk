import React from 'react';
import './styles.css'; // Assuming this file contains your CSS styles
import { siteMap, MenuItem, MenuSection } from './sitemap';

// Render a single menu item (leaf)
const renderLeafItem = (item: MenuItem) => (
  <li key={item.url}>
    <a href={item.url}>{item.title}</a>
  </li>
);

// Render a section or a nested item with potential dropdowns
const renderNestedItems = (items: MenuSection | MenuItem['options']) => (  
  <ul className="dropdown">
    {Object.entries(items).map(([key, item]) => (
      <li key={key}>
        <a href={item.url}>{item.title}</a>
        {item.options && <ul className="submenu">{renderNestedItems(item.options)}</ul>}
      </li>
    ))}
  </ul>
);

const MegaMenu: React.FC = () => {
  return (
    <div className="block-container">
      <nav className="megaMenu">
        <ul className="topLevelMenu">
          <h1>Syntapse</h1>
          {Object.entries(siteMap).map(([section, items]) => {
            // Check if the item is a direct MenuItem (leaf)
            if ('url' in items && 'title' in items) {
              return renderLeafItem(items);
            }
            // If it's a MenuSection, render the section with potential nested items
            return (
              <li key={section}>
                <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                {renderNestedItems(items)}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MegaMenu;
