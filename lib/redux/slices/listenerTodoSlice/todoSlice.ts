// features/todos/todoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoState } from "./types";
import type { ReduxState } from "@/lib/redux";

export const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

export const listenerTodoSlice = createSlice({
  name: "ListenerTodo",
  initialState,
  reducers: {
    loadTodos(state) {
      state.status = "loading";
    },
    receiveTodos(state, action: PayloadAction<Todo[]>) {
      state.status = "succeeded";
      state.todos = [...action.payload];
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.status = "adding";
    },
    addTodoComplete(state, action: PayloadAction<Todo>) {
      state.status = "succeeded";
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { loadTodos, receiveTodos, addTodo, deleteTodo, addTodoComplete } =
  listenerTodoSlice.actions;

// the property name is the slice name
export const listenerTodoSelector = (state: ReduxState) => state.listenerTodo;

export default listenerTodoSlice.reducer;
