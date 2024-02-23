import { cookies } from "next/headers";
import {
    validate,
} from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Page() {
    const user = validate();
    console.log("test page, user", user)
    const greeting = "hello world";

    if (user) {
        return <>
            <h1>User is logged in</h1>
            <p>Hi {user.name} you can do fun stuff like edit content!</p>
            Greeting: <input type="text" placeholder={greeting} />
        </>
    }
    return <>
        <h1>User is anonymous</h1>
        <p>You are not logged in. Actions are limited e.g. content is read only</p>
        This is editable for registered users: <h3>{greeting}</h3>
    </>
}