import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountByCode,
} from '../../service/api.discount';

export const getDiscounts = createAsyncThunk(
  'discount/getDiscounts',
  async () => {
    const response = await fetchDiscounts();
    console.log(response);
    return response;
  }
);

export const addDiscount = createAsyncThunk(
  'discount/addDiscount',
  async (data) => {
    const response = await createDiscount(data);
    return response;
  }
);

export const editDiscount = createAsyncThunk(
  'discount/editDiscount',
  async ({ id, data }) => {
    const response = await updateDiscount(id, data);
    return response;
  }
);

export const removeDiscount = createAsyncThunk(
  'discount/removeDiscount',
  async (id) => {
    await deleteDiscount(id);
    return id;
  }
);

export const checkDiscount = createAsyncThunk(
  'discount/checkDiscount',
  async (code) => {
    const response = await getDiscountByCode(code);
    return response;
  }
);

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    discounts: [],
    loading: false,
    error: null,
    currentDiscount: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload;
      })
      .addCase(getDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDiscount.fulfilled, (state, action) => {
        state.discounts.push(action.payload);
      })
      .addCase(editDiscount.fulfilled, (state, action) => {
        const updatedDiscount = action.payload;
        state.discounts = state.discounts.map((discount) =>
          discount.id === updatedDiscount.id ? updatedDiscount : discount
        );
      })
      .addCase(removeDiscount.fulfilled, (state, action) => {
        state.discounts = state.discounts.filter(
          (discount) => discount.id !== action.payload
        );
      })
      .addCase(checkDiscount.fulfilled, (state, action) => {
        state.currentDiscount = action.payload;
      });
  },
});

export default discountSlice.reducer;
