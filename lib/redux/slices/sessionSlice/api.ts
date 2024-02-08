import { User, SessionToken } from "./sessionSlice";

export function registerUserApi(user: User): Promise<boolean> {
  console.log("Attempting to  register user:", user);
  if (user.name !== "admin" && user.password !== "admin") {
    return Promise.resolve(true);
  } else {
    return Promise.reject("duplicate user");
  }
}

export function loginUserApi(user: User): Promise<SessionToken | string> {
  console.log("Attempting login for user:", user);
  if (user.name === "admin" && user.password === "admin") {
    return Promise.resolve({
      token: "dummy_token_123456",
    });
  } else {
    return Promise.reject("user and password not found");
  }
}

export function logoutUserApi(): Promise<void> {
  console.log("Logging out user");
  return Promise.resolve();
}
