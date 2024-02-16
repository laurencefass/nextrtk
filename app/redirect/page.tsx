import { redirect } from 'next/navigation'
import { sleep } from '@utils';

export default async function Page() {
    await sleep(2000);
    redirect("/login");

    return <>
        <h1>Redirect Page</h1>
    </>
}