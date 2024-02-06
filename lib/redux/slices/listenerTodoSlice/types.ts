// features/todos/types.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed" | "adding";
  error: string | null;
}
