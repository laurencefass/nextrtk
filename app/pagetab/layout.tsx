import Link from 'next/link'
import "@styles/globals.css"

export default function Layout({ children, tabs, info }: { 
    children: React.ReactNode,
    tabs: React.ReactNode,
    info: React.ReactNode,
}) {
    return <>
      <h1>Navigable Tabs using parallel routes</h1>
      <p>The tab panel is displaying navigable pages (with router history). See <a href="https://nextjs.org/docs/app/building-your-application/routing/parallel-routes">Next JS parallel routes</a> for a detailed explanation</p>
      <div>{info}</div>
      <div className="page-tab-container">    
        <nav className="page-tabs">
          <Link href="/pagetab/settings">Settings</Link>
          <Link href="/pagetab/configure">Configure</Link>
          <Link href="/pagetab/admin">admin</Link>
        </nav>
        <div className="page-tab-panel">
          <div>{tabs}</div>
        </div>
      </div>
    </>
}