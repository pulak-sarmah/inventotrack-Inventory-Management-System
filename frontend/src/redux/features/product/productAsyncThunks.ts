import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import productService from "../../../services/productService";
import { IProduct, ProductData } from "../../../types/types";

interface RejectedValue {
  message: string;
}

//create new product using createAsyncThunk
export const createProduct = createAsyncThunk<
  IProduct,
  any,
  { rejectValue: RejectedValue }
>("products/create", async (formData: ProductData, thunkAPI) => {
  try {
    const response = await productService.createProduct(formData);

    if (response.status < 200 || response.status >= 300) {
      throw new Error("product upload failed");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong while adding product",
      });
    }
  }
});

//get all products using createAsyncThunk
export const getProducts = createAsyncThunk<
  IProduct[],
  void,
  { rejectValue: RejectedValue }
>("products/getAll", async (_, thunkAPI) => {
  try {
    const response = await productService.getProducts();
    if (response.status < 200 || response.status >= 300) {
      throw new Error("product upload failed");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong while fetching product",
      });
    }
  }
});

// delete a product
export const deleteProduct = createAsyncThunk<
  null,
  string,
  { rejectValue: RejectedValue }
>("product/delete", async (id: string, thunkAPI) => {
  try {
    const response = await productService.deleteProduct(id);
    if (response.status < 200 || response.status >= 300) {
      throw new Error("product could not be deleted");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong while deleting product",
      });
    }
  }
});

// get a product by id
export const getProduct = createAsyncThunk<
  IProduct,
  string | undefined,
  { rejectValue: RejectedValue }
>("product/getById", async (id, thunkAPI) => {
  try {
    const response = await productService.getProduct(id);
    if (response.status < 200 || response.status >= 300) {
      throw new Error("product could not be found");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong while fetching product",
      });
    }
  }
});

//update a product
export const updateProduct = createAsyncThunk<
  IProduct,
  { id: string; formData: any },
  { rejectValue: RejectedValue }
>("product/updateProductById", async ({ id, formData }, thunkAPI) => {
  try {
    const response = await productService.updateProduct(id, formData);
    if (response.status < 200 || response.status >= 300) {
      throw new Error("product could not be updated");
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong while updating product",
      });
    }
  }
});
