// force dynamic to override default Next JS production max-age
// export const dynamic = 'force-dynamic'
export const revalidate = 10;

export default async function Page() {
    const getData = (ms: number) => new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("Hello world!");
        }, ms);
    });

    const message = await getData(5000);
    return <>
        {message ? <div>{message}</div> : <div>loading</div>}
    </>
}