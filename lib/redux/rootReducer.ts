// the app state is global state available across all routes as it is loaded in the root layout provider
import { appSlice } from "./slices";

/* All other ssstate is initialised on a per route basis and a new store is generated on each request */
import { counterSlice } from "./slices";
import { todoSlice } from "./slices";
import { socketSlice } from "./slices";
import { userSlice } from "./slices";
import { authorSlice } from "./slices";
import { articleSlice } from "./slices";
import { sagaTodoSlice } from "./slices/sagaTodoSlice";
import { listenerTodoSlice } from "./slices/listenerTodoSlice";
import { sessionSlice } from "./slices/sessionSlice";

export const reducer = {
  app: appSlice.reducer,
  counter: counterSlice.reducer,
  todo: todoSlice.reducer,
  socket: socketSlice.reducer,
  user: userSlice.reducer,
  author: authorSlice.reducer,
  article: articleSlice.reducer,
  sagaTodo: sagaTodoSlice.reducer,
  listenerTodo: listenerTodoSlice.reducer,
  session: sessionSlice.reducer,
};
