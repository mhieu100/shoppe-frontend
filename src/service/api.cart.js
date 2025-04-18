import axios from './axios-customize';

export const cartApi = {
  getCart: async () => {
    return await axios.get(`/cart`);
  },
  addToCart: (productId) => axios.post(`/cart/${productId}`),
  increaseQuantity: (productId) => axios.post(`/cart/up/${productId}`),
  decreaseQuantity: (productId) => axios.post(`/cart/down/${productId}`),
  removeFromCart: (productId) => axios.delete(`/cart/remove/${productId}`),
  clearCart: () => axios.delete(`/cart/remove-all`),
};
