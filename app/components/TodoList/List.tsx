'use client'

import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "@/lib/redux";

import "@styles/globals.css";

type ListType = {
  id: any;
  label: string;
}

const ListItem = ({ id, label } : ListType) => {
  const dispatch = useDispatch();

  return (
    <div
      className="todo-list-item"
    >
      <div
        style={{
          marginRight: "10px",
          cursor: "pointer"
        }}
        onClick={() => dispatch(editTask({ id, label }))}
      >
        {label}
      </div>
      <button onClick={() => dispatch(deleteTask(id))}>Delete</button>
    </div>
  );
};

export default ListItem;
