import { configureStore } from '@reduxjs/toolkit';
import { heatMapReducer } from './slices/heatMapSlice';
import { snapshotReducer } from './slices/snapshotSlice';
import { targetReducer } from './slices/targetSlice';

export const store = configureStore({
  reducer: {
    target: targetReducer,
    snapshot: snapshotReducer,
    heatMap: heatMapReducer
  }
});