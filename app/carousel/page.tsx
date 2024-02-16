// MyPage.tsx
import React from 'react';
import { ImageCarousel, ImageData } from '@components/carousel/ImageCarousel';
import { sleep } from '@utils/common';

const MyPage: React.FC = async () => {
  const random = Math.floor(Math.random() * 1000);
  const response = await fetch('https://picsum.photos/v2/list?limit=6');
  const data = await response.json();
  const images = data.map((item: ImageData) => item.download_url);

  await sleep(5000);

  return (
    <div>
      <h1>React Image Carousel</h1>
      <p>Minimal image carousel with thumbnails, fetching lorem picsum images on the server and cacheing using the Next image component</p>
      {images.length > 0 ? (
        <ImageCarousel images={images} />
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default MyPage;
