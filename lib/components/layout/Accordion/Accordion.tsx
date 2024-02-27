'use client'

import React, { ReactElement, ReactNode, cloneElement, useState } from 'react';
import './styles.css'; // Assuming you'll create a separate CSS file


interface AccordionProps {
  title: string;
  children: ReactNode;
  open?: boolean
  readmore?: boolean
  onClick?: () => void | undefined;
}

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
}

interface AccordionContainerProps {
  children: React.ReactNode;
  allowMultipleOpen?: boolean;
}

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


// This component now expects an extra prop for internal use but it's not part of AccordionSectionProps
export const AccordionSection: React.FC<AccordionSectionProps & { isOpen?: boolean; onClick?: () => void }> = ({
  title,
  children,
  isOpen = false,
  onClick = () => { },
}) => {
  return <AccordionBody title={title} children={children} open={isOpen} onClick={onClick} />

  return <>
    <div className={`accordion-header ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <h2>{title}</h2>
      <div className={`arrow ${isOpen ? 'up' : 'down'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 12c0 6.623-5.377 12-12 12s-12-5.377-12-12 5.377-12 12-12 12 5.377 12 12zm-1 0c0 6.071-4.929 11-11 11s-11-4.929-11-11 4.929-11 11-11 11 4.929 11 11zm-11.5-4.828l-3.763 4.608-.737-.679 5-6.101 5 6.112-.753.666-3.747-4.604v11.826h-1v-11.828z" /></svg>
      </div>
    </div>
    <div className={`accordion-content ${isOpen ? 'open' : ''}`}>{children}</div>
  </>
};


// standalone accordion dropdown does not lift open state
export const Accordion: React.FC<AccordionProps> = ({ title, readmore = true, children, open = false }) => {
  const [isOpen, setIsOpen] = useState(open);
  const handleClick = () => {
    console.log("handleClick")
    setIsOpen(!isOpen);
  };

  return <>
    <div className="accordion">
      <AccordionBody title={title} children={children} open={isOpen} onClick={handleClick} />
    </div>
  </>
};


export const AccordionBody: React.FC<AccordionProps> = ({ title, children, open, onClick }) => {
  return <>
    <div className={`accordion-header ${open ? 'open' : 'close'}`} onClick={onClick}>
      <h2>{title}</h2>
      <div className={`arrow ${open ? 'up' : 'down'}`}>
        &#9651;      </div>
    </div>
    <div className={`accordion-content ${open ? 'open' : ''}`}>{children}</div>
  </>
}