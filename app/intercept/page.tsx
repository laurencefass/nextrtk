import Link from 'next/link'

export default function Page() {
    return <>
    <h1>Intercepted routes</h1>
    <p>These links will open modals and update the URL. Duplicating the tab will display the same content on the page</p>
    <nav>
        <Link href="/intercept/content/1">Item 1</Link>
        <Link href="/intercept/content/2">Item 2</Link>
        <Link href="/intercept/content/3">Item 3</Link>
    </nav>
    </>
}