import React from 'react';
import "@styles/grids.css";

type GridComponentProps = {
    children: React.ReactNode;
  };

export const GridComponent: React.FC<GridComponentProps> = ({ children }) => {
  // Assuming the first child is always an image and should take 30% width.
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="grid-component">
      <div className="image">
        {childrenArray[0]}
      </div>
      <div className="content">
        {childrenArray.slice(1)}
      </div>
    </div>
  );
};