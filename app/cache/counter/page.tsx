import ReactMarkdown from "react-markdown";

let counter = 0;

// force dynamic to override default Next JS production max-age
// export const dynamic = 'force-dynamic'
export const revalidate = 5;

setInterval(() => {
    counter++
}, 1000);

const getCounter = () => new Promise(resolve => resolve(counter));

const text = `
# Cache test
## RSC/Page cache only works in prod build
- Server component increments a counter every second but revalidates every 5 seconds
- Achieved using dynamic = 'force-dynamic' and revalidate = 5;
- Automatically sets Cache-Control: public, max-age=5, stale-while-revalidate=1
`;
export default async function Page() {
    const count = await getCounter();

    return <>
        <button><a href="/cache/counter">Refresh route</a></button>
        <h1>counter: {counter}</h1>
        <ReactMarkdown className="text-container">{text}</ReactMarkdown>
    </>
}