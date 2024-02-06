// todoSaga.ts
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest, call, all, delay } from "redux-saga/effects";
import {
  setTodos,
  addTodo,
  addTodoComplete,
  setStatus,
  Todo,
} from "./todoSlice";

function* addTodoAsyncSaga(action: PayloadAction<string>) {
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
