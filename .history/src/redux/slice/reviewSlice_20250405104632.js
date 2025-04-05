import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReviews } from '../../service/api.review';

export const getReviews = createAsyncThunk('review/getReviews', async () => {
  const response = await fetchReviews();
  return response;
});

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reviewSlice.reducer;
