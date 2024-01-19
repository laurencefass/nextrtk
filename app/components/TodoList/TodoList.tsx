
'use client'

import { 
  updateValue, 
  addTask,   
  useSelector,
  useDispatch,
  selectTodos,
  selectTodoTaskValue,
} from "@/lib/redux";

import List from "./List"
import React from "react";

const TodoList = () => {
  const value = useSelector(selectTodoTaskValue);
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateValue(e.target.value));
  };

  const handleKeyEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      dispatch(addTask());
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter task"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyEnter}
      />
      <button onClick={() => dispatch(addTask())}>Add</button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px"
        }}
      >
        {todos.length ? (
          todos.map((todo) => <List key={todo.id} {...todo} />)
        ) : (
          <h3>No todos...</h3>
        )}
      </div>
    </>
  );
};

export default TodoList;
