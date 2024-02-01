import React from 'react';
import './styles.css'; // Assuming this file contains your CSS styles
import { siteMap, MenuItem, MenuSection } from './sitemap';
import ReactMarkdown from 'react-markdown';

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

const markdownText = `
# Dynamic Megamenus!
(note: all menu links are stubbed out for this demo)

## A megamenu is a type of navigation menu typically used in website design and user interface (UI) design. It is an expanded and highly visible menu that provides users with access to a large number of options or content categories in a structured and organized manner. Megamenus are often used on websites with a complex or extensive range of content, products, or services.

### Key characteristics of a megamenu include:
* Multi-column layout: Megamenus typically display options in multiple columns or rows, allowing for a more extensive list of choices.
* Rich content: They can include text, images, icons, and sometimes even interactive elements like buttons or forms, providing users with a richer browsing experience.
* Hierarchical structure: Megamenus often organize content hierarchically, with main categories or sections leading to subcategories or submenus. This helps users quickly find what they are looking for.
* Hover or click interaction: Users can usually access megamenus either by hovering their mouse pointer over a specific menu item (hover interaction) or by clicking on it (click interaction).
* Accessibility: It is essential for megamenus to be designed with accessibility in mind to ensure that users with disabilities can navigate and use them effectively.
* Megamenus are commonly found on e-commerce websites, large corporate sites, and other platforms with extensive content to help users find their desired information or products efficiently. They are designed to improve user experience and reduce the time it takes for visitors to navigate through the website's various sections.
`;

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
        <div>
          <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
        </div>
  </> 
};

export default MegaMenu;
