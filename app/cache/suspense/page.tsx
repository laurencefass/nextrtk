export const dynamic = "force-dynamic";

// i think this needs to be outside of the page to ensure the timeout resets on each call.
const getData = (ms: number) => new Promise<string>((resolve) => {
    console.log("getData", ms);
    setTimeout(() => {
        resolve("Hello world!");
    }, ms);
});

export default async function Page() {
    let message: string | undefined = undefined;
    console.log("rendering suspense Page");
    message = await getData(5000);
    console.log("getData returned", message);
    return <div>
        <h1>{message}</h1>
        {Math.random().toFixed(4)}
    </div>
}