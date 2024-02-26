import { NewsFetcher } from "./NewsFetcher";
import { Article, Options } from "./types";
import { _fetch } from "./actions";


const fetchNews = async (options: Options) : Promise<Array<Article>> => {
    let articles: Array<Article> = [];
    let { country, page, pageSize, q,language, searchType} = options;
    try {
      const data = await _fetch({ country, page, pageSize, q, language, searchType });
      if (data.articles)
        articles = data.articles as Array<Article>;
      if (data.message)
        console.log(data.message)
    } catch (error: any) {
      console.log(error.message);
    }
    return articles;
  };

export default async function Page() {
    const options: Options = {
        country: undefined,
        page: 1, 
        pageSize: 10,
        q: "any",
        language: "en",
        searchType: "everything"
    }
  
    const articles = await fetchNews(options);
    console.log("articles", articles)
  
  return <>
    <div className="bordered">
        {articles && articles.length && <NewsFetcher initialArticles = {articles}/>}
    </div>
    </>
}