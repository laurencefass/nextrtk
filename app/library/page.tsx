import ArticleManager from '@components/Articles/Articles'
import AuthorManager from '@components/Authors/Authors'

import "@styles/globals.css"

export default function Library() {
  return <div className = "library-container">
    <ArticleManager />
    <AuthorManager />
  </div>
}
