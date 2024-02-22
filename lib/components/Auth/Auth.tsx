'use client'
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Accordion } from "@components/layout/Accordion/Accordion";

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
        if (login === true && register === false) {
          setLoggedIn(true);
        }
        if (login === false) {
          setLoggedIn(false);
        }
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
    try {
      let response = await fetch("/api/auth");
      let data = await response.json();
      if (response.ok) {
        if (data.status === 200) {
          setLoggedIn(true);
          if (onClick)
            setMessage(data.data);
        } else {
          setMessage(data.data);
        }
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  const markdownText = `
  ## A site wide login and registration form.
  ### Features
  - Default users are for testing are 123/123 (admin) and 456/456 (authenticated)
  - New users can be registered and login/out but will reset to defaults on page load
  - Basic auth validation checks for duplicate users and password mismatches
  - The check button will check for authorisation and return a message
  - The test link will load another page that conditionally renders anonymous and authenticated content


  ### Cookie notes  
  - Cookies are same site and http only to reduce chance of XSS attack.
  - Cookies by their nature will persist across windows, tabs and sessions.
  - A unique encypted session token is issued to each unique login and removed/renewed on logout
  - There is no expiry on the session cookie so will persist until manually removed or the user logs out.
  `;

  return <>
    <Accordion title="Secure cookie based Login and Authentication (click to read more)">
      <ReactMarkdown className="text-container">{markdownText}</ReactMarkdown>
    </Accordion>
    <div className="bordered" style={{ padding: "40px 20px" }}>
      <h3>{message}</h3>
      <input
        disabled={loggedIn}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="123"
      />
      <input
        disabled={loggedIn}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="123"
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

      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>Log in and out and visit these pages for different actions</div>
        <button><a href="/auth/test">Test authorised page</a></button>
        <button><a href="/auth/redirect">Test page redirect</a></button>
      </div>
      <h3>login status: {loggedIn ? "logged in" : "logged out"}</h3>
    </div>
  </>;
};

export default Auth;
