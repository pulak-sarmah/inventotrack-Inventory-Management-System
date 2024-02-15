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
    user: {
      _id: "",
      name: "",
      email: "",
    },
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
  shouldFetch: true,
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
    return response.data;
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
      toast.error(message);
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
      toast.error(message);
      return thunkAPI.rejectWithValue({ message });
    } else {
      return thunkAPI.rejectWithValue({
        message: "Something went wrong while deleting product",
      });
    }
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const array: number[] = [];
      products.map((item: IProduct) => {
        const { price, quantity } = item;
        const productValue = parseInt(price) * parseInt(quantity);
        return array.push(productValue);
      });
      const totalValue = array.reduce((acc, item) => acc + item, 0);
      state.totalStoreValue = totalValue;
    },

    CALC_OUT_OF_STOCK(state, action) {
      const products = action.payload;
      const outOfStock = products.filter(
        (product: IProduct) => parseInt(product.quantity) === 0
      );
      state.outOfStock = outOfStock.length;
    },

    TOTAL_CATEGORIES(state, action) {
      const products = action.payload;
      const allCategory = products.map((product: IProduct) => product.category);
      state.category = allCategory.length;
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
          state.isSuccess = true;
          state.isError = false;
          state.products.push(action.payload);
          state.shouldFetch = true;
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: { payload: IProduct[] }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.products = action.payload;
          state.shouldFetch = false;
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.shouldFetch = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export const { CALC_OUT_OF_STOCK } = productSlice.actions;

export const { TOTAL_CATEGORIES } = productSlice.actions;

export const selectIsLoading = (state: RootState) => state.product.isLoading;

export const selectTotalStoreValue = (state: RootState) =>
  state.product.totalStoreValue;

export const selectOutOfStock = (state: RootState) => state.product.outOfStock;

export const selectCategory = (state: RootState) => state.product.category;

export const selectShouldFetch = (state: RootState) =>
  state.product.shouldFetch;

export default productSlice.reducer;
