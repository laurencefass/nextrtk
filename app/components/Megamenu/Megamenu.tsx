import React from 'react';
import './styles.css'; // Assuming this file contains your CSS styles
import { siteMap, MenuItem, MenuSection } from './sitemap';


// Function to render menu items (recursive to handle nesting)
const renderMenuItems: React.FC<MenuSection> = (items) => {
  return (
    <ul className="dropdown">
      {Object.entries(items).map(([key, item]) => (
        <li key={key}>
          <a href={item.url}>{item.title}</a>
          {item.options && <div className="submenu">{renderMenuItems(item.options)}</div>}
        </li>
      ))}
    </ul>
  );
};


const MegaMenu = () => {
  return <>
    <div className="block-container">
      <nav className="megaMenu">
        <ul className="topLevelMenu">
          {Object.entries(siteMap).map(([section, items]) => (
            <li key={section}>
              <a href="#">{section.charAt(0).toUpperCase() + section.slice(1)}</a>
              {renderMenuItems(items)}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </>
};

export default MegaMenu;
