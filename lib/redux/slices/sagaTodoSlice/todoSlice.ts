// todoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "@/lib/redux";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean; // Add a loading state
}

const initialState: TodoState = {
  todos: [],
  loading: false, // Initialize loading as false
};

export const sagaTodoSlice = createSlice({
  name: "sagaTodo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loading = false; // Set loading to false when todos are loaded
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addTodo, removeTodo, setTodos, setLoading } =
  sagaTodoSlice.actions;
export const sagaTodoSelector = (state: ReduxState) => state.sagaTodo;
export default sagaTodoSlice.reducer;
