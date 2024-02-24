import { randomNumber } from '@/lib/utils/common';
import { GridComponent } from '../gridcomponent';
import { Article, InfiniteScroll } from '../infinite'
import { sentence, paragraph, lorem, article } from "txtgen";

export const dynamic = "force-dynamic";

// export const randomNumber = (maxLimit = 100) => Math.floor(Math.random() * maxLimit);

// Dummy fetch function
const fetchArticles = async (count: number): Promise<Array<Article>> => {
  'use server'
  console.log("FetchArticles", count);
  let articles: Array<Article> = [];
  for (let i = 0; i < count; i++) {
    articles.push({
      body: <GridComponent>
        <img src={`https://picsum.photos/seed/${randomNumber(60)}/300/200`} height={200}/>
        <div>
          <h2>{lorem(3, 5)}</h2>
          {lorem(50)}
        </div>
        <br/>
        <a href="">read more...</a>
      </GridComponent>,
    })
  }
  console.log("articles", articles);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(articles);
    }, 1000);
  });
};


export default function Page() {
  return <>
      <InfiniteScroll fetchArticles={fetchArticles} />
    </>
}
