// todoSaga.ts
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest, call, all } from "redux-saga/effects";
import { setTodos, addTodo, setLoading, Todo } from "./todoSlice";

function* sleepGenerator(ms: number) {
  yield new Promise((resolve) => setTimeout(resolve, ms));
}

function* addTodoAsyncSaga(action: PayloadAction<string>) {
  try {
    console.log("addTodoAsyncSaga start");
    // Simulate an async delay (e.g., 2 seconds) before adding the todo
    yield call(sleepGenerator, 2000);

    const newTodo: Todo = {
      id: Date.now(),
      title: action.payload, // Payload contains the todo title
      completed: false,
    };

    // Dispatch the addTodo action to add the new todo
    yield put(addTodo(newTodo));

    console.log("addTodoAsyncSaga end");

    // You can also dispatch other actions if needed
    // ...
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

function* fetchTodosSaga(): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    yield call(sleepGenerator, 2000);
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
    yield put(setLoading(false));
  }
}

function* watchFetchTodos() {
  yield takeLatest("sagaTodo/fetchTodos", fetchTodosSaga);
}

function* watchAddTodoAsync() {
  yield takeLatest("sagaTodo/addTodoAsync", addTodoAsyncSaga);
}

export function* rootSaga() {
  yield all([
    watchFetchTodos(),
    watchAddTodoAsync(),
    // Add other sagas here
  ]);
}
