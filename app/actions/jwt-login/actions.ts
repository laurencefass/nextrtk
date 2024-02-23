"use server";

import {
  authenticateJWT,
  validateJWT,
  AuthenticationType,
} from "@/lib/utils/auth";

export async function authenticate(
  type: AuthenticationType,
  username?: string,
  password?: string
) {
  authenticateJWT(type, username, password);
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
  try {
    validateJWT();
    return "authorized";
  } catch (e) {
    return "unauthorized";
  }
}
