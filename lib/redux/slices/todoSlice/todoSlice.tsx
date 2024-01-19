import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";


interface TaskState {
  id: any,
  label: string,
}

export interface TodoSliceState {
  todos: Array<TaskState>
  inputTaskValue: string,
  selectedEditTask: TaskState | undefined,
}

const initialState: TodoSliceState = {
  todos: [
    { id: v4(), label: "TypeScript" },
    { id: v4(), label: "React" },
    { id: v4(), label: "Redux-toolkit" }
  ],
  inputTaskValue: "",
  selectedEditTask: undefined
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state) => {
      const newTask = {
        id: v4(),
        label: state.inputTaskValue
      };
      if (state.inputTaskValue.length) {
        state.todos.push(newTask);
      }
      state.inputTaskValue = "";
    },
    deleteTask: (state, action) => {
      const idxTask = state.todos.findIndex(
        (task) => task.id === action.payload
      );
      state.todos.splice(idxTask, 1);
    },
    editTask: (state, action) => {
      const currentTask = {
        id: action.payload.id,
        label: action.payload.label
      };
      state.inputTaskValue = currentTask.label;
      state.selectedEditTask = currentTask;
    },

    updateValue: (state, action) => {
      state.inputTaskValue = action.payload;
    }
  }
});

export const {
  addTask,
  deleteTask,
  updateValue,
  editTask,
  // editAddTask
} = todoSlice.actions;

export default todoSlice.reducer;
