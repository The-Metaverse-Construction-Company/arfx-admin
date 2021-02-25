import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { ScenesResponse } from '../../models/Scenes';

type ScenesState = {
  isLoading: boolean;
  isLoadingMore: boolean;
  currentPage: number;
} & ScenesResponse;

const initialState = {
  isLoading: false,
  isLoadingMore: false,
  currentPage: 0,
  errors: [],
  success: false,
  result: {
    data: [],
    pages: 0,
    total: 0,
  },
} as ScenesState;

const scenesSlice = createSlice({
  name: 'scenes',
  initialState,
  reducers: {
    resetScenes() {
      return cloneDeep(initialState);
    },
    getScenes(state) {
      if (state.result.data.length === 0 && state.currentPage === 0) {
        state.isLoading = true;
      } else if (state.currentPage < state.result.pages) {
        state.isLoadingMore = true;
      }
    },
    setScenes(state, action: PayloadAction<ScenesResponse>) {
      let newState = cloneDeep(state);
      newState = {
        ...newState,
        ...action.payload,
        isLoading: false,
        isLoadingMore: false,
        currentPage: state.currentPage + 1,
      };
      // Append previously loaded scenes with newly fetched ones.
      newState.result.data = [...state.result.data, ...newState.result.data];
      return newState;
    },
    setScenesError(state, action: PayloadAction<string>) {
      return {
        ...state,
        errors: [action.payload],
        isLoading: false,
        isLoadingMore: false,
      };
    },
  },
});

export const {
  resetScenes,
  getScenes,
  setScenes,
  setScenesError,
} = scenesSlice.actions;

export default scenesSlice.reducer;
