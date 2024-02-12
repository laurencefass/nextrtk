'use client'

import React, { useState } from "react";
import Image from 'next/image';
import './styles.css'

// Define the props type for images
type ImageCarouselProps = {
  images: string[]; // Array of image URLs
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0); // State to keep track of the current slide

  const selectSlide = (index: number) => {
    setActiveIndex(index); // Update the active slide index
  };

  return (
    <div className="carousel-container">
      <div className="active-slide">
        {images.length > 0 && (
          <img
            src={images[activeIndex]}
            alt={`Slide ${activeIndex}`}
            width="100%"
            height={500}
          />
        )}
      </div>
      <div className="thumbnails">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => selectSlide(index)}
            width={125}
            height={100}
            style={{
              opacity: index === activeIndex ? "1.0" : "0.5",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
