import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const text = `# Intercepted routes
- Intercepted routes make use of parallel routes and slots.
- These links open a modal and update the address bar.
- Closing the modal updates the address bar to the route parent. 
- Traversing back and forth through browser history renders modals.
- Opening the URL in a new tab or window displays the content on the main page.
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