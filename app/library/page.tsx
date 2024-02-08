import ArticleManager from '@components/Articles/Articles'
import AuthorManager from '@components/Authors/Authors'
import Accordion from '@components/layout/Accordion/Accordion'

import "@styles/globals.css"

export default function Library() {
  return <div className="block-container">
    <div>
      <h1>Basic Library Feature with server persistence</h1>
      <p>Manage complex collections and relational data in components synchronised with memoized <a href="https://redux-toolkit.js.org/api/createEntityAdapter">RTK EntityAdapters</a></p>
      <p></p>
    </div>
    <Accordion title="Author Manager">
      <AuthorManager />
    </Accordion>
    <Accordion title="Article Manager">
      <ArticleManager />
    </Accordion>
  </div>
}
