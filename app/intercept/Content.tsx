'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPaths } from '@utils/client'
import { ImageCarousel } from '@/lib/components/carousel/ImageCarousel';

function Article() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [url, setUrl] = useState<string>();
  const [slugs, setSlugs] = useState<Array<string>>([])

  useEffect(() => {
    if (pathname)
      setSlugs(getPaths(pathname))
  }, [pathname, searchParams])

  if (!slugs || !slugs.length)
    return null;

  return <>
    <h1>Article {slugs[2]}</h1>
    {<div>{JSON.stringify(slugs, null, 2)}</div>}
    <img
      src={`https://picsum.photos/seed/${slugs[2]}/600/400`}
      height={400}
    />
    {/* <ImageCarousel/> */}
    </>
}

export function Content() {
  return <>
    <Article />
  </>
}