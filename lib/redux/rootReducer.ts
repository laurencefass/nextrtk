/* Instruments */
import { counterSlice } from "./slices";
import { todoSlice } from "./slices";
import { socketSlice } from "./slices";
import { userSlice } from "./slices";
import { authorSlice } from "./slices";
import { articleSlice } from "./slices";
import { sagaTodoSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  todo: todoSlice.reducer,
  socket: socketSlice.reducer,
  user: userSlice.reducer,
  author: authorSlice.reducer,
  article: articleSlice.reducer,
  sagaTodo: sagaTodoSlice.reducer,
};
