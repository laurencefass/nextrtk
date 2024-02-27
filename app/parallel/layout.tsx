import ReactMarkdown from "react-markdown"
import { Nav } from "./nav";

const markdownText = `
# Parallel Routes
- Next JS can render multiple pages on the same route and will retain navigation history.
## Behaviour is slightly different for hard and soft link navigation
- Soft navigation: Next.js will perform a partial render, changing the subpage within the slot, while maintaining the other slot's active subpages, even if they don't match the current URL.
- Hard Navigation: Next.js cannot determine the active state for the slots that don't match the current URL. Instead, it will render a default.js file for the unmatched slots, or 404 if default.js doesn't exist.
## Notes
- Try alternating between soft links on the root page and the sub paths to see how navigation works.
- Hard navigation to /settings will return a 404 for the whole route as slot 2 has no settings path and no default.js
`
export default function Layout({
  children,
  slot1,
  slot2,
}: {
  children: React.ReactNode
  slot1: React.ReactNode
  slot2: React.ReactNode
}) {
  return (
    <div className="content">
      <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
      <Nav />
      {children}
      {slot1}
      {slot2}
    </div>
  )
}