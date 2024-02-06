import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import {
  watchFetchTodos,
  watchAddTodoAsync,
  watchAndLog,
} from "@slices/sagaTodoSlice";

export const sagaMiddleware = createSagaMiddleware();

// add all app sagas to the root
export function* rootSaga() {
  yield all([watchFetchTodos(), watchAddTodoAsync(), watchAndLog()]);
}
