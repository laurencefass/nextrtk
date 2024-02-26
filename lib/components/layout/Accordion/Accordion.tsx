'use client'

import React, { ReactElement, ReactNode, cloneElement, useState } from 'react';
import './styles.css'; // Assuming you'll create a separate CSS file

interface AccordionProps {
  title: string;
  children: ReactNode;
  open?: boolean
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

interface AccordionContainerProps {
  children: React.ReactNode;
  allowMultipleOpen?: boolean;
}


// This component now expects an extra prop for internal use but it's not part of AccordionSectionProps
export const AccordionSection: React.FC<AccordionSectionProps & { isOpen?: boolean; onClick?: () => void }> = ({
  title,
  children,
  isOpen = false,
  onClick = () => { },
}) => {
  return (
    <Accordion title={title} open={isOpen}>
      {children}
    </Accordion>
    // </Accordion>
    // <div className="accordion">
    //   <div className="accordion-header" onClick={onClick}>
    //     <h2>{title}</h2>
    //   </div>
    //   {isOpen && <div className="accordion-content">{children}</div>}
    // </div>
  );
};


export const AccordionContainer: React.FC<AccordionContainerProps> = ({ children, allowMultipleOpen = false }) => {
  // State now holds an array of indices for open sections
  const [openSections, setOpenSections] = useState<number[]>([]);

  const handleSectionClick = (index: number) => {
    if (allowMultipleOpen) {
      // For multiple open sections, add or remove the clicked section from the array
      setOpenSections(openSections.includes(index)
        ? openSections.filter(i => i !== index) // Remove if already open
        : [...openSections, index]); // Add if not already open
    } else {
      // For single open section, open the clicked section and close others
      setOpenSections(openSections.includes(index) ? [] : [index]);
    }
  };

  const processedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      // Determine if the current section is open
      const isOpen = openSections.includes(index);
      return cloneElement(child as ReactElement<any>, {
        isOpen,
        onClick: () => handleSectionClick(index),
        key: index,
      });
    }
    return child;
  }) ?? []; // Fallback to an empty array if children is null

  return <div>{processedChildren}</div>;
};

// original single accordion

// Assuming AccordionProps is defined elsewhere
export const Accordion: React.FC<AccordionProps> = ({ title, children, open = false }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className={`accordion-header ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
        <h2>{title}</h2>
        {!isOpen && <div>click to read more</div>}
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>{children}</div>
    </div>
  );
};
