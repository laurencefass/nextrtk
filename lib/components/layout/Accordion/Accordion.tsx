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

  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleSectionClick = (index: number) => {
    if (isTransitioning) return; // Prevent any clicks during transitions

    setIsTransitioning(true); // Start transition

    if (allowMultipleOpen) {
      setOpenSections(openSections.includes(index)
        ? openSections.filter(i => i !== index)
        : [...openSections, index]);
      setIsTransitioning(false); // End transition
    } else {
      if (openSections.includes(index)) {
        // If clicked section is already open, close it.
        setOpenSections([]);
        setIsTransitioning(false); // End transition
      } else {
        // Close currently open sections first
        setOpenSections([]); // This ensures a close animation if any
        setTimeout(() => {
          // Then open the clicked section
          setOpenSections([index]);
          setIsTransitioning(false); // End transition
        }, 300); // Adjust timeout according to your close animation duration
      }
    }
  };

  const processedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      // Determine if the current section is open
      const isOpen = openSections.includes(index);
      return cloneElement(child as ReactElement<any>, {
        open: isOpen,
        onClick: () => handleSectionClick(index),
        key: index,
      });
    }
    return child;
  }) ?? []; // Fallback to an empty array if children is null

  return <div className="accordion-container">{processedChildren}</div>;
};


// This component now expects an extra prop for internal use but it's not part of AccordionSectionProps
export const AccordionSection: React.FC<AccordionSectionProps & { open?: boolean; onClick?: () => void }> = ({
  title,
  children,
  open = false,
  onClick = () => { },
}) => {
  return <AccordionBody title={title} children={children} open={open} onClick={onClick} />
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