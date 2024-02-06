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

import { reducer } from "./rootReducer";

import {
  listenerMiddleware,
  appMiddleware,
  sagaMiddleware,
  rootSaga,
} from "@/lib/middleware";

// using this method state is restored between HMR reloads
export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return (
        getDefaultMiddleware()
          .prepend(listenerMiddleware.middleware)
          // .concat(appMiddleware, sagaMiddleware);
          .concat(sagaMiddleware)
      );
    },
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export type ReduxStore = ReturnType<typeof makeStore>;
export type ReduxState = ReturnType<ReduxStore["getState"]>;
export type ReduxDispatch = ReduxStore["dispatch"];

export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
