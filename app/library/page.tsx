import ArticleManager from '@components/Articles/Articles'
import AuthorManager from '@components/Authors/Authors'
import Accordion from '@components/Accordion/Accordion'

import "@styles/globals.css"

export default function Library() {
  return <div className = "library-container">
    <Accordion title="Article Manager">
      <ArticleManager />
    </Accordion>
    <Accordion title="Author Manager">
      <AuthorManager />
    </Accordion>
  </div>
}
