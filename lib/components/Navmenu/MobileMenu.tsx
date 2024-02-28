import { AccordionContainer, AccordionSection } from "@components/layout/Accordion/Accordion";
import siteMap, { MenuData, MenuSection } from "./sitemap";
import Link from "next/link";

export const MobileMenu: React.FC = () => {
    return <div className="main-menu">
        <AccordionContainer>
            {Object.entries(siteMap as MenuData).map(([section, itemOrSection]) => {
                // Check if it's a direct MenuItem
                if (typeof itemOrSection === 'object' && 'url' in itemOrSection) {
                    // It's a MenuItem, render a single Link
                    return (
                        // <AccordionSection key={section} title={itemOrSection.title as string}>
                        <div key={section} className="menu-link"><h2>
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
