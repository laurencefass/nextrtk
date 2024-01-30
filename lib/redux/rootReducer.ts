/* Instruments */
import { counterSlice } from "./slices";
import { todoSlice } from "./slices";
import { socketSlice } from "./slices";
import { userSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  todo: todoSlice.reducer,
  socket: socketSlice.reducer,
  user: userSlice.reducer,
};
