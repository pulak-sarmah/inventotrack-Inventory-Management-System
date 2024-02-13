import { ProductData } from "../types/types";
import { handleRequest } from "./requestHandler";

//create product
const createProduct = async (productData: ProductData) => {
  const response = await handleRequest(
    "post",
    "/api/v1/products/create-product",
    productData,
    {},
    "Product Added Successfully"
  );

  return response;
};

//get all products
const getProducts = async () => {
  const response = await handleRequest(
    "get",
    "/api/v1/products/get-products",
    null,
    {}
  );

  return response;
};

//get product
const getProduct = async (id: string) => {
  const response = await handleRequest(
    "get",
    `/api/v1/products/get-product/${id}`,
    null,
    {}
  );

  return response;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
};

export default productService;
