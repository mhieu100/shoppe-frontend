import axios from './axios-customize';

export const fetchReviews = async () => {
  try {
    const response = await axios.get(`/review`);
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
