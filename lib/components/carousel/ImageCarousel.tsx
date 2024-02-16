'use client'

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import './styles.css'
import { getImageUrls } from "@/lib/utils/common";

// Define the props type for images
type ImageCarouselProps = {
  images?: string[]; // Array of image URLs
};

export type ImageData = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0); // State to keep track of the current slide
  const [imageSet, setImageSet] = useState<Array<string>>([]);
  
  const selectSlide = (index: number) => {
    setActiveIndex(index); // Update the active slide index
  };

  useEffect(()=>{
    (async () => {
      const i = await getImageUrls(6)
      setImageSet(i);
    })();
  });

  if(!imageSet || imageSet.length === 0) {
    return <h1>Loading images...</h1>
  }

  return (
    <div className="carousel-container">
      <div className="active-slide">
        {imageSet.length > 0 && (
          <img
            src={imageSet[activeIndex]}
            alt={`Slide ${activeIndex}`}
            width="100%"
            height={500}
          />
        )}
      </div>
      <div className="thumbnails">
        {imageSet.map((image, index) => (
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

