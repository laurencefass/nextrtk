import { Suspense } from "react"
import ReactMarkdown from "react-markdown";

const text = `
# Suspenseful Cache test
## RSC/Page cache only works in prod build
- Server component takes 5 seconds to render (with artificial delay) with a 10 second revalidation 
- Suspense boundary placeholder will only render every 5 seconds and not on each refresh
`;

export default function Layout(props: React.PropsWithChildren) {
  return <>
    <ReactMarkdown className="text-container">{text}</ReactMarkdown>
    <button><a href="/cache/suspense">Refresh route</a></button>
    <Suspense fallback={<h1>Loading...</h1>}>
      {props.children}
    </Suspense>
    {Math.random().toFixed(4)}
  </>
}
