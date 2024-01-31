import { createFetchGetThunk, createFetchPostThunk } from '../../thunkHelpers';

export const fetchAuthors = createFetchGetThunk('authors/fetch', '/api/authors')
export const saveAuthors = createFetchPostThunk('authors/save', '/api/authors');

export const fetchArticles = createFetchGetThunk('articles/fetch', '/api/articles')
export const saveArticles = createFetchPostThunk('articles/save', '/api/articles');