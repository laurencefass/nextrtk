'use client'

import { useEffect, useState } from "react";
import { login, logout, register, check } from "./actions"

export default function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | undefined>("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await check();
            setLoading(false);
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
            const message = await login(name, password)
            console.log(message);
            setMessage(undefined);
            setLoggedIn(true);
        } catch (e: any) {
            const message = (e as Error).message;
            setMessage(message);
        }
    }

    async function onRegister(userName: string, password: string) {
        try {
            const message = await register(name, password)
            console.log(message);
            setMessage(message);    
        } catch (e: any) {
            const message = (e as Error).message;
            setMessage(message);
        }
    }

    async function onLogout() {
        let message = await logout();
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
        <div style={{ display: "flex" }}>
            name: <input disabled={loggedIn} onChange={onNameChange} type="text" id="username" name="username" required />
            password: <input disabled={loggedIn} onChange={onPasswordChange} type="password" id="password" name="password" required />
            <button disabled={loggedIn} onClick={() => onLogin(name, password)}>login</button>
            <button disabled={loggedIn} onClick={() => onRegister(name, password)}>register</button>
            <button disabled={!loggedIn} onClick={() => onLogout()}>logout</button>
            <button onClick={() => onCheck()}>check</button>
        </div>
        <h3>login status: {loggedIn ? "logged in" : "logged out"}</h3>
    </>

}