import { configureStore } from '@reduxjs/toolkit';
import auctionSlice from './slices/auctionSlice';
import lotSlice from './slices/lotSlice';
import lotItemSlice from './slices/lotItemSlice';
import bidSlice from './slices/bidSlice';
import authSlice from './slices/authSlice';
import lotsSlice from './slices/lotsSlice';
export default configureStore({
  reducer: { auctionSlice, lotSlice, lotItemSlice, bidSlice, authSlice, lotsSlice },
});
