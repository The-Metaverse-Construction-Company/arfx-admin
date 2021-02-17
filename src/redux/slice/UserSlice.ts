import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  name: string;
};

const initialState = {
  name: '',
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const fetchUserData = createAction<number>('FETCH_USER_DATA');

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
