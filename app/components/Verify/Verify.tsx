"use client";

/* Instruments */
import {
  selectCount, 
  selectTodos,
  useSelector,
} from "@/lib/redux";
import List from "../TodoList/List";

export const Verify = () => {
  const count = useSelector(selectCount);
  const todos = useSelector(selectTodos)
  return <>
      <h1>Verify page</h1>
      <h3>
        This page is intended to verify that Redux state is persisted across
        page navigations.
      </h3>
      <h3>Counter: { count }</h3>
      <h3>Todo list
      </h3>
      {todos.length ? (
          todos.map((todo) => <div>{todo.label}</div>)
        ) : (
          <h3>No todos...</h3>
        )}
  </>
};
