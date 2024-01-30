/* Instruments */
import type { ReduxState } from "@/lib/redux";

// note: not using this file i have added the selectors directly to the slice file

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSocketCounter = (state: ReduxState) => state.socket.counter;
