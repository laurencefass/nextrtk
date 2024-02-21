'use client'

import { selectAppMessage } from '@/lib/redux';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      await apiFetch();
      setLoading(false);
    })();
  }, []);

  const handleAuth = async (login: boolean, register: boolean = false) => {
    let body;
    if (login) {
      body = {
        type: register ? "register" : "login",
        credentials: { username, password }
      }
    } else {
      body = {
        type: "logout",
      }
    }
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.status === 200) {
        setMessage(undefined);
        login === true && register === false && setLoggedIn(true);
        login === false && setLoggedIn(false);
      }
      if (result.status !== 200) {
        setMessage(`${result.data}: ${result.reason}`);
      }

      console.log(result);
    } catch (error) {
      setLoggedIn(false);
    }
  };

  async function apiFetch(onClick: boolean = false) {
    let response = await fetch("/api/auth");
    let data = await response.json();
    if (data.status === 200) {
      setLoggedIn(true);
      if (onClick)
        setMessage(data.data);
    } else {
      setMessage(data.data);
    }
    console.log(data);
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  const markdownText = `
  # Secure encrypted cookie authentication

  This provides a site wide login and registration facility. A browser cookie is set for authenticated sessions
  and is automatically included in every request. Next middleware checks for the cookie across all route requests
  ## Features
  - Default user is admin/admin
  - New users can be registered and login/out
  - Basic flow checks for duplicate users and password mismatches
  - The check button will check for authorisation and return a message
  - The cookie is encrypted/decrypted on the server
  - User data will reset on each page load
  `;

  return <>
    <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
    <div className="bordered" style={{ padding: "40px 20px" }}>
      <h2>Login and Register</h2>
      <div>{message}</div>
      <input
        disabled={loggedIn}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        disabled={loggedIn}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button
        disabled={loggedIn}
        onClick={() => handleAuth(true)}
      >
        Login
      </button>
      <button
        disabled={!loggedIn}
        onClick={() => handleAuth(false)}
      >
        Logout
      </button>
      <button
        disabled={loggedIn}
        onClick={() => handleAuth(true, true)}
      >
        Register
      </button>
      <button
        onClick={async () => apiFetch(true)}
      >
        Check
      </button>
      <h3>login status: {loggedIn ? "logged in" : "logged out"}</h3>
    </div>
  </>;
};

export default Auth;
