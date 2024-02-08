import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import {
  watchFetchTodos,
  watchAddTodoAsync,
  watchAndLog,
} from "@slices/sagaTodoSlice";
import {
  watchLogin,
  watchLogout,
  watchRegistration,
} from "@slices/sessionSlice";
export const sagaMiddleware = createSagaMiddleware();

// sagas are centrally registered through the rootSaga, which is added to the
export function* rootSaga() {
  yield all([
    watchFetchTodos(),
    watchAddTodoAsync(),
    watchAndLog(),
    // watchLogin(),
    // watchLogout(),
    // watchRegistration(),
  ]);
}
