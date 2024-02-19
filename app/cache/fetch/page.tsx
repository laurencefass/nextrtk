import ReactMarkdown from "react-markdown";

// force dynamic to override default Next JS production max-age
// export const dynamic = 'auto'
export const revalidate = 10;

const text = `
# Fetch cache test
##  fetch cache works in dev and prod builds
- This component fetches a continuously incrementing counter value from an api with Next's augmented fetch function
- It revalidates automatically every 5 seconds so the count will increment in (approximately) steps of 5
`;

export default async function Page() {
    const data = await fetch('https://nextrtk.syntapse.co.uk/api/counter', {
        next: { revalidate: 5 },
    });
    const counter = await data.json();
    console.log("counter", counter);
    return <>
        <ReactMarkdown className="text-container">{text}</ReactMarkdown>
        <button><a href="/cache/fetch">Refresh route</a></button>
        <h1>counter: {counter.count}</h1>
    </>
}