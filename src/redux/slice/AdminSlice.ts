import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { AdminLoginInfo, AdminResponse } from '../../models/Admin';

type AdminState = {
  isLoading: boolean;
} & AdminResponse;

const initialState = {
  isLoading: false,
} as AdminState;

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    performAdminLogin(state, _action: PayloadAction<AdminLoginInfo>) {
      state.isLoading = true;
    },
    performAdminLogout() {
      return cloneDeep(initialState);
    },
    setAdmin(state, action: PayloadAction<AdminResponse>) {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    },
    setAdminError(state, action: PayloadAction<string>) {
      return {
        ...state,
        errors: [action.payload],
        isLoading: false,
      };
    },
  },
});

export const { performAdminLogin, performAdminLogout, setAdmin, setAdminError } = adminSlice.actions;

export default adminSlice.reducer;
