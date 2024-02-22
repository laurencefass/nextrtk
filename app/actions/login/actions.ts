"use server";

import { authenticate, validate } from "@/lib/utils/auth";

export async function login(username: string, password: string) {
  console.log("login");
  authenticate("login", username, password);
  return "logged in";
}

export async function logout() {
  console.log("logout");
  authenticate("logout");
  return "logged out";
}

export async function register(username: string, password: string) {
  console.log("register");
  authenticate("register", username, password);
  return "registered";
}

export async function check() {
  console.log("check");
  let user = validate();
  console.log("validate", user);
  if (user) {
    return "authorized";
  }
  return "unauthorized";
}
