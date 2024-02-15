import Link from 'next/link'

export default function Page() {
    return <>
    <h1>Page</h1>
        <nav>
            <Link href="/intercept/content/1">Item 1</Link>
            <Link href="/intercept/content/2">Item 2</Link>
            <Link href="/intercept/content/3">Item 3</Link>
      </nav>

    </>
}