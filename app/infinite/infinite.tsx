'use client'

import { title } from 'process';
import React, { useState, useEffect, useRef } from 'react';
import { sentence, paragraph, lorem, article } from 'txtgen';

import '@styles/grids.css'

type Section = {
  title?: string,
  body?: string
}

type Article = {
  title: string,
  header: string,
  sidebar: Section,
  body: string
}

// Dummy fetch function
const fetchRandomWords = (): Promise<Article> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: lorem(3, 5),
        sidebar: {
          title: lorem(2, 4),
          body: lorem(25, 50),
        },
        header: lorem(7, 12),
        body: article(1)
      })
    }, 1000); // Delay of 1000ms (1 second)
  });
};

export const InfiniteScroll: React.FC = () => {
  const [texts, setTexts] = useState<Article[]>([]);
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
    }, { threshold: 1.0 });

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
      {texts.map((article, index) => (
        <article key={index} className="article">
          <div className="grid-container">
            <div className="sidebar">
              <h1>{article.sidebar.title}</h1>
              <div>{article.sidebar.body}</div>
            </div>
            <div className="content">
              <div className="title"><h1>{article.title}</h1></div>
              <div className="header"><h2>{article.header}</h2></div>
              <img
                src={`https://picsum.photos/seed/${index}/500/400`}
                height={400}
              />
              <div className="body">{article.body}</div>
            </div>
          </div>
        </article>
      ))}
      <div ref={loaderRef} style={{ height: '20px', margin: '10px 0' }}>
        {loading && <p>Loading more...</p>}
      </div>
    </div>
  );
};

