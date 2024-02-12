let counter = 0;

export const revalidate = 5000;

setInterval(() => {
    counter++
}, 1000);

const getCounter = () => new Promise(resolve => resolve(counter));

export default async function Page() {
    const count = await getCounter();

    return <>
        <h1>cache test</h1>
        <div>reload page to see timer increment</div>
        <div>counter: {counter}</div>
    </>
}