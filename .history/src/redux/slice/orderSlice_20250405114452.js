import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, updateOrderStatus } from '../../service/api.order';

export const getOrders = createAsyncThunk('order/getOrders', async () => {
  const response = await fetchOrders();
  return response;
});

export const updateStatus = createAsyncThunk(
  'order/updateStatus',
  async ({ orderId, status }) => {
    const response = await updateOrderStatus(orderId, status);
    return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload.data;
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
      });
  },
});

export default orderSlice.reducer;
