import axios from './axios-customize';

export const fetchReviews = async () => {
  try {
    const response = await axios.get(`/review`);
    console.log(response.data);
    return rnull;
  } catch (e) {
    console.error(e);
    return null;
  }
};
