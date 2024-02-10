'use client'

// MyPage.tsx
import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImageCarousel';

type ImageData = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

// const __MyPage: React.FC = () => {
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     // Generate a random number to append as a query parameter to bypass cache
//     const random = Math.floor(Math.random() * 1000);
//     const url = `https://picsum.photos/500/400?random=${random}`;
//     setImageUrl(url);
//   }, []);

//   return (
//     <div>
//       <div>imageURL: {imageUrl}</div>
//       {imageUrl ? (
//         <img src={imageUrl} alt="Random from Picsum" style={{ maxWidth: '100%', height: 'auto' }} />
//       ) : (
//         <p>Loading image...</p>
//       )}
//     </div>
//   );
// };

const MyPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    // Fetch a list of images from Picsum Photos
    const fetchImages = async () => {
      const random = Math.floor(Math.random() * 1000);
      const response = await fetch('https://picsum.photos/v2/list?limit=6');
      const data = await response.json();
      const imageUrls =  data.map((item: ImageData) => item.download_url);
      console.log("imageUrls", imageUrls);
      setData(data);
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>React Image Carousel</h1>
      <p>Minimal image carousel with thumbnails, dynamically loading images from lorem picsum, and cacheing using the Next image component</p>
      {images.length > 0 ? (
        <ImageCarousel images={images} />
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default MyPage;
