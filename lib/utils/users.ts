import { cookies } from "next/headers";

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
    console.log("test page key", key);
    return getUserFromToken(cookie.value);
  }
  return null;
}

export function getUserFromToken(token: string) {
  const user = users.find((user) => user.token === token);
  if (!user) throw "session token not recognised";
  return user;
}

export function authorizeUser(
  username: string,
  password: string
): User | undefined {
  const user = users.find((user) => user.name === username);
  if (!user) throw "user not found";
  if (user.password !== password) throw "password is incorrect";
  return user;
}

export function registerUser(username: string, password: string) {
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
