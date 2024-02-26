'use server'

import { sleep } from "@/lib/utils/common";
import { ApiResponse, Options  } from "./types";

export async function _fetch(options: Options): Promise<ApiResponse> {
    await sleep(1000);

    if (!options.searchType)
      options.searchType = "everything";

    const apiKey = process.env.NEWS_API_KEY
    console.log("apiKey", process.env.NEWS_API_KEY)
    let url = `https://newsapi.org/v2/${options.searchType}?apiKey=` + apiKey;
    
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
