import { Suspense } from "react";
import ReactMarkdown from "react-markdown";


const text  = `
# Secure, granular API management
- A simple UI for querying an authenticated news feed [News API](https://newsapi.org/)
- Pre-fetches data on the server and further queries/fetches are handled on the client.
- Requests are authorised with a News API registered API_KEY. [read more](https://newsapi.org/docs/authentication)
- Requests are made from the client component calling a server action. The API_KEY is stored securely on the server.
- Secure operation as the client never sees the API key.
`
export default function Layout(props: React.PropsWithChildren) {
  return <>
      <ReactMarkdown>{text}</ReactMarkdown><br/>

    <Suspense fallback={<h2>Loading news widget...</h2>}>
      {props.children}
    </Suspense>
  </>
}
