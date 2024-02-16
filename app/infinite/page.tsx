import { InfiniteScroll } from './infinite'

export default function Page() {
  return (
    <>
      <h1>Simple Infinite Scroll</h1>
      <p>Included to test out the IntersectionObserver API. Dummy content generated on the fly</p>
      <p>Loading data into a simple css grid layout to present as 'articles'.</p>
      <InfiniteScroll />
    </>
  );
}
