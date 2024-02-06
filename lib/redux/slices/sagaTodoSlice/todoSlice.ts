// todoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "@/lib/redux";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoStatus = "idle" | "loading" | "succeeded" | "failed" | "adding";

interface TodoState {
  todos: Todo[];
  status: TodoStatus;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
};

export const sagaTodoSlice = createSlice({
  name: "sagaTodo",
  initialState,
  reducers: {
    addTodo: (state) => {
      state.status = "adding";
    },
    addTodoComplete: (state, action: PayloadAction<Todo>) => {
      state.status = "succeeded";
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.status = "succeeded";
    },
    setStatus: (state, action: PayloadAction<TodoStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { addTodo, addTodoComplete, removeTodo, setTodos, setStatus } =
  sagaTodoSlice.actions;
export const sagaTodoSelector = (state: ReduxState) => state.sagaTodo;
export default sagaTodoSlice.reducer;
