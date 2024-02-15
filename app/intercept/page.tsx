import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const text = `# Intercepted routes
- Links open a dialog and update the URL. Traversing browser history renders modals.
- Intercepted routes make use of parallel routes and slots.
- The same URL in a new tab or session will open the same content in main. It will re-render in main on router navigation.
`

export default function Page() {0
    return <>
    <ReactMarkdown className="text-container">{text}</ReactMarkdown>
    <nav>
        <Link href="/intercept/content/1">Item 1</Link>
        <Link href="/intercept/content/2">Item 2</Link>
        <Link href="/intercept/content/3">Item 3</Link>
    </nav>
    </>
}