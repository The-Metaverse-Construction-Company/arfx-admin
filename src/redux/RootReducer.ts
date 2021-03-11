import { combineReducers } from '@reduxjs/toolkit';
import settingsReducer from './slice/SettingsSlice';
import scenesReducer from './slice/ScenesSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  scenes: scenesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
