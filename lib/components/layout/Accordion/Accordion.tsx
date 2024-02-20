'use client'

import React, { ReactNode, useState } from 'react';
import './styles.css'; // Assuming you'll create a separate CSS file

interface AccordionProps {
  title: string;
  children: ReactNode;
  open?: boolean
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, open = false }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <h1>{title}</h1>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;