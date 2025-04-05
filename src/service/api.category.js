import axios from './axios-customize';

/**
 *
Module Category
 */

export const callCreateCategory = (
  name,
  description
) => {
  return axios.post('/categories', {
    name,
    description
  });
};

export const callUpdateCategory = (
  id,
  name,
  description
) => {
  return axios.put(`/categories/${id}`, {
    name,
    description
  });
};

export const callFetchCategory = (query) => {
  return axios.get(`/categories?${query}`);
};

export const callDeleteCategory = (id) => {
  return axios.delete(`/categories/${id}`);
};
