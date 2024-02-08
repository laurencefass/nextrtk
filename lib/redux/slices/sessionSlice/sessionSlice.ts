import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "@/lib/redux";

export interface User {
  id?: string;
  name: string | undefined;
  password: string | undefined;
  email?: string;
  token?: string | undefined;
}

export interface SessionToken {
  token: string;
}

type SessionStatus =
  | "logged out"
  | "login pending"
  | "logged in"
  | "logout pending"
  | "registration pending"
  | "registration complete";

interface SessionState {
  token: string | undefined;
  user: User;
  status: SessionStatus;
  message: string | undefined;
}

const initialState: SessionState = {
  token: undefined,
  user: {
    name: undefined,
    password: undefined,
  },
  status: "logged out",
  message: undefined,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    registrationRequested(state, action: PayloadAction<User>) {
      console.log("sessionSlice.registrationFailed", action);
      state.status = "registration pending";
    },
    registrationSucceeded(state) {
      console.log("sessionSlice.registrationSucceeded");
      state.message = "registration successful";
      state.status = "registration complete";
    },
    registrationFailed(state, action: PayloadAction<string>) {
      console.log("sessionSlice.registrationFailed", action);
      return {
        ...initialState,
        message: action.payload,
      };
    },
    loginRequested(state, action: PayloadAction<User>) {
      console.log("sessionSlice.loginRequested", action);
      state.user.password = action.payload.password;
      state.user.name = action.payload.name;
      state.status = "login pending";
    },
    loginSucceeded(state, action: PayloadAction<SessionToken>) {
      console.log("sessionSlice.loginSucceeded", action);
      console.log("action", action);
      state.token = action.payload.token;
      state.status = "logged in";
      state.message = "login successful";
    },
    loginCancelled(state) {
      console.log("sessionSlice.loginCancelled");
      return initialState;
    },
    loginFailed(state, action: PayloadAction<string>) {
      console.log("sessionSlice.loginFailed", action);
      return {
        ...initialState,
        message: action.payload,
      };
    },
    logoutRequested(state) {
      console.log("sessionSlice.logoutRequested");
      state.status = "logout pending";
    },
    logoutSucceeded(state) {
      console.log("sessionSlice.logoutSucceeded");
      return initialState;
    },
  },
});

// Export the reducer
export default sessionSlice.reducer;

// Export the actions
export const {
  loginRequested,
  loginSucceeded,
  loginFailed,
  logoutRequested,
  logoutSucceeded,
  loginCancelled,
  registrationRequested,
  registrationSucceeded,
  registrationFailed,
} = sessionSlice.actions;

export const selectSession = (state: ReduxState) => state.session;
