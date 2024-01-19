'use client'

import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "@/lib/redux";

type ListType = {
  id: any;
  label: string;
}

const List = ({ id, label } : ListType) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        width: "200px",
        border: "2px solid gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px",
        padding: "5px"
      }}
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

export default List;
