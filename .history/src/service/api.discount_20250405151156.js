import axios from './axios-customize';

const API_BASE_URL = '/discounts';
export const fetchDiscounts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createDiscount = async (data) => {
  try {
    const response = await axios.post(API_BASE_URL, );
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateDiscount = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteDiscount = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getDiscountByCode = async (code) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${code}`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
