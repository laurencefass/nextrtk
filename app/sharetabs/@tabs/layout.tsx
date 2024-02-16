import Link from 'next/link'
import "@styles/globals.css"

export default function Layout({ children, container }: { 
    children: React.ReactNode,
    container: React.ReactNode,
}) {
    return <>
      <div>@container layout</div>
      {children}
    </>
}