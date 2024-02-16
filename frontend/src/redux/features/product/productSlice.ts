import { createSlice } from "@reduxjs/toolkit";
import { IProduct, ProductState } from "../../../types/types";
import {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./productAsyncThunks";

interface RootState {
  product: ProductState;
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
      const Category = products.map((product: IProduct) => product.category);
      const allCategory = [...new Set(Category)];
      state.category = allCategory as string[];
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
        state.shouldFetch = false;
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
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action: { payload: IProduct }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.shouldFetch = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
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

export const selectProduct = (state: RootState) => state.product.product;

export const selectTotalStoreValue = (state: RootState) =>
  state.product.totalStoreValue;

export const selectOutOfStock = (state: RootState) => state.product.outOfStock;

export const selectCategory = (state: RootState) => state.product.category;

export const selectShouldFetch = (state: RootState) =>
  state.product.shouldFetch;

export default productSlice.reducer;
