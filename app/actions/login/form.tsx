'use client'

import { useState } from "react";
import { login, logout, register, check } from "./actions"

export default function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    async function onLogin(userName: string, password: string) {
        await login(name, password)
    }

    async function onRegister(userName: string, password: string) {
        await register(name, password)
    }

    async function onLogout() {

    }

    async function onCheck() {

    }

    return <>
        <div style={{ display: "flex" }}>
            <form>
                name: <input onChange={onNameChange} type="text" id="username" name="username" required />
                password: <input onChange={onPasswordChange} type="password" id="password" name="password" required />
                <button onClick={() => onLogin(name, password)}>login</button>
                <button onClick={() => onRegister(name, password)}>register</button>
            </form>
            <form>
                <button onClick={() => onLogout()}>logout</button>
                <button onClick={() => onCheck()}>check</button>
            </form>
        </div>
    </>

}