import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserDataStatus', async (params) => {
  try {
    const { data } = await axios.post(`/users/login`, params);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const fetchUserMe = createAsyncThunk('auth/fetchAuthUserDataStatus', async () => {
  try {
    const { data } = await axios.get(`/users/get-me`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const fetchUserRegister = createAsyncThunk(
  'auth/fetchUserRegisterDataStatus',
  async (params) => {
    try {
      const { data } = await axios.post(`/users/registration`, params);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

const initialState = {
  data: null,
  status: 'pending',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });

    builder.addCase(fetchUserMe.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchUserMe.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(fetchUserMe.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });

    builder.addCase(fetchUserRegister.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchUserRegister.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
