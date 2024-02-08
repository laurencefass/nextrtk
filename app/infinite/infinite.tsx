'use client'

import React, { useState, useEffect, useRef } from 'react';
import { paragraph } from 'txtgen';

// Dummy fetch function
const fetchRandomWords = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const text = paragraph(10);
      resolve(text);
    }, 500); // Delay of 1000ms (1 second)
  });
};

export const InfiniteScroll: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        setLoading(true);
        fetchRandomWords().then(newText => {
          setTexts(prevTexts => [...prevTexts, newText]); // Append the new text block
          setLoading(false);
        });
      }
    }, {threshold: 1.0});

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer && loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  return (
    <div>
      {texts.map((textBlock, index) => (
        <article key={index} style={{border: '1px solid #ccc', padding: '20px', margin: '10px 0', borderRadius: '5px'}}>
          <p>{textBlock}</p>
        </article>
      ))}
      <div ref={loaderRef} style={{ height: '20px', margin: '10px 0' }}>
        {loading && <p>Loading more...</p>}
      </div>
    </div>
  );
};

