import { cookies } from "next/headers";
import { encrypt, readFromFile, writeToFile } from "./server";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { useInsertionEffect } from "react";

interface MyTokenPayload extends JwtPayload {
  username?: string;
  password?: string;
}

const SESSION_KEY = "SESSION_KEY" as string;
const JWT_TOKEN_KEY = "JWT_TOKEN_KEY" as string;
const AUTH_JSON = "auth.json";

export type Role = "admin" | "authenticated" | "anonymous";
export type AuthenticationType = "login" | "logout" | "register";

export type User = {
  name: string;
  password: string;
  role: Role;
  token?: string;
  connected?: boolean;
};

function getUserFromCookie(users: Array<User> | null, key: string) {
  const cookieStore = cookies();
  const cookie = cookieStore.get(SESSION_KEY);
  if (cookie) {
    console.log("getUserFromCookie", cookie.value);
    const user = users?.find((user) => user.token === cookie.value);
    return user;
  }
  return null;
}

function authorizeUser(
  users: Array<User> | null,
  username?: string,
  password?: string
): User | undefined {
  if (!users || !username || !password) return;
  const user = users?.find((user) => user.name === username);
  if (!user) throw "user not found";
  if (user.password !== password) throw "password is incorrect";
  return user;
}

function registerUser(username?: string, password?: string) {
  if (!username || !password) return;
  let users = readFromFile<User>(AUTH_JSON);
  if (users) {
    const user = users?.find((user) => user.name === username);
    if (user) throw "user already signed up";
    if (users.length >= 5) throw "maximum 5 users allowed";
  } else {
    users = [];
  }
  users.push({
    name: username,
    password: password,
    role: "authenticated",
  });
  writeToFile<User>(AUTH_JSON, users);
}

function loginUser(username?: string, password?: string) {
  const users = readFromFile<User>(AUTH_JSON);
  if (users) {
    let user = authorizeUser(users, username, password);
    if (user) {
      // authorize will throw errors so no need to check result
      user.token = encrypt(user.name + Date.now().toString());
      console.log("authenticating user", user);
      console.log("users, users");
      cookies().set({
        name: SESSION_KEY,
        value: user.token as string,
        secure: true,
        sameSite: "strict",
        httpOnly: true,
        path: "/",
      });
    }
    writeToFile<User>(AUTH_JSON, users);
  }
}

function logoutUser() {
  const users = readFromFile<User>(AUTH_JSON);
  if (users) {
    let user = getUserFromCookie(users, SESSION_KEY);
    console.log("logoutUser, user", user);
    if (user) {
      delete user.token;
      console.log("logging out user", user.name, user.token);
      cookies().delete(SESSION_KEY);
    }
    writeToFile<User>(AUTH_JSON, users);
  }
}

export function validate(): User | null | undefined {
  const cookieStore = cookies();
  if (cookieStore.get(SESSION_KEY)) {
    return validateCookie();
  } else if (cookieStore.get(JWT_TOKEN_KEY)) {
    {
      return validateJWT();
    }
  }
  return null;
}

export function validateCookie() {
  const users = readFromFile(AUTH_JSON);
  return getUserFromCookie(users, SESSION_KEY);
}

export function authenticateCookie(
  type: AuthenticationType,
  username?: string,
  password?: string
) {
  console.log("authenticate cookie");
  switch (type) {
    case "login":
      loginUser(username, password);
      break;
    case "register":
      registerUser(username, password);
      break;
    case "logout":
      logoutUser();
      break;
    default:
      throw "unrecognised auth command";
      break;
  }
}

function getUserFromWJT(users: Array<User>) {
  console.log("getUserFromWJT");
}

export function validateJWT(): User | null {
  console.log("validateJWT");
  const { valid, decoded } = verifyJWTCookie();
  if (valid) {
    const users = readFromFile<User>(AUTH_JSON);
    if (users) {
      const user = authorizeUser(users, decoded?.username, decoded?.password);
      if (user) return user;
    }
  }
  return null;
}

export function authenticateJWT(
  type: AuthenticationType,
  username?: string,
  password?: string
) {
  switch (type) {
    case "login":
      console.log("authenticateJWT, login");
      if (username && password) {
        const users = readFromFile<User>(AUTH_JSON);
        if (!users) throw "authenticate: no users found! register a user.";
        const user = authorizeUser(users, username, password);
        if (user) {
          const token = jwt.sign(
            {
              username,
              password,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "1h",
            }
          );
          console.log("authenticateJWT", token);
          // add token to cookie
          cookies().set({
            name: JWT_TOKEN_KEY,
            value: token,
            secure: true,
            sameSite: "strict",
            httpOnly: true,
            path: "/",
          });
          user.connected = true;
          writeToFile<User>(AUTH_JSON, users);
        }
      }
      break;
    case "logout":
      console.log("authenticateJWT, logout");
      const { valid, decoded } = verifyJWTCookie();
      if (valid) {
        console.log("deleting JWT token", valid, decoded);
        const users = readFromFile<User>(AUTH_JSON);
        if (users) {
          const user = authorizeUser(
            users,
            decoded?.username,
            decoded?.password
          );
          console.log("found user", user);
          if (user) delete user.connected;
          writeToFile<User>(AUTH_JSON, users);
        }
        cookies().delete(JWT_TOKEN_KEY);
      }
      break;
    case "register":
      console.log("authenticateJWT, register");
      registerUser(username, password);
      break;
  }
}

function verifyJWTCookie() {
  let token = cookies().get(JWT_TOKEN_KEY);
  if (!token) throw "verifyJWTCookie: jwt not found in cookies";
  console.log("verifyJWTCookie, token", token);
  return verifyToken(token.value) as MyTokenPayload;
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return { valid: true, decoded };
  } catch (error: any) {
    return { valid: false, error: error?.message };
  }
};
