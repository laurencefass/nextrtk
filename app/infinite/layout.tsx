export default function Layout(props: React.PropsWithChildren) {
  return <>
    <div className="content">
      <h1>Infinite Article Scroller</h1>
      <p>Created using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">IntersectionObserver API</a>. Set the number of articles to reload at each intersection</p>
      <h2>Zero dependency extendable React component with fully responsive layouts</h2>
      {props.children}
    </div>
  </>
}
