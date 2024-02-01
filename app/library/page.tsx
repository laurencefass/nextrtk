import ArticleManager from '@components/Articles/Articles'
import AuthorManager from '@components/Authors/Authors'
import Accordion from '@components/Accordion/Accordion'

import "@styles/globals.css"

export default function Library() {
  return <div className = "library-container">
    <div>
      <h1>Basic Library Feature with server persistence</h1>
      <p>This is using <a href="https://redux-toolkit.js.org/api/createEntityAdapter">RTK EntityAdapters</a> to manage collections</p>
      <p>Manage authors and articles with synchronised components</p>
    </div>
      <Accordion title="Author Manager">
        <AuthorManager />
      </Accordion>
      <Accordion title="Article Manager">
        <ArticleManager />
      </Accordion>
  </div>
}
