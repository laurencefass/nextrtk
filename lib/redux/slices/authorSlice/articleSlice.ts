import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { ReduxState } from "@/lib/redux";
import { fetchArticles, saveArticles } from './thunks';

export interface Article {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

const articlesAdapter = createEntityAdapter<Article>();
const initialState = articlesAdapter.getInitialState({
  loading:false, 
  saving:false
});

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticle: articlesAdapter.addOne,
    removeArticle: articlesAdapter.removeOne,
    updateArticle: articlesAdapter.updateOne,
    addArticles: articlesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchArticles.fulfilled, (state, action) => {
        console.log("fetchArticles.fulfilled", action.payload)
        articlesAdapter.setAll(state, action.payload.data);
        state.loading = false;
    })
    .addCase(fetchArticles.rejected, (state) => {
        state.loading = false;
    })
    .addCase(saveArticles.pending, (state) => {
        state.saving = true;
    })
    .addCase(saveArticles.fulfilled, (state, action) => {
        articlesAdapter.setAll(state, action.payload);
        state.saving = false;
    })
    .addCase(saveArticles.rejected, (state) => {
        state.saving = false;
    });
}
});

export const { addArticle, removeArticle, updateArticle, addArticles } = articleSlice.actions;

// Export selectors
export const {
    selectById: selectArticleById,
    selectAll: selectAllArticles,
    selectEntities: selectArticleEntities,
  } = articlesAdapter.getSelectors<ReduxState>((state) => state.article);

export const selectArticles = (state: ReduxState) => state.article;
export default articleSlice.reducer;