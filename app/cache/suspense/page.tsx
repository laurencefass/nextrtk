// force dynamic to override default Next JS production max-age
export const dynamic = 'force-dynamic'
export const revalidate = 10;

const getData = (ms: number) => new Promise<string>((resolve) => {
    setTimeout(() => {
        resolve("Hello world!");
    }, ms);
});


export default async function Page() {
    const message = await getData(5000);
    return <>
        <h1>{message}</h1>
    </>
}