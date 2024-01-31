import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchAuthors, saveAuthors, type ReduxState } from "@/lib/redux";

export interface Author {
    id: string;
    name: string;
}

const authorsAdapter = createEntityAdapter<Author>();
const initialState = authorsAdapter.getInitialState({
  loading:false, 
  saving:false
});

export const authorSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    addAuthor: authorsAdapter.addOne,
    removeAuthor: authorsAdapter.removeOne,
    updateAuthor: authorsAdapter.updateOne,
    addAuthors: authorsAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchAuthors.fulfilled, (state, action) => {
        console.log("fetchAuthors.fulfilled", action.payload)
        authorsAdapter.setAll(state, action.payload.data);
        state.loading = false;
    })
    .addCase(fetchAuthors.rejected, (state) => {
        state.loading = false;
    })
    .addCase(saveAuthors.pending, (state) => {
        state.saving = true;
    })
    .addCase(saveAuthors.fulfilled, (state, action) => {
        authorsAdapter.setAll(state, action.payload);
        state.saving = false;
    })
    .addCase(saveAuthors.rejected, (state) => {
        state.saving = false;
    });
  }
});

export const { addAuthor, removeAuthor, updateAuthor, addAuthors } = authorSlice.actions;

// Export selectors
export const {
    selectById: selectAuthorById,
    selectAll: selectAllAuthors,
  } = authorsAdapter.getSelectors<ReduxState>((state) => state.author);
export const selectAuthors = (state: ReduxState) => state.author;
export default authorSlice.reducer;