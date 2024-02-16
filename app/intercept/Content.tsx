'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPaths } from '@utils/client'
import { ImageCarousel } from '@/lib/components/carousel/ImageCarousel';

function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [url, setUrl] = useState<string>();
  const [slugs, setSlugs] = useState<Array<string>>([])

  useEffect(() => {
    if (pathname)
      setSlugs(getPaths(pathname))
  }, [pathname, searchParams])

  return <>
    <h1>Article {slugs[2]}</h1>
    {slugs && <div>{JSON.stringify(slugs, null, 2)}</div>}
  </>
}

export function Content() {
  return <>
    <NavigationEvents />
    <ImageCarousel/>
  </>
}