import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { watchFetchTodos, watchAddTodoAsync } from "@/lib/redux";

export const sagaMiddleware = createSagaMiddleware();

// add all app sagas to the root
export function* rootSaga() {
  yield all([watchFetchTodos(), watchAddTodoAsync()]);
}
