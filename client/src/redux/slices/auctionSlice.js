import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getAuctions = createAsyncThunk('auctions/getAuctionsStatus', async () => {
  try {
    const { data } = await axios.get('/auctions');
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const postAuction = createAsyncThunk('auctions/postAuctionStatus', async (params) => {
  try {
    const title = params.title;
    const imageURL = params.imageURL[0];
    console.log(imageURL);
    const { data } = await axios.post(
      '/auctions/add-auction',
      { title, imageURL },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const auctionSlice = createSlice({
  name: 'auctions',
  initialState: {
    status: 'pending',
    auctions: [],
    count: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getAuctions.pending, (state) => {
      state.status = 'pending';
      state.auctions = [];
      state.count = [];
    });
    builder.addCase(getAuctions.rejected, (state) => {
      state.status = 'rejected';
      state.auctions = [];
      state.count = [];
    });
    builder.addCase(getAuctions.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.auctions = action.payload.findAuctions;
      state.count = action.payload.lotCount;
    });

    builder.addCase(postAuction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(postAuction.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(postAuction.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
  },
});

export default auctionSlice.reducer;
