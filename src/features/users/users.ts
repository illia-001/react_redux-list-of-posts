/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { getUsers } from '../../api/users';

type UsersState = {
  users: User[];
  user: User | null;
  loaded: boolean;
  hasError: boolean;
};

const initialState: UsersState = {
  users: [],
  user: null,
  loaded: false,
  hasError: false,
};

export const initUsers = createAsyncThunk('users/fetch', () => {
  return getUsers();
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
      })
      .addMatcher(
        (action: PayloadAction<string>) => action.type.endsWith('pending'),
        state => {
          state.loaded = true;
          state.hasError = false;
        },
      )
      .addMatcher(
        (action: PayloadAction<string>) => action.type.endsWith('rejected'),
        state => {
          state.loaded = false;
          state.hasError = true;
        },
      );
  },
});

export const { setUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
