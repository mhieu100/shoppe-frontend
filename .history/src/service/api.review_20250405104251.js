import axios from './axios-customize';

export const fetchReviews = async (params) => {
  const { current, pageSize } = params;
  try {
    const response = await axios.get(`/review`, {
      params: {
        page: current,
        size: pageSize,
      },
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
