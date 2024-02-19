import { InfiniteScroll } from './infinite'

export default function Page() {
  return (
    <>
      <h1>Simple Infinite Scroll</h1>
      <p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">IntersectionObserver API </a>test. Set the number of articles to reload at each intersection</p>
      <InfiniteScroll />
    </>
  );
}
