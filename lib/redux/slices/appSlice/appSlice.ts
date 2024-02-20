// Import createSlice from Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "../../store";

type AppState = {
  message: string;
};

// Define the initial state of the slice
const initialState = {
  message: "",
};

// Create the slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    initialiseAppState: (state, action: PayloadAction<number>) => {
      state.message += action.payload;
    },
  },
});

// Export the action
export const { initialiseAppState } = appSlice.actions;

export const selectAppMessage = (state: { app: AppState }) => state.app.message;

// Export the reducer
export default appSlice.reducer;
