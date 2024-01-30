import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ReduxState } from "@/lib/redux";

// this is a good example of typesafe action definitions
type Entity = {
    name: string;
    value: string;
}

type SliceState = {
    counter: any;
    entity: Entity;
}

// Initial state of the socket slice
const initialState: SliceState = {
  counter: "loading...",
  entity: {
    name: "name",
    value: "value"
  }
};

// Create the socket slice
export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setCounter: (state, action: PayloadAction<string>) => {
      state.counter = action.payload;
    },
    setEntity: (state, action: PayloadAction<Entity>) => {
        state.entity = ({...action.payload});
    }
  },
});

// Export the action creators 
export const { setCounter, setEntity } = socketSlice.actions;

// Export the reducer (imported in the store)
export default socketSlice.reducer;

// export the selectors
export const selectSocketCounter = (state: ReduxState) => state.socket.counter;
export const selectEntity = (state: ReduxState) => state.socket.entity;

