'use client'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequested, logoutRequested, selectSession } from '@slices/sessionSlice';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const session = useSelector(selectSession);

    const isLoggedIn = session.status === "logged in";
    const isLoggingIn = session.status === 'login pending';
    const isLoggingOut = session.status === 'logout pending';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn) {
            dispatch(loginRequested({ name: username, password }));
        } else {
            dispatch(logoutRequested());
        }
    };

    return (
        <div>
            <h1>User login</h1>
            {isLoggingOut && <h2>Logging out...</h2>}
            {isLoggingIn && <h2>Logging in...</h2>}
            {session.message && <h1>{session.message}</h1>}
            {isLoggedIn && <h2>User will be logged out automatically after 10 seconds </h2>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoggedIn}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoggedIn}
                    />
                </div>
                <button type="submit">{isLoggedIn ? 'Logout' : 'Login'}</button>
            </form>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
};
