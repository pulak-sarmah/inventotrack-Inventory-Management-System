import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productService";
import axios from "axios";
import { toast } from "react-toastify";
import { IProduct, ProductState } from "../../../types/types";

// const initialState = {
//   product: [],
//   products: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

interface RejectedValue {
  message: string;
}
const initialState: ProductState = {
  product: {
    _id: "",
    user: "",
    name: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

//create new product using createAsyncThunk
const createProduct = createAsyncThunk<
  IProduct,
  any,
  { rejectValue: RejectedValue }
>("products/create", async (formData: any, thunkAPI) => {
  try {
    return await productService.createProduct(formData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue({ message });
    }
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
        toast.error(action.payload?.message) || "Something went wrong";
      });
  },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export default productSlice.reducer;
