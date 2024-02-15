'use client' 

import { usePathname, useSearchParams } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';


  
    const getSlugs = (url: string): string[] => {
        if (typeof url !== 'string' || !url) {
            console.error('Invalid path:', url);
            return [];
          }
        const segments = url.replace(/^\/|\/$/g, '').split('/');
        console.log(segments);
          return segments;
  };

function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [url, setUrl] = useState<string>();
    const [slugs, setSlugs] = useState<Array<string>>([])
   
    useEffect(() => {
        if (pathname)
          setSlugs(getSlugs(pathname))
    }, [pathname, searchParams])
   
    return <>
        {slugs && <div>{JSON.stringify(slugs, null, 2)}</div>}
    </>
  }
  
export function Content() {
    return <>
        <h1>Article</h1>
        <NavigationEvents />
    </>
}