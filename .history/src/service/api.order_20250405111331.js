import axios from './axios-customize';

export const fetchOrders = async () => {
  try {
    const response = await axios.get('/order');
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`/order/item/${orderId}/status`, { status });
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};