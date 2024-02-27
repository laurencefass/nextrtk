'use client'

import { useEffect, useState } from "react";
import { authenticate, check } from "./actions"

export const dynamic = "force-dynamic";

export default function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | undefined>("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let status = await check();
            setLoading(false);
            console.log("status", status);
            if (status == "authorized") {
                setLoggedIn(true);
            }
        })();
    }, []);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    async function onLogin(userName: string, password: string) {
        try {
            const message = await authenticate("login", name, password)
            console.log("onLogin", message);
            if (message === "logged in") {
                setLoggedIn(true);
            } else {
                setMessage(message);
            }
        } catch (e: any) {
            console.log(e);
            const message = (e as Error).message;
            setMessage(message);
        }
    }

    async function onRegister(userName: string, password: string) {
        try {
            const message = await authenticate("register", name, password)
            if (message !== "userRegistered") {
                setMessage(message);
            }
        } catch (e: any) {
            const message = (e as Error).message;
            setMessage(message);
        }
    }

    async function onLogout() {
        let message = await authenticate("logout");
        console.log(message);
        setLoggedIn(false);
        setMessage(undefined);
    }

    async function onCheck() {
        let message = await check();
        console.log(message);
        setMessage(message);
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return <>
        <h3>{message}</h3>
        <div >
            username: <input disabled={loggedIn} onChange={onNameChange} type="text" id="username" name="username" required />
            password: <input disabled={loggedIn} onChange={onPasswordChange} type="password" id="password" name="password" required />
            <button disabled={loggedIn} onClick={() => onLogin(name, password)}>login</button>
            <button disabled={!loggedIn} onClick={() => onLogout()}>logout</button>
            <button disabled={loggedIn} onClick={() => onRegister(name, password)}>register</button>
            <button onClick={() => onCheck()}>check</button>
        </div>
        <div style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "20px" }}>Log in and out and visit these pages for different actions</div>
            <button><a target="_blank" href="/authtest/test">Test authorised page</a></button>
            <button><a target="_blank" href="/authtest/redirect">Test page redirect</a></button>
        </div>
        <h3>login status: {loggedIn ? "logged in" : "logged out"}</h3>
    </>

}