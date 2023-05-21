import { configureStore } from '@reduxjs/toolkit';
import { diffReducer } from './slices/diffSlice';
import { heatMapReducer } from './slices/heatMapSlice';
import { onlineReducer } from './slices/onlineSlice';
import { ratingReducer } from './slices/ratingSlice';
import { snapshotReducer } from './slices/snapshotSlice';
import { summaryReducer } from './slices/summarySlice';
import { targetReducer } from './slices/targetSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    target: targetReducer,
    snapshot: snapshotReducer,
    heatMap: heatMapReducer,
    diffs: diffReducer,
    summary: summaryReducer,
    online: onlineReducer,
    rating: ratingReducer,
    user: userReducer
  }
});