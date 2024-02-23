'use client'

import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "@/lib/redux";

import "@styles/todo.css";

type ListType = {
  id: any;
  label: string;
}

const ListItem = ({ id, label }: ListType) => {
  const dispatch = useDispatch();

  return (
    <li className="todo-list-item">
      <div onClick={() => dispatch(editTask({ id, label }))}>
        {label}
      </div>
      <button onClick={() => dispatch(deleteTask(id))}>Delete</button>
    </li>
  );
};

export default ListItem;
