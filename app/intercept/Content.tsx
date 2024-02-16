'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPaths } from '@utils/client'

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
    {slugs && <div>{JSON.stringify(slugs, null, 2)}</div>}
  </>
}

export function Content() {
  return <>
    <h1>Article</h1>
    <NavigationEvents />
  </>
}