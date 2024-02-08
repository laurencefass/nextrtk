import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { loginUserApi, logoutUserApi, registerUserApi } from "./api";
import {
  User,
  loginSucceeded,
  logoutSucceeded,
  registrationSucceeded,
  registrationFailed,
  loginFailed,
  SessionToken,
} from "./sessionSlice";

function* handleLogin(action: PayloadAction<User>): Generator<any, any, any> {
  try {
    console.log("handleLogin");
    const token: SessionToken = yield call(loginUserApi, action.payload);
    yield delay(2000);
    console.log("Login succeeded", token);
    yield put(loginSucceeded(token));

    // Automatically log the user out after 10 seconds
    yield delay(10000);
    console.log("Automatically logging out after 10 seconds");
    yield call(handleLogout);
  } catch (error) {
    console.error("Login failed:", error);
    yield put(loginFailed("login failed: " + error));
  }
}

function* handleRegistration(
  action: PayloadAction<User>
): Generator<any, any, any> {
  try {
    console.log("handleRegistration");
    const token: SessionToken = yield call(registerUserApi, action.payload);
    yield delay(2000);
    console.log("Registration succeeded", token);
    yield put(registrationSucceeded());
  } catch (error) {
    yield delay(2000);
    console.error("Login failed:", error);
    yield put(registrationFailed("registration failed: " + error));
  }
}

function* handleLogout() {
  try {
    console.log("handleLogout");
    yield call(logoutUserApi);
    yield delay(2000);
    yield put(logoutSucceeded());
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

export function* watchRegistration() {
  yield takeLatest("session/registrationRequested", handleRegistration);
}

export function* watchLogin() {
  yield takeLatest("session/loginRequested", handleLogin);
}

export function* watchLogout() {
  yield takeLatest("session/logoutRequested", handleLogout);
}
