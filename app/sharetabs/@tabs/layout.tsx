import Link from 'next/link'
import "@styles/globals.scss"

export default function Layout({ children }: {
  children: React.ReactNode,
}) {
  return <>
    {children}
  </>
}