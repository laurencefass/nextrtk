import Link from 'next/link'
import "./styles.css"
import { Nav } from './nav'

export default function Layout({ children, tabs, info }: {
  children: React.ReactNode,
  tabs: React.ReactNode,
  info: React.ReactNode,
}) {
  return <>
    <h1>Shareable Tabs using parallel routes</h1>
    <p>See <a href="https://nextjs.org/docs/app/building-your-application/routing/parallel-routes">Next JS parallel routes</a> for a detailed explanation</p>
    <p>The @info slot is included to observe what happens when routing within @tabs paths</p>
    <div>{info}</div>
    <div className="page-tab-container">
      <Nav />
      <div className="page-tab-panel">
        <div>{tabs}</div>
      </div>
    </div>
  </>
}