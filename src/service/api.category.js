import axios from './axios-customize';

/**
 *
Module Category
 */

export const callCreateCategory = (
  name,
  address,
  phoneNumber,
  capacity,
  workingHours,
  image
) => {
  return axios.post('/categories', {
    name,
    address,
    phoneNumber,
    capacity,
    workingHours,
    image,
  });
};

export const callUpdateCategory = (
  centerId,
  name,
  address,
  phoneNumber,
  capacity,
  workingHours,
  image
) => {
  return axios.put(`/categories/${centerId}`, {
    name,
    address,
    phoneNumber,
    capacity,
    workingHours,
    image,
  });
};

export const callFetchCategory = (query) => {
  return axios.get(`/categories?${query}`);
};

export const callDeleteCategory = (id) => {
  return axios.delete(`/categories/${id}`);
};
