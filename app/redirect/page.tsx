import { redirect } from 'next/navigation'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Page() {
    await sleep(2000);
    redirect("/login");

    return <>
        <h1>Redirect Page</h1>
    </>
}