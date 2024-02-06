/* Core */
import { createLogger } from "redux-logger";
import { Middleware } from "@reduxjs/toolkit";

// not currently using this as it creates a type mismatch
// in store.ts though it does still appear to work
let reduxLogger = createLogger({
  duration: true,
  timestamp: true,
  collapsed: true,
  colors: {
    title: () => "#139BFE",
    prevState: () => "#1C5FAF",
    action: () => "#149945",
    nextState: () => "#A47104",
    error: () => "#ff0005",
  },
  predicate: () => typeof window !== "undefined",
});

// not currently
const middleware = [reduxLogger];

const simpleLogger: Middleware = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

// export { reduxLogger as middleware };
export { simpleLogger as appMiddleware };
