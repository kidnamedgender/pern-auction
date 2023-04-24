import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getLots = createAsyncThunk('lots/getLotsStatus', async (auctionId) => {
  const { data } = await axios.get(`/auctions/${auctionId}/lots`);
  return data;
});

export const postLot = createAsyncThunk('lots/postLotStatus', async (params) => {
  try {
    const { title, desc, current_price } = params;
    const imageURL = params.imageURL[0];
    const { data } = await axios.post(
      '/lots/add-lot',
      { title, desc, current_price, imageURL },
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
  } catch (err) {}
});

export const patchLotToAuction = createAsyncThunk(
  'lots/patchLotToAuctionStatus',
  async ({ lotId, data }) => {
    await axios.patch(`/lots/${lotId}/add-to-auction`, data);
  },
);

export const rejectLot = createAsyncThunk('lots/rejectLotStatus', async (lotId) => {
  await axios.patch(`/lots/${lotId}/remove-lot`);
});

export const getUserLots = createAsyncThunk('lots/getUserLotsStatus', async () => {
  const { data } = await axios.get(`/users/my-lots`);
  return data;
});

export const getAllUserLots = createAsyncThunk('lots/getAllUserLotsStatus', async () => {
  const { data } = await axios.get(`/results`);
  return data;
});

export const lotSlice = createSlice({
  name: 'lots',
  initialState: {
    status: 'pending',
    lots: [],
    myLots: [],
    auctionTitle: '',
  },

  extraReducers: (builder) => {
    builder.addCase(getLots.pending, (state) => {
      state.status = 'pending';
      state.lots = [];
    });
    builder.addCase(getLots.rejected, (state, action) => {
      state.status = 'rejected';
      state.lots = [];
    });
    builder.addCase(getLots.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.lots = action.payload.findAuctionLots;
      state.auctionTitle = action.payload.auctionTitle;
    });

    builder.addCase(postLot.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(postLot.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(postLot.fulfilled, (state) => {
      state.status = 'fulfilled';
    });

    builder.addCase(patchLotToAuction.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(patchLotToAuction.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(patchLotToAuction.fulfilled, (state) => {
      state.status = 'fulfilled';
    });

    builder.addCase(rejectLot.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(rejectLot.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(rejectLot.fulfilled, (state) => {
      state.status = 'fulfilled';
    });

    builder.addCase(getUserLots.pending, (state) => {
      state.status = 'pending';
      state.myLots = [];
    });
    builder.addCase(getUserLots.rejected, (state) => {
      state.status = 'rejected';
      state.myLots = [];
    });
    builder.addCase(getUserLots.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.myLots = action.payload;
    });

    builder.addCase(getAllUserLots.pending, (state) => {
      state.status = 'pending';
      state.myLots = [];
    });
    builder.addCase(getAllUserLots.rejected, (state) => {
      state.status = 'rejected';
      state.myLots = [];
    });
    builder.addCase(getAllUserLots.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.myLots = action.payload;
    });
  },
});

export default lotSlice.reducer;
