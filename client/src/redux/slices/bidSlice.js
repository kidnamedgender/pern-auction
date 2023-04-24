import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getBids = createAsyncThunk('lot/getBidsStatus', async (lotId) => {
  const { data } = await axios.get(`/lots/${lotId}/bids`);
  return data;
});

export const postBid = createAsyncThunk('lot/postBidStatus', async (params) => {
  try {
    const { data } = await axios.post(`/lots/${params.currentLotId}/add-bid`, params.values);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const bidSlice = createSlice({
  name: 'bid',
  initialState: {
    status: 'pending',
    bids: [],
    lotTitle: '',
  },

  extraReducers: (builder) => {
    builder.addCase(getBids.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getBids.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(getBids.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.bids = action.payload.findBids;
      state.lotTitle = action.payload.lotTitle;
    });

    builder.addCase(postBid.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(postBid.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(postBid.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
  },
});

export default bidSlice.reducer;
