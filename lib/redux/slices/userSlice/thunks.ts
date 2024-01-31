import { createFetchGetThunk, createFetchPostThunk } from '../../thunkHelpers';

export const fetchUsers = createFetchGetThunk('users/fetch', '/api/users')
export const saveUsers = createFetchPostThunk('users/save', '/api/users');