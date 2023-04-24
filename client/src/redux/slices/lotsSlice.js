import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getAllLots = createAsyncThunk('lots/getAllLotsStatus', async () => {
  const { data } = await axios.get('/lots');
  return data;
});

export const lotsSlice = createSlice({
  name: 'allLots',
  initialState: {
    status: 'pending',
    allLots: [],
    auctionTitle: '',
  },

  extraReducers: (builder) => {
    builder.addCase(getAllLots.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAllLots.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(getAllLots.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.allLots = action.payload;
    });
  },
});

export default lotsSlice.reducer;
