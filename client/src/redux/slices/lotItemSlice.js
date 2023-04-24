import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const getLotItem = createAsyncThunk('lot/getLotItemStatus', async (lotId) => {
  const { data } = await axios.get(`/lots/${lotId}`);
  return data;
});

export const postLotResult = createAsyncThunk(
  'lot/postLotResultStatus',
  async ({ lotId, bidId }) => {
    try {
      const { data } = await axios.post(`/lots/${lotId}/result`, { bidId });
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const lotItemSlice = createSlice({
  name: 'lot',
  initialState: {
    status: 'pending',
    lotItem: {},
  },

  extraReducers: (builder) => {
    builder.addCase(getLotItem.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getLotItem.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(getLotItem.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.lotItem = action.payload;
    });
  },
});

export default lotItemSlice.reducer;
