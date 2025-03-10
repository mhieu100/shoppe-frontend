import axios from './axios-customize';
const getAllReiews = async (params) => {
  const { current, pageSize } = params;
  try {
    const response = await axios.get(`/reviews`, {
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
