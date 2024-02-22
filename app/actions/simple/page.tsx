import { mockFetchData } from "./actions";
import Client from "./client";

export default async function Page() {
    const data = await mockFetchData();
    return <>
        <h1>Testing server actions</h1>
        <p className="spaced">This page is calling a mock fetch on page load, and again in a client component on button click</p>
        data loaded: {JSON.stringify(data)}
        <Client />
    </>
}