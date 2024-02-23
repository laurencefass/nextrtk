"use server";

import {
  authenticateCookie,
  validateCookie,
  AuthenticationType,
} from "@/lib/utils/auth";

export async function authenticate(
  type: AuthenticationType,
  username?: string,
  password?: string
) {
  authenticateCookie(type, username, password);
  switch (type) {
    case "login":
      return "logged in";
    case "logout":
      return "logged out";
    case "register":
      return "user registered";
  }
  return "unrecognised authenticated type";
}

export async function check() {
  console.log("check");
  let user = validateCookie();
  console.log("validate", user);
  if (user) {
    return "authorized";
  }
  return "unauthorized";
}
