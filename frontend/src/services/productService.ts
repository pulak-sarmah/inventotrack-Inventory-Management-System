import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const createProduct = async (productData: any) => {
  const response = await axios.post(
    `${API_BASE_URL}api/v1/products/create-product`,
    productData
  );
  return response.data;
};

const productService = {
  createProduct,
};

export default productService;
