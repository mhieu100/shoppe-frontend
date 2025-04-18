import axios from './axios-customize';

const gettAllProducts = async (params) => {
  const { current, pageSize, searchTerm } = params;

  try {
    const response = await axios.get(`/products`, {
      params: {
        size: pageSize,
        page: current,
        searchTerm,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addProduct = async (product) => {
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('descriptions', product.description);
    formData.append('price', product.price);
    formData.append('stockQuantity', product.stockQuantity);
    formData.append('categoryId', product.category);

    product.images.forEach((image) => {
      formData.append('images', image);
    });

    console.log(formData);

    const response = await axios.post(`/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateProduct = async (id, product) => {
  try {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('descriptions', product.descriptions);
    formData.append('price', product.price);
    formData.append('stockQuantity', product.stockQuantity);
    formData.append('categoryId', product.category);

    product.images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await axios.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const productService = {
  gettAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
