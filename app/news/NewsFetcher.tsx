"use client";

import React, { useState } from "react";
import { _fetch } from "./actions";
import LanguageSelector, { Language } from "./LanguageSelector";

export type Article = {
  title: string;
  author: string;
  source: {
    id: any;
    name: string;
  };
  publishedAt: string;
  url: string;
  urlToImage: string;
};

export const NewsFetcher: React.FC = () => {
  const [country, setCountry] = useState<string|undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [q, setQuery] = useState<string|undefined>(undefined);
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("en");

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const articles = await _fetch({ country, page, pageSize, q, language });
      setArticles(articles);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    console.log(`Language changed to: ${selectedLanguage}`);
  };

  return (
    <div>
      <div>
          <LanguageSelector setLanguage={handleLanguageChange} />
        <span>
          country:{" "}
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country code (e.g., us)"
          />
        </span>
        <span>
          query string:{" "}
          <input
            type="text"
            value={q}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search query"
          />{" "}
        </span>
      </div>
      <div>
        <span>
          page:{" "}
          <input
            type="number"
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value))}
            placeholder="Page number"
          />
        </span>
        <span>
          page size:{" "}
          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            placeholder="Articles per page"
          />
        </span>
      </div>
      <button onClick={fetchNews}>Fetch News</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>{" "}
            by {article.author || "Unknown"} at{" "}
            {new Date(article.publishedAt).toLocaleTimeString()}
            {article.urlToImage && <img src={article.urlToImage} height={300}/>}
          </li>
        ))}
      </ul>
    </div>
  );
};
