import axios from './axios-customize';


const API_BA
export const fetchDiscounts = async () => {
  try {
    const response = await axios.get('/discount');
    console.log('response', response.data);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createDiscount = async (data) => {
  try {
    const response = await axios.post('/discount', data);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateDiscount = async (id, data) => {
  try {
    const response = await axios.put(`/discount/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteDiscount = async (id) => {
  try {
    const response = await axios.delete(`/discount/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getDiscountByCode = async (code) => {
  try {
    const response = await axios.get(`/discount/${code}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
