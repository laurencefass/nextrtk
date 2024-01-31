import { createAsyncThunk } from "@reduxjs/toolkit";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function createFetchGetThunk(actionName: string, url: string) {
  return createAsyncThunk(
    actionName,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        await sleep(1000);
        return data;
      } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "An unknown error occurred");
      }
    }
  );
}

export const createFetchPostThunk = (actionName: string, url: string) => {
  return createAsyncThunk(
    actionName,
    async (data: any[], { rejectWithValue }) => {
      try {
        console.log("createFetchPostThunk", data);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data }),
        });
        if (!response.ok) {
          throw new Error('Server error');
        }
        await sleep(1000);
        return data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
}
