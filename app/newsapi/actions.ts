'use server'

import { Article } from "./NewsFetcher";

type Options = {
    country?: string,
    page?: number, 
    pageSize?: number,
    q?: string
    language?: string,
}
  
type ApiResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
  message?: string;
};

  export async function _fetch(options: Options): Promise<ApiResponse> {
    const apiKey = process.env.NEWS_API_KEY
    console.log("apiKey", process.env.NEWS_API_KEY)
    let url = "https://newsapi.org/v2/everything?apiKey=" + apiKey;
    
    // Dynamically construct the URL based on defined options
    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
        url += `&${key}=${value}`;
      }
    });
  
    console.log("fetch url", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }
