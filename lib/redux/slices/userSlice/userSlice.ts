import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { ReduxState } from "@/lib/redux";
import { fetchUsers, saveUsers } from './thunks';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

const userAdapter = createEntityAdapter<User>();
const initialState = userAdapter.getInitialState({
    loading: false, 
    saving: false,
});

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: userAdapter.addOne,
        removeUser: userAdapter.removeOne,
        updateUser: userAdapter.updateOne,
        addUsers: userAdapter.addMany,
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            console.log("fetchUsers.fulfilled", action.payload)
            userAdapter.setAll(state, action.payload.data);
            state.loading = false;
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.loading = false;
        })
        .addCase(saveUsers.pending, (state) => {
            state.saving = true;
        })
        .addCase(saveUsers.fulfilled, (state, action) => {
            userAdapter.setAll(state, action.payload);
            state.saving = false;
        })
        .addCase(saveUsers.rejected, (state) => {
            state.saving = false;
        });
    }
});

export const { addUser, removeUser, updateUser, addUsers } = userSlice.actions;
export const selectUsers = (state: ReduxState) => state.user;
export default userSlice.reducer;
