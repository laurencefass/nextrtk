import { randomNumber } from '@/lib/utils/common';
import { Article, InfiniteScroll, } from '../infinite'
import { sentence, paragraph, lorem, article } from "txtgen";

export const dynamic = "force-dynamic";

// Dummy fetch function
const fetchArticles = async (count: number): Promise<Array<Article>> => {
  'use server'

  console.log("FetchArticles", count);
  let articles: Array<Article> = [];
  for (let i = 0; i < count; i++) {
    articles.push({
      title: lorem(3, 5),
      sidebar: {
        title: lorem(4, 6),
        body: <>
          <p>{lorem(25, 50)}</p>
          <h3>{lorem(3, 5)}</h3>
          <p>{lorem(25, 50)}</p>
        </>,
      },
      header: lorem(7, 12),
      body: <>
        <img src={`https://picsum.photos/seed/${randomNumber(60)}/400/300`} height={400}/>
        {article(1)}
      </>
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
      <h2>This page is fully responsive and will hide the sidebars at smaller widths</h2>
      <InfiniteScroll fetchArticles={fetchArticles} />
    </>
}
