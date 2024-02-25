import ReactMarkdown from "react-markdown";
import { NewsFetcher } from "./NewsFetcher";

const text  = `
# News fetcher
- A simple UI for fetching data from an authenticated [News API](https://newsapi.org/)
- Requests are authorised with a News API registered API_KEY. [read more](https://newsapi.org/docs/authentication)
- The News API will refuse requests from the browser so requests are made from a server action called directly from a client component
- Fetched data is hydrated back into the client component without the client needed to know the API key.
`
export default function Page() {
    return <>
    <ReactMarkdown>{text}</ReactMarkdown><br/>
    <div className="bordered">
        <NewsFetcher />
    </div>
    </>
}