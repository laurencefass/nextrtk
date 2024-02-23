'use client'

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registrationRequested, selectSession } from '@slices/sessionSlice';

export const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const session = useSelector(selectSession);

    const isRegistering = session.status === 'registration pending';
    const isRegistered = session.status === "registration complete"

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registrationRequested({ name: username, password }));
    };

    if (session.status === 'logged in') return <>
        <h2>Registration de-activated for logged in user. Log out and retry</h2>
    </>

    return (
        <div>
            {isRegistering && <h2>Registering user...</h2>}
            {isRegistered && <h2>User Registered. Goto login!</h2>}
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
};
