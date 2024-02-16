import "./styles.css"
import { PageTabs } from '@components/PageTabs/pagetabs';
import ReactMarkdown from 'react-markdown'

export const dynamic = 'force-dynamic';

const text = `
# Shareable Tabs using parallel routes
See [ Next JS parallel routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) for a detailed explanation
## Notes:
- The browser address bar shows the current selection
- The @info slot is included to observe what happens when routing within @tabs paths
- The root automatically redirects to the first tab as an expected behaviour but this can be reprogrammed
`
export default function Layout({ children, tabs, info }: {
  children: React.ReactNode,
  tabs: React.ReactNode,
  info: React.ReactNode,
}) {
  const tabLabels = ["Settings", "Configure", "Admin"];

  return <>
    <ReactMarkdown className="text-container">{text}</ReactMarkdown>
    <div>{info}</div>
    <div className="page-tab-container">
      <PageTabs tabs={tabLabels} />
      <div className="page-tab-panel">
        <div>{tabs}</div>
      </div>
    </div>
  </>
}