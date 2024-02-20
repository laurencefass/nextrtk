"use client";

import { title } from "process";
import React, { useState, useEffect, useRef } from "react";
import { sentence, paragraph, lorem, article } from "txtgen";

import "@styles/grids.css";

type Section = {
  title?: string;
  body?: string;
};

type Article = {
  title: string;
  header: string;
  sidebar: Section;
  body: string;
};

// Dummy fetch function
const fetchArticles = (count: number): Promise<Array<Article>> => {
  console.log("FetchArticles", count);
  let articles: Array<Article> = [];
  for (let i = 0; i < count; i++) {
    articles.push({
      title: lorem(3, 5),
      sidebar: {
        title: lorem(4, 6),
        body: lorem(25, 50),
      },
      header: lorem(7, 12),
      body: article(1),
    })
  }
  console.log("articles", articles);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(articles);
    }, 1000);
  });
};

type NumberInputProps = {
  count: number | null;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

// React component as closure
const NumberInput: React.FC<NumberInputProps> = ({
  count,
  setCount,
}) => {
  const [inputValue, setInputValue] = useState("");

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

export const InfiniteScroll: React.FC = () => {
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
          <div className="grid-container">
            <div className="sidebar">
              <h2>{article.sidebar.title}</h2>
              <div>{article.sidebar.body}</div>
            </div>
            <div className="content">
              <div className="title">
                <h1>{article.title}</h1>
              </div>
              <div className="header">
                <h2>{article.header}</h2>
              </div>
              <img
                src={`https://picsum.photos/seed/${index}/500/400`}
                height={400}
              />
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