import ReactMarkdown from "react-markdown";

const text = `
# Fetch cache test
##  fetch cache works in dev and prod builds
- This component fetches a continuously incrementing counter value from an api with Next's augmented fetch function
- It revalidates automatically every 5 seconds so the count will increment in (approximately) steps of 5
- For this experiment to work, the endpoint at /api/counter has to be set to 'force-dynamic' to avoid any automatic cache
`;

export const dynamic = "force-dynamic";

export default async function Page() {
    const env = process.env.NODE_ENV === "development" ? "dev" : "prod"
    const res = await fetch(`https://next${env}.syntapse.co.uk/api/counter`, {
        next: { revalidate: 5 },
    });
    if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
    }
    const counter = await res.json();
    return <>
        <ReactMarkdown className="text-container">{text}</ReactMarkdown>
        <button><a href="/cache/fetch">Refresh route</a></button>
        <h1>counter: {counter.count}</h1>
    </>
}