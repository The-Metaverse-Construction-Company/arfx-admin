import { combineReducers } from '@reduxjs/toolkit';
import settingsReducer from './slice/SettingsSlice';
import scenesReducer from './slice/ScenesSlice';
import adminReducer from './slice/AdminSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  scenes: scenesReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
