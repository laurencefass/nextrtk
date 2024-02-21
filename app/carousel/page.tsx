// MyPage.tsx
import React from 'react';
import { ImageCarousel, ImageData } from '@components/carousel/ImageCarousel';
import { getImageUrls } from '@utils/common'

const MyPage: React.FC = async () => {
  const images = await getImageUrls(6);
  if (!images)
    return null;
  return (
    <div>
      <h1>React Image Carousel</h1>
      <h2>Zero dependency extendable React component</h2>
      <p>Minimal image carousel with thumbnails, fetching lorem picsum images on the server and cacheing using the Next image component</p>
      <ImageCarousel />
    </div>
  );
};

export default MyPage;
