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
  try {
    authenticateJWT(type, username, password);
    switch (type) {
      case "login":
        return "logged in";
      case "logout":
        return "logged out";
      case "register":
        return "user registered";
      default:
        return "unrecognised authenticated type";
        break;
    }
  } catch (error: any) {
    console.log("catch error", error);
    return error;
  }
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
