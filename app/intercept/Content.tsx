'use client' 

import { usePathname } from 'next/navigation';

export function Content() {
    const pathname = usePathname();

    return <>
        <h1>Content Component</h1>
        <pre>{JSON.stringify(pathname, null, 2)}</pre>
    </>
}