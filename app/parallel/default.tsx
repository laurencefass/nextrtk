import Link from 'next/link'
import { Nav } from "./nav";

import "@styles/globals.css"
import ReactMarkdown from 'react-markdown';

const markdownText = `
# Default.tsx
- This page is displayed when url path cannot be fully resolved by all parallel slots.

## Explanation
- Slot 1 does not have a configure path but it can render a default.js for any missing paths
- Slot 2 does not have a settings path but will return a 404 as it has no default.js 

## Top tip
- In most cases its a good idea to include a default.js file for all sub-paths in a parallel route
`


export default async function Page() {
    return <>
        <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
        <Nav />
    </>
}