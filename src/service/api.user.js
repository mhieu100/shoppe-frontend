import axios from './axios-customize';
/**
 *
Module User
 */

export const callCreateUser = (
  fullname,
  email,
  phoneNumber,
  birthday,
  address,
) => {
  return axios.post('/users', {
    fullname,
    email,
    phoneNumber,
    birthday,
    address,
  });
};

export const callUpdateUser = (
  id,
  fullname,
  email,
  phoneNumber,
  birthday,
  address,
) => {
  return axios.put(`/users/${id}`, {
    fullname,
    email,
    phoneNumber,
    birthday,
    address,
  });
};

export const callFetchUser = (query) => {
  return axios.get(`/users?${query}`);
};

export const callDeleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};

export const callFetchDoctor = () => {
  return axios.get('/users/doctors');
}