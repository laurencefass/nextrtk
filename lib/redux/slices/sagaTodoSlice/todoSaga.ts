// todoSaga.ts
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest, call, delay, take } from "redux-saga/effects";
import { takeEvery, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  setTodos,
  addTodo,
  addTodoComplete,
  setStatus,
  Todo,
} from "./todoSlice";

function* addTodoAsyncSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    console.log("addTodoAsyncSaga start");
    yield put(setStatus("adding"));

    yield delay(2000);

    const newTodo: Todo = {
      id: Date.now(),
      title: action.payload, // Payload contains the todo title
      completed: false,
    };

    yield put(addTodoComplete(newTodo));
  } catch (error) {
    console.error("Error adding todo:", error);
  } finally {
    yield put(setStatus("succeeded"));
  }
}

function* fetchTodosSaga(): Generator<any, void, any> {
  try {
    yield put(setStatus("loading"));
    yield delay(2000);

    const response: Response = yield call(
      fetch,
      "https://jsonplaceholder.typicode.com/todos"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const todos: Todo[] = yield call([response, "json"]);
    yield put(setTodos(todos.slice(0, 3)));
  } catch (error) {
    console.error("Error fetching todos:", error);
  } finally {
    yield put(setStatus("succeeded"));
  }
}

export function* watchFetchTodos() {
  yield takeLatest("sagaTodo/fetchTodos", fetchTodosSaga);
}

export function* watchAddTodoAsync() {
  yield takeLatest("sagaTodo/addTodoAsync", addTodoAsyncSaga);
}

export function* __watchAndLog(): SagaIterator {
  yield takeEvery(
    "*",
    function* logger(action: PayloadAction): SagaIterator<void> {
      const state: ReturnType<typeof select> = yield select();
      console.log("SAGA LOG: action, state", action, state);
    }
  );
}

export function* watchAndLog(): SagaIterator {
  while (true) {
    const action = yield take("*");
    const state = yield select();

    console.log("action", action);
    console.log("state after", state);
  }
}
