// app/listenerMiddleware.ts
import { loadTodos, addTodo, receiveTodos, addTodoComplete } from "./todoSlice";
import { listenerMiddleware } from "@/lib/middleware";
import { Todo } from "./types";

listenerMiddleware.startListening({
  actionCreator: loadTodos,
  effect: async (_, listenerApi) => {
    try {
      await listenerApi.delay(2000);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      if (!response.ok) throw new Error("Failed to fetch todos");
      const todos: Todo[] = await response.json();
      listenerApi.dispatch(receiveTodos(todos.slice(0, 3)));
    } catch (err) {
      listenerApi.dispatch({
        type: "todos/fetchFailed",
        payload: (err as Error).message,
      });
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: addTodo,
  effect: async (action, listenerApi) => {
    await listenerApi.delay(2000);
    listenerApi.dispatch(addTodoComplete(action.payload));
  },
});

export default listenerMiddleware;
