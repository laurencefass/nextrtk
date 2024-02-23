'use client'

import React, { useState } from 'react';
import './styles.css'; // Update the path according to your project structure

type WidthAdjusterProps = {
  children: React.ReactNode;
};

const WidthAdjuster: React.FC<WidthAdjusterProps> = ({ children }) => {
  const [width, setWidth] = useState(800); // Initialize width state to 600px

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value)); // Convert the string value to a number
  };

  return (
    <div className="width-adjuster-container">
      <input 
        type="range" 
        className="slider-input"
        min="0" 
        max="1600" 
        value={width} 
        onChange={handleWidthChange}
      />
      <div className="adjustable-width-div" style={{ width: `${width}px` }}>
        {children}
      </div>
    </div>
  );
};

export default WidthAdjuster;
