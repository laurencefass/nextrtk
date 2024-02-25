'use server'

import { Article } from "./NewsFetcher";

type Options = {
    country?: string,
    page?: number, 
    pageSize?: number,
    q?: string
    language?: string,
}
  
  export async function _fetch(options: Options): Promise<Array<Article>> {
    const apiKey = "2edfa5cb6b084806abb3ffc252ad04ad";
    let url = "https://newsapi.org/v2/everything?apiKey=" + apiKey;
    
    // Dynamically construct the URL based on defined options
    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
        url += `&${key}=${value}`;
      }
    });
  
    console.log("fetch url", url);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    console.log(data);
    return data.articles;
  }
