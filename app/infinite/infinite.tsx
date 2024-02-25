"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";

import "@styles/grids.css";

export type Section = {
  title?: string | ReactNode;
  body?: string | ReactNode;
};

export type Article = {
  title?: string | ReactNode;
  header?: string | ReactNode;
  sidebar?: Section;
  body: string | ReactNode;
};

type NumberInputProps = {
  count: number | null;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const randomNumber = (maxLimit = 100) => Math.floor(Math.random() * maxLimit);

// React component as closure
const NumberInput: React.FC<NumberInputProps> = ({
  count,
  setCount,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(()=>{
    setCount(1);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(e.target.value);
    if (!isNaN(numericValue)) {
      // Check if the conversion is successful
      if (numericValue <= 5)
        setCount(numericValue);
    } else {
      alert("Please enter a valid number");
    }
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />
    </div>
  );
};

type InfiniteScrollProps = {
  fetchArticles: (count: number) => Promise<Array<Article>>;
};

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({fetchArticles}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState<number>(0);

  // Define a function to fetch and append articles
  const fetchAndAppendArticles = (articleCount: number) => {
    setLoading(true);
    fetchArticles(articleCount).then((newArticles) => {
      setArticles((prevArticles) => [...prevArticles, ...newArticles]); // Append the new articles
      setLoading(false);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          fetchAndAppendArticles(count); // Use the current count to fetch articles
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [count]); // Add count to the dependency array

  return (
    <div>
      <NumberInput count={count} setCount={setCount} />
      {articles.map((article, index) => (
        <article key={index} className="article">
          <div className={`grid-container ${article.sidebar ? 'sidebar' : 'column'}`}>
            {article.sidebar && <>
              <div className="grid-sidebar">
                  <h2>{article.sidebar.title}</h2>
                  <div>{article.sidebar.body}</div>
              </div>
            </>}
            <div className="grid-content">
              {article.title && <div className="title">
                <h1>{article.title}</h1>
              </div>}
              {article.header && <div className="header">
                <h2>{article.header}</h2>
              </div>}
              <div className="body">{article.body}</div>
            </div>
          </div>
        </article>

      ))}
      <div ref={loaderRef} style={{ height: "20px", margin: "10px 0" }}>
        {loading && <h2>Loading more...</h2>}
      </div>
    </div>
  );
};