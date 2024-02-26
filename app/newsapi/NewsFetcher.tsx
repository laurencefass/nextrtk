"use client";

import React, { useEffect, useState } from "react";
import { _fetch } from "./actions";
import { SearchType, Article} from "./types";
import LanguageSelector, { Language } from "./LanguageSelector";


interface NewsFetcherProps {
  initialArticles?: Array<Article>;
}

export const NewsFetcher: React.FC<NewsFetcherProps>  = ({initialArticles}) => {
  const [country, setCountry] = useState<string|undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [q, setQuery] = useState<string|undefined>("pokemon");
  const [articles, setArticles] = useState<Array<Article>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [searchType, setSearchType] = useState<SearchType>("everything");

  useEffect(()=>{
    if (initialArticles) {
      setArticles(initialArticles);
    } else {
      fetchNews();
    }
  }, [])
  
  
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await _fetch({ country, page, pageSize, q, language, searchType });
      if (data.articles)
        setArticles(data.articles);
        setPage(page => page+1);
      if (data.message)
        alert(data.message)
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
        searchType: <select value={searchType} onChange={(e) => setSearchType(e.target.value as SearchType)}>
          <option value="everything">everything</option>
          <option value="top-headlines">top headlines</option>
        </select>
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
      {loading && <h2 style={{height: "25vh"}}>Loading News Feed...</h2>}
      {error && <p>Error: {error}</p>}
      {!loading && <ul>
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
      </ul>}
    </div>
  );
};
