import { cookies } from "next/headers";
import {
    getUserFromCookie,
} from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Page() {
    const user = getUserFromCookie("SESSION_KEY");
    const greeting = "hello world";

    if (user) {
        return <>
            <h1>Authenticated user page</h1>
            <p>Hi {user.name} you can do fun stuff like edit content!</p>
            Greeting: <input type="text" placeholder={greeting} />
        </>
    }
    return <>
        <h1>Anonymous user page</h1>
        <p>You are not logged in. Actions are limited e.g. content is read only</p>
        This is editable for registered users: <h3>{greeting}</h3>
    </>
}