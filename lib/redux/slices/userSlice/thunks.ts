import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./userSlice";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await sleep(1000);
            return data.users;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
        }
    }
);

export const saveUsers = createAsyncThunk(
    'users/saveUsers',
    async (users: User[], { rejectWithValue }) => {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ users }),
        });
        if (!response.ok) {
          throw new Error('Server error');
        }
        await sleep(1000);
        return users;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );