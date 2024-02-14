import Link from 'next/link'
import { Nav } from "./nav";

import "@styles/globals.css"

export default async function Page() {
    return <>
        <h1>root Page.tsx</h1>
        <Nav />
    </>
}