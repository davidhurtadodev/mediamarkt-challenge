import { configureStore } from '@reduxjs/toolkit';
import parcelReducer from './parcelSlice';
import carrierReducer from './carrierSlice';
import itemSlice from './itemSlice';
import UIReducer from './UISlice';

export const store = configureStore({
  reducer: {
    parcel: parcelReducer,
    carrier: carrierReducer,
    item: itemSlice,
    UI: UIReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
