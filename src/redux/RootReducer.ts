import { combineReducers } from '@reduxjs/toolkit';
import scenesReducer from './slice/ScenesSlice';
import adminReducer from './slice/AdminSlice';

const rootReducer = combineReducers({
  scenes: scenesReducer,
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
