
'use client'

import { 
  updateValue, 
  addTask,   
  useSelector,
  useDispatch,
  selectTodos,
  selectTodoTaskValue,
} from "@/lib/redux";

import ListItem from "./List"
import React from "react";

import "@styles/globals.css";

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

  return <div className="todos">
      <div style={{ border: '2px solid gray', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter task"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyEnter}
        />
        <button onClick={() => dispatch(addTask())}>Add</button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "20px"
        }}
      >
        {todos.length ? (
          todos.map((todo) => <ListItem key={todo.id} {...todo} />)
        ) : (
          <h3>No todos...</h3>
        )}
      </div>
    </div>
};

export default TodoList;
