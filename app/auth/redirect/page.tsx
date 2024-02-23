import { cookies } from "next/headers";
import {
    getUserFromCookie,
} from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import { sleep } from "@/lib/utils/common";

export const dynamic = "force-dynamic";

export default async function Page() {
    const user = getUserFromCookie("SESSION_KEY");
    const greeting = "hello world";
    if (!user) {
        redirect("/auth");
    }
    return <>
        <h1>Hello {user.name}</h1>
        This page will redirect to the auth login modal if the user is not logged in.
    </>
}