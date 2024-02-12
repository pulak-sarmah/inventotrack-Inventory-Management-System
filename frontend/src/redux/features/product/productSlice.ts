import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productService";
import axios from "axios";
import { toast } from "react-toastify";
import { IProduct, ProductData, ProductState } from "../../../types/types";

interface RootState {
  product: ProductState;
}

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
    return response;
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
    } else {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong while adding product",
      });
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
      .addCase(
        createProduct.fulfilled,
        (state, action: { payload: IProduct }) => {
          state.isLoading = false;
          console.log(state.isLoading, "is loading from added");
          state.isSuccess = true;
          state.products.push(action.payload);
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.log(state.isLoading, "is loading from error");
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export const selectIsLoading = (state: RootState) => state.product.isLoading;

export default productSlice.reducer;