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
  
export type Options = {
    country?: string,
    page?: number, 
    pageSize?: number,
    q?: string
    language?: string,
    searchType?: SearchType;
}
  
export type SearchType = "everything" | "top-headlines";

export type ApiResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
  message?: string;
};