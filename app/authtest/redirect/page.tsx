import { cookies } from "next/headers";
import {
    validate,
} from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
    const user = validate();
    const greeting = "hello world";
    if (!user) {
        redirect("/actions/jwt-login");
    }
    return <>
        <h1>Hello {user.name}</h1>
        This page will redirect to the auth login modal if the user is not logged in.
    </>
}