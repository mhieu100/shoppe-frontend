import axios from './axios-customize';

/**
 *
Module Auth
 */

export const callRegister = (fullname, email, password) => {
  return axios.post('/auth/register', {
    fullname,
    email,
    password,
  });
};

export const callLogin = (email, password) => {
  return axios.post('/auth/login', { email, password });
};

export const callFetchAccount = () => {
  return axios.get('/auth/account');
};

export const callRefreshToken = () => {
  return axios.get('/auth/refresh');
};

export const callLogout = () => {
  return axios.post('/auth/logout');
};
