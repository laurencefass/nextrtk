/* Core */
import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

/* Instruments */
import { reducer } from "./rootReducer";
import { middleware } from "./middleware";

// this is the default way of configuring store which 
// leads to state reset on every HMR referesh
//
// export const reduxStore = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(middleware);
//   },
// });
// 
// export type ReduxStore = typeof reduxStore;
// export type ReduxState = ReturnType<typeof reduxStore.getState>;
// export type ReduxDispatch = typeof reduxStore.dispatch;

// using this method state is restored between HMR reloads
export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(middleware);
    },
  })
}

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxStore = ReturnType<typeof makeStore>;
export type ReduxState = ReturnType<ReduxStore['getState']>;
export type ReduxDispatch = ReduxStore['dispatch'];

export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
