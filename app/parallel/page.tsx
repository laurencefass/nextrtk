import "@styles/globals.css"
import ReactMarkdown from "react-markdown"

const markdownText = `
# Page.tsx
- This is the top level parent for parallel child slots
- It will render provided all slots can resolve the url
- If one or more slots cannot render, then default.js will render instead
`

export default async function Page() {
    return <div>
        <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
    </div>
}