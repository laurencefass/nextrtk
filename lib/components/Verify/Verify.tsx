"use client";

/* Instruments */
import {
  selectCount, 
  selectTodos,
  useSelector,
} from "@/lib/redux";
import { UserList } from "../Users/Users";

function TodoList() {
  const todos = useSelector(selectTodos)
  return <>
      <h3>Redux state Todo list</h3>
      {todos.length ? (
          todos.map((todo) => <div className='todo-list-item'>{todo.label}</div>)
        ) : (
          <h3>No todos</h3>
      )}  
  </>
}

function Count() {
  const count = useSelector(selectCount);
  return <>
      <h3>Local Counter: { count }</h3>  
  </>
}

export const Verify = () => {  
  return <>
      <h1>Redux state verification</h1>
      <h3>This page verifies that Redux state is persisted across page route navigations.</h3>
      <TodoList />
      <UserList/>
  </>
};
