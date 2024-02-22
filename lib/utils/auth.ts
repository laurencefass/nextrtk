import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { encrypt } from "./server";

type Role = "admin" | "authenticated" | "anonymous";

export type User = {
  name: string;
  password: string;
  role: Role;
  token: string | undefined;
};

export const users: Array<User> = [
  {
    name: "123",
    password: "123",
    role: "admin",
    token: undefined,
  },
  {
    name: "456",
    password: "456",
    role: "authenticated",
    token: undefined,
  },
];

export function getUserFromCookie(key: string) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("SESSION_KEY");
  if (cookie) {
    console.log(" getUserFromCookie", key);
    return getUserFromToken(cookie.value);
  }
  return null;
}

export function getUserFromToken(token: string) {
  const user = users.find((user) => user.token === token);
  // if (!user) throw "session token not recognised";
  return user;
}

export function authorizeUser(
  username?: string,
  password?: string
): User | undefined {
  if (!username || !password) return;

  const user = users.find((user) => user.name === username);
  if (!user) throw "user not found";
  if (user.password !== password) throw "password is incorrect";
  return user;
}

export function registerUser(username?: string, password?: string) {
  if (!username || !password) return;

  const user = users.find((user) => user.name === username);
  if (user) throw "user already signed up";
  if (users.length >= 5) throw "maximum 5 users allowed";
  users.push({
    name: username,
    password: password,
    role: "authenticated",
    token: undefined,
  });
}

export function validate() {
  console.log("validate");
  return getUserFromCookie("SESSION_KEY");
}

export function authenticate(
  type: string,
  username?: string,
  password?: string
) {
  let user;
  console.log("authenticate", type, username, password);
  switch (type) {
    case "login":
      user = authorizeUser(username, password);
      if (user) {
        // authorize will throw errors so no need to check result
        user.token = encrypt(user.name + Date.now().toString());
        console.log("logging in user", user.name, user.token);
        cookies().set({
          name: "SESSION_KEY",
          value: user.token as string,
          sameSite: true,
          httpOnly: true,
        });
      }
      break;
    case "register":
      cookies().delete("SESSION_KEY");
      registerUser(username, password);
      break;
    case "logout":
      user = getUserFromCookie("SESSION_KEY");
      if (user) {
        console.log("logging out user", user.name, user.token);
        cookies().delete("SESSION_KEY");
      }
      break;
    default:
      throw "unrecognised auth command";
      break;
  }
}
