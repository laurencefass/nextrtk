import React from 'react';
import WidthAdjuster from '../WidthAdjuster/widthAdjuster';

type FullWidthIframeProps = {
  src: string;
  height?: string; // Allow optional height prop
};

export const FullWidthIframe: React.FC<FullWidthIframeProps> = ({ src, height = '500px' }) => {
  return (
    <WidthAdjuster>
    <iframe
      src={src}
      style={{
        width: '100%', // Full width
        height: height, // Default height or prop value
        border: 'none', // Removes the border
      }}
      allowFullScreen
    ></iframe>
    </WidthAdjuster>
  );
};