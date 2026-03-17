/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUser } from '../../api/users';

export const getUsedById = createAsyncThunk('users/fetchUser', (id: number) => {
  return getUser(id);
});

const initialState = null as null | User;

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setAuthor: (state, action: PayloadAction<User>) => {
      return (state = action.payload);
    },
    deleteAuthor: () => {
      return null;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getUsedById.fulfilled,
      (state, action: PayloadAction<User>) => {
        state = action.payload;
      },
    );
  },
});

export const { setAuthor, deleteAuthor } = authorSlice.actions;
export const authorReducer = authorSlice.reducer;
