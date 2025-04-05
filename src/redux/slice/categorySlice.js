import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { callFetchCategory } from '../../service/api.category';

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async ({ query }) => {
    const response = await callFetchCategory(query);
    return response;
  }
);

const initialState = {
  isFetching: true,
  meta: {
    page: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  },
  result: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.isFetching = false;
          state.meta = action.payload.data.meta;
          state.result = action.payload.data.result;
        }
      });
  },
});

export default categorySlice.reducer;
