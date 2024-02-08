import { listenerMiddleware } from "@/lib/middleware";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  loginSucceeded,
  logoutSucceeded,
  registrationSucceeded,
  registrationFailed,
  loginFailed,
  loginRequested,
  logoutRequested,
  registrationRequested,
  User,
} from "./sessionSlice";

import { loginUserApi, logoutUserApi, registerUserApi } from "./api";

console.log("sessionListener is executing correctly");

// Login listener
listenerMiddleware.startListening({
  actionCreator: loginRequested,
  effect: async (action: PayloadAction<User>, listenerApi) => {
    try {
      console.log("listenerMiddleware.handleLogin");
      const result = await loginUserApi(action.payload);
      await listenerApi.delay(2000);

      // Check if the result is a SessionToken
      if (typeof result === "string") {
        throw new Error(result); // Treat the returned string as an error message
      } else {
        console.log("Login succeeded", result);
        listenerApi.dispatch(loginSucceeded(result));
      }
      // Automatically log the user out after 30 seconds
      await listenerApi.delay(10000);
      console.log("Automatically logging out after 30 seconds");
      await logoutUserApi();
      listenerApi.dispatch(logoutSucceeded());
    } catch (error) {
      console.error("Login failed:", error);
      listenerApi.dispatch(loginFailed("login failed: " + error));
    }
  },
});

// Logout listener
listenerMiddleware.startListening({
  actionCreator: logoutRequested,
  effect: async (_, listenerApi) => {
    try {
      console.log("listenerMiddleware.handleLogout");
      await logoutUserApi();
      await listenerApi.delay(2000); // Mimic delay
      listenerApi.dispatch(logoutSucceeded());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
});

// Registration listener
listenerMiddleware.startListening({
  actionCreator: registrationRequested,
  effect: async (action: PayloadAction<User>, listenerApi) => {
    try {
      console.log("listenerMiddleware.handleRegistration");
      await registerUserApi(action.payload);
      await listenerApi.delay(2000);
      console.log("Registration succeeded");
      listenerApi.dispatch(registrationSucceeded());
    } catch (error) {
      await listenerApi.delay(2000);
      console.error("Registration failed:", error);
      listenerApi.dispatch(registrationFailed("registration failed: " + error));
    }
  },
});
