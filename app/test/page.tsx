import { validateCookieSessionKey } from "@/lib/utils/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default function Page() {
    const greeting = "hello world";
    const cookieStore = cookies();
    const key = cookieStore.get("SESSION_KEY");
    console.log("test page key", key);
    let authenticated = validateCookieSessionKey(key);

    if (authenticated) {
        return <>
            <h1>Authenticated user page</h1>
            <p>User is logged in</p>
            Greeting: <input type="text" placeholder={greeting} />
        </>
    }
    return <>
        <h1>Anonymous user page</h1>
        <p>User is not logged in</p>
        Greeting: {greeting}
    </>
}