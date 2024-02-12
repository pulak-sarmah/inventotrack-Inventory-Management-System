import { ProductData } from "../types/types";
import { handleRequest } from "./requestHandler";

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

const productService = {
  createProduct,
};

export default productService;
