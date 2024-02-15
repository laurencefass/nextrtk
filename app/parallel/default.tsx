import "@styles/globals.css"
import ReactMarkdown from 'react-markdown';

const markdownText = `
# Default.tsx
- If present, this file will render when a slot cannot resolve the url path.
- If not present, Next will return a 404 for the entire route.
- default.js improves user feedback and helps to organise sub-routes

## Explanation
- Slot 1 will render default.js. 
- Slot 2 will return a 404 error 
`


export default async function Page() {
    return <>
        <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
    </>
}